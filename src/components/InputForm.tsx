import { ChangeEventHandler, useState } from 'react';

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  isRequired?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
  pattern?: string;
  required?: boolean;
}

const InputForm = ({
  label,
  type,
  placeholder,
  isRequired = true,
  name,
  onChange,
  errorMessage,
  pattern,
  required,
}: Props) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e: any) => {
    setFocused(true);
  };
  return (
    <div className="w-full">
      <label htmlFor="" className="form-label inline-block mb-2 text-white">
        {label} <span className="text-red-600">{isRequired ? '*' : ''}</span>
      </label>
      <input
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-900 bg-slate-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-white focus:outline-none"
        placeholder={placeholder}
        type={type}
        autoComplete="off"
        name={name}
        onChange={onChange}
        pattern={pattern}
        required={required}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span id="span-error" className="hidden mt-1 text-red-600">
        {errorMessage}
      </span>
    </div>
  );
};

export default InputForm;
