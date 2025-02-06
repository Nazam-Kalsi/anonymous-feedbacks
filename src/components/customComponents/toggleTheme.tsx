'use client'
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button";
import { SunMedium, Moon } from "lucide-react";
import { RippleButton } from "@/components/ui/ripple-button";
type Props = {
className?:string,
}
export const ThemeProvider = ({className}:Props) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
    useEffect(()=>{
        toggleTheme();
    },[])
    const toggleTheme = () => {
        const darkModeEnabled = document.documentElement.classList.toggle("dark");
        setIsDarkTheme(darkModeEnabled);
    }
    return (
        <RippleButton className={`border-0 ${className}`} onClick={toggleTheme}>
            {isDarkTheme ? <SunMedium /> : <Moon />}
        </RippleButton>
    )

}