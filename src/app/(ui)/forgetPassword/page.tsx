"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import Loading from '@/components/customComponents/loading';
import axios from 'axios';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
type Props = {}

const emailSchema = z.object({
    email: z.string().email('Invalid email address').nonempty('Email is required'),
});

function page({ }: Props) {
    const route =useRouter();
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const sendVerificatimMail = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            e.preventDefault();
            setLoading(true);
            const result = emailSchema.safeParse({ email });
            if (!result.success) {
                setError(result.error.errors[0].message);
                return;
            }
            setError(null);
            const res = await axios.post(`/api/forget-password`,{email});
            if(res){
                console.log(res)
                route.push(`/${res?.data.data}/verification`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return(
        <div className='h-screen flex flex-col justify-center items-center'>
            {loading && <Loading className='absolute'/>}
            <div className='border px-12 rounded-lg w-[40%] h-[70%] flex flex-col justify-center items-start space-y-4'>
                <div className='w-full space-y-4'>
                    <label htmlFor="email" className="block mb-2 text-2xl font-bold text-gray-900 dark:text-white">Enter your registerd email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        id="email"
                        className="dark:text-black border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="email here"
                        required={true} />
                         {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                <Button variant='default' onClick={(e)=>sendVerificatimMail(e)}>Submit</Button>
            </div>
        </div>
    )
}

export default page