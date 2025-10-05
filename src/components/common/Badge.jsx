export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-bel-green-500 text-white',
    yellow: 'bg-bel-yellow text-gray-900',
    red: 'bg-red-500 text-white',
    gray: 'bg-gray-200 text-gray-800',
    outline: 'border-2 border-bel-green-500 text-bel-green-500 bg-white'
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
