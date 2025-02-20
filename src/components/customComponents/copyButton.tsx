import React, {useState, useEffect} from 'react'
import { CheckCheck, Clipboard } from 'lucide-react';
import { Button } from '../ui/button';

type Props = {
    url:string;
}

function CopyButton({url}: Props) {
    const [copy, setCopy] = useState<boolean>(false);
    
    const copyText = () => {
        navigator.clipboard.writeText(url);
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 3000)
    }

  return (
    <div className='flex justify-around items-center px-4 border rounded-md p-4 flex-wrap'>
        <div className='flex flex-col grow'>
    <p className='text-gray-400 text-xs'>Share your unique url and recieve message</p>
    <p className='grow py-2 text-wrap'>{url}</p>
        </div>
    <div className="flex items-center justify-center p-2 cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[-35px] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:absolute data-[tooltip]:before:[clip-path:polygon(100%_0,0_0,50%_100%)] data-[tooltip]:before:top-[-8px] data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
        data-tooltip={!copy ? 'Copy' : 'Copied'}
    >
        <Button variant='outline' onClick={copyText}>
            {copy ? <CheckCheck /> : <Clipboard />}
        </Button>
    </div>
</div>
  )
}

export default CopyButton