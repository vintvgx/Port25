import { ProjectConfig } from '@/types/Project';
import React, { useEffect, useState } from 'react';
import {  P, Link, H2 } from '@/components/Typography';
import Video from "next-video";



interface ProjectCardProps extends ProjectConfig {
  className?: string;
  isVisible?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  backgroundColor = 'bg-blue-100',
  technologies,
  contentVideo,
  links,
  className = '',
  isVisible = false,
}) => {
  const [bgColor, setBgColor] = useState(backgroundColor);

  useEffect(() => {
    if (isVisible) {
      setBgColor(backgroundColor);
      document.body.style.backgroundColor = backgroundColor.replace('bg-', '');
    }
  }, [isVisible, backgroundColor]);

  return (
    <div className={`h-screen w-full flex items-center justify-center ${bgColor} ${className} transition-colors duration-500 relative overflow-hidden`}>
      {contentVideo && (
        <div className="absolute inset-0 w-full h-full">
          <Video 
            src={contentVideo} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="text-center max-w-2xl mx-auto px-4 relative z-10">
        <H2 className="text-4xl font-bold mb-4">{title}</H2>
        <P className="text-xl mb-6">{description}</P>
        
        {technologies && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        )}

        {links && (
          <div className="flex justify-center gap-4">
            {links.demo && (
              <Link href={links.demo} className="text-blue-600 hover:text-blue-800">
                Demo
              </Link>
            )}
            {links.github && (
              <Link href={links.github} className="text-blue-600 hover:text-blue-800">
                GitHub
              </Link>
            )}
            {links.live && (
              <Link href={links.live} className="text-blue-600 hover:text-blue-800">
                Live Site
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 