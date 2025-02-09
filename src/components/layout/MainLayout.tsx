import { useState, useEffect } from 'react';
import { Background } from './Background';
import { Project } from '@/types/content';
import { navigationItems } from '@/data/navigationItems';
import { AnimatePresence } from 'framer-motion';
import { ProjectDisplay } from '../ProjectDisplay';
import { Button } from '../ui/button';

export function MainLayout() {
  const projects = navigationItems.find((item) => item.category === "PROJECTS")?.items as Project[];
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentVersion, setCurrentVersion] = useState<string | undefined>();
  const currentProject = projects[currentProjectIndex];

  // Set initial version when project changes
  useEffect(() => {
    setCurrentVersion(currentProject.currentVersion);
  }, [currentProject]);

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  // Get available versions for current project
  const versions = currentProject ? Object.keys(currentProject.versions) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-20 p-6 flex justify-between items-center text-black">
        <h1 className="text-2xl font-light">Kareem Saygbe</h1>
        <nav className="flex gap-8">
          <button className="hover:opacity-75 transition-opacity">Projects</button>
          <button className="hover:opacity-75 transition-opacity">About</button>
          <button className="hover:opacity-75 transition-opacity">Contact</button>
        </nav>
      </header>

      {/* Project Display */}
      <Background>
        <AnimatePresence mode="wait">
          <ProjectDisplay
            key={currentProjectIndex}
            project={{
              ...currentProject,
              currentVersion: currentVersion || currentProject.currentVersion
            }}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        </AnimatePresence>
        
        {/* Navigation Indicators */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentProjectIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </Background>

      {/* Version Selector */}
      {versions.length > 1 && (
            <div className="flex items-center gap-2 fixed bottom-0 right-0 z-20 p-6">
              <span className="text-black text-sm">Version</span>
              <div className="flex gap-2">
                {versions.map((version) => (
                  <Button
                    key={version}
                    variant={currentVersion === version ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentVersion(version)}
                    className={`
                      ${currentVersion === version 
                        ? 'bg-white text-black' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    {version}
                  </Button>
                ))}
              </div>
            </div>
          )}
    </div>
  )
}