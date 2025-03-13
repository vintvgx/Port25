import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Project } from "@/types/content";
import ReactPlayer from "react-player";
import { ClipLoader } from "react-spinners";

interface ReactSlickSliderProps {
  projects?: Project[];
  currentProject: Project;
  currentProjectIndex?: number;
//   currentVersion?: string;
  onSlideChange?: (index: number) => void;
  sliderRef?: React.RefObject<Slider> | null;
}

export function ReactSlickSlider({
  projects = [],
  currentProject,
  currentProjectIndex = 0,
//   currentVersion,
  onSlideChange = () => {},
  sliderRef,
}: ReactSlickSliderProps) {
    const [isMobile, setIsMobile] = useState(false);
    // Track loading state for each project individually
    const [videoReadyState, setVideoReadyState] = useState<Record<string, boolean>>({});


  // Effect to ensure slider stays in sync with currentProjectIndex
  useEffect(() => {
    if (
      sliderRef?.current &&
      typeof sliderRef.current.slickGoTo === "function"
    ) {
      sliderRef.current.slickGoTo(currentProjectIndex);
    }
  }, [currentProjectIndex, sliderRef]);

  // Detect if the device is mobile based on viewport width
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the standard md breakpoint in Tailwind
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
    fade: true,
    cssEase: "linear",
    initialSlide: currentProjectIndex,
    afterChange: onSlideChange,
  };

  const currentVersion = currentProject.versions[currentProject.currentVersion || ""];
  if (!currentVersion) return null;

    // Determine video source based on device
    const videoSource = isMobile && currentVersion.content.mobileSrc 
    ? currentVersion.content.mobileSrc 
    : currentVersion.content.src;

  // Custom slider styles
  const sliderStyles = {
    height: "100%",
    width: "100%",
    position: "relative" as const,
  };

  // Handle video ready state for a specific project
  const handleVideoReady = (projectId: string) => {
    setVideoReadyState(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  return (
    <div className="slider-container h-full w-full">
      <style jsx global>{`
        .slider-container {
          height: 100%;
          width: 100%;
          position: relative;
        }
        .slider-container .slick-slider,
        .slider-container .slick-list,
        .slider-container .slick-track,
        .slider-container .slick-slide,
        .slider-container .slick-slide > div {
          height: 100%;
          width: 100%;
        }
        .slider-container .slick-slide > div {
          display: flex;
        }
        .slider-container .slick-slide > div > div {
          width: 100%;
          height: 100%;
        }
      `}</style>

      <Slider ref={sliderRef} {...sliderSettings} style={sliderStyles}>
        {projects.length > 0 ? (
          projects.map((project) => {
            // Determine if this project's video is ready
            const isThisVideoReady = videoReadyState[project.id];
            
            // Get project-specific video source
            const projectVersion = project.versions[project.currentVersion || ""];
            if (!projectVersion) return null;
            
            const projectVideoSource = isMobile && projectVersion.content.mobileSrc 
              ? projectVersion.content.mobileSrc 
              : projectVersion.content.src;
            
            return (
              <div key={project.id} className="absolute inset-0 z-0">
                {!isThisVideoReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                    <ClipLoader
                      color="#ffffff"
                      loading={true}
                      size={60}
                      aria-label="Loading Spinner"
                    />
                  </div>
                )}
                
                <ReactPlayer
                  key={`${project.id}-player`}
                  url={projectVideoSource}
                  playing={true}
                  loop={true}
                  muted={true}
                  width="100%"
                  height="100%"
                  playsinline={true}
                  controls={false}
                  onReady={() => handleVideoReady(project.id)}
                  onError={(e) => console.error("Video error:", e)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    objectFit: "cover",
                    opacity: isThisVideoReady ? 1 : 0,
                    transition: "opacity 0.5s ease-in-out",
                  }}
                  config={{
                    file: {
                      attributes: {
                        playsInline: true,
                        webkitPlaysInline: true,
                        disablePictureInPicture: true,
                        controlsList: "nodownload noplaybackrate",
                        preload: "auto",
                      },
                    },
                  }}
                />
              </div>
            );
          })
        ) : (
          // Fallback content when no projects are provided
          <>
            <div className="bg-orange-400 flex items-center justify-center w-full h-full">
              <h1 className="text-white text-4xl font-bold">
                No Projects Found
              </h1>
            </div>
          </>
        )}
      </Slider>
    </div>
  );
}
//   // Safely get current project version
//   const getSelectedVersion = () => {
//     if (!currentProject) return null;

//     const versionKey = currentVersion || currentProject.currentVersion;
//     if (!versionKey) return null;

//     return currentProject.versions[versionKey] || null;
//   };

//   const selectedVersion = getSelectedVersion();

//   // Safety check - ensure we have a version to display
//   if (!selectedVersion) {
//     return <div className="w-full h-full flex items-center justify-center text-white">Version information not available</div>;
//   }

//   // Determine video source based on device (used for reference in component)
//   const videoSource = isMobile && selectedVersion.content?.mobileSrc
//     ? selectedVersion.content.mobileSrc
//     : selectedVersion.content?.src || "";

//   return (
//     <div className="relative w-full h-full">
//       <Slider ref={sliderRef} {...sliderSettings} className="h-full">
//         {projects.map((project, index) => {
//           // Safely get project version
//           const projectVersionKey = currentVersion || project.currentVersion;
//           const projectVersion = project.versions[projectVersionKey];

//           if (!projectVersion) {
//             console.warn(`Version ${projectVersionKey} not found for project ${project.id}`);
//             return (
//               <div key={`${project.id}-fallback`} className="relative h-full flex items-center justify-center text-white">
//                 Project data unavailable
//               </div>
//             );
//           }

//           const projectVideoSource = isMobile && projectVersion.content?.mobileSrc
//             ? projectVersion.content.mobileSrc
//             : projectVersion.content?.src || "";

//           return (
//             <div key={`${project.id}-${projectVersionKey}`} className="relative h-full">
//               <motion.div
//                 className="relative w-full h-full touch-pan-y bg-black"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 {/* Solid Black Background */}
//                 <div className="absolute inset-0 bg-black" />

//                 {/* Video Display */}
//                 <div className="absolute inset-0 z-0">
//                     <ReactPlayer
//                       url={projectVideoSource}
//                       playing={true}
//                       loop={true}
//                       muted={true}
//                       width="100%"
//                       height="100%"
//                       playsinline={true}
//                       controls={false}
//                       onReady={() => setIsVideoReady(true)}
//                       onError={handleVideoError}
//                       style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         pointerEvents: 'none',
//                         objectFit: 'cover',
//                         opacity: isVideoReady ? 1 : 0,
//                         transition: 'opacity 0.5s ease-in-out'
//                       }}
//                       config={{
//                         file: {
//                           attributes: {
//                             playsInline: true,
//                             webkitPlaysInline: true,
//                             disablePictureInPicture: true,
//                             controlsList: 'nodownload noplaybackrate',
//                             preload: 'auto',
//                           },
//                         },
//                       }}
//                     />
//                   )}

//                   {/* Fallback display when video fails to load */}
//                   {(fallbackDisplay || !projectVideoSource) && index === currentIndex && (
//                     <div className="absolute inset-0 bg-black flex items-center justify-center">
//                       <div className="text-center p-4">
//                         <h3 className="text-xl text-white mb-2">{projectVersion.title}</h3>
//                         {projectVersion.thumbnail && (
//                           <img
//                             src={projectVersion.thumbnail}
//                             alt={projectVersion.title}
//                             className="max-w-full max-h-[60vh] mx-auto rounded-md"
//                           />
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Overlay */}
//                 <div
//                   className={`
//                     absolute inset-0 z-10 transition-colors duration-300
//                     ${isInfoExpanded ? 'bg-black/70 md:bg-black/20' : 'bg-black/20'}
//                   `}
//                 />

//                 {/* Project Details */}
//                 {index === currentIndex && (
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={`${project.id}-${projectVersionKey}`}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.3 }}
//                       className={`
//                         absolute inset-0 z-20
//                         ${isInfoExpanded ? 'overflow-y-auto' : 'overflow-hidden'}
//                       `}
//                     >
//                       {/* Mobile View: Header with Title and Info/Close button */}
//                       <div className="block md:hidden sticky top-0 z-10 px-6 pt-6 pb-3 flex items-center justify-between bg-gradient-to-b from-black/90 to-black/70">
//                         <h2 className="text-4xl font-bold tracking-tight text-white pr-3">
//                           {projectVersion.title || "Project Title"}
//                         </h2>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-white flex-shrink-0"
//                           onClick={toggleInfoPanel}
//                         >
//                           {isInfoExpanded ? (
//                             <X className="h-5 w-5" />
//                           ) : (
//                             <Info className="h-5 w-5" />
//                           )}
//                         </Button>
//                       </div>

//                       {/* Mobile View: Expandable Content Panel */}
//                       <AnimatePresence>
//                         {isInfoExpanded && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 20 }}
//                             transition={{ duration: 0.3 }}
//                             className="px-6 pb-24 space-y-6"
//                           >
//                             {/* Version tag */}
//                             <div className="flex items-center backdrop-blur-sm rounded-full px-3 py-1 w-fit">
//                               <span className="text-xs text-white/70">
//                                 Version {projectVersionKey}
//                               </span>
//                               {projectVersion?.isLatest && (
//                                 <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
//                                   Latest
//                                 </span>
//                               )}
//                             </div>

//                             {/* Full description */}
//                             <div>
//                               <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">Description</h3>
//                               <p className="text-gray-200 text-base">
//                                 {projectVersion.description || "No description available"}
//                               </p>
//                             </div>

//                             {/* Technologies */}
//                             {projectVersion.technologies && projectVersion.technologies.length > 0 && (
//                               <div className="space-y-2">
//                                 <h3 className="text-sm uppercase tracking-wider text-white/60">
//                                   Built with
//                                 </h3>
//                                 <div className="flex flex-wrap gap-2">
//                                   {projectVersion.technologies.map((tech) => (
//                                     <Badge
//                                       key={tech}
//                                       variant="secondary"
//                                       className="text-xs rounded-full px-3 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm"
//                                     >
//                                       {tech}
//                                     </Badge>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}

//                             {/* Links */}
//                             {projectVersion.links && (
//                               <div className="flex flex-wrap gap-3 mt-4">
//                                 {projectVersion.links?.demo && (
//                                   <Button
//                                     variant="outline"
//                                     className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/40 h-12 px-6"
//                                     asChild
//                                   >
//                                     <Link href={projectVersion.links.demo}>
//                                       <Globe className="h-5 w-5" />
//                                       <span className="ml-2">Demo</span>
//                                     </Link>
//                                   </Button>
//                                 )}
//                                 {projectVersion.links?.github && (
//                                   <Button
//                                     variant="outline"
//                                     className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-12 px-6"
//                                     asChild
//                                   >
//                                     <Link href={projectVersion.links.github}>
//                                       <Github className="h-5 w-5" />
//                                       <span className="ml-2">GitHub</span>
//                                     </Link>
//                                   </Button>
//                                 )}
//                               </div>
//                             )}

//                             {/* Release Date */}
//                             {projectVersion.date && (
//                               <div className="pt-4">
//                                 <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">Release</h3>
//                                 <p className="text-gray-200 text-sm">{projectVersion.date}</p>
//                               </div>
//                             )}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>

//                       {/* Desktop View: Maintain existing layout */}
//                       <div className="hidden md:block absolute bottom-0 left-0 right-0 p-12">
//                         <div className="space-y-6">
//                           <div className="space-y-2">
//                             <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">
//                               {projectVersion.title || "Project Title"}
//                             </h2>
//                             <div className="flex items-center backdrop-blur-sm rounded-full px-3 py-1 w-fit">
//                               <span className="text-xs text-white/70">
//                                 Version {projectVersionKey}
//                               </span>
//                               {projectVersion?.isLatest && (
//                                 <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
//                                   Latest
//                                 </span>
//                               )}
//                             </div>
//                           </div>

//                           <p className="text-gray-200 text-lg max-w-2xl">
//                             {projectVersion.description || "No description available"}
//                           </p>

//                           {projectVersion.technologies && projectVersion.technologies.length > 0 && (
//                             <div className="space-y-2">
//                               <span className="text-xs text-white/60 uppercase tracking-wider">
//                                 Built with
//                               </span>
//                               <div className="flex flex-wrap gap-2">
//                                 {projectVersion.technologies.map((tech) => (
//                                   <Badge
//                                     key={tech}
//                                     variant="secondary"
//                                     className="text-xs md:text-sm rounded-full px-3 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm"
//                                   >
//                                     {tech}
//                                   </Badge>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           <div className="flex flex-wrap gap-3">
//                             {projectVersion.links?.demo && (
//                               <Button
//                                 variant="outline"
//                                 className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/40 h-12 px-6"
//                                 asChild
//                               >
//                                 <Link href={projectVersion.links.demo}>
//                                   <Globe className="h-5 w-5" />
//                                   <span className="ml-2">Demo</span>
//                                 </Link>
//                               </Button>
//                             )}
//                             {projectVersion.links?.github && (
//                               <Button
//                                 variant="outline"
//                                 className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-12 px-6"
//                                 asChild
//                               >
//                                 <Link href={projectVersion.links.github}>
//                                   <Github className="h-5 w-5" />
//                                   <span className="ml-2">GitHub</span>
//                                 </Link>
//                               </Button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </AnimatePresence>
//                 )}
//               </motion.div>
//             </div>
//           );
//         })}
//       </Slider>

//       {/* Navigation Controls */}
//       <div className="absolute bottom-20 left-0 right-0 z-30 flex justify-center items-center gap-4">
//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full"
//           onClick={handlePrev}
//         >
//           <ArrowLeft className="h-5 w-5" />
//           <span className="sr-only">Previous project</span>
//         </Button>

//         <span className="text-xs tracking-wider uppercase text-white">
//           {`${String(currentIndex + 1).padStart(2, "0")} / ${String(
//             projects.length
//           ).padStart(2, "0")}`}
//         </span>

//         <Button
//           variant="ghost"
//           size="icon"
//           className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full"
//           onClick={handleNext}
//         >
//           <ArrowRight className="h-5 w-5" />
//           <span className="sr-only">Next project</span>
//         </Button>
//       </div>

//       {/* Version Selector (Desktop) */}
//       {versions.length > 0 && currentProject && (
//         <div className="absolute bottom-4 right-4 z-30 hidden md:block">
//           <VersionSelector
//             versions={versions}
//             currentVersion={currentVersion || currentProject.currentVersion}
//             onVersionSelect={handleVersionChange}
//             variant="desktop"
//           />
//         </div>
//       )}

//       {/* Version Selector (Mobile) */}
//       {versions.length > 0 && !isInfoExpanded && currentProject && (
//         <div className="absolute bottom-4 left-4 right-4 z-30 md:hidden">
//           <VersionSelector
//             versions={versions}
//             currentVersion={currentVersion || currentProject.currentVersion}
//             onVersionSelect={handleVersionChange}
//             variant="mobile"
//           />
//         </div>
//       )}
//     </div>
