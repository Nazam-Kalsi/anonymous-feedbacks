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
    const route = useRouter();
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const sendVerificatimMail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            e.preventDefault();
            setLoading(true);
            const result = emailSchema.safeParse({ email });
            if (!result.success) {
                setError(result.error.errors[0].message);
                return;
            }
            setError(null);
            const res = await axios.post(`/api/auth/forget-password`, { email });
            if (res) {
                console.log(res)
                route.push(`/${res?.data.data}/verification`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        // <div className='h-screen flex flex-col justify-center items-center'>
        //     {loading && <Loading className='absolute'/>}
        //     <div className='border px-12 rounded-lg w-[40%] h-[70%] flex flex-col justify-center items-start space-y-4'>
        //         <div className='w-full space-y-4'>
        //             <label htmlFor="email" className="block mb-2 text-2xl font-bold text-gray-900 dark:text-white">Enter your registerd email</label>
        //             <input
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 type='email'
        //                 id="email"
        //                 className="dark:text-black border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                 placeholder="email here"
        //                 required={true} />
        //                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        //         </div>
        //         <Button variant='default' onClick={(e)=>sendVerificatimMail(e)}>Submit</Button>
        //     </div>
        // </div>

        <div className='flex flex-col'>
            <main className='flex-grow'>
                <div className='max-w-lg mx-auto my-5 p-4'>
                    <div className='text-center'>
                        <h1 className='text-3xl font-semibold my-2'>Recover Password</h1>
                        <p className='text-gray-600 text-sm'>Let's quickly get you back into your account.</p>
                    </div>
                    {/* <form className='my-3'>
              <div className='mb-4'>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  </div>
                  <input type='email' name='email' id='email' className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md' placeholder='you@example.com' onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <button type='submit' className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Send Reset Link</button>
            </form> */}
                    <div className='px-12 py-6 rounded-lg h-[70%] flex flex-col justify-center items-start space-y-4'>
                        <div className='w-full space-y-4'>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type='email'
                                id="email"
                                className="dark:text-black border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email here"
                                required={true} />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                        <Button variant='outline' className='w-full' onClick={(e) => sendVerificatimMail(e)}>Get verification Code</Button>
                    </div>
                    <div className='text-sm text-center text-gray-500'>Privacy Policy | Terms of Service</div>
                    <div className='flex justify-center space-x-4 mt-4'>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default page