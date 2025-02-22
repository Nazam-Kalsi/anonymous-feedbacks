'use client'
import Loading from '@/components/customComponents/loading';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type DataProps = {
  label: string;
  value: string;
}

const DataContainer: React.FC<DataProps> = ({ label, value }) => {
  return (
    <div className="dark:bg-gray-900 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-slate-100 dark:hover:bg-white/10">
      <dt className="text-sm font-medium dark:text-gray-300 ">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
        {value}
      </dd>
    </div>
  )
}

const page = () => {
  const [userData, setUserData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  console.log(session);

  useEffect(() => {
    setUserData([
      { label: 'User ID', value: (session?.user?._id) as string },
      { label: 'User Name', value: (session?.user?.userName) as string },
      { label: 'Email', value: (session?.user?.email) as string },
      { label: 'Accepting messages', value: ((session?.user?.isAcceptingMessages) as boolean) ? 'Yes' : 'No' },
    ])
    setLoading(false);
  }, [session])

  return loading ? <Loading /> : (
    <div className='w-full h-screen'>
      <div className="flex justify-center items-center">
        <div className="bg-white dark:bg-slate-900 max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              User Informations
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
              Details and informations about user.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {
                userData.map((data, index) => {
                  return (
                    <DataContainer label={data.label} value={data.value} key={index} />
                  )
                })
              }
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page