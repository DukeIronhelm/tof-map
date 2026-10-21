import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { Landmark, POI, Translocator } from '@/types/poi'
import GameMap from '@/components/GameMap'
import { StrictMode } from 'react'
import { POIGraph } from '@/utils/graph'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isPOI(value: unknown): value is POI {
  if (!isRecord(value)) return false
  return ['x', 'y', 'z'].every(
    (coordinate) => typeof value[coordinate] === 'number' && Number.isFinite(value[coordinate])
  )
}

function parseYamlList<T>(
  value: unknown,
  isValid: (entry: unknown) => entry is T,
  source: string
): T[] {
  if (!Array.isArray(value) || !value.every(isValid)) {
    throw new Error(`Invalid data in ${source}`)
  }
  return value
}

export default function HomePage() {
  const landmarksData = parseYamlList<Landmark>(
    yaml.load(fs.readFileSync(path.join(process.cwd(), 'landmarks.yaml'), 'utf8')),
    (entry): entry is Landmark => isRecord(entry) && typeof entry.name === 'string' && isPOI(entry.location),
    'landmarks.yaml'
  );
  const translocatorsData = parseYamlList<Translocator>(
    yaml.load(fs.readFileSync(path.join(process.cwd(), 'translocators.yaml'), 'utf8')),
    (entry): entry is Translocator =>
      isRecord(entry) &&
      typeof entry.name === 'string' &&
      isPOI(entry.origin) &&
      isPOI(entry.destination),
    'translocators.yaml'
  );
  // TODO: move this somewhere more suitable
  const graph = new POIGraph()
  for (const landmark of landmarksData) {
    graph.addNode(landmark.name, landmark.location, 'landmark', landmark.desc, undefined, landmark.special)
  }
  for (const translocator of translocatorsData) {
    graph.addNode(translocator.name + " Origin", translocator.origin, 'translocator', translocator.desc, translocator.color)
    graph.addNode(translocator.name + " Destination", translocator.destination, 'translocator', translocator.desc, translocator.color)
    graph.linkTranslocators(translocator.name + " Origin", translocator.name + " Destination")
  }

  return (
    <main>
      <StrictMode>
      <GameMap 
        nodes={graph.getAllNodes()}
      />
      </StrictMode>
    </main>
  );
}