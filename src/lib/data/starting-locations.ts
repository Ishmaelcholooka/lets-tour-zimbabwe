// src/lib/data/starting-locations.ts

export interface StartingLocation {
  id: string
  name: string
  lat: number
  lng: number
}

export const startingLocations: StartingLocation[] = [
  { id: 'harare',        name: 'Harare',         lat: -17.8292, lng: 31.0522 },
  { id: 'bulawayo',      name: 'Bulawayo',        lat: -20.1500, lng: 28.5833 },
  { id: 'victoria-falls',name: 'Victoria Falls',  lat: -17.9243, lng: 25.8567 },
  { id: 'mutare',        name: 'Mutare',          lat: -18.9707, lng: 32.6709 },
  { id: 'gweru',         name: 'Gweru',           lat: -19.4500, lng: 29.8167 },
  { id: 'masvingo',      name: 'Masvingo',        lat: -20.0667, lng: 30.8333 },
  { id: 'kariba',        name: 'Kariba',          lat: -16.5167, lng: 28.8000 },
]

export function getStartingLocationById(id: string): StartingLocation | undefined {
  return startingLocations.find((l) => l.id === id)
}
