import { useState } from 'react';
import { Background } from './Background';
import { TextNavigation } from '../features/TextNavigation';
import ContentDisplay from '../ContentDisplay';
import { Project, CareerItem, InfoItem } from '@/types/content';

export function MainLayout() {
  const [selectedContent, setSelectedContent] = useState<Project | CareerItem | InfoItem | null>(null);

  const handleContentSelect = (content: Project | CareerItem | InfoItem | null) => {
    // Reset state before setting new content
    setSelectedContent(null);
    // Use setTimeout to ensure state reset happens before new content
    setTimeout(() => {
      setSelectedContent(content);
    }, 0);
  };

  return (
    <Background>
      <div className="flex h-full">
        {/* Left side navigation */}
        <div className="w-1/2 p-8 flex items-center">
          <TextNavigation onItemSelect={handleContentSelect} />
        </div>
        
        {/* Right side content */}
        <div className="w-1/2 p-8 flex items-center justify-center">
          {selectedContent && (
            <ContentDisplay 
              key={selectedContent.name}
              content={selectedContent} 
              category={selectedContent.category}
            />
          )}
        </div>
      </div>
    </Background>
  );
} 