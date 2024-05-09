import React, { useState } from 'react';
import QuizApp from './components/QuizApp';
import { bgDesktopLightImg, bgDesktopDarkImg } from "./utils";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex items-center justify-center w-[1445px] h-[825px] border-2 ${isDarkMode ? "bg-darkNavy" : "bg-white"}`}
         style={{ backgroundImage: `url(${isDarkMode ? bgDesktopDarkImg : bgDesktopLightImg})` }}> 
        <QuizApp onToggleDarkMode={toggleDarkMode}/>
    </div>
  );
}
