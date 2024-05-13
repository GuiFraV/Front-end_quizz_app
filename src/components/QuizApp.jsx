import React, { useState, useEffect } from 'react';
import quizData from '../constants/data.json';
import {AccessibilityImg, CSSImg, HTMLImg, JavaScriptImg, JavaScriptHardImg, sunLightImg, sunDarkImg, moonLightImg, moonDarkImg} from '../utils/index.js'
import ProgressBar from './ProgressBar.jsx';

const QuizApp = ({ onToggleDarkMode }) => {

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [timer, setTimer] = useState(60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedImgSrc, setSelectedImgSrc] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const imgQuiz = [HTMLImg, CSSImg, JavaScriptImg, AccessibilityImg, JavaScriptHardImg]

  useEffect(() => {
    if (selectedQuizTitle) {
      const selectedQuiz = quizData.quizzes.find(quiz => quiz.title === selectedQuizTitle);
      setCurrentQuiz(selectedQuiz);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setTimer(60);
    }
  }, [selectedQuizTitle]);

  useEffect(() => {
    const timerId = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(timerId);
  }, [timer]);

  const handleStartQuiz = (title, imgSrc) => {
    setSelectedQuizTitle(title);
    setShowQuiz(true);
    setSelectedImgSrc(imgSrc); 
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setSelectedOption(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === currentQuiz.questions[currentQuestionIndex].answer) {
      alert("Bonne réponse!");
    } else {
      alert("Mauvaise réponse!");
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setTimer(60);
    } else {
      alert("Fin du quiz!");
      setShowQuiz(false); 
    }
  };

  const darkLightMode = (e) => {
    setIsDarkMode(!isDarkMode);
    onToggleDarkMode();
  }

  const buttonQuiz = () => {
    return quizData.quizzes.map((quiz, i) => (
      <button key={quiz.title} 
        className={`hover:border-violet duration-500 hover:border drop-shadow h-[96px] rounded-[24px] relative flex items-center ${isDarkMode ? "bg-greyNavy" : "bg-white"}`} 
        onClick={() => handleStartQuiz(quiz.title, imgQuiz[i])}
      >
        <div className='ml-[20px] h-[56px] w-[56px] flex items-center justify-center bg-[#FFF1E9] rounded-[8px]'>
          <img src={`${imgQuiz[i]}`} alt="logo"/>        
        </div>
        <p className={`ml-[32px] font-RubikMedium h-[28px] text-3xl flex items-center w-[250px] text-left ${isDarkMode ? "text-white" : "text-black"}`}>{quiz.title}</p>
      </button>
    ));
  }

  const buttonDarkLightMode = () => {
    return (
      <div className='w-[128px] h-[28px] flex items-center justify-between absolute right-0 top-[-2.875rem]'>
          <img src={`${isDarkMode ? sunLightImg : sunDarkImg}`} alt="Sunlight logo" />
            <div className='h-[28px] w-[48px] bg-violet rounded-full flex items-center relative'>
              <div className={`transition-transform duration-300 h-[20px] w-[20px] bg-white rounded-full absolute cursor-pointer left-1 ${isDarkMode ? "translate-x-full" : "translate-x-0"}`} onClick={darkLightMode}></div>
            </div>
          <img src={`${isDarkMode ? moonLightImg : moonDarkImg}`} alt="Moonlight logo" />
      </div>
    )
  }
  

  if (showQuiz && currentQuiz) {
    return (
      <div className='w-[1250px] h-[600px] flex justify-between relative'>
       {buttonDarkLightMode()}
       <div className='w-[300px] h-[56px] flex items-center absolute left-0 top-[-3.875rem]'>
        <div className='h-[56px] w-[56px] flex items-center justify-center bg-[#FFF1E9] rounded-[8px]'>
          <img src={selectedImgSrc} alt="logo"/>
        </div>
        <div className='font-RubikMedium text-darkNavy text-2xl ml-4'>{selectedQuizTitle}</div>
      </div>
      <div className='w-[565px] h-full flex flex-col justify-around'>
        <p className='font-RubikItalic text-greyNavy text-[15px]'>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
        <div className='font-RubikMedium text-Heading-M text-darkNavy'>
          {currentQuiz.questions[currentQuestionIndex].question}
        </div>
        <ProgressBar timer={timer} />
      <div>
        </div>

        
        </div>
          <div className=' w-[575px] flex flex-col items-center justify-between'>
            {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
              <button
                className={`drop-shadow h-[96px] w-full rounded-[24px] relative flex items-center ${selectedOption === option ? 'border border-violet' : ''} ${isDarkMode ? "bg-greyNavy" : "bg-white"} font-RubikMedium text-Heading-S text-darkNavy group`} 
                key={index} 
                onClick={() => handleAnswerClick(option)}>
                    <div className={` ${selectedOption !== option && 'group-hover:bg-[#F6E7FF]'} ml-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-[8px] mr-8  ${selectedOption === option ? 'bg-violet' : 'bg-[#F4F6FA]'}`}>
                      <p className={`${selectedOption !== option && 'group-hover:text-violet'} ${selectedOption === option ? 'text-white' : 'text-greyNavy'}`}>{["A","B","C","D","E"][index]}</p>        
                    </div>
                  {option}
              </button>
            ))}
            <button
              className='hover:opacity-70 hover:border drop-shadow bg-violet text-white h-[96px] w-full rounded-[24px] relative flex items-center justify-center cursor-pointer font-RubikMedium text-Heading-S' 
              onClick={handleSubmit} disabled={!selectedAnswer}>Submit Answer</button>
          </div>
      </div>
    );
  }
  

  return (
    <div className="w-[1250px] h-[600px] flex justify-between relative">
      {buttonDarkLightMode()}
      <div className="w-[625px] h-[300px] relative">
        <p className={`font-RubikRegular text-[64px] ${isDarkMode ? "text-white" : "text-darkNavy"}`}>Welcome to the</p>
        <p className={`font-RubikMedium font-bold text-[64px] ${isDarkMode ? "text-white" : "text-darkNavy"}`}>Frontend Quiz!</p>
        <p className={`font-RubikRegular text-Body-M italic absolute bottom-0 ${isDarkMode ? "text-white" : "text-greyNavy"}`}>Pick a subject to get started.</p>
      </div>
      <div className="h-full w-[575px] flex flex-col justify-between">

        {buttonQuiz()}

      </div>
    </div>
  );
};

export default QuizApp;
