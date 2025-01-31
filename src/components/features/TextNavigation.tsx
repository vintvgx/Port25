"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { navigationItems } from "@/data/navigationItems"

interface TextNavigationProps {
  onItemSelect: (content: any) => void;
}

export function TextNavigation({ onItemSelect }: TextNavigationProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const handleItemClick = (item: any) => {
    setSelectedItem(item.name);
    onItemSelect(item.content);
  };

  return (
    <nav className="relative text-gray-400">
      {navigationItems.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-sm mb-2 opacity-50">{section.category}</h2>
          {section.items.map((item) => (
            <div key={item.name} className="relative">
              <button
                className={`text-lg hover:text-white transition-colors ${
                  selectedItem === item.name ? "text-white" : ""
                }`}
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem(null)}
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </button>
              {activeItem === item.name && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full ml-4 top-0 bg-gray-900 text-white text-sm px-4 py-2 rounded whitespace-nowrap"
                >
                  {item.description}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      ))}
    </nav>
  )
} 