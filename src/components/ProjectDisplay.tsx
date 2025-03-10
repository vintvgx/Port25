import { Project } from "@/types/content";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Globe, Info, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

//@coderabbitai generate unit testing code for this file.

interface ProjectDisplayProps {
  project: Project;
  onNext: () => void;
  onPrev: () => void;
}

export function ProjectDisplay({
  project,
  onNext,
  onPrev
}: ProjectDisplayProps) {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

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

     // Reset video and info panel when project changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsVideoReady(false);
    setIsInfoExpanded(false);
  }, [project.id]);

  const currentVersion = project.versions[project.currentVersion || ""];
  if (!currentVersion) return null;

    // Determine video source based on device
    const videoSource = isMobile && currentVersion.content.mobileSrc 
    ? currentVersion.content.mobileSrc 
    : currentVersion.content.src;


  // Reset video ready state when project changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsVideoReady(false);
    // Reset expanded state when project changes
    setIsInfoExpanded(false);
  }, [project.id]);

  const toggleInfoPanel = () => {
    setIsInfoExpanded(!isInfoExpanded);
  };

  return (
    <motion.div 
      className="relative w-full h-full touch-pan-y bg-black"
      drag={!isInfoExpanded ? "x" : undefined}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onDragEnd={(e, { offset, velocity }) => {
        if (isInfoExpanded) return;
        
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
          onNext();
        } else if (swipe > swipeConfidenceThreshold) {
          onPrev();
        }
      }}
    >
      {/* Solid Black Background - lowest z-index */}
      <div className="absolute inset-0 bg-black" />

      {/* Video Display - middle z-index */}
      <div className="absolute inset-0 z-0">
        <ReactPlayer
          url={videoSource}
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="100%"
          playsinline={true}
          controls={false}
          onReady={() => setIsVideoReady(true)}
          onError={(e) => console.error("Video error:", e)}
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0,
            pointerEvents: 'none',
            objectFit: 'cover',
            opacity: 1,
            transition: 'opacity 0.5s ease-in-out'
          }}
          config={{
            file: {
              attributes: {
                playsInline: true,
                webkitPlaysInline: true,
                disablePictureInPicture: true,
                controlsList: 'nodownload noplaybackrate',
                preload: 'auto',
              },
            },
          }}
        />
      </div>

      {/* Conditional overlay - only darkens on mobile when info panel is expanded */}
      <div 
        className={`
          absolute inset-0 z-10 transition-colors duration-300
          ${isInfoExpanded ? 'bg-black/70 md:bg-black/20' : 'bg-black/20'}
        `} 
      />

      {/* Project Details - highest z-index */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`${project.id}-${project.currentVersion}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`
            absolute inset-0 z-20
            ${isInfoExpanded ? 'overflow-y-auto' : 'overflow-hidden'}
          `}
        >
          {/* Mobile View: Header with Title and Info/Close button */}
          <div className="block md:hidden sticky top-0 z-10 px-6 pt-6 pb-3 flex items-center justify-between bg-gradient-to-b from-black/90 to-black/70">
            <h2 className="text-4xl font-bold tracking-tight text-white pr-3">
              {currentVersion.title}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-white flex-shrink-0"
              onClick={toggleInfoPanel}
            >
              {isInfoExpanded ? (
                <X className="h-5 w-5" />
              ) : (
                <Info className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile View: Expandable Content Panel */}
          <AnimatePresence>
            {isInfoExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-24 space-y-6"
              >
                {/* Version tag */}
                <div className="flex items-center backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                  <span className="text-xs text-white/70">
                    Version {project.currentVersion}
                  </span>
                  {currentVersion?.isLatest && (
                    <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                      Latest
                    </span>
                  )}
                </div>

                {/* Full description */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">Description</h3>
                  <p className="text-gray-200 text-base">
                    {currentVersion.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <h3 className="text-sm uppercase tracking-wider text-white/60">
                    Built with
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentVersion.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs rounded-full px-3 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                {currentVersion.links && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {currentVersion.links?.demo && (
                      <Button
                        variant="outline"
                        className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/40 h-12 px-6"
                        asChild
                      >
                        <Link href={currentVersion.links.demo}>
                          <Globe className="h-5 w-5" />
                          <span className="ml-2">Demo</span>
                        </Link>
                      </Button>
                    )}
                    {currentVersion.links?.github && (
                      <Button
                        variant="outline"
                        className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-12 px-6"
                        asChild
                      >
                        <Link href={currentVersion.links.github}>
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.489C9.34 21.581 9.52 21.278 9.52 21.017C9.52 20.781 9.512 20.082 9.508 19.263C6.726 19.861 6.139 17.96 6.139 17.96C5.685 16.812 5.028 16.51 5.028 16.51C4.128 15.897 5.095 15.909 5.095 15.909C6.092 15.979 6.626 16.926 6.626 16.926C7.521 18.447 8.969 18.006 9.54 17.754C9.63 17.119 9.889 16.679 10.175 16.419C7.956 16.156 5.62 15.319 5.62 11.534C5.62 10.415 6.01 9.499 6.646 8.778C6.545 8.527 6.203 7.539 6.747 6.158C6.747 6.158 7.587 5.894 9.497 7.192C10.295 6.973 11.15 6.864 12 6.859C12.85 6.864 13.705 6.973 14.505 7.192C16.413 5.894 17.251 6.158 17.251 6.158C17.797 7.539 17.455 8.527 17.354 8.778C17.991 9.499 18.38 10.415 18.38 11.534C18.38 15.329 16.04 16.154 13.813 16.411C14.172 16.73 14.492 17.363 14.492 18.329C14.492 19.707 14.479 20.688 14.479 21.017C14.479 21.281 14.657 21.587 15.167 21.486C19.138 20.161 22 16.416 22 12C22 6.477 17.523 2 12 2Z" />
                          </svg>
                          <span className="ml-2">GitHub</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                )}

                {/* Release Date */}
                <div className="pt-4">
                  <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">Release</h3>
                  <p className="text-gray-200 text-sm">{currentVersion.date}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop View: Maintain existing layout */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 p-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">
                  {currentVersion.title}
                </h2>
                <div className="flex items-center backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                  <span className="text-xs text-white/70">
                    Version {project.currentVersion}
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
                      className="text-xs md:text-sm rounded-full px-3 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {currentVersion.links?.demo && (
                  <Button
                    variant="outline"
                    className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/40 h-12 px-6"
                    asChild
                  >
                    <Link href={currentVersion.links.demo}>
                      <Globe className="h-5 w-5" />
                      <span className="ml-2">Demo</span>
                    </Link>
                  </Button>
                )}
                {currentVersion.links?.github && (
                  <Button
                    variant="outline"
                    className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-12 px-6"
                    asChild
                  >
                    <Link href={currentVersion.links.github}>
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.489C9.34 21.581 9.52 21.278 9.52 21.017C9.52 20.781 9.512 20.082 9.508 19.263C6.726 19.861 6.139 17.96 6.139 17.96C5.685 16.812 5.028 16.51 5.028 16.51C4.128 15.897 5.095 15.909 5.095 15.909C6.092 15.979 6.626 16.926 6.626 16.926C7.521 18.447 8.969 18.006 9.54 17.754C9.63 17.119 9.889 16.679 10.175 16.419C7.956 16.156 5.62 15.319 5.62 11.534C5.62 10.415 6.01 9.499 6.646 8.778C6.545 8.527 6.203 7.539 6.747 6.158C6.747 6.158 7.587 5.894 9.497 7.192C10.295 6.973 11.15 6.864 12 6.859C12.85 6.864 13.705 6.973 14.505 7.192C16.413 5.894 17.251 6.158 17.251 6.158C17.797 7.539 17.455 8.527 17.354 8.778C17.991 9.499 18.38 10.415 18.38 11.534C18.38 15.329 16.04 16.154 13.813 16.411C14.172 16.73 14.492 17.363 14.492 18.329C14.492 19.707 14.479 20.688 14.479 21.017C14.479 21.281 14.657 21.587 15.167 21.486C19.138 20.161 22 16.416 22 12C22 6.477 17.523 2 12 2Z" />
                      </svg>
                      <span className="ml-2">GitHub</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
