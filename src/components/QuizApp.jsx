import { useState, useEffect } from 'react';
import quizData from '../constants/data.json';
import {AccessibilityImg, CSSImg, HTMLImg, JavaScriptImg, JavaScriptHardImg, sunLightImg, sunDarkImg, moonLightImg, moonDarkImg, goodImg, wrongImg} from '../utils/index.js'
import ProgressBar from './ProgressBar.jsx';

const QuizApp = ({ onToggleDarkMode }) => {

  const correctEmoji = '✅'; 
  const incorrectEmoji = '❌';

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
      alert('End of the quiz!');
      setShowQuiz(false);
    }
  };


  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert('Please select an answer');
      return;
    }
    setIsAnswerSubmitted(true);
    setIsSubmitted(true); 

    const isCorrect = selectedAnswer === currentQuiz.questions[currentQuestionIndex].answer;
    setSelectedOption({ option: selectedAnswer, isCorrect: isCorrect });
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
        </div>
        <div className='w-[575px] flex flex-col items-center justify-between'>

     {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
        <button
          className={`group drop-shadow h-[96px] w-full rounded-[24px] relative flex items-center 
            ${isAnswerSubmitted && selectedOption && selectedOption.option === option ? (selectedOption.isCorrect ? 'border-2 border-[#26D782]' : 'border-2 border-red-500') : selectedOption && selectedOption.option === option ? 'border-2 border-violet' : 'border-transparent'} 
            ${isDarkMode ? "bg-greyNavy" : "bg-white"} 
            font-RubikMedium text-Heading-S text-darkNavy 
            ${!isAnswerSubmitted ? 'hover:border-violet transition duration-500' : ''}`} 
          key={index} 
          onClick={() => handleAnswerClick(option)}
          disabled={isAnswerSubmitted}
        >
          <div className={`ml-[20px] h-[56px] w-[56px] flex items-center justify-center rounded-[8px] mr-8 relative
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
            <div>
              {selectedOption && selectedOption.isCorrect ? (
                <div>Correct! {correctEmoji}</div>
              ) : (
                <div>Incorrect! The correct answer is: {currentQuiz.questions[currentQuestionIndex].answer}</div>
              )}
              <button
                className='hover:opacity-70 hover:border drop-shadow bg-violet text-white h-[96px] w-full rounded-[24px] relative flex items-center justify-center cursor-pointer font-RubikMedium text-Heading-S' 
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
          </div>
          )}
          {!isAnswerSubmitted && (
            <button
              className='hover:opacity-70 hover:border drop-shadow bg-violet text-white h-[96px] w-full rounded-[24px] relative flex items-center justify-center cursor-pointer font-RubikMedium text-Heading-S' 
              onClick={handleSubmit} disabled={!selectedAnswer}
            >
              Submit Answer
            </button>
          )}
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
