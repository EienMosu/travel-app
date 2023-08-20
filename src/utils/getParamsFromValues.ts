const getParamsFromValues = (values: {
  cityOfOrigin: string;
  destination: string;
  intermediateCities: string[];
  date: Date;
  passengers: number;
}): URLSearchParams => {
const params = new URLSearchParams();

params.set('cityOfOrigin', values.cityOfOrigin);
params.set('destination', values.destination);
values.intermediateCities.forEach((city, idx) => {
  params.set(`intermediateCities[${idx}]`, city);
});
params.set('date', values.date.toISOString()); // Convert Date to string
params.set('passengers', String(values.passengers));

return params;
};

export default getParamsFromValues;
