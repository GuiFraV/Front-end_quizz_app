import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [timer, setTimer] = useState(60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([
    {
      questionText: "Quelle est la capitale de la France ?",
      answerOptions: ["Paris", "Lyon", "Marseille", "Bordeaux"],
      correctAnswer: "Paris",
    },
    // Ajoutez plus de questions ici
  ]);

  useEffect(() => {
    const timerId = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(timerId);
  }, [timer]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      alert("Bonne réponse!");
    } else {
      alert("Mauvaise réponse!");
    }
    // Passer à la question suivante ou terminer le quiz
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null); // Réinitialiser la réponse sélectionnée
      setTimer(60); // Réinitialiser le timer
    } else {
      alert("Fin du quiz!");
      // Vous pouvez ajouter une logique pour rediriger ou afficher les résultats ici
    }
  };

  return (
    <div>
      <div>Timer: {timer}s</div>
      <div>{questions[currentQuestionIndex].questionText}</div>
      <div>
        {questions[currentQuestionIndex].answerOptions.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerClick(answer)}>
            {answer}
          </button>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={!selectedAnswer}>Valider la réponse</button>
    </div>
  );
};

export default Quiz;