"use client"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { AnimatedList } from "@/components/magicui/animated-list";
import { cn } from "@/lib/utils";
import {featuresData, msgData} from '@/data/msgData';
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import Card from "@/components/customComponents/card";
import { memo } from "react";
import { DotPattern } from "@/components/ui/dot-pattern";

 
interface Item {
  name: string;
  description: string;
  color: string;
  time: string;
}
const msgData2 = Array.from({ length: 10 }, () => msgData).flat();

const Notification = memo(({ name, description, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
});

const HeaderTitle = ({heading,subHeading,className}:{heading:string;subHeading?:string,className?:string})=>{
  return(
    <div className={`text-center ${className}`}>
    <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-300/80 to-black bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 text-xl sm:text-6xl">{heading}</h1>
    <h4 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-slate-900/10 dark:to-white text-xl sm:text-2xl">{subHeading}</h4>
    </div>
  )
}
const Grid = memo(()=>{
  return(
    <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-5%] skew-y-6 h-full",
          'z-[49]'
        )}
      /> 
  )
})

const List = memo(()=>{
  return(
    <section className={cn(
      "relative flex h-[600px] w-full flex-col overflow-hidden p-2 px-8"
    )}>
      <HeaderTitle className="my-12" heading="What our users are saying" subHeading="Here's what some of our users are saying." />
    <AnimatedList>
      {msgData2.map((item, idx) => (
        <Notification {...item} key={idx} />
      ))}
    </AnimatedList>

    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </section> 
  )
})

const H = memo(function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col justify-center items-center h-[86vh]"> 
        {/* <Grid/> */}
      <div
        className="group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨  Anonymous </span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
   
    <div  className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-300/80 to-black bg-clip-text text-center font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 text-xl sm:text-8xl">
      Welcome to world of
    </div>
    <div  className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center font-semibold leading-none text-transparent dark:from-slate-900/10 dark:to-white text-xl sm:text-6xl">
      Anonymous
     <span className="bg-gradient-to-tl from-slate-400 via-violet-600 to-zinc-100 bg-clip-text text-transparent"> feedbacks</span> 
    </div>
      </main>
      <section className="overflow-hidden relative z-[51] bg-transparent py-10 px-4 mx-auto w-[90%] rounded-xl shadow-[0px_-27px_198px_0px_rgba(147,_51,_234,_0.5)]">

      <HeaderTitle className="mb-12 flex md:pl-6" heading="We provide" />
      <DotPattern className={"[mask-image:radial-gradient(650px_circle_at_top_right,white,transparent)]"}/>
        <div className="flex justify-between gap-4 items-center flex-wrap">
        {
          featuresData.map((data,index)=>{
            return(
              <Card key={index} heading={data.title} description={data.description} logo={data.logo}/>
            )
          })
        }
        </div>
      </section>
      <List/>
      <footer className="text-center">
        <h4 className="text-[200px] font-bold uppercase leading-none pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-700/80 to-black bg-clip-text text-center text-transparent dark:from-white/50 dark:to-slate-900/10 text-xl">Anonymous</h4>
        <h4 className="font-bold text-xl leading-none pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-700/80 to-black bg-clip-text text-center text-transparent dark:from-white dark:to-slate-400/10">Feedbacks</h4>
      </footer>
    </div>
  );
})

export default H;
