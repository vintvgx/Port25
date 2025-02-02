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
      <div className="flex flex-col h-full px-6 md:px-20">
        <div className="py-10">
          <h1 className="text-4xl font-bold text-white">Kareem Saygbe</h1>
        </div>
        <div className="flex flex-col md:flex-row flex-1">
          {/* Left side navigation */}
          <div className="w-full md:w-1/2 p-8 flex mt-32">
            <TextNavigation onItemSelect={handleContentSelect} />
          </div>
          
          {/* Right side content */}
          <div className="w-full md:w-1/2 p-8 flex mt-32 justify-center">
            {selectedContent && (
              <ContentDisplay 
                key={selectedContent.name}
                content={selectedContent} 
                category={selectedContent.category}
              />
            )}
          </div>
        </div>
      </div>
    </Background>
  );
} 