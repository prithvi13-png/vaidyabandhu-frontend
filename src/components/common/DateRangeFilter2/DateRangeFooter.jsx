import React from 'react'
import { Button } from 'react-bootstrap'
import { X as XIcon } from 'lucide-react'
import { formatDate } from './utils'

const DateRangeFooter = ({
  tempDates,
  onClearStart,
  onClearEnd,
  onCancel,
  onApply,
  disableApply,
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 15px',
      borderTop: '1px solid #eef2f7',
      backgroundColor: '#fff',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {tempDates.start && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f3fa',
            padding: '5px 10px',
            borderRadius: 4,
            marginRight: 10,
          }}
        >
          <span
            style={{
              fontSize: '0.85rem',
              color: '#495057',
              fontWeight: 500,
            }}
          >
            {formatDate(tempDates.start)}
          </span>
          {!tempDates.end && (
            <XIcon
              size={14}
              style={{ marginLeft: 8, cursor: 'pointer', color: '#6c757d' }}
              onClick={onClearStart}
            />
          )}
        </div>
      )}

      {tempDates.start && tempDates.end && (
        <span style={{ color: '#adb5bd', margin: '0 5px' }}>—</span>
      )}

      {tempDates.end && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f3fa',
            padding: '5px 10px',
            borderRadius: 4,
          }}
        >
          <span
            style={{
              fontSize: '0.85rem',
              color: '#495057',
              fontWeight: 500,
            }}
          >
            {formatDate(tempDates.end)}
          </span>
          <XIcon
            size={14}
            style={{ marginLeft: 8, cursor: 'pointer', color: '#6c757d' }}
            onClick={onClearEnd}
          />
        </div>
      )}
    </div>

    <div>
      <Button
        variant="light"
        size="sm"
        onClick={onCancel}
        style={{ marginRight: 10, borderRadius: 6, padding: '6px 14px' }}
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={onApply}
        disabled={disableApply}
        style={{
          borderRadius: 6,
          padding: '6px 14px',
          backgroundColor: '#057bff',
          borderColor: '#057bff',
        }}
      >
        Apply
      </Button>
    </div>
  </div>
)

export default DateRangeFooter
