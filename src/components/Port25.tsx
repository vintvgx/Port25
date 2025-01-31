// import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Navigation } from "./Navigation"
import type { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

// interface Port25Props {
//   children?: ReactNode
// }

export function Port25() {
  return (
    <div className={cn(inter.className, "bg-white min-h-screen px-20 py-5 flex items-center justify-center")}>
      <div className="w-full max-w-screen-3xl h-[calc(80vh)] bg-black rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform perspective-1000 rotate-x-1">
        {/* <div className="flex border border-border/10 rounded-3xl relative before:absolute before:inset-0 before:border before:border-border/5 before:rounded-3xl before:-m-[1px] before:z-0">
          <Navigation />
          <main className="flex-1 relative z-10">{children}</main>
        </div> */}
      </div>
    </div>
  )
}

