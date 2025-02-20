import React from 'react'

type Props = {
    register:any;
    acceptingMessage:boolean;
    handleToggleMessageAcceptance:()=>void;
}

const AcceptMessageStatus = ({register,acceptingMessage,handleToggleMessageAcceptance}: Props) => {
  return (
    <div className='flex justify-center items-center gap-2'>
    <label
        className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-500"
    >
        <input className="peer sr-only" type="checkbox" 
        {...register('acceptingMessages')}
        checked={acceptingMessage}
        onChange={handleToggleMessageAcceptance}
        />
        <span
            className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-red-700 transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
        ></span>
    </label>
    <p className={`font-semibold text-sm ${acceptingMessage ? 'text-green-600' : 'text-red-600'}`}>{acceptingMessage?'ON':'OFF'}</p>
</div>
  )
}

export default AcceptMessageStatus