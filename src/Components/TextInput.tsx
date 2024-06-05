import React from 'react';

export interface ButtonInterface {
    text?: string;
}

const TextInput: React.FC = ({ text, ...props }: ButtonInterface) => {
  return (
  <div className='w-full mt-5'>
    <p className='text-black-purs'>{text}</p>
    <input {...props} className='border-blue-purs border w-full rounded-2xl mt-1.5 p-2 text-blue-purs' />
  </div>
  );
}

export default TextInput;