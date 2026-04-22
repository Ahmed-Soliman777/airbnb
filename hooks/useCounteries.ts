import countries from "world-countries";

export interface Country {
  value: string;
  label: string;
  latlng: [number, number];
  region: string;
}

// set formatted countries to be used in the location step of the create listing modal
const formattedCounteries: Country[] = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  latlng: country.latlng,
  region: country.region,
}));

const useCounteries = () => {
  // get all counteries
  const getAllCountries = () => formattedCounteries;

  // to get a specific country by its value
  const getByValue = (value: string) => {
    return formattedCounteries.find((item) => item.value === value);
  };

  return {
    getAllCountries,
    getByValue,
  };
};

export default useCounteries;
