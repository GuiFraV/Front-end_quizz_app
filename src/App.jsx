import { accessibilityImg } from "./utils"

export default function App() {
  return (

    <div>
      <h1 className="font-RubikItalic text-Display">
        Hello world!
      </h1>
  
      <img src={accessibilityImg} alt="bag" width={18} height={18} />
    </div>

  )
}