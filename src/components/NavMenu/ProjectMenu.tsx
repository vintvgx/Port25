"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuDialog } from "@/types/menu";

export default function ProjectMenuDialog({
  isOpen,
  onClose,
  projects,
  onProjectSelect,
}: MenuDialog) {

  if (!projects) return null;

  const handleProjectClick = (projectIndex: number) => {
    onProjectSelect?.(projectIndex);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">
            Projects
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {projects?.map((project, index) => (
            <div 
              key={project.id} 
              className="space-y-3 cursor-pointer hover:bg-muted/50 p-4 rounded-lg transition-colors"
              onClick={() => handleProjectClick(index)}
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <div className="space-y-2">
                {Object.entries(project.versions).map(([version, details]) => (
                  <div
                    key={version}
                    className="grid grid-cols-[1fr,auto,auto] gap-4 items-center py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="font-medium">{details.title}</div>
                    <div className="text-sm text-muted-foreground">
                      version {version}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {details.date}
                    </div>
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
