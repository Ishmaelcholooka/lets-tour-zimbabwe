// src/lib/utils/route.ts

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/** Haversine distance in km between two [lat, lng] points */
export function haversineKm(
  [lat1, lng1]: [number, number],
  [lat2, lng2]: [number, number],
): number {
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

interface GeoPoint {
  id: string
  coordinates: [number, number]
}

/**
 * Nearest-neighbour greedy route from a starting position through all points.
 * Returns the point IDs in visit order.
 */
export function nearestNeighbourRoute(
  start: [number, number],
  points: GeoPoint[],
): string[] {
  if (points.length === 0) return []

  const remaining = [...points]
  const ordered: string[] = []
  let current = start

  while (remaining.length > 0) {
    let nearestIdx = 0
    let nearestDist = Infinity

    for (let i = 0; i < remaining.length; i++) {
      const dist = haversineKm(current, remaining[i].coordinates)
      if (dist < nearestDist) {
        nearestDist = dist
        nearestIdx = i
      }
    }

    const next = remaining.splice(nearestIdx, 1)[0]
    ordered.push(next.id)
    current = next.coordinates
  }

  return ordered
}
