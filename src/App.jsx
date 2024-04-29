import Start from './components/Start';

import { bgDesktopLightImg } from "./utils"

export default function App() {
  return (

    <div className="flex items-center justify-center w-[1445px] h-[825px] border-2" style={{ backgroundImage: `url(${bgDesktopLightImg})` }}> 
         <Start/>
    </div>
  )
}