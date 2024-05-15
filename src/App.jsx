import { useState } from 'react';
import QuizApp from './components/QuizApp';
import { Canvas } from '@react-three/fiber';
import Stars from './components/Stars';
import { Html } from '@react-three/drei';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <div className='h-screen w-screen bg-black flex justify-center items-center'>
      <Canvas className="h-screen bg-black">
        <Stars />
        <Html center>
          <div className={`flex items-center justify-center xl:w-[1445px] lg:w-11/12 h-[825px] bg-no-repeat bg-auto rounded-[36px]
                ${isDarkMode ? "bg-darkNavy" : "bg-white"} 
                ${isDarkMode ? "bg-desktop-dark" : "bg-desktop-light"}`
              }>
            <QuizApp onToggleDarkMode={toggleDarkMode}/>
          </div>
        </Html>
      </Canvas>
    </div>
  );
}
