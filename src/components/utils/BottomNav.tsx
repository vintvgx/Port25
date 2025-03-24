import { Project } from '@/types/content';
import { ArrowLeft, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';

interface BottomNavProps {
  currentProjectIndex: number;
  currentVersion: string | undefined;
  projects: Project[];
  currentProject: Project;
  setCurrentVersion: Dispatch<SetStateAction<string | undefined>>;
  handlePrevProject: () => void; 
  handleNextProject: () => void; 
}

export default function BottomNav({currentProjectIndex, projects, handlePrevProject, handleNextProject} : BottomNavProps) {
  
  
  return (
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
    <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100">
            <a
              href="https://www.linkedin.com/in/kareem-saygbe-63b82a1b4/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center">
              <Linkedin className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100">
            <a
              href="https://github.com/vintvgx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center">
              <Github className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100">
            <a
              href="https://x.com/devplusdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center">
              <Twitter className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            </a>
          </Button>
    </div>
  </div>
  )
}
