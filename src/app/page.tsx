"use client";
import "regenerator-runtime/runtime";
import React, { useState, ChangeEvent } from "react";
import TextArea from "@/components/input/TextArea";
import { BackgroundLines } from "@/components/ui/background-lines";
import SpeechRecognitionComponent from "@/components/speakRecognition/SpeechRecogition";
import {  IconCopy, IconThumbDown, IconThumbUp, IconVolume, IconStar } from "@tabler/icons-react";
import FileUpload from "@/components/input/FileUpload";
import { rtfToText } from "@/lib/rtfToText";
import LinkPaste from "@/components/input/LinkPaste";
import useTranslate from "@/hooks/useTranslate";
import LanguageSelector from "@/components/input/LanguageSelector";
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/CategoryLinks";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English", 
    "French", 
    "Spanish", 
    "Arabic", 
    "Chinese", 
    "Deutch", 
    "Swahili", 
    "Portuguese",
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("French");
  
  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance)
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file)
    }
  };

  const handleLinkPaste = () => {

  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleFavourite = () => {
    setFavourite(!favourite);
  }

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-black dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <div className="relative overflow-hidden h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl text-white text-neutral-200 font-bold sm:text-6xl">
                Langua
                <span className="text-[#05f74a]">Speak</span>
              </h1>
              <p className="mt-3 text-neutral-400">
                LanguaSpeak: Bridging Voices, Connecting Worlds
              </p>

              <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className="relative z-10 p-3 flex flex-col space-x-3 shadow-[0_0_10px_#05f74a] border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <div className="shadow-[0_0_10px_#05f74a]">
                      <TextArea
                        id="source-language"
                        value={sourceText}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                          setSourceText(e.target.value);
                        }}
                        placeholder="Type something here..."
                      />
                      <div className="flex flex-row justify-between w-full">
                          <span className="cursor-pointer flex space-x-2 flex-row">
                              <SpeechRecognitionComponent
                                setSourceText={setSourceText}
                              />
                              <IconVolume 
                              className="text-white"
                              size={22} 
                              onClick={() => handleAudioPlayback(sourceText)} 
                              />
                                {/* <IconFileUpload /> */}
                                <FileUpload handleFileUpload={handleFileUpload} />
                                <LinkPaste handleLinkPaste={handleLinkPaste} />
                          </span>

                          <span className="text-sm pr-4 text-white">
                            {sourceText.length} / 2000
                          </span>
                      </div>
                    </div>
                  </div>

                   <div className="relative z-10 p-3 flex flex-col shadow-[0_0_10px_#05f74a] space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                   <TextArea id={'target-language'}
                   value={targetText}
                   onChange={()=>{}}
                   placeholder={'Target Language'}
                   />
                   <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 text-white flex-row items-center">
                        <LanguageSelector
                          selectedLanguage={selectedLanguage}
                          setSelectedLanguage={setSelectedLanguage}
                          languages={languages}
                        />
                        <IconVolume 
                        className="text-white"
                        size={22} 
                        onClick={() => handleAudioPlayback(targetText)}
                        />
            
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                        <IconCopy size={22} onClick={handleCopyToClipboard} className="text-white"/>
                        {copied && <span className="text-xs text-[#FFA500]">Copied!</span>}
                        <IconThumbUp size={22} className="text-white"/>
                        <IconThumbDown size={22} className="text-white"/>
                        <IconStar 
                        size={22} 
                        onClick={handleFavourite}
                        className={favourite ? "text-yellow-500" : ""}
                        />
                    </div>
                   </div>
                   </div> 
                </div>
                <SvgDecorations />
              </div>
              <CategoryLinks />
            </div>
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
}
