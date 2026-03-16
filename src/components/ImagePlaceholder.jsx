// TODO: Replace with <img> tag pointing to real asset

const variants = {
  scene: {
    bg: 'linear-gradient(135deg, #dceaf5, #b8d4e8)',
    iconColor: '#6b9ab8',
    textColor: '#3d6a8a',
  },
  portrait: {
    bg: 'linear-gradient(135deg, #c8dff0, #a8c8e0)',
    iconColor: '#6b9ab8',
    textColor: '#3d6a8a',
  },
  location: {
    bg: 'linear-gradient(135deg, #1e5080, #163a5f)',
    iconColor: 'rgba(255,255,255,0.5)',
    textColor: 'rgba(255,255,255,0.6)',
  },
}

const icons = {
  scene: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="40" height="32" rx="3" />
      <path d="M4 32l10-10 8 8 8-12 14 14" />
      <circle cx="15" cy="18" r="3" />
    </svg>
  ),
  portrait: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="18" r="8" />
      <path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" />
    </svg>
  ),
  location: (color) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 4C16.3 4 10 10.3 10 18c0 11 14 26 14 26s14-15 14-26c0-7.7-6.3-14-14-14z" />
      <circle cx="24" cy="18" r="5" />
    </svg>
  ),
}

export default function ImagePlaceholder({
  width = '100%',
  height = '300px',
  label,
  variant = 'scene',
}) {
  const v = variants[variant] || variants.scene
  const icon = icons[variant] || icons.scene

  return (
    <div
      style={{
        background: v.bg,
        width,
        height,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '0.75rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {icon(v.iconColor)}
      {label && (
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: v.textColor,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
