const Start = () => {
  return (
    <div className="border-black border-2 w-[1250px] h-[600px] flex">
      <div className="border-black border-2 w-[625px] h-[300px]">
        <p>Welcome to the</p>
        <p>Frontend Quiz!</p>
        <p>Pick a subject to get started.</p>
      </div>

      <div className="h-full w-[575px] border-2 border-black flex flex-col justify-between">
        <button>HTML</button>
        <button>CSS</button>
        <button>Javascript</button>
        <button>Accessibility</button>
      </div>

    </div>
  )
}

export default Start