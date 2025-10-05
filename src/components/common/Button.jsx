import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-bel-green-500 hover:bg-bel-green-600 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-bel-green-500 text-bel-green-500 hover:bg-bel-green-500 hover:text-white',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-bel-green-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    ghost: 'text-bel-green-500 hover:bg-bel-green-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const Component = as || 'button';
  const MotionComponent = motion(Component);

  return (
    <MotionComponent
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      type={as ? undefined : type}
      disabled={disabled}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};
