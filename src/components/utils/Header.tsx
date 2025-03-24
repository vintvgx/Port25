import { useState, useEffect, useCallback } from "react";
import MobileMenu from "../Menus/MobileMenu";
import { Button } from "../ui/button";
import { DialogType } from "@/types/menu";

interface HeaderProps {
    handleDialogOpen: (dialog: DialogType) => void 
    handleProjectSelect: (index: number, version: string) => void
    isMobileMenuOpen: boolean,
    setOpenMobileMenu: (bool: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
    handleDialogOpen,
    handleProjectSelect,
    isMobileMenuOpen,
    setOpenMobileMenu
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  // Check if viewport is mobile
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 1024); // md breakpoint in Tailwind is 768px
  }, []);

  // Initialize and set up resize listener
  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  const toggleMenu = () => {
    console.log("🚀 ~ toggleMenu ~ toggleMenu:", toggleMenu)
    console.log("isMobileOpen", isMobileMenuOpen)

    if (isMobile){
      setOpenMobileMenu(true)
      console.log("isMobileOpen", isMobileMenuOpen)

      return
    }

    setMenuVisible(prev => !prev);
    
    // Clear any existing timer
    if (timerId) {
      clearTimeout(timerId);
    }
    
    // Only set timer for desktop menu (not mobile menu)
    if (!menuVisible && !isMobile) {
      const id = setTimeout(() => {
        setMenuVisible(false);
      }, 10000); // 10 seconds
      setTimerId(id);
    }
  };

  
  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 p-4 flex justify-between items-center mx-2 md:mx-6">
      {/* Left: Menu button and menu items */}
      <div className="flex items-center">
        <Button
          variant="noBackground"
          className={`text-sm text-[#D5661C] transition-colors ${
            menuVisible 
              ? "bg-gray-100 font-medium" 
              : "text-[#D5661C] hover:text-gray-700"
          }`}
          onClick={toggleMenu}>
          Menu
        </Button>
        
        {/* Desktop Menu Items - visible only on desktop when menu is toggled */}
        {!isMobile && (
          <div 
            className={`ml-2 flex gap-2 transform transition-all duration-500 ease-in-out ${
              menuVisible 
                ? "opacity-100 translate-x-0 scale-100" 
                : "opacity-0 -translate-x-4 scale-95 pointer-events-none"
            }`}
          >
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
          </div>
        )}
      </div>
      
      {/* Center: Name - positioned absolutely to stay centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <h1 className="text-xl md:text-2xl font-light tracking-tight text-gray-600 hover:text-gray-900 hover:opacity-70 transition-opacity">
          Kareem Saygbe
        </h1>
      </div>
      
      {/* Right: Version Control button */}
      <div>
        <Button
          variant="noBackground"
          className="text-sm text-[#D5661C] hover:text-gray-700 transition-colors"
          onClick={() => handleDialogOpen("versionControl")}>
          Version
        </Button>
      </div>
      
      {/* Mobile menu - visible only on mobile when menu is toggled */}
      {isMobile && (
        <div className="absolute top-16 left-0 right-0 z-30 bg-white shadow-md rounded-b-md transition-opacity duration-300 ease-in-out">
          <MobileMenu 
            onProjectSelect={handleProjectSelect} 
            isOpen={isMobileMenuOpen}
            setIsOpen={setOpenMobileMenu}
            handleDialogOpen={handleDialogOpen}
          />
        </div>
      )}
    </header>
  );
};

export default Header;