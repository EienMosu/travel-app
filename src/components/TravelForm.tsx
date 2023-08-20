import React, { useEffect } from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CitySearch from "./CitySearch";
import * as Yup from "yup";
import { useTravelData } from "../context/TravelContext";
import { useLocation, useNavigate } from "react-router-dom";
import getParamsFromValues from "../utils/getParamsFromValues";
import searchParamsToFormValues from "../utils/searchParamsToFormValues";

const schema = Yup.object().shape({
  cityOfOrigin: Yup.string().required("City of Origin is required"),
  destination: Yup.string().required("Destination is required"),
  intermediateCities: Yup.array().of(
    Yup.string().required("Intermediate City is required")
  ),
  date: Yup.date()
    .required("Date is required")
    .nullable()
    .min(new Date(), "The date should be in the future"),
  passengers: Yup.number()
    .min(1, "At least 1 passenger is required")
    .required("Number of passengers is required"),
});

const TravelForm: React.FC = () => {
  const { setTravelData } = useTravelData();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialFormValues = searchParamsToFormValues(searchParams);

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const params = getParamsFromValues(values).toString();
      navigate(`/results?${params}`);
      setTravelData(values);
    },
  });

  useEffect(() => {
    const params = getParamsFromValues(formik.values).toString();
    navigate(`?${params}`, { replace: true });
  }, [formik.values, navigate]);

  const handleAddIntermediateCity = () => {
    formik.setFieldValue("intermediateCities", [
      ...formik.values.intermediateCities,
      "",
    ]);
  };

  const handleRemoveIntermediateCity = (index: number) => {
    const newIntermediateCities = formik.values.intermediateCities.filter(
      (_, idx) => idx !== index
    );
    formik.setFieldValue("intermediateCities", newIntermediateCities);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="font-semibold">City of Origin:</label>
        <CitySearch
          onChange={(option) =>
            formik.setFieldValue("cityOfOrigin", option?.value || null)
          }
          value={{
            label: formik.values.cityOfOrigin,
            value: formik.values.cityOfOrigin,
          }}
        />
        {formik.touched.cityOfOrigin && formik.errors.cityOfOrigin && (
          <div className="text-red-500">{formik.errors.cityOfOrigin}</div>
        )}
      </div>

      {formik.values.intermediateCities.map((city, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <label className="font-semibold">
            Intermediate City {index + 1}:
          </label>
          <CitySearch
            onChange={(option) =>
              formik.setFieldValue(
                `intermediateCities[${index}]`,
                option?.value || ""
              )
            }
            value={{ label: city, value: city }}
          />
          {formik.touched.intermediateCities &&
            formik.errors.intermediateCities &&
            formik.errors.intermediateCities[index] && (
              <div className="text-red-500">
                {formik.errors.intermediateCities[index]}
              </div>
            )}
          <button
            type="button"
            onClick={() => handleRemoveIntermediateCity(index)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddIntermediateCity}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add Intermediate City
      </button>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold">City of Destination:</label>
        <CitySearch
          onChange={(option) =>
            formik.setFieldValue("destination", option?.value || null)
          }
          value={{
            label: formik.values.destination,
            value: formik.values.destination,
          }}
        />
        {formik.touched.destination && formik.errors.destination && (
          <div className="text-red-500">{formik.errors.destination}</div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Date of Trip:</label>
        <div className="border rounded p-1">
          <DatePicker
            selected={formik.values.date}
            onChange={(date) => {
              formik.setFieldValue("date", date);
              formik.setFieldTouched("date", true, false);
            }}
          />
        </div>
        {formik.touched.date && formik.errors.date && (
          <div className="text-red-500">{String(formik.errors.date)}</div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="font-semibold">Number of Passengers:</label>
        <input
          type="number"
          value={formik.values.passengers}
          onChange={(e) => {
            formik.handleChange(e);
            formik.setFieldTouched("passengers", true, false);
          }}
          name="passengers"
          className="border p-2 rounded"
        />
        {formik.touched.passengers && formik.errors.passengers && (
          <div className="text-red-500">{formik.errors.passengers}</div>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default TravelForm;
