import React, { ChangeEvent } from 'react';

interface TextAreaProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ id, value, onChange, placeholder }) => {
  return (
    <>
    <textarea
      rows={5}
      id={id}
      className="py-2.5 px-4 bg-black text-white border-none focus:outline-none block w-full border-transparent rounded-lg dark:bg-neutral-900 dark:border-transparent
      dark:text-neutral-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    </>
  );
};

export default TextArea;
