import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

// ── DiamondIcon ────────────────────────────────────────────────────────────

export interface DiamondIconProps {
  bg?: string
  label?: string
  selected?: boolean
}

/**
 * Diamond-shaped marker used for regular landmarks.
 */
export function DiamondIcon({ bg = '#4a90d9', label, selected = false }: DiamondIconProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      filter: selected ? 'drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' : undefined,
    }}>
      <div
        style={{
          width: 14,
          height: 14,
          background: bg,
          border: '2px solid #fff',
          transform: 'rotate(45deg)',
          boxShadow: '0 0 4px #000',
        }}
      />
      {label && (
        <span
          style={{
            marginTop: 6,
            whiteSpace: 'nowrap',
            color: '#fff',
            fontSize: 12,
            textShadow: '1px 1px 2px #000',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export interface EmojiIconProps {
  emoji: string
  label?: string
  selected?: boolean
}

export function EmojiIcon({ emoji, label, selected = false }: EmojiIconProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      filter: selected ? 'drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))' : undefined,
    }}>
      <span
        style={{
          width: 32,
          height: 32,
          fontSize: 28,
          lineHeight: '32px',
          textAlign: 'center',
          filter: 'drop-shadow(0 0 3px #000)',
        }}
      >
        {emoji}
      </span>
      {label && (
        <span
          style={{
            marginTop: 6,
            whiteSpace: 'nowrap',
            color: '#fff',
            fontSize: 12,
            textShadow: '1px 1px 2px #000',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

// ── Leaflet icon factories ──────────────────────────────────────────────────

/**
 * Creates a Leaflet divIcon from a DiamondIcon.
 */
export function createDiamondIcon(bg?: string, label?: string, selected = false): L.DivIcon {
  const html = renderToStaticMarkup(<DiamondIcon bg={bg} label={label} selected={selected} />)
  return L.divIcon({
    className: '',
    html,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
}

/**
 * Creates a Leaflet divIcon from a StarIcon.
 */
export function createEmojiIcon(emoji: string, label?: string, selected = false): L.DivIcon {
  const html = renderToStaticMarkup(<EmojiIcon emoji={emoji} label={label} selected={selected} />)
  return L.divIcon({
    className: '',
    html,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  })
}

