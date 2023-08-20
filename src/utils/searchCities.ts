import CITIES, { City } from "./cities";

const handleSearch = (keyword: string): Promise<City[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (keyword.toLowerCase() === "fail") {
        reject(new Error("Search failed intentionally!"));
        return;
      }

      const matchedCities = CITIES.filter((city) =>
        city.name.toLowerCase().includes(keyword.toLowerCase())
      );

      resolve(matchedCities);
    }, 1000);
  });
};

export const searchCities = async (
  inputValue: string
): Promise<{ label: string; value: string }[]> => {
  try {
    const cities: City[] = await handleSearch(inputValue);
    return cities.map((city) => ({ label: city.name, value: city.name }));
  } catch (error) {
    throw new Error("Failed to fetch options due to intentional error.");
  }
};
