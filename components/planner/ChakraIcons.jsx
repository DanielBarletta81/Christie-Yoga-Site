export function ChakraIcon({ name, className = '', size = 14 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
  };

  switch (name) {
    case 'Root':
      return (
        <svg {...props} stroke="#C62828">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        </svg>
      );
    case 'Sacral':
      return (
        <svg {...props} stroke="#EF6C00">
          <circle cx="12" cy="12" r="4" />
          <path d="M8 6c2 2 6 2 8 0M6 12c2 2 2 6 0 8M12 18c2-2 6-2 8 0" />
        </svg>
      );
    case 'Solar':
      return (
        <svg {...props} stroke="#F9A825">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2l2 4-2 4-2-4 2-4z" />
        </svg>
      );
    case 'Heart':
      return (
        <svg {...props} stroke="#2E7D32">
          <circle cx="12" cy="12" r="4" />
          <path d="M8 10c0-2 2-3 4-1 2-2 4-1 4 1 0 3-4 5-4 5s-4-2-4-5z" />
        </svg>
      );
    case 'Throat':
      return (
        <svg {...props} stroke="#1565C0">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 4l4 6-4 6-4-6 4-6z" />
        </svg>
      );
    case 'Third Eye':
      return (
        <svg {...props} stroke="#4527A0">
          <circle cx="12" cy="12" r="4" />
          <path d="M4 12s4-4 8-4 8 4 8 4-4 4-8 4-8-4-8-4z" />
        </svg>
      );
    case 'Crown':
      return (
        <svg {...props} stroke="#6A1B9A">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v4M6 6l3 3M18 6l-3 3M6 18l3-3M18 18l-3-3" />
        </svg>
      );
    default:
      return null;
  }
}
