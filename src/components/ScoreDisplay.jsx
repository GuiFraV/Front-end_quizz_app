const ScoreDisplay = ({ score, totalQuestions, isDarkMode, isMobile }) => {
  return (
    <div className={`flex flex-col justify-center items-center h-[196px] ${isMobile ? "w-[300px]" : "w-[458px]"}`}>
      <p className={`text-[144px] ${isDarkMode ? "text-white" : "text-darkNavy"} font-bold`}>{score}</p>
      <p className={`font-RubikRegular text-[24px] ${isDarkMode ? "text-white" : "text-darkNavy"}`}>out of {totalQuestions}</p>
    </div>
  );
};

export default ScoreDisplay;