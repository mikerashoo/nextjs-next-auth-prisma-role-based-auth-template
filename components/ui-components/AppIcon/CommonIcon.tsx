import { icons } from 'lucide-react';
import React from 'react'

function AppIcon({ name, color = undefined, size = 16 }) {
  const LucideIcon = icons[name];

  return (
 <LucideIcon color={color} size={size} />
    
  )
}

export default AppIcon