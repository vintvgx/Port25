import { ProjectVersion } from '@/types/content'
import { Globe, Github } from 'lucide-react';
import { Badge } from '../ui/badge';
import React from 'react'
import { Button } from '../ui/button';
interface DesktopDisplayProp {
    currentVersion: ProjectVersion;
}

/**
 *  Desktop View: Maintain existing layout 
 *
 */
export default function DesktopDisplay({ currentVersion} : DesktopDisplayProp) {
  return (
     <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-12">
     <div className="space-y-6">
       <div className="space-y-2">
         <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">
           {currentVersion.title}
         </h2>
         <div className="flex items-center backdrop-blur-sm rounded-full px-3 py-1 w-fit">
           <span className="text-xs text-white/70">
             Version {currentVersion.version}
           </span>
           {currentVersion?.isLatest && (
             <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
               Latest
             </span>
           )}
         </div>
       </div>

       <p className="text-gray-200 text-lg max-w-2xl">
         {currentVersion.description}
       </p>

       <div className="space-y-2">
         <span className="text-xs text-white/60 uppercase tracking-wider">
           Built with
         </span>
         <div className="flex flex-wrap gap-2">
           {currentVersion.technologies.map((tech) => (
             <Badge
               key={tech}
               variant="secondary"
               className="text-xs md:text-sm rounded-full px-3 py-1 bg-black/40 text-white border-[#d5661c68] backdrop-blur-sm">
               {tech}
             </Badge>
           ))}
         </div>
       </div>

       <div className="flex flex-wrap gap-3">
         {currentVersion.links?.demo && (
           <Button
             variant="outline"
             className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/40 h-12 px-6 flex items-center"
             asChild>
             <a
               href={currentVersion.links.demo}
               className="inline-flex items-center">
               <Globe className="h-5 w-5 flex-shrink-0" />
               <span className="ml-2 whitespace-nowrap">
                 Demo
               </span>
             </a>
           </Button>
         )}
         {currentVersion.links?.github && (
           <Button
             variant="outline"
             className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-12 px-6 flex items-center"
             asChild>
             <a
               href={currentVersion.links.github}
               className="inline-flex items-center">
               <Github className="h-5 w-5 flex-shrink-0" />
               <span className="ml-2 whitespace-nowrap">
                 GitHub
               </span>
             </a>
           </Button>
         )}
       </div>
     </div>
   </div>
  )
}
