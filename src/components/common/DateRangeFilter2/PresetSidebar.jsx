import React from 'react'
import { PRESETS } from './constants'

const PresetsSidebar = ({
  selectedPreset,
  onSelectPreset,
  style = {},
}) => (
  <section
    style={{
      width: 140,
      borderRight: '1px solid #eef2f7',
      padding: '10px 5px 0',
      backgroundColor: '#f8f9fa',
      borderTopLeftRadius: 12,
      height: 304,
      overflowY: 'auto',
      fontWeight: 500,
      ...style
    }}>
    {PRESETS.map(({ id, label }) => (
      <div
        key={id}
        onClick={() => onSelectPreset(id)}
        style={{
          padding: '5px 10px',
          marginBottom: 6,
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: '0.80rem',
          backgroundColor: selectedPreset === id ? '#057bff' : 'transparent',
          color: selectedPreset === id ? 'white' : '#495057',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.15s ease',
        }}
        className="preset-button"
      >
        {label}
      </div>
    ))}
  </section>
)

export default PresetsSidebar
