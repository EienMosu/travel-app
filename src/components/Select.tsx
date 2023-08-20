import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { NoticeProps, GroupBase } from "react-select";
import Spinner from "./Spinner";

export interface selectOptions {
  label: string;
  value: string;
}

interface SelectProps {
  onChange: (selectedOption: selectOptions | null) => void;
  value: selectOptions | null;
  loadOptions: (inputValue: string) => Promise<selectOptions[]>;
}

const NoOptionsMessage: React.ComponentType<
  NoticeProps<selectOptions, false, GroupBase<selectOptions>>
> = (props) => {
  return (
    <div {...props.innerProps}>
      {props.selectProps.inputValue ? "No options found" : "Type something..."}
    </div>
  );
};

const LoadingMessage: React.FC<any> = () => {
  return (
    <div className="flex justify-center py-5">
      <Spinner />
    </div>
  );
};

const Select: React.FC<SelectProps> = ({ onChange, value, loadOptions }) => {
  const [error, setError] = useState<string | null>(null);

  const handleLoadOptions = async (inputValue: string) => {
    try {
      const options = await loadOptions(inputValue);
      setError(null);
      return options;
    } catch (err) {
      setError((err as Error).message);
      return [];
    }
  };

  return (
    <>
      {error && <div className="text-red-500 my-2">{error}</div>}
      <AsyncSelect
        value={value}
        onChange={(selectedOption: any) => {
          onChange(
            selectedOption
              ? { label: selectedOption.label, value: selectedOption.value }
              : null
          );
        }}
        loadOptions={handleLoadOptions}
        cacheOptions
        defaultOptions={false}
        components={{ NoOptionsMessage, LoadingMessage }}
      />
    </>
  );
};

export default Select;
