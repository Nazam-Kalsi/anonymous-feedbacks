"use client"
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { passwordSchema } from '@/schema/newPassword.schema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/apiResponse'

type Props = {}

const page = (props: Props) => {
const {toast} =useToast();
  const [newPasswordVisibility, setNewPasswordVisibility] = useState<boolean>(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState<boolean>(false);
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const showNewPassword = (e:any) => {
    e.preventDefault();
    setNewPasswordVisibility(!newPasswordVisibility);
  }
  const showConfirmPassword = (e:any) => {
    e.preventDefault();
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  }

  const { handleSubmit } = form;

const submit=async(values: z.infer<typeof passwordSchema>)=> {
    console.log(values)
    if(values.newPassword !== values.confirmPassword){
      toast({
        title:'Password mismatch',
        description:"Please check you password amd try again."
      });
      return;
    }
    try {
      const res = await axios.patch('/api/auth/change-password',{password:values.newPassword});
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title:"Uh oh! Something went wrong.",
        description:axiosError.response?.data.message || "Error in changing password, try again later."
      })
    }
  }

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 min-h-[60vh]">
        <div className="w-full p-6 bg-transparent rounded-lg shadow  md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="text-center mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white hover:underline cursor-default">
            Set new Password
          </h2>
          <Form {...form} >
            <form onSubmit={handleSubmit(submit)} className='space-y-4'>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input type={newPasswordVisibility ? 'text' : 'password'} {...field} />
                        <button onClick={(e) => showNewPassword(e)}
                          className='absolute right-2 top-2'>
                          {!newPasswordVisibility ? <Eye strokeWidth={0.5} /> : <EyeOff strokeWidth={0.5} />
                          }
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input type={confirmPasswordVisibility ? 'text' : 'password'} {...field} />
                        <button onClick={(e) => showConfirmPassword(e)}
                          className='absolute right-2 top-2'>
                          {!confirmPasswordVisibility ? <Eye strokeWidth={0.5} /> : <EyeOff strokeWidth={0.5} />
                          }
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full ">Reset passwod</Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default page