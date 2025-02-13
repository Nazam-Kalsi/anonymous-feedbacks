import React from 'react'

type Props = {
    heading?:string;
    description?:string;
    logo?:any;
}

const Card = ({heading='heading',description='des',logo='logo'}: Props) => {
  return (
    <div className='flex flex-col border justify-center items-start gap-4 group rounded-lg px-4 py-2 md:basis-[30%]'>
        <div className=''>
        {logo}
        </div>
        <div className='space-y-1'>
            <p className='font-semibold text-lg group-hover:text-violet-700 transition-all'>{heading}</p>
            <p className='text-gray-400 text-sm group-hover:text-violet-500 transition-all'>{description}</p>
        </div>
    </div>
  )
}

export default Card