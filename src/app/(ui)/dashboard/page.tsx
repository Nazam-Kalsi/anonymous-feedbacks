"use client"
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MessageInterface } from '@/models/message.model';
import { isAcceptingMessagesSchema } from '@/schema/acceptingMessages.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { CheckCheck, Clipboard } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

type Props = {}

const page = (props: Props) => {
    const [messagesAcceptingStatus, setMessagesAcceptingStatus] = useState<string>();
    const [copy, setCopy] = useState<boolean>(false);
    const [messages,setMessages] = useState<MessageInterface[]>([]);
    const {toast} = useToast(); 
    const form = useForm({
        resolver: zodResolver(isAcceptingMessagesSchema),
        defaultValues: {
            acceptingMessages: false,
        },
    });
    const { watch, register,setValue } = form;
    const acceptingMessage = watch('acceptingMessages');

    const {data:session} = useSession();



    const url = '1234567890'

    const copyText = () => {
        navigator.clipboard.writeText(url);
        setCopy(true);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCopy(false);
        }, 3000)
        return () => clearTimeout(timeoutId);

    }, [copy])

    const isAcceptingMessages = async ()=>{
        try {
            const res = await axios.get('/api/accept-messages');
            console.log(res);
            setValue('acceptingMessages',res.data.data.isAcceptingMessages);
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request, please try again later.",
                variant:'destructive'
            })
        }
    }

    const handleToggleMessageAcceptance = async () => {
            setValue('acceptingMessages',!acceptingMessage);
        try {
            const dataToSend = {acceptingMessagesStatus:!acceptingMessage}
            const res = await axios.post('/api/accept-messages',dataToSend);
            setValue('acceptingMessages',res.data.data.acceptingMessagesStatus);
        } catch (error) {
            setValue('acceptingMessages',acceptingMessage);
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request, please try again later.",
                variant:'destructive'
            })
        }
    }


     useEffect(() => {
        setMessagesAcceptingStatus(acceptingMessage ? "ON" : "OFF")
    }, [acceptingMessage])

    useEffect(()=>{
        isAcceptingMessages();
    },[])

    return (
        <>
            <div className='flex justify-center items-center border gap-2'>
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
                <p className={`font-semibold text-sm ${acceptingMessage ? 'text-green-600' : 'text-red-600'}`}>{messagesAcceptingStatus}</p>
            </div>
            {/* copy */}
            <div className='flex justify-around items-center'>
                <p>{url}</p>

                <div className="flex items-center justify-center p-2 cursor-pointer rounded-md font-medium relative z-[9999999999] data-[tooltip]:after:content-[attr(data-tooltip)] data-[tooltip]:after:mt-2 data-[tooltip]:after:text-sm data-[tooltip]:after:invisible data-[tooltip]:after:scale-50 data-[tooltip]:after:origin-top data-[tooltip]:after:opacity-0 hover:data-[tooltip]:after:visible hover:data-[tooltip]:after:opacity-100 hover:data-[tooltip]:after:scale-100 data-[tooltip]:after:transition-all data-[tooltip]:after:absolute data-[tooltip]:after:bg-white data-[tooltip]:after:top-[-35px] data-[tooltip]:after:left-1/2 data-[tooltip]:after:-translate-x-1/2 data-[tooltip]:after:-z-[1] data-[tooltip]:after:px-2.5 data-[tooltip]:after:py-1 data-[tooltip]:after:min-h-fit data-[tooltip]:after:min-w-fit data-[tooltip]:after:rounded-md data-[tooltip]:after:drop-shadow data-[tooltip]:before:mt-2 data-[tooltip]:before:drop-shadow data-[tooltip]:after:text-center data-[tooltip]:after:text-zinc-800 data-[tooltip]:after:whitespace-nowrap data-[tooltip]:after:text-[10px] data-[tooltip]:before:invisible data-[tooltip]:before:opacity-0 hover:data-[tooltip]:before:visible hover:data-[tooltip]:before:opacity-100 data-[tooltip]:before:transition-all data-[tooltip]:before:bg-white data-[tooltip]:before:[clip-path:polygon(50%_0,0_100%,100%_100%)] data-[tooltip]:before:absolute data-[tooltip]:before:top-full data-[tooltip]:before:left-1/2 data-[tooltip]:before:-translate-x-1/2 data-[tooltip]:before:z-0 data-[tooltip]:before:w-3 data-[tooltip]:before:h-[4px]"
                    data-tooltip={!copy ? 'Copy' : 'Copied'}
                >
                    <Button variant='outline' onClick={copyText} className="relative">
                        {copy ? <CheckCheck /> : <Clipboard />}
                    </Button>
                </div>
            </div>
            {/* messages */}
            <div>
            {messages.length ? messages.map((message,index)=>{
                return(
                    <div>{index+1}. {message.message}</div>
                )
            })
            : <p>No messages yet!</p>
        }
            </div>

        </>
    )
}

export default page


