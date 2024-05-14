const ScoreDisplay = ({ score, totalQuestions }) => {
  return (
    <div className="flex flex-col justify-center items-center w-[458px] h-[196px]">
      <p className="text-[144px] text-darkNavy font-bold">{score}</p>
      <p className="font-RubikRegular text-[24px] text-greyNavy">out of {totalQuestions}</p>
    </div>
  );
};

export default ScoreDisplay;