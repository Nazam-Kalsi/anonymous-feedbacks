import React from 'react'

type Props = {
  className?:string;
}

const Loading = ({className} : Props) => {
  return (
    <div className={`w-full h-full flex justify-center items-center absolute dark:bg-black/90 bg-white/90 z-50 ${className}`}>
<div className="flex flex-row gap-2">
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
  <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
</div>  
    </div>
)
}

export default Loading;