import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Project } from "@/types/content";
import { Badge } from "./ui/badge";

interface InfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  version: string;
}

export function InfoDialog({ isOpen, onClose, project, version }: InfoDialogProps) {
  const currentVersion = project.versions[version];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {currentVersion.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
            <p className="text-gray-900">{currentVersion.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {currentVersion.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Version Info</h3>
            <div className="text-sm text-gray-600">
              <p>Version: {version}</p>
              <p>Release Date: {currentVersion.date}</p>
              {currentVersion.isLatest && (
                <p className="text-green-600 font-medium">Latest Release</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 