import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { ReactNode } from 'react'

const inter = Inter({ subsets: ["latin"] })

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <div className={cn(
      inter.className, 
      "bg-white min-h-screen px-4 md:px-20 py-3 md:py-5 flex items-center justify-center"
    )}>
      <div className="w-full max-w-screen-3xl h-[calc(85vh)] md:h-[calc(80vh)] bg-black rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform perspective-1000 rotate-x-1">
        {children}
      </div>
    </div>
  )
}

