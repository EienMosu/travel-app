import React from "react";
import Select, { selectOptions } from "./Select";
import { searchCities } from "../utils/searchCities";

interface CitySearchProps {
  onChange: (selectedOption: selectOptions | null) => void;
  value: selectOptions | null;
}

const CitySearch: React.FC<CitySearchProps> = ({ onChange, value }) => {
  return (
    <Select onChange={onChange} value={value} loadOptions={searchCities} />
  );
};

export default CitySearch;
