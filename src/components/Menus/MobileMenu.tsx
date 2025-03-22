import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu, Linkedin, Github, Twitter } from "lucide-react";
import { Project } from "@/types/content";
import { navigationItems } from "@/data/navigationItems";

interface MobileMenuProps {
  onProjectSelect: (index: number, version: string) => void;
}

const MobileMenu = ({ onProjectSelect }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const projects = navigationItems.find((item) => item.category === "PROJECTS")
    ?.items as Project[];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full p-0 bg-black/10 backdrop-blur-sm text-white
        !duration-300 !transition-opacity
        !animate-in !fade-in-0
        !data-[state=closed]:animate-out !data-[state=closed]:fade-out-0
        !data-[state=open]:slide-in-from-left-0 !data-[state=closed]:slide-out-to-left-0">
        <div className="flex flex-col h-full">
          {/* Logo/Name Section */}
          <div className="p-6 border-b border-gray-800">
            <span className="text-gray-200 text-2xl font-light">Kareem Saygbe</span>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <nav>
              <Button
                variant="ghost"
                className="w-full justify-start px-6 py-4 text-xl font-light text-white hover:bg-transparent hover:text-gray-300"
                onClick={() => setIsOpen(false)}>
                Home
              </Button>

              {/* Projects with dropdown */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="projects" className="border-none">
                  <AccordionTrigger className="w-full px-6 py-4 text-xl font-light text-white hover:text-gray-300 hover:bg-transparent hover:no-underline">
                    Projects
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="space-y-4">
                      {projects.map((project, projectIndex) => (
                        <div key={project.id} className="space-y-2">
                          <h3 className="px-8 py-1 text-base font-medium text-white">
                            {project.name}
                          </h3>
                          <div className="px-10 py-1 space-y-2">
                            {Object.entries(project.versions).map(
                              ([version, details]) => (
                                <Button
                                  key={version}
                                  variant="ghost"
                                  className="w-full justify-start text-sm text-gray-400 hover:text-white hover:bg-transparent"
                                  onClick={() => {
                                    onProjectSelect(projectIndex, version);
                                    setIsOpen(false);
                                  }}>
                                  {details.title} - v{version}
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button
                variant="ghost"
                className="w-full justify-start px-6 py-4 text-xl font-light text-white hover:bg-transparent hover:text-gray-300"
                onClick={() => setIsOpen(false)}>
                About
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start px-6 py-4 text-xl font-light text-white hover:bg-transparent hover:text-gray-300"
                onClick={() => setIsOpen(false)}>
                Contact
              </Button>
            </nav>
          </div>

          {/* Location */}
          <div className="p-6 border-t border-gray-800">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">
              LOCATION
            </h3>
            <p className="text-white">Boston, MA, USA</p>
          </div>

          {/* Contact Information */}
          <div className="p-6 border-t border-gray-800">
            <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">
              WORK
            </h3>
            <div className="space-y-1">
              <p className="text-white">DEKA Research & Development</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="p-6 border-t border-gray-800 self-center">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white hover:text-gray-700">
                <a
                  href="https://www.linkedin.com/in/kareem-saygbe-63b82a1b4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Linkedin className="h-5 w-5 text-black" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white hover:text-gray-700">
                <a
                  href="https://github.com/vintvgx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Github className="h-5 w-5 text-black" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white hover:text-gray-700">
                <a
                  href="https://x.com/devplusdesign"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Twitter className="h-5 w-5 text-black" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
