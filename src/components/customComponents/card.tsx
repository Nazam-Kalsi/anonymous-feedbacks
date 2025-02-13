import React from 'react'

type Props = {
    heading?:string;
    description?:string;
    logo?:any;
}

const Card = ({heading='heading',description='des',logo='logo'}: Props) => {
  return (
    <div className='flex flex-col border justify-center items-start gap-4 group rounded-lg px-4 py-2'>
        <div className='group-hover:scale-[1.2]'>
        {logo}
        </div>
        <div className='space-y-2'>
            <p className='font-semibold group-hover:text-violet-600'>{heading}</p>
            <p className='text-sm group-hover:text-violet-600'>{description}</p>
        </div>
    </div>
  )
}

export default Card