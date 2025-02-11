import { format, parse } from "date-fns"
import { motion } from "framer-motion"
import type { Project } from "@/types/content"
import { Button } from "./ui/button"

interface ProjectTimelineProps {
  projects: Project[]
  currentProjectIndex: number
  currentVersion: string | undefined
  onProjectSelect: (index: number) => void
  onVersionSelect: (version: string) => void
}

export function ProjectTimeline({
  projects,
  currentProjectIndex,
  currentVersion,
  onProjectSelect,
  onVersionSelect,
}: ProjectTimelineProps) {
  // Get all versions across all projects
  const allVersions = projects
    .flatMap((project) =>
      Object.entries(project.versions).map(([version, details]) => ({
        projectIndex: projects.indexOf(project),
        version,
        date: parse(details.date, "MM/yyyy", new Date()),
        isCurrentProject: projects.indexOf(project) === currentProjectIndex,
        isCurrentVersion: version === currentVersion && projects.indexOf(project) === currentProjectIndex,
      })),
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const currentProject = projects[currentProjectIndex]
  const versions = currentProject ? Object.keys(currentProject.versions) : []

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 w-full bg-gradient-to-t from-white/10 to-transparent pb-8 pt-12">
      <div className="px-8 w-full">
        {/* Timeline of all versions */}
        <div className="relative flex items-center justify-between mb-8 w-full">
          <div className="absolute left-0 right-0 h-[2px] bg-black/20" />
          {allVersions.map((versionInfo) => (
            <motion.button
              key={`${versionInfo.projectIndex}-${versionInfo.version}`}
              onClick={() => {
                onProjectSelect(versionInfo.projectIndex);
                onVersionSelect(versionInfo.version);
              }}
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  versionInfo.isCurrentVersion
                    ? "bg-black"
                    : versionInfo.isCurrentProject
                    ? "bg-black/60"
                    : "bg-black/40"
                }`}
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-black/60">
                {format(versionInfo.date, "MMM yyyy")}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Project Navigation and Controls Row */}
        <div className="flex items-center justify-between max-w-xl">
          {/* Project Name - Left */}
          <div className="flex-1 text-lg font-medium text-white text-left">
            {currentProject?.name}
          </div>

          {/* Project Navigation Indicators - Center */}
          <div className="flex gap-2 flex-1 justify-center">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => onProjectSelect(index)}
                className="group flex flex-col items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    index === currentProjectIndex ? "bg-black" : "bg-black/40"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Version Selection - Right */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            {versions.length > 1 && (
              <>
                <span className="text-sm text-white/60">Version</span>
                <div className="flex gap-2">
                  {versions.map((version) => (
                    <Button
                      key={version}
                      variant={currentVersion === version ? "default" : "outline"}
                      size="sm"
                      onClick={() => onVersionSelect(version)}
                      className={`
                        ${currentVersion === version 
                          ? "bg-white text-black" 
                          : "bg-white/10 text-white hover:bg-white/20"
                        }
                      `}
                    >
                      {version}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}