import React, { useState } from 'react';
import Quiz from './Quiz'; // Assurez-vous que le chemin d'importation est correct

const Start = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  if (showQuiz) {
    return <Quiz />;
  }

  return (
    <div className="border-black border-2 w-[1250px] h-[600px] flex">
      <div className="border-black border-2 w-[625px] h-[300px]">
        <p>Welcome to the</p>
        <p>Frontend Quiz!</p>
        <p>Pick a subject to get started.</p>
      </div>

      <div className="h-full w-[575px] border-2 border-black flex flex-col justify-between">
        <button onClick={handleStartQuiz}>HTML</button>
        <button onClick={handleStartQuiz}>CSS</button>
        <button onClick={handleStartQuiz}>Javascript</button>
        <button onClick={handleStartQuiz}>Accessibility</button>
      </div>
    </div>
  );
};

export default Start;