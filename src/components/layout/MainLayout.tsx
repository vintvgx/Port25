import { useState } from 'react';
import { Background } from './Background';
import { TextNavigation } from '../features/TextNavigation';
import { ContentDisplay } from '../common/ContentDisplay';

export function MainLayout() {
  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);

  return (
    <Background>
      <div className="flex h-full">
        {/* Left side navigation */}
        <div className="w-1/2 p-8 flex items-center">
          <TextNavigation onItemSelect={setSelectedItem} />
        </div>
        
        {/* Right side content */}
        <div className="w-1/2 p-8 flex items-center justify-center">
          <ContentDisplay item={selectedItem} />
        </div>
      </div>
    </Background>
  );
} 