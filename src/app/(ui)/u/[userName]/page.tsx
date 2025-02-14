'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/apiResponse';
import { useToast } from '@/hooks/use-toast';
import { messageSchema } from '@/schema/message.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { SendHorizontal } from 'lucide-react';
type Props = {}

function page({ }: Props) {
  const { toast } = useToast();
  const params = useParams();
  const { userName } = params;
  const decodedName = userName ? decodeURI(userName as string) : " ";
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ''
    }
  });

  const { handleSubmit, register } = form;




  const sendMessageToUser = async ({ content }: z.infer<typeof messageSchema>) => {
    console.log(content);
    try{
      setLoading(true);
      const dataToSend = {
        userName:decodedName,
        messageContent:content,
      }
      const res = await axios.post(`/api/send-message`,dataToSend);

    }catch(error){
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${axiosError?.response?.data.message}` || 'Error while sending messages.',
        variant: 'destructive',
      })
    }finally{
      setLoading(false);
    }
  }
  return (
    <div>{decodedName}
      <div>
        <form onSubmit={handleSubmit(sendMessageToUser)}>
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <input type="text" className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-black dark:text-white text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="" {...register('content')}/>
              <button className="absolute w-5 h-5 top-2 right-2.5"><SendHorizontal /></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page