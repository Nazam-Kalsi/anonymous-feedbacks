"use client"
import CopyButton from '@/components/customComponents/copyButton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MessageInterface } from '@/models/message.model';
import { isAcceptingMessagesSchema } from '@/schema/acceptingMessages.schema';
import { ApiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { setLazyProp } from 'next/dist/server/api-utils';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

type Props = {}

const page = (props: Props) => {
    
    const [messages,setMessages] = useState<MessageInterface[]>([]);
    const [page,setPage] = useState<number>(1);
    const [loadMore,setLoadMore] = useState<boolean>(true);
    const [loading,setLoading] = useState<boolean>(false);
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

    const getMessages = async()=>{
        try{
            setLoading(true);
            const res = await axios.get(`/api/get-messages?page=${page}&limit=10`);
            console.log(res);
            setPage(prev =>prev+1);
            if(res.data.data.messages.length<10) setLoadMore(false);
            // setMessages(prev => prev + res.data.data.messages);
        }catch(error){
            const axiosError= error as AxiosError<ApiResponse>;
            toast({
                title:"Uh oh! Something went wrong.",
                description:`${axiosError?.response?.data}` || 'Error while fetching Messages.',
                variant:'destructive',
            })
        } finally{
            setLoading(false);
        }

    }

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
                <p className={`font-semibold text-sm ${acceptingMessage ? 'text-green-600' : 'text-red-600'}`}>{acceptingMessage?'ON':'OFF'}</p>
            </div>
            {/* copy */}
           <CopyButton url={url}/>
            {/* messages */}
            <div>
            {messages.length ? messages.map((message,index)=>{
                return(
                    <div>{index+1}. {message.message}</div>
                )
            }): <p>No messages yet!</p>}            
            {loadMore && <Button onClick={getMessages} variant='ghost'>{loading ? <Loader2/> : 'Load More'}</Button>}
            </div>
        </>
    )
}

export default page



// "use client";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import React, { useEffect, useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { MessageInterface } from "@/models/message.model";
// import { acceptMessagesSchema } from "@/schema/acceptMessage.schema";
// type Props = {};

// function page({}: Props) {
//   const [toggleStatus,setToggleStatus] = useState<string>('off');
//   const [loading,setLoading] = useState<boolean>(false);
//   const [messages,setMessages] = useState<any>([]);

//   const handleDeleteMessage = (messageId:string)=>{
//     setMessages(messages.filter((message:any)=>message._id!==messageId))
//   }
  
  

//   const form = useForm<z.infer<typeof acceptMessagesSchema>>({
//     resolver: zodResolver(acceptMessagesSchema),
//     defaultValues: {
//       acceptMessages: true,
//     },
//   });

//   const watchInput = form.watch('acceptMessages');

//   useEffect(()=>{
//     setToggleStatus((prev)=>prev=='off'?'on':'off');
//   },[watchInput])

//   function onSubmit(values: z.infer<typeof acceptMessagesSchema>) {
//     console.log(values);
//   }

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <Form {...form}>
//         <form>
//           <FormField
//             control={form.control}
//             name="acceptMessages"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-900">                   
//                     <input
//                       className="peer sr-only"
//                       type="checkbox"
//                       checked={field.value}
//                       onChange={(e) => {
//                         field.onChange(e.target.checked); 
//                         form.handleSubmit(onSubmit)();
//                       }}
//                     />
//                     <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
//                   </label>
//                 </FormControl>
//                 <FormDescription></FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>
//       <p>
//         {toggleStatus}
//       </p>
//     </div>
//   );
// }

// export default page;