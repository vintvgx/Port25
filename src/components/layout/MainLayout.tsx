import { useState, useEffect } from "react";
import { Background } from "./Background";
import { Project } from "@/types/content";
import { navigationItems } from "@/data/navigationItems";
import { AnimatePresence } from "framer-motion";
import { ProjectDisplay } from "../ProjectDisplay";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import ProjectMenuDialog from "../Menus/ProjectMenu";
import MobileMenu from "../Menus/MobileMenu";
import { VersionSelector } from "../VersionSelector";

// Add this type near the top of the file with other imports
type DialogType = 'projects' | 'about' | 'contact' | null;

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

  // State for desktop dialogs
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);

  // Set initial version when project changes
  useEffect(() => {
    setCurrentVersion(currentProject.currentVersion);
  }, [currentProject]);

  // Navigates to the next project
  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  // Navigates to the previous project
  const handlePrevProject = () => {
    setCurrentProjectIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  };

  // Get available versions for current project
  const versions = currentProject ? Object.keys(currentProject.versions) : [];

  // Helper function to handle dialog state
  const handleDialogOpen = (dialog: DialogType) => {
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

  const Header = () => (
    <header className="fixed top-0 left-0 right-0 z-20 p-4 md:p-6 flex justify-between items-center mx-2 md:mx-6">
      <div className="flex items-center gap-4 md:gap-10">
        <h1 className="text-xl md:text-2xl font-light tracking-tight text-gray-600 hover:text-gray-900 hover:opacity-70 transition-opacity">
          Kareem Saygbe
        </h1>
        <nav className="hidden md:flex items-center gap-8 content-center">
          <Button
            variant="ghost"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => handleDialogOpen('projects')}
          >
            Projects
          </Button>
          <Button
            variant="ghost"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => handleDialogOpen('about')}
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => handleDialogOpen('contact')}
          >
            Contact
          </Button>
        </nav>
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Link>
      </div>
      <MobileMenu onProjectSelect={handleProjectSelect} />

    </header>
  );

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
        isOpen={activeDialog === 'projects'} 
        onClose={handleDialogClose} 
        projects={projects}
        onProjectSelect={handleProjectSelect}
      />
      
      {/* TODO: Create and import AboutDialog and ContactDialog components */}
      {/* <AboutDialog isOpen={activeDialog === 'about'} onClose={handleDialogClose} />
      <ContactDialog isOpen={activeDialog === 'contact'} onClose={handleDialogClose} /> */}

      <Header />

      {/* Project Display */}
      <Background>
        <AnimatePresence mode="sync">
          <ProjectDisplay
            key={`${currentProject.id}-${currentVersion}`}
            project={{
              ...currentProject,
              currentVersion: currentVersion || currentProject.currentVersion,
            }}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        </AnimatePresence>
      </Background>

      <BottomNav />
    </div>
  );
}