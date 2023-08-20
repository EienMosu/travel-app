import { City } from "./cities";

const calculateHaversineDistance = (cityA: City, cityB: City): number => {
    const R = 6371;
  
    const dLat = (cityB.latitude - cityA.latitude) * (Math.PI / 180);
    const dLon = (cityB.longitude - cityA.longitude) * (Math.PI / 180);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(cityA.latitude * (Math.PI / 180)) *
        Math.cos(cityB.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  };
  
  export const calculateDistances = (cities: City[]): Promise<number[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cities.some((city) => city.name === "Dijon")) {
          reject(new Error("Failed to calculate distances."));
          return;
        }
  
        const distances: number[] = [];
  
        for (let i = 0; i < cities.length - 1; i++) {
          const distance = calculateHaversineDistance(cities[i], cities[i + 1]);
          distances.push(distance);
        }
  
        resolve(distances);
      }, 1000);
    });
  };