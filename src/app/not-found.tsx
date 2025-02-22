'use client'
import React, { useEffect, useState } from 'react'

type Props = {}

function Notfound({ }: Props) {
    const [counter, setCounter] = useState<number>(5);
    setTimeout(() => {
        ;(() => setCounter(counter-1))();
    }, 1000);

    useEffect(()=>{
        if(counter === 0){
            window.location.href = '/';
        }
    },[counter]);

    return (
        <main className="grid min-h-full place-items-center bg-transparent px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance dark:text-white text-gray-900 sm:text-7xl">
                    Page not found
                </h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 dark:text-gray-300 sm:text-xl/8">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <div
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        we are redirecting you to home in {counter}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Notfound