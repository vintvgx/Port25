import { Project } from "@/types/content";
import { AnimatePresence, motion } from "framer-motion";
import { RefObject, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ClipLoader } from "react-spinners";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import MobileDisplay from "../display/MobileDisplay";
import * as Sentry from "@sentry/nextjs"; 
import VideoLoadErrorDialog from "../Dialogs/VideoLoadErrorDialog";
import DesktopDisplay from "../display/DesktopDisplay";


// dynamically import Slider to resolve Hydration error (rendering component for mobile or desktop view)
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface ReactSlickSliderProps {
  projects?: Project[];
  currentProject: Project;
  currentProjectIndex?: number;
  onSlideChange?: (index: number) => void;
  hasMounted: RefObject<boolean>;
  isMobile?: boolean;
}

export function ReactSlickSlider({
  projects = [],
  currentProject,
  currentProjectIndex = 0,
  onSlideChange = () => {},
  hasMounted,
  isMobile,
}: ReactSlickSliderProps) {
  // info expansion for mobile display
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoReadyState, setVideoReadyState] = useState<
    Record<string, boolean>
  >({});

  // video error state 
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  // resets video ready and info state when project changes
  useEffect(() => {
    setIsVideoReady(false);

    // Reset expanded state when project changes
    setIsInfoExpanded(false);
    
    // Reset the video ready state for the current project
    setVideoReadyState(prevState => ({
      ...prevState,
      [currentProject.id]: false
    }));
  }, [currentProject.id]);

  // retrieves last project id when reloading page due to video error
  useEffect(() => {
    // Check if we have a saved project index on initial load
    const savedIndex = sessionStorage.getItem('lastProjectIndex');
    
    if (savedIndex !== null) {
      const indexToLoad = parseInt(savedIndex, 10);
      
      // Only update if the index is valid
      if (!isNaN(indexToLoad) && indexToLoad >= 0 && indexToLoad < projects.length) {
        // Update the current project index
        onSlideChange(indexToLoad);
        
        // Clear the stored index after using it
        sessionStorage.removeItem('lastProjectIndex');
      }
    }
  }, []);

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

  // Error handler if application detects wrong version for project  
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
            const isThisVideoReady = videoReadyState[project.id] === true;

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
                    key={`${project.id}-player-${videoSource}`}
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

                      // Send video load error to Sentry
                      Sentry.captureException(e, {
                        tags: {
                          feature: "video_load_error",
                          action: "handleVideoReady"
                        },
                        contexts: {
                          project: {
                            name: project.name,
                            url: videoSource,
                            timestamp: new Date().toISOString()
                          }
                        }
                      })

                      // Mark the video as having an error
                      setVideoErrors((prev) => ({
                        ...prev,
                        [project.id]: true,
                      }));
                      // Still mark as ready to proceed with fallback
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
                    <DesktopDisplay
                      currentVersion={currentVersion}
                      />
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

      {/* Video Error Dialog using shadcn Dialog */}
      <VideoLoadErrorDialog
        currentProject={currentProject}
        videoErrors={videoErrors}
        setVideoErrors={setVideoErrors}
        currentProjectIndex={currentProjectIndex}
        />
    </div>
  );
}