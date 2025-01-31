interface HoverDescriptionProps {
  description: string;
}

export function HoverDescription({ description }: HoverDescriptionProps) {
  return (
    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-4 rounded-lg w-64 shadow-lg">
      <p className="text-sm">{description}</p>
    </div>
  );
} 