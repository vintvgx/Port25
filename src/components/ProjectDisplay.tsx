import { Project } from "@/types/content";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Globe } from "lucide-react";
import { useGesture } from "@use-gesture/react";
import Link from "next/link";

interface ProjectDisplayProps {
  project: Project;
  onNext: () => void;
  onPrev: () => void;
}

export function ProjectDisplay({
  project,
  onNext,
  onPrev,
}: ProjectDisplayProps) {
  // Add gesture handling
  const bind = useGesture(
    {
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
    },
    {
      // Configure gesture options
      drag: {
        threshold: 50, // Minimum distance before gesture is activated
        filterTaps: true,
        rubberband: true,
      },
      wheel: {
        axis: "x", // Only track horizontal scrolling
      },
    }
  );

  const currentVersion = project.versions[project.currentVersion || ""];
  if (!currentVersion) return null;

  return (
    <div className="relative w-full h-full touch-pan-y bg-white" {...bind()}>
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
      {/* TODO Update to black background and layer video on top | test with using bg-black/90 */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Project Details */}
      <div className="absolute bottom-0 left-0 right-0 p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="space-y-6">
          <div className="flex flex-row items-center gap-5">
            <h2 className="text-5xl font-bold tracking-tight text-white">
              {currentVersion.title}
            </h2>
            <div className="flex items-center mt-1 backdrop-blur-sm rounded-full px-3 py-1 ">
              <span className="text-xs text-white/70">Version {project.currentVersion}</span>
              {currentVersion?.isLatest && (
                <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full  border-green-500/30">
                  Latest
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-200 text-lg max-w-2xl">
            {currentVersion.description}
          </p>

          {/* Technology Stack */}
          <div className="space-y-2">
            <span className="text-xs text-white/60 uppercase tracking-wider">
              Built with
            </span>
            <div className="flex flex-wrap gap-2">
              {currentVersion.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-full px-4 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          {currentVersion.links && (
            <div className="flex gap-4">
              {currentVersion.links.demo && (
                <Button
                  variant="outline"
                  className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-black hover:bg-white/40"
                  asChild>
                  <Link
                    href={currentVersion.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Demo
                  </Link>
                </Button>
              )}
              {currentVersion.links.github && (
                <Button
                  variant="outline"
                  className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-black hover:bg-white/40"
                  asChild>
                  <Link
                    href={currentVersion.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              )}
            </div>
          )}
        </motion.div>
        {/* <div className="absolute bottom-6 right-6">
          <Button
            variant="ghost"
            size="sm"
            disabled={true}
            className="text-sm text-white/80 hover:text-white/100 transition-colors">
            Version {project.currentVersion}
          </Button>
        </div> */}
      </div>
    </div>
  );
}
