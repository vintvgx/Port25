import React, { useEffect, useState } from 'react';
import { Project, ProjectVersion, CareerItem, InfoItem } from '@/types/content';
import { Badge } from './ui/badge';
import ReactPlayer from 'react-player';
import BaseReactPlayer from 'react-player/base';
import { Skeleton } from './ui/skeleton';
import { Button } from "./ui/button";
import { Github, Globe } from "lucide-react";

interface ContentDisplayProps {
  content: Project | CareerItem | InfoItem;
  category?: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, category }) => {

    console.log("🚀 ~ file: ContentDisplay.tsx:12 ~ content:", content)

    
  if (!content) return null;

  switch (category) {
    case 'project':
      return RenderProjectContent(content as Project);
    case 'career':
      return renderCareerContent(content as CareerItem);
    case 'info':
      return renderInfoContent(content as InfoItem);
    default:
      return null;
  }
};

const RenderProjectContent = (project: Project) => {
  const [selectedVersion, setSelectedVersion] = useState<string | undefined>(
    project?.currentVersion
  );

  useEffect(() => {
    setSelectedVersion(project?.currentVersion);
  }, [project]);

  const versionInfo = selectedVersion && project?.versions[selectedVersion];
  const hasMultipleVersions = Object.keys(project.versions).length > 1;

  const RenderProject = (content: ProjectVersion) => {

  const [isVideoReady, setIsVideoReady] = useState(false);
    const videoWidth = 640;  // Standard 16:9 video dimensions
    const videoHeight = 360;

    const handleVideoReady = () => {
        setIsVideoReady(true);
      };

    return (
      <div className="space-y-6 text-white">
        {/* Title */}
        {/* <h2 className="text-3xl font-bold">{content.title}</h2> */}
        
        <div className="w-full">
        <div className="max-w-[640px] relative">
          {!isVideoReady && (
            <Skeleton 
              className="absolute top-0 left-0 h-[360px] w-[640px] rounded-xl" 
            />
          )}
          <ReactPlayer
            url={content?.content?.src}
            width={videoWidth}
            height={videoHeight}
            controls={false}
            playing={true}
            muted={true}
            onReady={handleVideoReady}
            style={{
              visibility: isVideoReady ? 'visible' : 'hidden'
            }}
          />
        </div>
      </div>

      <h2 className="text-xl font-bold">{content.title}</h2>
        <p className="text-sm text-gray-300">{content.description}</p>


        {content.technologies && (
          <div className="space-y-2">
            {/* <h3 className="text-lg font-semibold">Technologies</h3> */}
            <div className="flex flex-wrap gap-2 justify-center ">
              {content.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {content.links && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Links</h3>
            <div className="flex gap-4">
              {content.links.demo && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-blue-400 hover:text-blue-300"
                >
                  <a 
                    href={content.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Website
                  </a>
                </Button>
              )}
              {content.links.github && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-blue-400 hover:text-blue-300"
                >
                  <a 
                    href={content.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {hasMultipleVersions && (
        <div className="version-selector">
          <select 
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="bg-gray-800 text-white rounded-md px-3 py-2 border border-gray-700"
          >
            {Object.keys(project.versions).map((version) => (
              <option key={version} value={version}>
                Version {version}
              </option>
            ))}
          </select>
        </div>
      )}
      {versionInfo && RenderProject(versionInfo)}
    </div>
  );
};

const renderCareerContent = (content: CareerItem) => {
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-3xl font-bold">{content.name}</h2>
      <p className="text-lg text-gray-300">{content.description}</p>
      {content.content.type === 'text' && content.content.text && (
        <p className="text-gray-300">{content.content.text}</p>
      )}
      {content.content.type === 'image' && content.content.src && (
        <img 
          src={content.content.src} 
          alt={content.name}
          className="max-w-full rounded-lg"
        />
      )}
    </div>
  );
};

const renderInfoContent = (content: InfoItem) => {
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-3xl font-bold">{content.name}</h2>
      <p className="text-lg text-gray-300">{content.description}</p>
      {content.content.type === 'text' && content.content.text && (
        <p className="text-gray-300">{content.content.text}</p>
      )}
      {content.content.type === 'image' && content.content.src && (
        <img 
          src={content.content.src} 
          alt={content.name}
          className="max-w-full rounded-lg"
        />
      )}
    </div>
  );
};

export default ContentDisplay;