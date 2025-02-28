// import { Project } from "@/types/content";
// import { AnimatePresence, motion } from "framer-motion";
// import { X, Info, Badge, Link, Globe } from "lucide-react";
// import { Button } from "../ui/button";

// interface MobileDisplayProps {
//     currentVersion: string | undefined;
//     isInfoExpanded: boolean;
//     toggleInfoPanel: () => void;
//     project: Project;
//   }
  
//   function MobileDisplay({ currentVersion, isInfoExpanded, toggleInfoPanel, project }: MobileDisplayProps) {
//     return (
//       <>
//         {/* Mobile View: Header with Title and Info/Close button */}
//         <div className="block md:hidden sticky top-0 z-10 px-6 pt-6 pb-3 flex items-center justify-between bg-gradient-to-b from-black/90 to-black/70">
//           <h2 className="text-4xl font-bold tracking-tight text-white pr-3">
//             {currentVersion.title}
//           </h2>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="text-white flex-shrink-0"
//             onClick={toggleInfoPanel}
//           >
//             {isInfoExpanded ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Info className="h-5 w-5" />
//             )}
//           </Button>
//         </div>
  
//         {/* Mobile View: Expandable Content Panel */}
//         <AnimatePresence>
//           {isInfoExpanded && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 20 }}
//               transition={{ duration: 0.3 }}
//               className="px-6 pb-24 space-y-6"
//             >
//               {/* Version tag */}
//               <div className="flex items-center backdrop-blur-sm rounded-full px-3 py-1 w-fit">
//                 <span className="text-xs text-white/70">
//                   Version {project.currentVersion}
//                 </span>
//                 {currentVersion?.isLatest && (
//                   <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
//                     Latest
//                   </span>
//                 )}
//               </div>
  
//               {/* Full description */}
//               <div>
//                 <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">Description</h3>
//                 <p className="text-gray-200 text-base">
//                   {currentVersion.description}
//                 </p>
//               </div>
  
//               {/* Technologies */}
//               <div className="space-y-2">
//                 <h3 className="text-sm uppercase tracking-wider text-white/60">
//                   Built with
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {currentVersion.technologies.map((tech) => (
//                     <Badge
//                       key={tech}
//                       variant="secondary"
//                       className="text-xs rounded-full px-3 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm"
//                     >
//                       {tech}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
  
//               {/* Links */}
//               {currentVersion.links && (
//                 <div className="flex flex-wrap gap-3 mt-4">
//                   {currentVersion.links?.demo && (
//                     <Button
//                       variant="outline"
//                       className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/40 h-12 px-6"
//                       asChild
//                     >
//                       <Link href={currentVersion.links.demo}>
//                         <Globe className="h-5 w-5" />
//                         <span className="ml-2">Demo</span>
//                       </Link>
//                     </Button>
//                   )}
//                   {currentVersion.links?.github && (
//                     <Button
//                       variant="outline"
//                       className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-12 px-6"
//                       asChild
//                     >
//                       <Link href={currentVersion.links.github}>
//                         <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
//                           <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.489C9.34 21.581 9.52 21.278 9.52 21.017C9.52 20.781 9.512 20.082 9.508 19.263C6.726 19.861 6.139 17.96 6.139 17.96C5.685 16.812 5.028 16.51 5.028 16.51C4.128 15.897 5.095 15.909 5.095 15.909C6.092 15.979 6.626 16.926 6.626 16.926C7.521 18.447 8.969 18.006 9.54 17.754C9.63 17.119 9.889 16.679 10.175 16.419C7.956 16.156 5.62 15.319 5.62 11.534C5.62 10.415 6.01 9.499 6.646 8.778C6.545 8.527 6.203 7.539 6.747 6.158C6.747 6.158 7.587 5.894 9.497 7.192C10.295 6.973 11.15 6.864 12 6.859C12.85 6.864 13.705 6.973 14.505 7.192C16.413 5.894 17.251 6.158 17.251 6.158C17.797 7.539 17.455 8.527 17.354 8.778C17.991 9.499 18.38 10.415 18.38 11.534C18.38 15.329 16.04 16.154 13.813 16.411C14.172 16.73 14.492 17.363 14.492 18.329C14.492 19.707 14.479 20.688 14.479 21.017C14.479 21.281 14.657 21.587 15.167 21.486C19.138 20.161 22 16.416 22 12C22 6.477 17.523 2 12 2Z" />
//                         </svg>
//                         <span className="ml-2">GitHub</span>
//                       </Link>
//                     </Button>
//                   )}
//                 </div>
//               )}
  
//               {/* Release Date */}
//               <div className="pt-4">
//                 <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">Release</h3>
//                 <p className="text-gray-200 text-sm">{currentVersion.date}</p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </>
//     );
//   }

//   export default MobileDisplay;