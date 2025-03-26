import { navigationItems } from "@/data/navigationItems";
import { Project } from "@/types/content";
import { DialogType } from "@/types/menu";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import AboutDialog from "../Dialogs/AboutDialog";
import ContactDialog from "../Dialogs/ContactDialog";
import SwipeInstructionsModal, { hasSeenSwipeInstructions } from "../Dialogs/SwipeInstructionsModal";
import ProjectMenuDialog from "../Menus/ProjectMenu";
import { ReactSlickSlider } from "../slider/ReactSlickSlider";
import BottomNav from "../utils/BottomNav";
import Header from "../utils/Header";
import { Background } from "./Background";
import VersionCtrlDialog from "../Dialogs/VersionCtrlDialog";
import SplashScreen from "../utils/SplashScreen";
import * as Sentry from "@sentry/nextjs"; 


/**
 * Handles displaying all components and functionality states
 */
export function MainLayout() {
  // Handles parsing information for projects to be used in components
  const projects = navigationItems.find((item) => item.category === "PROJECTS")
    ?.items as Project[];
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentVersion, setCurrentVersion] = useState<string | undefined>();
  const currentProject = projects[currentProjectIndex];
  const sliderRef = useRef<Slider | null>(null);

  const [showSplash, setShowSplash] = useState(true);

  // State for desktop dialogs
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);

  // State for mobile + mobile menu
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setOpenMobileMenu] = useState(false)

  // Add this state for tracking if swipe instructions should be shown
  const [showSwipeInstructions, setShowSwipeInstructions] = useState(false);

  const hasMounted = useRef(false);

  useEffect(() => {
    const startTime = Date.now();

    // Log browser and device details
    Sentry.captureMessage("Portfolio Accessed", {
      level: "info",
      extra: {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
      },
    });

    return () => {
      const duration = Date.now() - startTime;
      Sentry.captureMessage("Portfolio Page Session Duration", {
        level: "info",
        extra: {
          durationSeconds: Math.floor(duration / 1000),
        },
      });
    };
  }, []);

  useEffect(() => {
    const timerSplash = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      clearTimeout(timerSplash);
    };
  }, []);

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
  
  // Check localStorage on initial load to see if we should show instructions
  useEffect(() => {
    // Only show instructions if user hasn't seen them before
    if (!hasSeenSwipeInstructions() && isMobile) {
      setShowSwipeInstructions(true);
    }
  }, [isMobile]);
  
  // Add this handler for closing the swipe instructions
  const handleSwipeInstructionsClose = () => {
    setShowSwipeInstructions(false);
  };

  // Set initial version when project changes
  useEffect(() => {
    setCurrentVersion(currentProject.currentVersion);
  }, [currentProject]);

  // Navigates to the next project
  const handleNextProject = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    } else {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }
  };

  // Navigates to the previous project
  const handlePrevProject = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    } else {
      setCurrentProjectIndex(
        (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
      );
    }
  };

  // Helper function to handle dialog state
  const handleDialogOpen = (dialog: DialogType) => {
    // close mobile menu only if it is displayed
    if (isMobileMenuOpen) setOpenMobileMenu(false)

    setActiveDialog(dialog);
  };

  const handleDialogClose = () => {
    setActiveDialog(null);
  };

  // Project selection handler used by both mobile and desktop menus
  const handleProjectSelect = (index: number, version: string) => {
    setCurrentProjectIndex(index);
    setCurrentVersion(version);
    handleDialogClose();
  };


  return (
    <div className="min-h-screen bg-white">

      {showSplash && <SplashScreen />}
      
      {/* Add SwipeInstructionsModal */}
      <SwipeInstructionsModal 
        isOpen={showSwipeInstructions} 
        onClose={handleSwipeInstructionsClose} 
      />
      
      {/* Desktop Project Menu Dialog */}
      <ProjectMenuDialog
        isOpen={activeDialog === "projects"}
        onClose={handleDialogClose}
        projects={projects}
        onProjectSelect={handleProjectSelect}
      />

      {/* TODO: Create and import AboutDialog and ContactDialog components */}
      <AboutDialog isOpen={activeDialog === 'about'} onClose={handleDialogClose} />
      <ContactDialog isOpen={activeDialog === 'contact'} onClose={handleDialogClose} />
      <VersionCtrlDialog 
        isOpen={activeDialog === 'versionControl'} 
        onClose={handleDialogClose}
        currentProject={currentProject}
        currentVersion={currentVersion}
        setCurrentVersion={setCurrentVersion} 
      />

      <Header
        handleDialogOpen={handleDialogOpen}
        handleProjectSelect={handleProjectSelect}
        isMobileMenuOpen={isMobileMenuOpen}
        setOpenMobileMenu={setOpenMobileMenu}
        />

      {/* Project Display */}
      <Background>
        <ReactSlickSlider
          projects={projects}
          currentProject={{
            ...currentProject,
            currentVersion: currentVersion || currentProject.currentVersion,
          }}
          currentProjectIndex={currentProjectIndex}
          onSlideChange={(index) => setCurrentProjectIndex(index)}
          hasMounted={hasMounted}
          isMobile={isMobile}
        />
      </Background>

      <BottomNav
        currentProjectIndex={currentProjectIndex}
        currentVersion={currentVersion}
        projects={projects}
        currentProject={currentProject}
        setCurrentVersion={setCurrentVersion}
        handleNextProject={handleNextProject}
        handlePrevProject={handlePrevProject}
        />
    </div>
  );
}
