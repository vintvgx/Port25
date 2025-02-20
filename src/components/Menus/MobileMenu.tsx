import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Project } from "@/types/content";
import { navigationItems } from "@/data/navigationItems";

interface MobileMenuProps {
  onProjectSelect: (index: number, version: string) => void;
}

const MobileMenu = ({ onProjectSelect }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const projects = navigationItems.find(
    (item) => item.category === "PROJECTS"
  )?.items as Project[];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-0 bg-black text-white">
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b border-gray-800">
            <span className="text-xl font-light">Menu</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Accordion type="single" collapsible className="w-full">
              {/* Projects Section */}
              <AccordionItem value="projects" className="border-b border-gray-800">
                <AccordionTrigger className="px-4 py-4 text-lg hover:text-gray-300">
                  Projects
                </AccordionTrigger>
                <AccordionContent>
                  {projects.map((project, projectIndex) => (
                    <Accordion type="single" collapsible key={project.id}>
                      <AccordionItem value={project.id} className="border-none">
                        <AccordionTrigger className="px-6 py-2 text-base hover:text-gray-300">
                          {project.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-8 py-2 space-y-2">
                            {Object.entries(project.versions).map(([version, details]) => (
                              <Button
                                key={version}
                                variant="ghost"
                                className="w-full justify-start text-sm text-gray-400 hover:text-white"
                                onClick={() => {
                                  onProjectSelect(projectIndex, version);
                                  setIsOpen(false);
                                }}
                              >
                                {details.title} - v{version}
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* About Section */}
              <AccordionItem value="about" className="border-b border-gray-800">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-4 text-lg text-white hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Button>
              </AccordionItem>

              {/* Contact Section */}
              <AccordionItem value="contact" className="border-b border-gray-800">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-4 text-lg text-white hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Button>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;