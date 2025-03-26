import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import * as Sentry from "@sentry/nextjs"; 

interface SwipeInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOCAL_STORAGE_KEY = "swipe-instructions-viewed";

export default function SwipeInstructionsModal({
  isOpen,
  onClose,
}: SwipeInstructionsModalProps) {
  const handleDismiss = () => {
    try {
      // Report to Sentry that swipe instructions were dismissed
      Sentry.captureMessage("Swipe instructions dismissed", {
        level: "info"
      });

      // Save to localStorage that user has seen the instructions
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      onClose();
    } catch (error) {
      console.warn("Could not save swipe instructions state:", error);
      Sentry.captureException(error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      aria-labelledby="swipe-instructions-title"
      aria-describedby="swipe-instructions-description">
      <DialogOverlay className="bg-white/50">
        <DialogContent
          className="max-w-md bg-black/50 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-0 overflow-hidden"
          showCloseButton={false}>
          <div className="p-6 space-y-8">
            <DialogHeader className="space-y-3">
              <DialogTitle id="swipe-instructions-title" className="text-2xl font-medium text-center text-white">
                Navigation Instructions
              </DialogTitle>
              <p id="swipe-instructions-description" className="text-center text-gray-300 font-normal text-sm">
                Swipe left or right to navigate through the projects.
              </p>
            </DialogHeader>

            {/* Swipe Animation */}
            <div className="relative w-full h-24 flex items-center justify-center">
              {/* Background project indicator */}
              <div className="absolute w-28 h-16 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white/30 text-xs uppercase tracking-wider">
                  Project
                </span>
              </div>

              {/* Hand gesture */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center z-10"
                initial={{ x: 0 }}
                animate={{
                  x: [0, 50, -50, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                  times: [0, 0.25, 0.75, 1],
                }}>
                <motion.div
                  className="bg-white/80 rounded-full p-3 shadow-lg"
                  animate={{ scale: [1, 0.9, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(0,0,0,0.7)"
                    strokeWidth="2"
                    className="w-7 h-7">
                    <path d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Direction indicators */}
              <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
                <motion.div
                  className="text-white/50"
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5,
                    repeatDelay: 1.5,
                  }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 19L8 12L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  className="text-white/50"
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 2,
                    repeatDelay: 1.5,
                  }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 5L16 12L9 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-0">
            <Button
              onClick={handleDismiss}
              className="w-full h-14 rounded-none bg-white/10 hover:bg-white/15 text-white text-sm font-medium tracking-wide border-t border-white/10 focus:ring-0 focus:ring-offset-0">
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export const hasSeenSwipeInstructions = (): boolean => {
  if (typeof window === "undefined") return false;
  const swipeSeen = localStorage.getItem(LOCAL_STORAGE_KEY);
  return swipeSeen === "true";
};
