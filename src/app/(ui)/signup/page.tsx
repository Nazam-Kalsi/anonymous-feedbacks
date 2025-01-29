"use client"
import React, { useState } from 'react'
import { ThemeProvider } from '@/components/toggleTheme'
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signUpSchema } from '@/schema/signUp.schema'
import Link from "next/link"
import { MorphingText } from '@/components/ui/morphing-text'
import axios from 'axios'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from '@/components/ui/card'
type Props = {}
const txt = [
    'Create Account',
    'Send messages',
    'anonymously',
    'to anyone.',
]
function page({ }: Props) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            userName: "",
            email: "",
            password: "",
        },
    })
    const ShowPassword = (e: any) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    }
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        console.log(values);
        const res = await axios.post('/api/sign-up', values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        )
        if(res){
            console.log(res.data);
        }
    }
    return (
        <>
            <div className='flex justify-end'>
                <ThemeProvider />
            </div>
            <div className="flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div className='mb-8 flex flex-col items-center'>
                        <GalleryVerticalEnd className="size-6" />
                        {/* <h1 className='font-bold text-2xl'>Create your Account</h1> */}
                        <MorphingText texts={txt} />
                    </div>
                    <div className={cn("flex flex-col gap-6",)}>
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-2">

                                <Form {...form}>
                                    <form className={cn("flex flex-col gap-4 p-4")} onSubmit={form.handleSubmit(onSubmit)}>
                                        <FormField
                                            control={form.control}
                                            name="userName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="username" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input type='email' placeholder="email" {...field} />
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
                                                    <FormLabel>Password</FormLabel>
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
                                <div className="relative hidden bg-muted md:block">
                                    <img
                                        src="/placeholder.svg"
                                        alt="Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                            and <a href="#">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default page