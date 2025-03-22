import { useState, useEffect, useRef } from "react";
import { Background } from "./Background";
import { Project } from "@/types/content";
import { navigationItems } from "@/data/navigationItems";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectMenuDialog from "../Menus/ProjectMenu";
import { VersionSelector } from "../VersionSelector";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactSlickSlider } from "../ReactSlickSlider";
import { DialogType } from "@/types/menu";
import Header from "../Header";
import AboutDialog from "../Dialogs/AboutDialog";
import ContactDialog from "../Dialogs/ContactDialog";


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

  // State for desktop dialogs
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);

  // State for mobile menu display
  const [isMobileMenuOpen, setOpenMobileMenu] = useState(false)


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

  // Get available versions for current project
  const versions = currentProject ? Object.keys(currentProject.versions) : [];

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


  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center mx-2 h-16 md:mx-6 gap-4 backdrop-blur-sm">
      {/* Full Stack Dev Text  */}
      <div className="hidden md:block text-gray-500">
        <h1 className="text-lg font-light">Full Stack Developer</h1>
      </div>

      {/* Prev and Next button  */}
      <div className="flex items-center gap-4 text-sm text-gray-500 order-1 md:order-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-full"
          onClick={handlePrevProject}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Previous project</span>
        </Button>
        <span className="text-xs tracking-wider uppercase">
          {`${String(currentProjectIndex + 1).padStart(2, "0")} / ${String(
            projects.length
          ).padStart(2, "0")}`}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100 rounded-full"
          onClick={handleNextProject}>
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Next project</span>
        </Button>
      </div>

      {/* Version Selector  */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-end order-2 md:order-3">
        {versions.length > 0 && (
          <div className="md:hidden w-full">
            <VersionSelector
              versions={versions}
              currentVersion={currentVersion}
              onVersionSelect={setCurrentVersion}
              variant="mobile"
            />
          </div>
        )}
        <div className="hidden md:block">
          <VersionSelector
            versions={versions}
            currentVersion={currentVersion}
            onVersionSelect={setCurrentVersion}
            variant="desktop"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
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
        />
      </Background>

      <BottomNav />
    </div>
  );
}
