import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Project } from "@/types/content";
import ReactPlayer from "react-player";
import { ClipLoader } from "react-spinners";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MobileDisplay from "./display/MobileDisplay";

// dynamically import Slider to resolve Hydration error (rendering component for mobile or desktop view)
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface ReactSlickSliderProps {
  projects?: Project[];
  currentProject: Project;
  currentProjectIndex?: number;
  onSlideChange?: (index: number) => void;
}

export function ReactSlickSlider({
  projects = [],
  currentProject,
  currentProjectIndex = 0,
  onSlideChange = () => {},
}: ReactSlickSliderProps) {
  // 1. GROUP ALL HOOKS AT THE TOP LEVEL
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReadyState, setVideoReadyState] = useState<
    Record<string, boolean>
  >({});
  const hasMounted = useRef(false);

  // Detect if the device is mobile based on viewport width
  useEffect(() => {
    hasMounted.current = true;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // resets video ready and info state when project changes
  useEffect(() => {
    setIsVideoReady(false);
    // Reset expanded state when project changes
    setIsInfoExpanded(false);
  }, [currentProject.id]);

  // expands project info section for mobile display
  const toggleInfoPanel = () => {
    setIsInfoExpanded(!isInfoExpanded);
  };

  // Handle video ready state for a specific project
  const handleVideoReady = (projectId: string) => {
    setVideoReadyState((prev) => ({
      ...prev,
      [projectId]: true,
    }));
  };

  // Defines the current version displayed by the current project
  const currentVersion =
    currentProject.versions[currentProject.currentVersion || ""];
  if (!currentVersion) return null;

  // Always start with desktop source for SSR
  const initialVideoSource = currentVersion.content.src;

  // Update source after mount
  const videoSource = !hasMounted.current
    ? initialVideoSource
    : isMobile && currentVersion.content.mobileSrc
    ? currentVersion.content.mobileSrc
    : currentVersion.content.src;

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

      <Slider {...sliderSettings}>
        {projects.length > 0 ? (
          projects.map((project) => {
            // Determine if this project's video is ready
            const isThisVideoReady = videoReadyState[project.id];

            return (
              <div key={project.id}>
                <div className="absolute inset-0 z-0">
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

                  {/* Video Player  */}
                  <ReactPlayer
                    key={`${project.id}-player`}
                    url={videoSource}
                    playing={true}
                    loop={true}
                    muted={true}
                    width="100%"
                    height="100%"
                    playsinline={true}
                    controls={false}
                    onReady={() => handleVideoReady(project.id)}
                    onError={(e) => {
                      console.error("Video error:", e);
                      // Mark as ready to show fallback content
                      setVideoReadyState((prev) => ({
                        ...prev,
                        [project.id]: true,
                      }));
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                      objectFit: "cover",
                      opacity: isThisVideoReady ? 1 : 0,
                      transition: "opacity 2s ease-in-out",
                    }}
                    config={{
                      file: {
                        attributes: {
                          playsInline: true,
                          disablePictureInPicture: true,
                          controlsList: "nodownload noplaybackrate",
                        },
                      },
                    }}
                  />
                </div>

                {/* Conditional overlay - only darkens on mobile when info panel is expanded */}
                <div
                  className={`absolute inset-0 z-10 transition-colors duration-300
                    ${
                      isInfoExpanded
                        ? "bg-black/70 md:bg-black/20"
                        : "bg-black/20"
                    }`}
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
                        ${
                          isInfoExpanded ? "overflow-y-auto" : "overflow-hidden"
                        }
                      `}>
                    {/* Handles mobile info display for mobile view (title and info drop down btn) */}
                    <MobileDisplay
                      currentVersion={currentVersion}
                      isInfoExpanded={isInfoExpanded}
                      toggleInfoPanel={toggleInfoPanel}
                      project={currentProject}
                    />

                    {/* Desktop View: Maintain existing layout */}
                    <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-12">
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
                                className="text-xs md:text-sm rounded-full px-3 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm">
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
                  </motion.div>
                </AnimatePresence>
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
