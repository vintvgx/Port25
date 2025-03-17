import MobileMenu from "./Menus/MobileMenu";
import { Button } from "./ui/button";
import { DialogType } from "@/types/menu";

// Update MobileMenu

interface HeaderProps {
    handleDialogOpen: (dialog: DialogType) => void 
    handleProjectSelect: (index: number, version: string) => void
}

const Header: React.FC<HeaderProps> = ({
    handleDialogOpen,
    handleProjectSelect
}) => (
    <header className="fixed top-0 left-0 right-0 z-20 p-4 row md:p-6 flex justify-between items-center mx-2 md:mx-6">
      <h1 className="text-xl md:text-2xl font-light tracking-tight text-gray-600 hover:text-gray-900 hover:opacity-70 transition-opacity">
        Kareem Saygbe
      </h1>

      <nav className="hidden md:flex items-center gap-8 content-center">
        <Button
          variant="ghost"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => handleDialogOpen("projects")}>
          Projects
        </Button>
        <Button
          variant="ghost"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => handleDialogOpen("about")}>
          About
        </Button>
        <Button
          variant="ghost"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => handleDialogOpen("contact")}>
          Contact
        </Button>
      </nav>
      
      <MobileMenu onProjectSelect={handleProjectSelect} />
    </header>
  );

export default Header;