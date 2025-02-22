"use client"
import Loading from '@/components/customComponents/loading';
import UserCard from '@/components/customComponents/userCard';
import { useToast } from '@/hooks/use-toast';
import { ApiResponse } from '@/types/apiResponse';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { colors } from '@/data/msgData';
import { Button } from '@/components/ui/button';

type Props = {}
type UsersType = {
  userName: string;
  _id: string;
}
function page({ }: Props) {
  const [page, setPage] = useState<number>(1);
  const [loadMore, setLoadMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersType[]>([]);
  const { toast } = useToast();

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/user/get-all-users/?page=${page}&limit=10`);
      const avaliableUsers = users;
      setUsers([...avaliableUsers, ...(res?.data?.data)]);
      if (res.data?.data?.length < 10) setLoadMore(false);
      setPage(prev => prev + 1);

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${axiosError?.response?.data.message}` || 'Error while fetching Users.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setUsers([]);
    setPage(1);
    getAllUsers();
  }, [])
  console.log(users)
  return loading?<Loading/>:(
    <section className='mt-6 p-4 min-h-[80vh]'>

    <p className='font-bold uppercase leading-none pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-700/80 to-black bg-clip-text text-center text-transparent dark:from-white/50 dark:to-slate-900/10 text-6xl mb-2'>Users</p>
      <div className='flex justify-center items-center flex-wrap gap-2'>
        {users && users.map((user) => {
          return (
            <UserCard userName={user.userName} key={user._id} color={colors[Math.floor(Math.random() * colors.length)]} />
          )
        })
      }
      </div>
      {loadMore &&
        <Button  onClick={getAllUsers} className='fixed bottom-12 right-12'>{loading ? <Loader2/> : 'Load More'}</Button>
      
      }
    </section>
  )
}

export default page