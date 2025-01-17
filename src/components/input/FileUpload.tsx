import React from 'react';
import { IconPaperclip } from '@tabler/icons-react';

interface FileUploadProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ handleFileUpload }) => {
  return (
    <label htmlFor="file-upload" className="cursor-pointer text-white">
      <IconPaperclip size={21} />
      <input 
        type="file" 
        onChange={handleFileUpload}
        className="hidden"
      />
    </label>
  );
};

export default FileUpload;
