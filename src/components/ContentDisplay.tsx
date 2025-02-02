import React, { useEffect, useState } from 'react';
import { Project, ProjectVersion, CareerItem, InfoItem } from '@/types/content';
import { Badge } from './ui/badge';

interface ContentDisplayProps {
  content: Project | CareerItem | InfoItem;
  category?: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, category }) => {

    console.log("🚀 ~ file: ContentDisplay.tsx:12 ~ content:", content)

    
  if (!content) return null;

  switch (category) {
    case 'project':
      return renderProjectContent(content as Project);
    case 'career':
      return renderCareerContent(content as CareerItem);
    case 'info':
      return renderInfoContent(content as InfoItem);
    default:
      return null;
  }
};

const renderProjectContent = (project: Project) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedVersion, setSelectedVersion] = useState<string | undefined>(
    project?.currentVersion
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setSelectedVersion(project?.currentVersion);
  }, [project]);

  const versionInfo = selectedVersion && project?.versions[selectedVersion];
  const hasMultipleVersions = Object.keys(project.versions).length > 1;

  const renderContent = (content: ProjectVersion) => {
    return (
      <div className="space-y-6 text-white">
        <h2 className="text-3xl font-bold">{content.title}</h2>
        <p className="text-lg text-gray-300">{content.description}</p>

        {content.technologies && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {content.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {content.content && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Content</h3>
            {content.content.type === 'text' && content.content.text && (
              <p className="text-gray-300">{content.content.text}</p>
            )}
            {content.content.type === 'image' && content.content.src && (
              <img 
                src={content.content.src} 
                alt={content.title}
                className="max-w-full rounded-lg"
              />
            )}
          </div>
        )}

        {content.links && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Links</h3>
            <div className="flex gap-4">
              {content.links.demo && (
                <a 
                  href={content.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Demo
                </a>
              )}
              {content.links.github && (
                <a 
                  href={content.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  GitHub
                </a>
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
      {versionInfo && renderContent(versionInfo)}
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