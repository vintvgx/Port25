import { useState, useEffect } from 'react';
import { Background } from './Background';
import { Project } from '@/types/content';
import { navigationItems } from '@/data/navigationItems';
import { AnimatePresence } from 'framer-motion';
import { ProjectDisplay } from '../ProjectDisplay';
import { Button } from '../ui/button';
import { ProjectTimeline } from '../ProjectTimeline';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
      {/* "text-xl font-medium tracking-tight hover:opacity-70 transition-opacity" */}
      <header className="fixed top-0 left-0 right-0 z-20 p-6 flex justify-between items-center ">
        <h1 className="text-2xl font-light tracking-tight text-black hover:opacity-70 transition-opacity">Kareem Saygbe</h1>
        {/* text-sm text-gray-600 hover:text-gray-900 transition-colors */}
        <nav className="flex gap-8">
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-opacity">Projects</button>
          <button className="text-sm text-gray-600 hover:text-gray-900  transition-opacity">About</button>
          <button className="text-sm text-gray-600 hover:text-gray-900  transition-opacity">Contact</button>
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

         {/* Project Navigation */}
         {/* <div className="flex items-center gap-4 text-sm text-gray-500">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous project</span>
              </Button>
              <span className="text-xs tracking-wider uppercase">01 / 04</span>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next project</span>
              </Button>
            </div> */}
      </Background>

        {/* TODO fix timeline (place navigation indicators + version selector correctly ) */}
      {/* <ProjectTimeline
        projects={projects}
        currentProjectIndex={currentProjectIndex}
        currentVersion={currentVersion}
        onProjectSelect={setCurrentProjectIndex}
        onVersionSelect={setCurrentVersion}
      /> */}

{/* Bottom Navigation Container */}
<div className="fixed bottom-0 left-0 right-0 p-6 flex justify-between items-center">
        {/* Empty div for flex spacing */}
        <div className="w-[200px]" /> {/* Adjust width as needed */}

        {/* Project Navigation - Centered */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-gray-100 rounded-full"
            onClick={handlePrevProject}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous project</span>
          </Button>
          <span className="text-xs tracking-wider uppercase">
            {`${String(currentProjectIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-gray-100 rounded-full"
            onClick={handleNextProject}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next project</span>
          </Button>
        </div>

        {/* Version Selector - Right */}
        {/* {versions.length > 1 ? ( */}
          <div className="flex items-center gap-2 w-[200px]"> {/* Adjust width to match left spacing */}
            {/* <span className="text-black text-sm">Version</span> */}
            <div className="flex gap-2">
              {versions.map((version) => (
                // <Button
                //   key={version}
                //   variant={currentVersion === version ? "default" : "outline"}
                //   size="sm"
                //   onClick={() => setCurrentVersion(version)}
                //   className={`
                //     ${currentVersion === version 
                //       ? 'bg-white text-black' 
                //       : 'bg-white/10 text-black hover:bg-white/20'
                //     }
                //   `}
                // >
                //   {version}
                // </Button>
                <Button
                key={version}
                variant={currentVersion === version ? "outline" : "ghost"}
                // variant="ghost"
                size="sm"
                onClick={() => setCurrentVersion(version)}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Version {version}
                {/* {currentVersionData.isLatest && (
                  <span className="ml-2 text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full">Latest</span>
                )} */}
              </Button>
              ))}
            </div>
          </div>
        {/* ) : (
          <div className="w-[200px]" /> 
        )} */}
      </div>
    </div>
  )
}