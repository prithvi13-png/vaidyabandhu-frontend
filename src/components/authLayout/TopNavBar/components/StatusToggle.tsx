import React, { useState, useRef, useEffect } from 'react'
import { validateSessionAPI } from '@/api/validationApi'
import TooltipComponent from '@/common/TooltipComponent'
import { responseError } from '@/common/utiles/responseError'
import { toast } from 'sonner'
import { useAuthContext } from '../../../context'

// Types
type StatusValue = 'online' | 'offline'

interface StatusOption {
  value: StatusValue
  label: string
  color: string
}

// Constants
const STATUS_OPTIONS: StatusOption[] = [
  { value: 'online', label: 'Online', color: '#2ecc71' },
  { value: 'offline', label: 'Offline', color: '#e74c3c' },
]

/**
 * StatusIndicator - Visual indicator showing online/offline status with optional pulsing effect
 */
const StatusIndicator = ({ color, pulsing }) => {
  return (
    <div className="status-indicator-container">
      <div
        className="status-indicator"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}40`,
          position: 'relative',
          zIndex: 2,
        }}
      />
      {pulsing && (
        <>
          <span
            className="pulse-ring"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `2px solid ${color}`,
            }}
          />
          <span
            className="pulse-ring pulse-delay"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `2px solid ${color}`,
            }}
          />
        </>
      )}
    </div>
  )
}

/**
 * LoadingDots - Animated loading indicator with dots
 */
const LoadingDots = () => {
  const [dots, setDots] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev < 3 ? prev + 1 : 1))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <span>
      <span className="loading-dots">
        {'...'.repeat(dots)}
        <span className="invisible">{'.'.repeat(3 - dots)}</span>
      </span>
    </span>
  )
}

/**
 * StatusDropdown - Displays status options in a dropdown menu
 */
const StatusDropdown = ({ options, isLoading, loadingOption, onSelect }) => {
  return (
    <div className="status-options">
      {options.map((option) => (
        <div
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`status-option ${isLoading ? 'disabled' : ''}`}
          style={{
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading && loadingOption === option.value ? 0.7 : 1,
          }}
        >
          <div
            className="status-indicator"
            style={{
              marginRight: '6px',
              backgroundColor: option.color,
              boxShadow: `0 0 10px ${option.color}40`,
            }}
          />
          <span style={{ color: option.value === 'online' ? '#333' : '#e74c3c' }}>
            {isLoading && loadingOption === option.value ? (
              <>
                Load...
              </>
            ) : (
              option.label
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * StatusToggle - A component that displays and allows changing the user's online status
 */
const StatusToggle = () => {
  // Component state
  const [status, setStatus] = useState('online')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingOption, setLoadingOption] = useState('')
  const dropdownRef = useRef(null)
  
  // Context
  const { user, setUser } = useAuthContext()

  // Find the current status object from options
  const currentStatus = STATUS_OPTIONS.find(option => option.value === status) || STATUS_OPTIONS[0]

  // Set initial status based on user context
  useEffect(() => {
    if (user) {
      const userStatus = user.isOnline === undefined || user.isOnline 
        ? 'online' 
        : 'offline'
      setStatus(userStatus)
    }
  }, [user?.isOnline])

  // Handle outside clicks to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /**
   * Handle status change with API call
   */
  const handleStatusChange = async (newStatus) => {
    // Don't do anything if already loading or same status
    if (isLoading || newStatus === status) {
      return
    }

    setIsLoading(true)
    setLoadingOption(newStatus)

    try {
      const isOnline = newStatus === 'online'
      const apiResponse = await validateSessionAPI(isOnline)
      
      // Update status in localStorage for persistence
      localStorage.setItem('lastAPICall', String(Date.now()))
      
      // Update states
      setStatus(newStatus)
      setIsOpen(false)
      
      // Update user context
      setUser(prev => ({
        ...prev,
        isOnline: apiResponse.is_online,
      }))
    } catch (error) {
      toast.error(responseError(error), {
        duration: 2000,
        position: 'top-center',
      })
    } finally {
      setIsLoading(false)
      setLoadingOption('')
    }
  }

  return (
    <div className="status-toggle-container">
      <div className="status-toggle-box" ref={dropdownRef}>
        <TooltipComponent
          tooltipPlacement="left"
          tooltipText="Click here to change your Online/Offline status."
        >
          <button
            onClick={() => !isLoading && setIsOpen(!isOpen)}
            className="status-toggle-button"
            disabled={isLoading}
            aria-expanded={isOpen}
            aria-label="Change online status"
          >
            <div className="status-flex">
              <StatusIndicator 
                color={currentStatus.color} 
                pulsing={!isLoading && status !== 'offline'} 
              />
              <span
                className="status-label"
                style={{
                  color: status === 'online' ? '#333' : '#e74c3c',
                  opacity: (isLoading) ? 0.7 : 1,
                }}
              >
                {isLoading ? <LoadingDots /> : currentStatus.label}
              </span>
            </div>
          </button>
        </TooltipComponent>
        
        {isOpen && (
          <StatusDropdown
            options={STATUS_OPTIONS}
            isLoading={isLoading}
            loadingOption={loadingOption}
            onSelect={handleStatusChange}
          />
        )}
      </div>
      
      <style>{`
        .status-toggle-box {
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0px;
          width: 90px;
          position: relative;
        }

        .status-toggle-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 4px 12px;
          border-radius: 8px;
          border: none;
          outline: none;
          width: 100%;
          cursor: pointer;
        }

        .status-toggle-button:disabled {
          cursor: not-allowed;
        }

        .status-flex {
          display: flex;
          align-items: center;
        }

        .status-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .status-label {
          font-size: 14px;
        }

        .status-indicator-container {
          position: relative;
          margin-right: 12px;
        }

        .pulse-ring {
          animation: pulse 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
          z-index: 1;
        }

        .pulse-delay {
          animation-delay: 0.5s;
        }

        .status-options {
          position: absolute;
          left: 0;
          right: 0;
          margin-top: 8px;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }

        .status-option {
          display: flex;
          align-items: center;
          padding: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .status-option:hover {
          background-color: #f7fafc;
        }

        .disabled {
          pointer-events: none;
        }

        .loading-spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-left: 8px;
          border: 2px solid rgba(0, 0, 0, 0.1);
          border-top-color: #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-dots {
          display: inline-block;
        }

        .invisible {
          opacity: 0;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default StatusToggle