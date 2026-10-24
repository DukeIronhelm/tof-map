'use client'
import { LayerGroup, Marker, useMap } from "react-leaflet"
import { convertToLeafletCoords } from "@/utils/game"
import POITooltip from "@/components/POITooltip"
import { GraphNode } from '@/utils/graph';
import { createDiamondIcon, createEmojiIcon } from '@/components/map/MapIcons';

interface LandmarksLayerProps {
  landmarks: GraphNode[]
  selectedNodeId?: string
  onPointClick?: (node: GraphNode) => void
}

export default function LandmarksLayer({ landmarks, selectedNodeId, onPointClick }: LandmarksLayerProps) {
  const map = useMap()

  return (
    <LayerGroup>
      {landmarks.map((landmark, index) => {
        const c = convertToLeafletCoords(landmark.location)
        return (
          <Marker
            eventHandlers={{
              click: () => { 
                onPointClick?.(landmark)
                map.setView([c.z, c.x], -1)
              },
            }}
            key={landmark.id || index} 
            position={[c.z, c.x]}
            icon={landmark.icon
              ? createEmojiIcon(landmark.icon, landmark.id, landmark.id === selectedNodeId)
              : createDiamondIcon(landmark.color, landmark.id, landmark.id === selectedNodeId)
            }
          >
            <POITooltip 
              name={landmark.id} 
              poi={landmark.location} 
            />
          </Marker>
        )
      })}
    </LayerGroup>
  )
}