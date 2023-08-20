const searchParamsToFormValues = (
  params: URLSearchParams
): {
  cityOfOrigin: string;
  destination: string;
  intermediateCities: string[];
  date: Date;
  passengers: number;
} => {
  return {
    cityOfOrigin: params.get("cityOfOrigin") || "",
    destination: params.get("destination") || "",
    intermediateCities: Array.from(params.keys())
      .filter((key) => key.startsWith("intermediateCities["))
      .map((key) => params.get(key) || "")
      .filter(Boolean),  // Filters out any falsy values like empty strings
    date: new Date(params.get("date") || Date.now()),
    passengers: Number(params.get("passengers")) || 1,
  };
};

export default searchParamsToFormValues;