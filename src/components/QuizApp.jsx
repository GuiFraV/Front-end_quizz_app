import React, { useState, useEffect } from 'react';
import quizData from '../constants/data.json';

const QuizApp = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [timer, setTimer] = useState(60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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
      setShowQuiz(false); // Optionnel: retourner à l'écran de sélection
    }
  };

  if (showQuiz && currentQuiz) {
    return (
      <div>
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
    <div className="border-black border-2 w-[1250px] h-[600px] flex">
      <div className="border-black border-2 w-[625px] h-[300px]">
        <p>Welcome to the</p>
        <p>Frontend Quiz!</p>
        <p>Pick a subject to get started.</p>
      </div>
      <div className="h-full w-[575px] border-2 border-black flex flex-col justify-between">
        <button onClick={() => handleStartQuiz('HTML')}>HTML</button>
        <button onClick={() => handleStartQuiz('CSS')}>CSS</button>
        <button onClick={() => handleStartQuiz('JavaScript')}>JavaScript</button>
        <button onClick={() => handleStartQuiz('Accessibility')}>Accessibility</button>
      </div>
    </div>
  );
};

export default QuizApp;
