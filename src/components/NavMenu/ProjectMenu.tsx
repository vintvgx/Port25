import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { MenuDialog } from '@/types/menu';

export default function ProjectMenuDialog({
  isOpen,
  onClose,
  projects,
  onProjectSelect,
}: MenuDialog) {

  if (!projects) return null;

  const handleProjectClick = (projectIndex: number, version: string) => {
    onProjectSelect?.(projectIndex, version);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white/90 backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium tracking-tight text-gray-900">
            Projects
          </DialogTitle>
        </DialogHeader>

        <div className="mt-8 divide-y divide-gray-100">
          {projects?.map((project, index) => (
            <div key={project.id} className="py-6 first:pt-0 last:pb-0">
              <div className="px-4 py-2 text-lg font-medium text-gray-900">
                {project.name}
              </div>
              
              <div className="mt-2 space-y-px">
                {Object.entries(project.versions).map(([version, details]) => (
                  <div
                    key={version}
                    onClick={() => handleProjectClick(index, version)}
                    className="group flex items-center justify-between px-4 py-3 cursor-pointer transition-colors hover:bg-gray-100/80"
                  >
                    <div className="flex items-center text-sm text-gray-500 space-x-3">
                      <span>Version {version}</span>
                      <span className="text-gray-400">•</span>
                      <span>{details.date}</span>
                    </div>
                    
                    <ChevronRight 
                      className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1" 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}