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
import ProjectMenuDialog from "../NavMenu/ProjectMenu";

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

  // Replace the single isOpen state with a more flexible dialog state
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

  // Add this handler after the other handlers
  const handleProjectSelect = (index: number, version: string) => {
    setCurrentProjectIndex(index);
    setCurrentVersion(version);
    handleDialogClose();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Update ProjectMenuDialog to use new state management */}
      <ProjectMenuDialog 
        isOpen={activeDialog === 'projects'} 
        onClose={handleDialogClose} 
        projects={projects}
        onProjectSelect={handleProjectSelect}
      />
      
      {/* Add other dialog components */}
      {/* TODO: Create and import AboutDialog and ContactDialog components */}
      {/* <AboutDialog isOpen={activeDialog === 'about'} onClose={handleDialogClose} />
      <ContactDialog isOpen={activeDialog === 'contact'} onClose={handleDialogClose} /> */}

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-20 p-6 flex justify-between items-center mx-6">
        
        <div className="flex items-center gap-10">
        <h1 className="text-2xl font-light tracking-tight text-black hover:opacity-70 transition-opacity">
            Kareem Saygbe
          </h1>
          <nav className="flex items-center gap-8 content-center ">
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

        <div className="flex items-center gap-4 ml-auto">
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
      </header>

      {/* Project Display */}
      <Background>
        <AnimatePresence mode="wait">
          <ProjectDisplay
            key={currentProjectIndex}
            project={{
              ...currentProject,
              currentVersion: currentVersion || currentProject.currentVersion,
            }}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        </AnimatePresence>
      </Background>

      {/* Bottom Navigation Container */}
      <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-between items-center mx-6">
        {/* Empty div for flex spacing */}

        <div className="flex item-center text-gray-500">
          <h1 className="text-lg font-light">Full Stack Developer</h1>
        </div>

        {/* Project Navigation - Centered */}
        {/* TODO Center this */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
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

        {/* Version Selector - Right */}
        <div className="flex items-center gap-2">
          {" "}
          {/* Adjust width to match left spacing */}
          {/* <span className="text-black text-sm">Version</span> */}
          <div className="flex gap-2">
            {versions.map((version, index) => (
              <Button
                key={version}
                variant={currentVersion === version ? "outline" : "ghost"}
                size="icon"
                onClick={() => setCurrentVersion(version)}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors w-9 h-9">
                {/* Ensures versions are displayed latest to earliest */}v
                {versions.length - index}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
