import { useState, useEffect } from 'react';
import { Background } from './Background';
import { Project } from '@/types/content';
import { navigationItems } from '@/data/navigationItems';
import { AnimatePresence } from 'framer-motion';
import { ProjectDisplay } from '../ProjectDisplay';

export function MainLayout() {
  const projects = navigationItems.find((item) => item.category === "PROJECTS")?.items as Project[]
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const currentProject = projects[currentProjectIndex]

  const handleNextProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const handlePrevProject = () => {
    setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-20 p-6 flex justify-between items-center text-black">
        <h1 className="text-2xl font-light">Kareem Saybe</h1>
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
            project={currentProject}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        </AnimatePresence>
      </Background>
    </div>
  )
}