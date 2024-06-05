import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface ButtonInterface {
    text?: string;
    disabled?: boolean;
}

const BackButton: React.FC = ({ text, ...props }: ButtonInterface) => {
    const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
  <div>
    <button onClick={handleVoltar} className='bg-gray-purs p-3 rounded-3xl text-center text-[#fff] w-[200px]'>{text}</button>
  </div>
  );
}

export default BackButton;