import { ProjectConfig } from '@/types/Project';
import React, { useEffect, useState } from 'react';
import { P, Link, H2 } from '@/components/Typography';
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
    <div className={`h-screen w-full relative overflow-hidden ${bgColor} ${className} transition-colors duration-500`}>
      {/* Video/Content Background */}
      {contentVideo && (
        <div className="absolute inset-0 w-full h-full">
          <Video 
            src={contentVideo} 
            controls={false}
            loop={true}
            muted={true}
            autoPlay={true}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div 
        className="absolute bottom-0 w-full h-64" 
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5))',
        }}
      />

      {/* Content Container with Blur Effect */}
      <div className="absolute bottom-0 w-full">
        <div className="relative">
          {/* Blur Background */}
          <div 
            className="absolute inset-0 backdrop-blur-2xl bg-white/10"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)', // Adds subtle border for glass effect
            }}
          />
          
          {/* Content */}
          <div className="relative p-6 w-full">
            <div className="flex justify-between items-end max-w-7xl mx-auto backdrop-blur-sm">
              {/* Left side: Title, Description, Technologies */}
              <div className="max-w-2xl">
                <H2 className="text-3xl font-bold mb-4 text-white/90">{title}</H2>
                <P className="text-lg mb-6 text-white/80">{description}</P>
                
                {technologies && (
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-sm text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right side: View Website button */}
              <div className="ml-8 flex-shrink-0">
                {links?.live && (
                  <Link 
                    href={links.live}
                    className="px-6 py-3 bg-white/15 backdrop-blur-md hover:bg-white/25 
                              rounded-lg text-white/90 transition-colors duration-300"
                  >
                    View Website
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;