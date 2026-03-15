'use client'

import { TreePine, Landmark, Building } from 'lucide-react'

type IconType = 'tree' | 'landmark' | 'building'

const iconMap = {
  tree: TreePine,
  landmark: Landmark,
  building: Building,
} as const

interface DestinationIconProps {
  iconType: IconType
  className?: string
}

export function DestinationIcon({ iconType, className }: DestinationIconProps) {
  const Icon = iconMap[iconType]
  return <Icon className={className ?? 'w-6 h-6'} />
}
