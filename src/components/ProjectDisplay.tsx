import { Project } from '@/types/content';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Github, Globe } from 'lucide-react';
import { useGesture } from '@use-gesture/react';
import Link from 'next/link'

interface ProjectDisplayProps {
  project: Project;
  onNext: () => void;
  onPrev: () => void;
}

export function ProjectDisplay({ project, onNext, onPrev }: ProjectDisplayProps) {
  // Add gesture handling
  const bind = useGesture({
    // Handle both scroll and swipe
    onDrag: ({ direction: [x], velocity, cancel }) => {
      // Only trigger if the gesture is primarily horizontal and has enough velocity
      if (Math.abs(velocity) > 0.2) {
        if (x < 0) onNext();
        if (x > 0) onPrev();
        cancel(); // Prevent further gesture processing
      }
    },
    // Handle mouse wheel/trackpad horizontal scroll
    onWheel: ({ direction: [x], velocity, event }) => {
      // Prevent vertical scrolling
      event.preventDefault();
      
      // Only trigger if the gesture is primarily horizontal and has enough velocity
      if (Math.abs(velocity) > 1) {
        if (x < 0) onNext();
        if (x > 0) onPrev();
      }
    },
  }, {
    // Configure gesture options
    drag: {
      threshold: 50, // Minimum distance before gesture is activated
      filterTaps: true,
      rubberband: true,
    },
    wheel: {
      axis: 'x', // Only track horizontal scrolling
    }
  });

  const currentVersion = project.versions[project.currentVersion || ''];
  if (!currentVersion) return null;

  return (
    <div 
      className="relative w-full h-full touch-pan-y bg-white"
      {...bind()}
    >
      {/* Video Background */}
      {/* TODO update videos */}
      <div className="absolute inset-0 ">
        <ReactPlayer
          url={currentVersion.content.src}
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          // config={{
          //   file: {
          //     attributes: {
          //       style: {
          //         width: "50%",
          //         height: "100%",
          //         objectFit: "cover",
          //       },
          //     },
          //   },
          // }}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Project Details */}
      <div className="absolute bottom-0 left-0 right-0 p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-light text-white">{currentVersion.title}</h2>
          <p className="text-gray-200 text-lg max-w-2xl">{currentVersion.description}</p>

          {/* Technologies */}
          {/* <div className="flex flex-wrap gap-2">
            {currentVersion.technologies.map((tech) => (
              <span key={tech} className="text-gray-300">
                {tech}
              </span>
            ))}
          </div> */}

            {/* Technology Stack */}
            <div className="flex flex-wrap gap-2">
              {currentVersion.technologies.map((tech) => (
                 <Badge key={tech} variant="secondary" className="rounded-full px-4 py-1">
                 {tech}
               </Badge>
                // <Badge key={tech} >
                //   {tech}
                // </Badge>
              ))}
            </div>
          {/* <div className="flex flex-wrap gap-2">
              {["React Native", "TypeScript", "Firebase"].map((tech) => (
                <Badge key={tech} variant="secondary" className="rounded-full px-4 py-1">
                  {tech}
                </Badge>
              ))}
            </div> */}

          {/* Links */}
          {currentVersion.links && (
              <div className="flex gap-4">
                {currentVersion.links.demo && (
            <Button variant="outline" className="rounded-full" asChild>
                    <Link 
                      href={currentVersion.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Globe className="h-4 w-4" />
                      Demo
                    </Link>
                  </Button>
                )}
                {currentVersion.links.github && (
            <Button variant="outline" className="rounded-full" asChild>
                    <Link 
                      href={currentVersion.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                <Github className="h-4 w-4" />
                View on GitHub
                    </Link>
                  </Button>
                )}
              </div>
            )}
            
        </motion.div>
      </div>

      {/*TODO DELETE Deprecated  */}
      {/* Navigation Buttons */}
      {/* <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <Button onClick={onPrev} className="bg-white/10 hover:bg-white/20">
          Prev
        </Button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <Button onClick={onNext} className="bg-white/10 hover:bg-white/20">
          Next
        </Button>
      </div> */}
    </div>
  )
}
