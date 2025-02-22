"use client";

import { CalendarIcon, HomeIcon, MailIcon, PencilIcon, SquareKanban,Github,Linkedin, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import React from "react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/dock";
import { ThemeProvider } from "./toggleTheme";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { LogIn, ContactRound, UserRound, LogOut } from 'lucide-react';

const DATA = {
  navbar: [
    { href: "/u", icon: HomeIcon, label: "Home" },
    { href: "/dashboard", icon: SquareKanban, label: "Dashboard" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "#",
        icon: <Github />,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "#",
        icon: <Linkedin />,
      },
      X: {
        name: "X",
        url: "#",
        icon: <Twitter />,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: <Mail />,
      },
    },
  },
};

export function Header() {
  const { data:session, status } = useSession();
  console.log(session);
  const logout = ()=>{
    signOut();
  }
  return (
    <div className="relative mx-auto w-full z-50 mb-4">
      {/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Dock
      </span> */}
      
      <TooltipProvider delayDuration={0}>
        <div className="flex justify-between items-center  w-full">
        <Dock>
              <Link className="uppercase" href={`/`}>FeedBacks</Link>
        </Dock>
        <Dock direction='bottom' >
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full",
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full",
                    )}
                  >
                    {social.icon}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ThemeProvider />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>

          
          { session ?
        <Dock direction='bottom' >
           <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/u/${session?.user.userName}/${session?.user._id}`}>
              <UserRound size={18} color="lightblue"/>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>User Account</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
           <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
              <LogOut size={18} onClick={logout} color="red"/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>          
        </Dock>
        :<Dock direction='bottom' >
        <DockIcon>
         <Tooltip>
           <TooltipTrigger asChild>
            <Link href={'/signIn'}>
           <LogIn size={18} />
            </Link>
           </TooltipTrigger>
           <TooltipContent>
             <p>Login</p>
           </TooltipContent>
         </Tooltip>
       </DockIcon>
        <DockIcon>
         <Tooltip>
           <TooltipTrigger asChild>
            <Link href={'/signup'}>
           <ContactRound size={18}/>
            </Link>
           </TooltipTrigger>
           <TooltipContent>
             <p>Sign Up</p>
           </TooltipContent>
         </Tooltip>
       </DockIcon>          
     </Dock>
        }
        </div>
      </TooltipProvider>
    </div>
  );
}
