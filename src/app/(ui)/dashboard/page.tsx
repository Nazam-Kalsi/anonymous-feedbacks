"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageInterface } from "@/models/message.model";
import { acceptMessagesSchema } from "@/schema/acceptMessage.schema";
type Props = {};

function page({}: Props) {
  const [toggleStatus,setToggleStatus] = useState<string>('off');
  const [loading,setLoading] = useState<boolean>(false);
  const [messages,setMessages] = useState<any>([]);

  const handleDeleteMessage = (messageId:string)=>{
    setMessages(messages.filter((message:any)=>message._id!==messageId))
  }
  
  

  const form = useForm<z.infer<typeof acceptMessagesSchema>>({
    resolver: zodResolver(acceptMessagesSchema),
    defaultValues: {
      acceptMessages: true,
    },
  });

  const watchInput = form.watch('acceptMessages');

  useEffect(()=>{
    setToggleStatus((prev)=>prev=='off'?'on':'off');
  },[watchInput])

  function onSubmit(values: z.infer<typeof acceptMessagesSchema>) {
    console.log(values);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="acceptMessages"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-900">                   
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked); 
                        form.handleSubmit(onSubmit)();
                      }}
                    />
                    <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
                  </label>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <p>
        {toggleStatus}
      </p>
    </div>
  );
}

export default page;
