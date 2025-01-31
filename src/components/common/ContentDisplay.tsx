import type { NavigationItem } from '@/types/content';

interface ContentDisplayProps {
  item: NavigationItem | null;
}

export function ContentDisplay({ item }: ContentDisplayProps) {
  if (!item) return null;

  return (
    <div className="text-white">
      {item.content.type === 'image' && (
        <img 
          src={item.content.src} 
          alt={item.title}
          className="max-w-full h-auto rounded-lg"
        />
      )}
      
      {item.content.type === 'video' && (
        <video 
          src={item.content.src}
          controls
          className="max-w-full rounded-lg"
        />
      )}
      
      {item.content.type === 'text' && (
        <div className="prose prose-invert">
          {item.content.text}
        </div>
      )}
    </div>
  );
} 