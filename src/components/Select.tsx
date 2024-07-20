import { ChangeEvent } from "react";

type SelectTagType = {
  value: string | number;
  lable: string;
  isDisabled?: boolean;
  onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; name: string }[];
};
export default function Select({
  value,
  onChange,
  options,
  lable,
  isDisabled,
}: SelectTagType) {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <label className="text-xs " htmlFor={lable}>
        {lable}
      </label>
      <select
        disabled={isDisabled}
        className="bg-gray-700 cursor-pointer hover:bg-gray-800 transition ease-in active:ring-0 active:border-0 p-2 min-w[200px] w-full "
        id={lable}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
