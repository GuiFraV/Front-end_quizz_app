import React, { useState, useEffect } from 'react';
import quizData from '../constants/data.json';
import {AccessibilityImg, CSSImg, HTMLImg, JavaScriptImg, JavaScriptHardImg, sunLightImg, sunDarkImg, moonLightImg, moonDarkImg} from '../utils/index.js'

const QuizApp = ({ onToggleDarkMode }) => {

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [timer, setTimer] = useState(60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [quizLogo, setQuizLogo] = useState(null);

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

  const handleStartQuiz = (title) => {
    setSelectedQuizTitle(title);
    setShowQuiz(true);
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
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

  const setLogoQuizz = (e) => {
    const imgSrc = e.target.src;
    console.log(imgSrc)
    const imgName = imgSrc.split('/').pop(); 
    setQuizLogo(imgName);
  }

  const buttonQuiz = () => {
    return quizData.quizzes.map((quiz, i) => (
      <button key={quiz.title} className={`hover:border-violet duration-500 hover:border drop-shadow h-[96px] rounded-[24px] relative flex items-center ${isDarkMode ? "bg-greyNavy" : "bg-white"}`} onClick={() => handleStartQuiz(quiz.title)}>
        <div className='ml-[20px] h-[56px] w-[56px] flex flex items-center justify-center bg-[#FFF1E9] rounded-[8px]'>
          <img src={`${imgQuiz[i]}`} onClick={(e) => {e.stopPropagation(); setLogoQuizz(imgQuiz[i])}} alt="logo"/>        
        </div>
        <p className={`ml-[32px] font-RubikMedium h-[28px] text-3xl flex items-center w-[250px] text-left ${isDarkMode ? "text-white" : "text-black"}`}>{quiz.title}</p>
      </button>
    ));
  }

  if (showQuiz && currentQuiz) {
    return (
      <div className='w-[1160px] h-[705px] border border-black'>
       <div className='w-[253px] h-[56px] border border-black'>
        <img src={`${quizLogo}`} alt="logo"/>
        <div>Nom de l'image: {quizLogo}</div>
      </div>
        <div>Timer: {timer}s</div>
        <div>{currentQuiz.questions[currentQuestionIndex].question}</div>
        <div>
          {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerClick(option)}>
              {option}
            </button>
          ))}
        </div>
        <button onClick={handleSubmit} disabled={!selectedAnswer}>Valider la réponse</button>
      </div>
    );
  }

  return (
    <div className="w-[1250px] h-[600px] flex justify-between relative">
      <div className='w-[128px] h-[28px] flex items-center justify-between absolute right-0 top-[-2.875rem]'>
          <img src={`${isDarkMode ? sunLightImg : sunDarkImg}`} alt="Sunlight logo" />
            <div className='h-[28px] w-[48px] bg-violet rounded-full flex items-center relative'>
              <div className={`transition-transform duration-300 h-[20px] w-[20px] bg-white rounded-full absolute cursor-pointer left-1 ${isDarkMode ? "translate-x-full" : "translate-x-0"}`} onClick={darkLightMode}></div>
            </div>
          <img src={`${isDarkMode ? moonLightImg : moonDarkImg}`} alt="Moonlight logo" />
        </div>
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
