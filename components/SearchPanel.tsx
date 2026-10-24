import { useMap } from 'react-leaflet'
import { convertToLeafletCoords } from '@/utils/game'
import { GraphNode } from '@/utils/graph'
import { IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react'
import AutocompleteInput from './AutocompleteInput'
import { Button } from './ui/button'

interface SearchPanelProps {
  suggestions: string[]
  onSelect: (id: string) => void
  nodes: GraphNode[]
  showUncoloredTranslocators: boolean
  onToggleUncoloredTranslocators: () => void
}

export default function SearchPanel({
  suggestions,
  onSelect,
  nodes,
  showUncoloredTranslocators,
  onToggleUncoloredTranslocators,
}: SearchPanelProps) {
  const map = useMap()
  
  const handleSelect = (id: string) => {
    const node = nodes.find(n => n.id === id)
    if (node) {
      const coords = convertToLeafletCoords(node.location)
      map.setView([coords.z, coords.x], -1)
    }
    onSelect(id)
  }

  return (
    <div className="flex w-80 items-center gap-2">
      <div className="min-w-0 flex-1">
        <AutocompleteInput
          suggestions={suggestions}
          onSelect={handleSelect}
          placeholder="Search places..."
          icon={<IconSearch className="h-4 w-4 text-muted-foreground" />}
          className="border-0 shadow-xl rounded-xl bg-card"
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        title={showUncoloredTranslocators ? "Hide uncolored translocators" : "Show uncolored translocators"}
        aria-label="Toggle uncolored translocators"
        aria-pressed={showUncoloredTranslocators}
        onClick={onToggleUncoloredTranslocators}
        className="shrink-0 shadow-xl bg-card"
      >
        {showUncoloredTranslocators ? <IconEye /> : <IconEyeOff />}
      </Button>
    </div>
  )
}