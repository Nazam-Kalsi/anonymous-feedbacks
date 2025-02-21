'use client'
import React, { MouseEventHandler, useState } from 'react'
import { useParams } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/apiResponse';
import { useToast } from '@/hooks/use-toast';
import { messageSchema } from '@/schema/message.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { Loader2, MoveRight } from 'lucide-react';
import { TextAnimate } from '@/components/magicui/text-animate';
import { WarpBackground } from '@/components/magicui/warp-background';



const AiMessageContainer = ({ content, onClick }: { content: string; onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <Button variant='outline' className='w-full py-8' onClick={onClick}>
      {content}
    </Button>
  )
}

type Props = {}

function page({ }: Props) {
  const { toast } = useToast();
  const params = useParams();
  const { userName } = params;
  const decodedName = userName ? decodeURI(userName as string) : " ";
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestionLoading, setSuggestionLoading] = useState<boolean>(false);
  const [aiSuggestions, setAiSuggestions] = useState([
    'Is this real.',
    'Lightning could strike.',
    'What a day.'
  ]);
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ''
    }
  });

  const { handleSubmit, register, formState: { errors }, setValue, setFocus } = form;

  const setValueInTextArea = (e: any) => {
    setFocus('content');
    setValue('content', e.target.innerText);
  }

  const sendMessageToUser = async ({ content }: z.infer<typeof messageSchema>) => {
    console.log(content);
    try {
      setLoading(true);
      const dataToSend = {
        userName: decodedName,
        messageContent: content,
      }
      const res = await axios.post(`/api/send-message`, dataToSend);

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${axiosError?.response?.data.message}` || 'Error while sending messages.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false);
    }
  }

  const getAiSuggestion = async () => {
    try {
      setSuggestionLoading(true);
      const res = await axios.get(`/api/ai-suggestion`);

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Uh oh! Something went wrong.",
        description: `${axiosError?.response?.data.message}` || 'Error while getting messages.',
        variant: 'destructive',
      })
    } finally {
      setSuggestionLoading(false);
    }
  }
  return (
    <div className='mx-4'>
      <div className='min-h-[80vh] flex flex-col justify-center items-center gap-4'>
        <div className='flex flex-wrap items-center md:text-5xl text-xl'>
          <TextAnimate animation="blurInUp" by="text" once className=" font-semibold">
            Send messages
          </TextAnimate>
          &nbsp;
          <TextAnimate animation="blurInUp" by="character" once className=" font-semibold text-[#5046e6] ">
            anonmously
          </TextAnimate>
        </div>
        <WarpBackground className='space-y-1 w-8/12 mx-auto rounded-lg p-4 overflow-hidden'>
          <form onSubmit={handleSubmit(sendMessageToUser)} className="flex flex-col items-center h-full">

            <div className='w-full m-4'>
              <div className='flex flex-col gap-4 '>
                <textarea rows={8} className="dark:bg-black bg-white pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-black dark:text-white text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type your message here... " {...register('content')} />
                {errors.content && <span className='text-red-500'>{errors.content.message}</span>}
                <Button variant='outline' className='flex gap-1 items-center group self-end'>
                  {loading ? <Loader2 className='animate-spin' /> :
                    <>
                      Send
                      <MoveRight className='group-hover:translate-x-2 transition-all' />
                    </>
                  }
                </Button>
              </div>
            </div>
          </form>
        </WarpBackground>
      </div>
      <section className='my-4 flex flex-col items-center '>
        <div className='flex flex-col items-center w-8/12 space-y-4'>
        <p className='font-semibold md:text-5xl text-xl'>Get  <span className='text-[#5046e6]'>AI&nbsp;</span>suggested&nbsp;
          <span className='text-[#5046e6]'>Messages</span>
        </p>
        <div className='space-y-2 w-full'>
          {
            aiSuggestions.map((message, index) => {
              return (
                <AiMessageContainer key={index} content={message} onClick={e => setValueInTextArea(e)} />
              )
            })
          }
        </div>
        <Button className='self-end' onClick={getAiSuggestion}>{suggestionLoading ? <Loader2 className='animate-spin' /> : 'Suggest'}</Button>
        </div>
      </section>

    </div>
  )
}

export default page