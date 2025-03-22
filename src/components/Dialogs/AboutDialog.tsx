import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, Linkedin, Mail } from "lucide-react";

interface AboutDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export default function AboutDialog({
  isOpen,
  onClose,
}: AboutDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full md:max-w-2xl h-[80vh] md:h-auto bg-white/90 backdrop-blur-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-medium tracking-tight text-gray-900 text-center">
            About Me
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 md:mt-8 px-4 md:px-6">
          <div className="text-sm md:text-base text-gray-700 space-y-4 text-center">
            <p>
              My name is Kareem Saygbe, a Full Stack Engineer with a passion for technology and art. I started my professional journey at DEKA Research & Development, an organization dedicated to innovating health devices. My work at DEKA involved developing GUIs in Python, primarily focusing on testing the functionality of FDA-approved medical devices, as well as providing development, unit and automation testing for a Kotlin Android application designed for a Remodulin medical device.
            </p>
            <p>
              In my pursuit of becoming an experienced full-stack engineer, I&apos;ve worked on personal projects that reflect my commitment to creating software that connects people and emphasizes their stories over commercialization. Among my projects is a MERN stack chatbot React app designed to respond to users in authentic urban rhetoric. I&apos;ve also crafted a React Native media-sharing social network application from the ground up. I&apos;ve worked on these projects solely, and they represent my dedication to technology with a human touch.
            </p>
            <p>
              Beyond my technical interests, I am deeply passionate about art and photography. I find inspiration in my surroundings, often traveling within my community to capture its essence. My lens is not just focused on the visual, but on the stories and cultures I encounter along the way. This love for art and storytelling blends with my goals as a software engineer by keeping the focus on the art and narratives that make us human.
            </p>
          </div>
          
          <div className="mt-8 flex justify-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/kareem-saygbe-63b82a1b4/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a 
              href="https://github.com/vintvgx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a 
              href="mailto:email@example.com" 
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 