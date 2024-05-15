import { useState, useEffect } from 'react';
import quizData from '../constants/data.json';
import {AccessibilityImg, CSSImg, HTMLImg, JavaScriptImg, JavaScriptHardImg, sunLightImg, sunDarkImg, moonLightImg, moonDarkImg, goodImg, wrongImg} from '../utils/index.js'
import ProgressBar from './ProgressBar.jsx';
import ScoreDisplay from './ScoreDisplay.jsx';
import { useMediaQuery } from 'react-responsive';

const QuizApp = ({ onToggleDarkMode }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 374px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 375px) and (max-width: 768px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [timer, setTimer] = useState(60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedImgSrc, setSelectedImgSrc] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);


  const imgQuiz = [HTMLImg, CSSImg, JavaScriptImg, AccessibilityImg, JavaScriptHardImg]

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (selectedQuizTitle) {
      const selectedQuiz = quizData.quizzes.find(quiz => quiz.title === selectedQuizTitle);
      selectedQuiz.questions = shuffleArray(selectedQuiz.questions);
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

  const handleAnswerClick = (option) => {
    const isCorrect = option === currentQuiz.questions[currentQuestionIndex].answer;
    setSelectedAnswer(option);
    setSelectedOption({ option, isCorrect });
    setIsSubmitted(true); 
  };


  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setIsSubmitted(false);
      setTimer(60);
    } else {
      setShowQuiz(false);
      setShowScore(true);
    }
  };


  const handleSubmit = () => {
    if (!selectedAnswer) {
      setAlertMessage('Please select an answer');
      return;
    }
    setIsAnswerSubmitted(true);
    setIsSubmitted(true); 
    setAlertMessage('');

    const isCorrect = selectedAnswer === currentQuiz.questions[currentQuestionIndex].answer;
    setSelectedOption({ option: selectedAnswer, isCorrect: isCorrect });

    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleRestartQuiz = () => {
    setShowQuiz(false);
    setShowScore(false);
    setSelectedQuizTitle(null);
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsAnswerSubmitted(false);
    setAlertMessage('');
    setScore(0);
    setTimer(60);
  };

  const darkLightMode = (e) => {
    setIsDarkMode(!isDarkMode);
    onToggleDarkMode();
  }

  const buttonQuiz = () => {
    return quizData.quizzes.map((quiz, i) => (
      <button key={quiz.title} 
        className={`hover:border-violet duration-500 hover:border drop-shadow rounded-[24px] relative flex items-center ${isDarkMode ? "bg-greyNavy" : "bg-white"} ${isTablet ? "h-[80px] mb-4" : "h-[96px]"}`} 
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
      <div className={`h-[600px] flex justify-between relative ${isTablet ? "w-[700px] flex-col items-center" : "w-[1250px]"} `}>
        {buttonDarkLightMode()}
        <div className='w-[300px] h-[56px] flex items-center absolute left-0 top-[-3.875rem]'>
          <div className={`h-[56px] w-[56px] flex items-center justify-center bg-[#FFF1E9] rounded-[8px] ${isTablet ? "ml-16" : ""}`}>
            <img src={selectedImgSrc} alt="logo"/>
          </div>
          <div className={`font-RubikMedium ${isDarkMode ? "text-white" : "text-darkNavy"} text-2xl ml-4`}>{selectedQuizTitle}</div>
        </div>
        <div className='w-[565px] h-full flex flex-col justify-around'>
          <p className={`font-RubikItalic ${isDarkMode ? "text-[#ABC1E1]" : "text-greyNavy "} ${isTablet ? "text-[12px]" : "text-[15px]"}`}>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
          <div className={`font-RubikMedium ${isDarkMode ? "text-white" : "text-darkNavy"} ${isTablet ? "text-[20px]" : "text-Heading-M"}`}>
            {currentQuiz.questions[currentQuestionIndex].question}
          </div>
          <ProgressBar timer={timer} />
        </div>
        <div className='w-[575px] flex flex-col items-center justify-between'>

        {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
          <button
            className={`group drop-shadow w-full rounded-[24px] relative flex items-center text-left
              ${isAnswerSubmitted && selectedOption && selectedOption.option === option ? (selectedOption.isCorrect ? 'border-2 border-[#26D782]' : 'border-2 border-red-500') : selectedOption && selectedOption.option === option ? 'border-2 border-violet' : 'border-transparent'} 
              ${isDarkMode ? "bg-greyNavy text-white" : "bg-white text-darkNavy"} 
              font-RubikMedium 
              ${!isAnswerSubmitted ? 'hover:border-violet transition duration-500' : ''}
              ${isTablet ? "h-[80px] text-[20px] mb-4" : "h-[96px] text-Heading-S"}
              `} 
            key={index} 
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswerSubmitted}
          >
            <div className={`ml-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-[8px] mr-6 relative 
              ${isAnswerSubmitted && selectedOption && selectedOption.option === option ? (selectedOption.isCorrect ? 'bg-[#26D782]' : 'bg-red-500') : selectedOption && selectedOption.option === option ? 'bg-violet' : 'bg-[#F4F6FA]'} 
              ${!isAnswerSubmitted ? 'group-hover:bg-violetLight transition duration-500' : ''}`}>
              <p className={`${isAnswerSubmitted && selectedOption && selectedOption.option === option ? 'text-white' : selectedOption && selectedOption.option === option ? 'text-white' : 'text-greyNavy'} 
                ${!isAnswerSubmitted ? 'group-hover:text-violet transition duration-500' : ''}`}>
                {["A","B","C","D","E"][index]}
              </p>
            </div>
            {option}
            {isAnswerSubmitted && selectedOption && selectedOption.option === option && (
              <img className="absolute right-2" src={selectedOption.isCorrect ? goodImg : wrongImg} alt={selectedOption.isCorrect ? "Correct" : "Incorrect"} />
            )}
            {isAnswerSubmitted && !selectedOption.isCorrect && currentQuiz.questions[currentQuestionIndex].answer === option && (
              <img className="absolute right-2" src={goodImg} alt="Correct" />
            )}
          </button>
        ))}
        {isAnswerSubmitted && (
          <div className='w-full'>
            <button
              className={`hover:opacity-70 drop-shadow bg-violet text-white w-full rounded-[24px] relative flex items-center justify-center cursor-pointer font-RubikMedium text-Heading-S ${isTablet ? "h-[80px]" : "h-[96px]"}`}               onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        )}
        {!isAnswerSubmitted && (
          <div className='w-full relative'>
              {alertMessage && 
                <div className="text-red-500 mb-4 absolute bottom-[-70px] left-1/3 font-RubikRegular font-bold flex items-center">
                  <img src={wrongImg} />
                  {alertMessage}
                </div>}
            <button
              className={`hover:opacity-70 drop-shadow bg-violet text-white w-full rounded-[24px] relative flex items-center justify-center cursor-pointer font-RubikMedium text-Heading-S ${isTablet ? "h-[80px]" : "h-[96px]"}`} 
              onClick={handleSubmit}
            >
              Submit Answer
            </button>
          </div>
        )}          
        </div>
      </div>
    );
  }

  if (showScore) {
    return (

      <div className={`h-[600px] flex justify-between relative ${isTablet ? "w-[700px] flex-col items-center" : "w-[1250px]"}`}>
        {buttonDarkLightMode()}
        <div className='w-[300px] h-[56px] flex items-center absolute left-0 top-[-3.875rem]'>
          <div className={`h-[56px] w-[56px] flex items-center justify-center bg-[#FFF1E9] rounded-[8px] ${isTablet ? "ml-16" : ""}`}>
            <img src={selectedImgSrc} alt="logo"/>
          </div>
          <div className={`font-RubikMedium ${isDarkMode ? "text-white" : "text-darkNavy"} text-2xl ml-4`}>{selectedQuizTitle}</div>
        </div>

          <div className={`w-[625px] h-[300px] relative ${isTablet ? "ml-16" : ""}`}>
            <p className={`font-RubikRegular ${isDarkMode ? "text-white" : "text-darkNavy"} ${isTablet ? "text-[50px]" : "text-[64px] "}`}>Quizz Completed</p>
            <p className={`font-RubikMedium font-bold ${isDarkMode ? "text-white" : "text-darkNavy"} ${isTablet ? "text-[50px]" : "text-[64px] "}`}>You Scored ...</p>
          </div>



        <div className={`w-[575px] h-[388px] flex flex-col items-center justify-between drop-shadow  ${isDarkMode ? "bg-[#3B4D66]" : "bg-white"} rounded-[24px] relative ${isTablet ? "mb-12" : ""}`}>
          
            <div className='w-[300px] h-[56px] flex items-center justify-center mt-8'>
              <div className='h-[56px] w-[56px] flex items-center justify-center bg-[#FFF1E9] rounded-[8px]'>
                <img src={selectedImgSrc} alt="logo"/>
              </div>
              <div className={`font-RubikMedium ${isDarkMode ? "text-white" : "text-darkNavy"} text-2xl ml-4`}>
                {selectedQuizTitle}
              </div>
            </div>
          
            <ScoreDisplay score={score} totalQuestions={currentQuiz.questions.length} isDarkMode={isDarkMode} isTablet={isTablet} />

            <button
              className={`hover:opacity-70 hover:border drop-shadow bg-violet text-white w-full rounded-[24px] relative flex items-center justify-center cursor-pointer font-RubikMedium text-Heading-S  ${isTablet ? "bottom-[-110px] h-[80px]" : "bottom-[-200px] h-[96px]"}` }
              onClick={handleRestartQuiz}
            >
              Play Again
            </button>
        </div>
      </div> 
      )
  }

  return (
    <div className={`w-[1250px] h-[600px] flex justify-between relative ${isTablet ? "w-[700px] flex-col items-center" : "w-[1250px]"}`}>
      {buttonDarkLightMode()}
      <div className={`w-[625px] h-[300px] relative ${isTablet ? "pl-8" : ""} `}>
        <p className={`font-RubikRegular ${isDarkMode ? "text-white" : "text-darkNavy"} ${isTablet ? "text-[52px]" : "text-[64px]"} `}>Welcome to the</p>
        <p className={`font-RubikMedium font-bold ${isDarkMode ? "text-white" : "text-darkNavy"} ${isTablet ? "text-[52px] mb-4" : "text-[64px]"}  `}>Frontend Quiz!</p>
        <p className={`font-RubikRegular text-Body-M italic absolute bottom-0 ${isDarkMode ? "text-white" : "text-greyNavy"} ${isTablet ? "mb-2" : ""}`}>Pick a subject to get started.</p>
      </div>
      <div className="h-full w-[575px] flex flex-col justify-between">

        {buttonQuiz()}

      </div>
    </div>
  );
};

export default QuizApp;
