import { ChangeEventHandler } from 'react';

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
}
const Checkbox = ({ onChange, name }: Props) => {
  return (
    <div className="flex items-center">
      <input
        id="checked-checkbox"
        type="checkbox"
        className="w-4 h-4 text-white bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={onChange}
        name={name}
      />
      <label
        htmlFor="checked-checkbox"
        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
      >
        Admin
      </label>
    </div>
  );
};

export default Checkbox;
