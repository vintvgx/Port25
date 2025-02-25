import { Project } from "@/types/content";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Globe, Info } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { InfoDialog } from "./InfoDialog";

interface ProjectDisplayProps {
  project: Project;
  onNext: () => void;
  onPrev: () => void;
}

export function ProjectDisplay({
  project,
  onNext,
  onPrev
}: ProjectDisplayProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentVersion = project.versions[project.currentVersion || ""];
  if (!currentVersion) return null;

  const truncatedDescription = currentVersion.description.slice(0, 50);
  const shouldTruncate = !showFullDescription && currentVersion.description.length > 50;

  // Reset video ready state when project changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsVideoReady(false);
  }, [project.id]);

  return (
    <motion.div 
      className="relative w-full h-full touch-pan-y bg-black"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);

        if (swipe < -swipeConfidenceThreshold) {
          onNext();
        } else if (swipe > swipeConfidenceThreshold) {
          onPrev();
        }
      }}
    >
      {/* Video Background with Preloading */}
      <div className="absolute inset-0">
        <ReactPlayer
          url={currentVersion.content.src}
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="100%"
          playsinline={true}
          controls={false}
          onReady={() => setIsVideoReady(true)}
          onError={(e) => console.error("Video error:", e)}
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0,
            pointerEvents: 'none',
            objectFit: 'cover',
            opacity: isVideoReady ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
          config={{
            file: {
              attributes: {
                playsInline: true,
                webkitPlaysInline: true,
                disablePictureInPicture: true,
                controlsList: 'nodownload noplaybackrate',
                preload: 'auto',
              },
            },
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Project Details */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`${project.id}-${project.currentVersion}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12"
        >
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-3xl lg:text-5xl font-bold tracking-tight text-white">
                  {currentVersion.title}
                </h2>
                <div className="flex items-center backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-xs text-white/70">
                    Version {project.currentVersion}
                  </span>
                  {currentVersion?.isLatest && (
                    <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                      Latest
                    </span>
                  )}
                </div>
              </div>

              {/* Info button only on mobile */}
              <div className="block md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => setShowInfoDialog(true)}
                >
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Mobile description with truncation */}
              <div className="block md:hidden">
                <p className="text-gray-200 text-base">
                  {shouldTruncate ? `${truncatedDescription}...` : currentVersion.description}
                  {shouldTruncate && (
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="ml-2 text-white/70 hover:text-white underline text-sm"
                    >
                      more
                    </button>
                  )}
                </p>
              </div>

              {/* Desktop description without truncation */}
              <p className="hidden md:block text-gray-200 text-lg max-w-2xl">
                {currentVersion.description}
              </p>

              {/* Desktop-only content */}
              <div className="hidden md:block space-y-4">
                <div className="space-y-2">
                  <span className="text-xs text-white/60 uppercase tracking-wider">
                    Built with
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentVersion.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs md:text-sm rounded-full px-3 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {currentVersion.links?.demo && (
                    <Button
                      variant="outline"
                      className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/40 h-12 px-6"
                      asChild
                    >
                      <Link href={currentVersion.links.demo}>
                        <Globe className="h-5 w-5" />
                        <span className="ml-2">Demo</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <InfoDialog
        isOpen={showInfoDialog}
        onClose={() => setShowInfoDialog(false)}
        project={project}
        version={project.currentVersion || ""}
      />
    </motion.div>
  );
}
