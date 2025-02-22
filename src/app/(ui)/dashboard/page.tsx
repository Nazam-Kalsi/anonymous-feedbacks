"use client"
import AcceptMessageStatus from '@/components/customComponents/acceptMessageStatus';
import CopyButton from '@/components/customComponents/copyButton';
import MessageCard from '@/components/customComponents/messageCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { isAcceptingMessagesSchema } from '@/schema/acceptingMessages.schema';
import { ApiResponse } from '@/types/apiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Cross, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

type DeletePopupStateType={
    status:boolean;
    messageId:string | null;
};

type PopupTypes={
    setDeletePopup:React.Dispatch<React.SetStateAction<DeletePopupStateType>>;
    deleteMsg:()=>Promise<void>;
    className?:string;
    deletePopup:DeletePopupStateType;
}


const DeletePopup = ({setDeletePopup,deleteMsg,className,deletePopup} : PopupTypes)=>{

    return(
        <div className='absolute top-0 h-screen w-screen flex justify-center items-center z-[99] dark:bg-black/50 bg-white/50'>
        <div className={`flex flex-col gap-2 justify-center items-center border p-4 rounded-lg dark:bg-black bg-white ${className}`}>
            <div className='flex justify-between w-full'>
                <h2 className='font-semibold'>Delete message</h2>
               <Button onClick={()=>setDeletePopup({status:false,messageId:null})}>X</Button>
            </div>
            <p className='text-gray-400'>Are you sure you want to delete this message!</p>
            <Button variant='destructive' onClick={deleteMsg}>Delete</Button>
        </div>
        </div>
    )
}

type Props = {};
type MessageType={
    message:string;
    createdAt:string;
    messageId:string;
}
const page = (props: Props) => {
    
    const [messages,setMessages] = useState<MessageType[]>([]);
    const [page,setPage] = useState<number>(1);
    const [loadMore,setLoadMore] = useState<boolean>(true);
    const [loading,setLoading] = useState<boolean>(false);
    const [deletePopup,setDeletePopup] = useState<DeletePopupStateType>({status:false,messageId:null});
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

  const url = window.location.origin + "/u/" + session?.user.userName;

  const isAcceptingMessages = async () => {
    try {
      const res = await axios.get("/api/messages/accept-messages");
      console.log(res);
      setValue("acceptingMessages", res.data.data.isAcceptingMessages);
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request, please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleToggleMessageAcceptance = async () => {
    setValue("acceptingMessages", !acceptingMessage);
    try {
      const dataToSend = { acceptingMessagesStatus: !acceptingMessage };
      const res = await axios.post("/api/messages/accept-messages", dataToSend);
      setValue("acceptingMessages", res.data.data.acceptingMessagesStatus);
    } catch (error) {
      setValue("acceptingMessages", acceptingMessage);
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request, please try again later.",
        variant: "destructive",
      });
    }
  };

  const getMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/messages/get-messages?page=${page}&limit=10`);
      console.log("messages :", res);
      if (res.data && res.data.data) {
        setPage((prev) => prev + 1);
        setMessages((prev) => [...prev, ...res.data.data]);
        if (res.data.data.length < 10) setLoadMore(false);
      } else {
        setLoadMore(false);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          `${axiosError?.response?.data.message}` ||
          "Error while fetching Messages.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

    const handleDeleteMessage= async(messageId:string)=>{
        const prevMsg = [...messages];
        try{
            setMessages(messages.filter((message)=>message.messageId!==messageId));
            setDeletePopup((prev)=>({...prev,status:false}));
            const res = await axios.delete(`/api/messages/delete-message?msgId=${messageId}`);
            console.log(res);
          }catch(error){
            setMessages(prevMsg)
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title:"Uh oh! Something went wrong.",
                description:`${axiosError?.response?.data.message}` || 'Error while deleting Message.',
                variant:'destructive',
            })
        }
    }

  useEffect(() => {
    isAcceptingMessages();
    getMessages();
  }, []);
  return (
    <div className="overflow-hidden">
    <div className="space-y-4 mx-4 md:mt-8 ">
      <h2 className="text-xl uppercase font-bold">User Dashboard</h2>
      <CopyButton url={url} />
      <div className="flex items-center justify-start gap-4">
        <p className="text-gray-400">Toggle message recieving status</p>
        <AcceptMessageStatus
          register={register}
          acceptingMessage={acceptingMessage}
          handleToggleMessageAcceptance={handleToggleMessageAcceptance}
        />
      </div>
      {/* messages */}
      <div className="flex flex-col justify-center items-center flex-wrap gap-4">
        <p className="text-lg font-bold uppercase text-center">Recieved Messages</p>
        <div className="flex flex-wrap gap-4 justify-around  w-full">
          {messages.length ? (
            messages?.map((message, index) => {
              return (
                <MessageCard message={message.message} createdAt={message.createdAt} key={index} onClick={()=>setDeletePopup({status:true,messageId:message.messageId})} />
              );
            })
          ) : (
            <p>No messages yet!</p>
          )}
        </div>
        {loadMore && (
          <Button
            onClick={getMessages}
            className="fixed bottom-12 right-12"
            variant="ghost"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Load More"}
          </Button>
        )}
      </div>
      </div>
      {deletePopup.status &&
      <DeletePopup deletePopup={deletePopup} setDeletePopup={setDeletePopup} deleteMsg={()=>handleDeleteMessage(deletePopup.messageId as string)}/>
      }
    </div>
  );
};

export default page;

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
