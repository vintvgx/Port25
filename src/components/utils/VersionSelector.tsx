import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface VersionSelectorProps {
  versions: string[];
  currentVersion: string | undefined;
  onVersionSelect: (version: string) => void;
  variant?: "mobile" | "desktop";
}

export function VersionSelector({
  versions,
  currentVersion,
  onVersionSelect,
  variant = "desktop",
}: VersionSelectorProps) {
  if (variant === "desktop") {
    return (
      <div className="flex items-center gap-2">
        {versions.map((version, index) => (
          <Button
            key={version}
            variant={currentVersion === version ? "outline" : "ghost"}
            size="icon"
            onClick={() => onVersionSelect(version)}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors w-9 h-9"
          >
            {versions.length - index}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between"
        >
          Version {currentVersion}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[8rem]">
        {versions.map((version) => (
          <DropdownMenuItem
            key={version}
            onClick={() => onVersionSelect(version)}
            className={currentVersion === version ? "bg-accent" : ""}
          >
            Version {version}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 