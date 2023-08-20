import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import CITIES from "../utils/cities";
import { calculateDistances } from "../utils/calculateDistances";
import searchParamsToFormValues from "../utils/searchParamsToFormValues";
import Spinner from "../components/Spinner";

const Results: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [distances, setDistances] = useState<number[] | null>(null);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const searchParams = new URLSearchParams(location.search);
  const initialFormValues = searchParamsToFormValues(searchParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const travelData = useMemo(() => initialFormValues, [location.search]);

  const citiesInRoute = useMemo(
    () =>
      [
        travelData.cityOfOrigin!,
        ...travelData.intermediateCities,
        travelData.destination!,
      ].map((cityName) => {
        return CITIES.find((city) => city.name === cityName)!;
      }),
    [travelData]
  );

  useEffect(() => {
    if (!travelData.cityOfOrigin || !travelData.destination) return;

    setLoading(true);
    setError(null);

    calculateDistances(citiesInRoute)
      .then((distances) => {
        setDistances(distances);
        setTotalDistance(distances.reduce((acc, curr) => acc + curr, 0));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [travelData, citiesInRoute]);

  if (!travelData.cityOfOrigin || !travelData.destination)
    return (
      <p className="text-center text-red-500 font-semibold mt-5">
        No data available
      </p>
    );

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-600 font-semibold mt-5">
        Error loading distances: {error}
      </p>
    );

  return (
    <div className="bg-white shadow-md p-5 rounded-lg space-y-2">
      <p className="font-bold text-xl mb-3">Travel Summary</p>
      <p className="font-semibold">
        City of Origin:{" "}
        <span className="text-gray-700">{travelData.cityOfOrigin}</span>
      </p>
      <p className="font-semibold">
        Destination:{" "}
        <span className="text-gray-700">{travelData.destination}</span>
      </p>
      {travelData.intermediateCities.length > 0 && (
        <p className="font-semibold">
          Intermediate Cities:{" "}
          <span className="text-gray-700">
            {travelData.intermediateCities.join(", ")}
          </span>
        </p>
      )}
      {distances &&
        distances.map((distance, index) => (
          <p key={index} className="text-gray-600">
            Distance from {citiesInRoute[index].name} to{" "}
            {citiesInRoute[index + 1].name}: {distance.toFixed(2)} km
          </p>
        ))}
      <p className="font-semibold">
        Total Distance:{" "}
        <span className="text-gray-700">{totalDistance.toFixed(2)} km</span>
      </p>
      <p className="font-semibold">
        Date:{" "}
        <span className="text-gray-700">
          {travelData.date.toLocaleDateString()}
        </span>
      </p>
      <p className="font-semibold">
        Passengers:{" "}
        <span className="text-gray-700">{travelData.passengers}</span>
      </p>
    </div>
  );
};

export default Results;
