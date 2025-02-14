import Image from 'next/image';
import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
type Props = {
  userName: string;
  color: string;
}


function UserCard({ userName, color }: Props) {
  return (
    <Link className='group border flex transition-all rounded-lg overflow-hidden gap-4 min-w-64 basis-[30%] py-4 px-2' href={`/u/${userName}`}>
      <div
        className="flex size-10 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: color,
        }}
      >
        {/* <Image src={'/@/as'}
          width={20}
          height={20}
          alt='🙋‍♂️'
          className='group-hover:scale-105 transition-all' /> */}
          <p>🙋‍♂️</p>
      </div>

      <p className='flex items-center'>{userName}
        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /></p>
    </Link>
  )
}

export default UserCard