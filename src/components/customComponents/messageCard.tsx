import React from 'react'

type Props = {
    message:string;
    createdAt:string;
}

const MessageCard = ({message, createdAt}: Props) => {

  

  return (
<div className="flex flex-col gap-2 z-50 md:basis-[30%]">
  <div
    className="succsess-alert cursor-default flex items-center justify-between w-full p-2 text-justify rounded-lg dark:bg-[#232531] bg-white border dark:border-none px-[10px]"
  >
    <div className="flex gap-2">
    
      <div className='space-y-2'>
        <p className="dark:text-white text-black text-sm">{message}</p>
        <p className="text-gray-500 text-xs">{new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>
    <button
      className="text-gray-600 dark:hover:bg-white/5 hover:bg-black/5 p-1 rounded-md transition-colors ease-linear"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </div>
</div>

  )
}

export default MessageCard