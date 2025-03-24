import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button';
import { DialogHeader, DialogFooter } from '../ui/dialog';
import { Project } from '@/types/content';

interface VideoLoadErrorDialogType {
    currentProject: Project;
    videoErrors: Record<string, boolean>;
    setVideoErrors: Dispatch<SetStateAction<Record<string, boolean>>>;
    currentProjectIndex: number;
}

export default function VideoLoadErrorDialog({currentProject, videoErrors, setVideoErrors, currentProjectIndex}: VideoLoadErrorDialogType) {
  return (
     <Dialog 
     open={!!currentProject && videoErrors[currentProject.id] === true} 
     onOpenChange={(open) => {
       if (!open) {
         // If user somehow closes dialog without refreshing, clear the error
         if (currentProject) {
           setVideoErrors(prev => ({ ...prev, [currentProject.id]: false }));
         }
       }
     }}
   >
     <DialogContent 
       className="bg-black/90 border-gray-800 max-w-md"
       // Force dialog to stay open until button is clicked
       onPointerDownOutside={(e) => e.preventDefault()}
       onEscapeKeyDown={(e) => e.preventDefault()}
     >
       <DialogHeader>
         <DialogTitle className="text-xl font-bold text-white text-center">
           Video Load Error
         </DialogTitle>
       </DialogHeader>
       
       <div className="py-4">
         <p className="text-white text-center mb-4">
           Please refresh to reload the page
         </p>
       </div>
       
       <DialogFooter>
         <Button 
           className="w-full bg-white text-black hover:bg-gray-200"
           onClick={() => {
             // Save current project index to sessionStorage
             sessionStorage.setItem(
               "lastProjectIndex",
               String(currentProjectIndex)
             );
             // Reload the page
             window.location.reload();
           }}
         >
           Refresh
         </Button>
       </DialogFooter>
     </DialogContent>
   </Dialog>
  )
}