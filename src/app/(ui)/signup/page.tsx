"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@/components/customComponents/toggleTheme'
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
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation'
import Loading from '@/components/customComponents/loading'
import { useDebounceValue } from 'usehooks-ts'
import { ApiResponse } from '@/types/apiResponse'

type Props = {}
const txt = [
    'Create Account',
    'Send messages',
    'anonymously',
    'to anyone.',
]
function page({ }: Props) {
    const route = useRouter();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [checkUserName, setCheckUserName] = useState<boolean>(false);
    const [userNameStatus, setUserNameStatus] = useState<any>(null);

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            userName: "",
            email: "",
            password: "",
        },
    })
    const watchUserName = form.watch('userName');
    const debounceUserName = useDebounceValue(watchUserName, 1500);



    useEffect(() => {
        ; (async () => {
            try {
                setCheckUserName(true);
                if (debounceUserName[0].trim().length === 0) {
                    return;
                }
                const req = await axios.post(`/api/check-unique-username?userName=${debounceUserName[0]}`);
                setUserNameStatus(req.data);
            } catch (error) {
                const axiosError = error as AxiosError<ApiResponse>;
                setUserNameStatus(axiosError?.response?.data);
            } finally {
                console.log("Username status : ", userNameStatus)
                setCheckUserName(false);
            }
        })();
    }, [debounceUserName[0]])
    const ShowPassword = (e: any) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    }

    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        try {
            setLoading(true);
            const res = await axios.post('/api/sign-up', values)
            if (res) {
                console.log(res.data);
                route.push(`/verification/${values.userName}`)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=''>
            {loading && <Loading/>}
            <div className='flex justify-end'>
                <ThemeProvider />
            </div>
            <div className="flex flex-col items-center justify-start overflow-hidden">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div className='mb-6 flex flex-col items-center'>
                        <GalleryVerticalEnd className="size-6" />
                        {/* <h1 className='font-bold text-2xl'>Create your Account</h1> */}
                        <MorphingText texts={txt} />
                    </div>
                    <div className={cn("flex flex-col gap-4",)}>
                        <Card className="overflow-hidden">
                            <CardContent className="grid p-0 md:grid-cols-2">
                                <Form {...form}>
                                    <form className={cn("flex flex-col gap-4 p-4 px-8")} onSubmit={form.handleSubmit(onSubmit)}>
                                        <h2 className='text-center font-bold text-2xl'>Create your Account</h2>
                                        <FormField
                                            control={form.control}
                                            name="userName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="username" {...field} />
                                                    </FormControl>
                                                    {
                                                        checkUserName ? (
                                                            <Loader2 className="animate-spin" />
                                                        ) : userNameStatus !== null ? (
                                                            <FormDescription className={userNameStatus.success === false ? "text-red-600" : "text-green-600"}>
                                                                {userNameStatus?.message}
                                                            </FormDescription>
                                                        ) : (
                                                            <div></div>
                                                        )
                                                    }
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
                                        <Button variant={'default'}>{
                                            loading?<Loader2 className='animate-spin'/>:'Login'}</Button>
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

        </div>
    )
}

export default page