import { Project } from '@/types/content'
import { DialogProps } from '@/types/menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronRight } from "lucide-react"

interface VersionCtrlDialogProps extends DialogProps {
  currentProject?: Project
  currentVersion?: string
  setCurrentVersion?: (version: string) => void
}

export default function VersionCtrlDialog({ 
  isOpen, 
  onClose, 
  currentProject, 
  currentVersion,
  setCurrentVersion 
}: VersionCtrlDialogProps) {
  if (!currentProject) return null

  const handleVersionSelect = (version: string) => {
    if (setCurrentVersion) {
      setCurrentVersion(version)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full md:max-w-lg bg-white/90 backdrop-blur-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-medium tracking-tight text-gray-900">
            {currentProject.name} - Versions
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-1">
          {Object.entries(currentProject.versions).map(([version, details]) => (
            <div
              key={version}
              onClick={() => handleVersionSelect(version)}
              className={`
                group flex items-center justify-between px-4 py-4 md:py-3 
                cursor-pointer transition-colors hover:bg-gray-100/80
                ${version === currentVersion ? 'bg-gray-100' : ''}
              `}
            >
              <div className="flex items-center text-sm text-gray-500 space-x-3">
                <span>Version {version}</span>
                <span className="text-gray-400">•</span>
                <span>{details.date}</span>
                {details.isLatest && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-emerald-600 font-medium">Latest</span>
                  </>
                )}
              </div>
              
              <ChevronRight 
                className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1" 
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
