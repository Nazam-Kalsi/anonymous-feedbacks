"use client"
import React, { useEffect } from 'react'
import { ThemeProvider } from '@/components/toggleTheme'
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signInSchema } from "@/schema/signIn.schema"
import Link from "next/link"
import { DotPattern } from "@/components/ui/dot-pattern";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { signIn, getSession } from 'next-auth/react'

type Props = {}

const page = (props: Props) => {
  
  useEffect(() => {
    ; (async () => {
      const session = await getSession();
      console.log(session);
    })();
  }, [])

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const ShowPassword = (e: any) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  }
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userName: "nzm",
      password: "nnzzmm",
    },
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);
    try {
      const userSignIn = await signIn('credentials', {
        userName: values.userName,
        password: values.password,
        redirect: false,
      });

      if (userSignIn) console.log("user : ", userSignIn);
      else {
        return;
      }
    }
    catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className='flex flex-col'>
        <ThemeProvider className="self-end" />
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Anonymous Feedback
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <DotPattern

              className={"[mask-image:radial-gradient(550px_circle_at_top_right,white,transparent)]"}
            />
            <div className="w-full max-w-xs">
              <div>

                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                      Enter your credentials below to login to your account
                    </p>
                  </div>
                </div>
                <Form {...form}>
                  <form className={cn("flex flex-col gap-2 mb-4")} onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username / email</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormDescription>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <Link className="text-xs text-gray-400" href='#'>Forget password ?</Link>
                          </div>
                          <FormControl>
                            <div className='relative'>
                              <Input type={passwordVisible ? 'text' : 'password'} {...field} />
                              <button onClick={(e) => ShowPassword(e)}
                                className='absolute right-2 top-2'>
                                {!passwordVisible ? <Eye strokeWidth={0.5} /> : <EyeOff strokeWidth={0.5} />
                                }
                              </button>
                            </div>
                          </FormControl>
                          <FormDescription>
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button variant={'default'}>Login</Button>
                  </form>
                </Form>
                <div className="text-center text-sm">
                  Don&apos;t have an account?
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page