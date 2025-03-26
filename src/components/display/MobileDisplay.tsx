import { Project, ProjectVersion } from "@/types/content";
import { AnimatePresence, motion } from "framer-motion";
import { X, Info, Globe, Github } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface MobileDisplayProps {
    currentVersion: ProjectVersion | undefined;
    isInfoExpanded: boolean;
    toggleInfoPanel: () => void;
    project: Project;
  }
  
  function MobileDisplay({ currentVersion, isInfoExpanded, toggleInfoPanel, project }: MobileDisplayProps) {
    if (!currentVersion) return null;

    return (
      <>
        {/* Mobile View: Header with Title and Info/Close button */}
        <div className="lg:hidden sticky top-0 z-10 px-6 pt-6 pb-3 flex items-center justify-between bg-gradient-to-b from-black/40 to-black/0">
          <h2 className="text-3xl font-bold tracking-tight text-white pr-3">
            {currentVersion.title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="text-white flex-shrink-0"
            onClick={toggleInfoPanel}
          >
            {isInfoExpanded ? (
              <X className="h-5 w-5" />
            ) : (
              <Info className="text-[#D5661C] h-5 w-5" />
            )}
          </Button>
        </div>
  
        {/* Mobile View: Expandable Content Panel */}
        <AnimatePresence>
          {isInfoExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-24 space-y-6"
            >
              {/* Version tag */}
              <div className="flex items-center backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                <span className="text-xs text-white/70">
                  Version {project.currentVersion}
                </span>
                {currentVersion?.isLatest && (
                  <span className="ml-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                    Latest
                  </span>
                )}
              </div>
  
              {/* Full description */}
              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">Description</h3>
                <p className="text-gray-200 text-base">
                  {currentVersion.description}
                </p>
              </div>
  
              {/* Technologies */}
              <div className="space-y-2">
                <h3 className="text-sm uppercase tracking-wider text-white/60">
                  Built with
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentVersion.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs rounded-full px-3 py-1 bg-black/40 text-white border-white/10 backdrop-blur-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
  
              {/* Links */}
              {currentVersion.links && (
                <div className="flex flex-wrap gap-3 mt-4">
                  {currentVersion.links?.demo && (
                            <Button
                              variant="outline"
                              className="rounded-full bg-white/30 backdrop-blur-sm border-white/50 text-white hover:bg-white/40 h-12 px-6 flex items-center"
                              asChild>
                              <a href={currentVersion.links.demo} className="inline-flex items-center">
                                <Globe className="h-5 w-5 flex-shrink-0" />
                                <span className="ml-2 whitespace-nowrap">Demo</span>
                              </a>
                            </Button>
                          )}
                          {currentVersion.links?.github && (
                            <Button
                              variant="outline"
                              className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 h-12 px-6 flex items-center"
                              asChild>
                              <a href={currentVersion.links.github} className="inline-flex items-center">
                              <Github className="h-5 w-5 flex-shrink-0" />
                                <span className="ml-2 whitespace-nowrap">GitHub</span>
                              </a>
                            </Button>
                          )}
                </div>
              )}
  
              {/* Release Date */}
              <div className="pt-4">
                <h3 className="text-sm uppercase tracking-wider text-white/60 mb-2">Release</h3>
                <p className="text-gray-200 text-sm">{currentVersion.date}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  export default MobileDisplay;