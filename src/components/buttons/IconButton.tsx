import React from 'react';

interface IconButtonProps {
  Icon: React.ComponentType<{ size: number }>;
  onClick: () => void; 
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, onClick }) => {
  return (
    <span
      className="cursor-pointer flex items-center space-x-2"
      onClick={onClick}
    >
      <Icon size={22} />
    </span>
  );
};

export default IconButton;
