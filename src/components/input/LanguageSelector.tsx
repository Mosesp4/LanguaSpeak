import React from 'react';
import { IconLanguage } from '@tabler/icons-react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  languages: string[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, setSelectedLanguage, languages }) => {
  return (
    <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex items-center flex-row">
      <IconLanguage size={20} />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="bg-black rounded-full flex flex-row py-1 text-white"
      >
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
