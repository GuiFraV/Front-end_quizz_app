const QuizzButton = ({logo, name}) => {
    return (
        <button>
            <img src={logo} />
            <span>{name}</span>
        </button>
    )
}

export default QuizzButton