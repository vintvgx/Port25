"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { navigationItems } from "@/data/navigationItems"
import { CareerItem, InfoItem, Project } from "@/types/content";

interface TextNavigationProps {
  onItemSelect: (content: Project | CareerItem | InfoItem | null) => void;
}

export function TextNavigation({ onItemSelect }: TextNavigationProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleItemClick = (item: any) => {
    setSelectedItem(item.name);
    onItemSelect(item);
  };

  return (
    <nav className="relative text-gray-400">
      {navigationItems.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-md mb-2 opacity-40">{section.category}</h2>
          {section.items.map((item) => (
            <div key={item.name} className="relative mt-1">
              <button
                className={`text-xl hover:text-white transition-colors ${
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
                  {'description' in item ? item.description : ''}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      ))}
    </nav>
  )
} 