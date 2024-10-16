import React from "react";

const InputContainer = ({ children }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export const InputLabel = ({ name }) => (
  <label className="text-sm font-medium dark:text-slate-300 text-slate-600">
    {name}
  </label>
);

export const SelectInput = (props) => {
  return (
    <select
      className="border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm px-2 appearance-none rounded-lg h-[46px] text-slate-800 outline-none w-full"
      {...props}
    >
      {props.children}
    </select>
  );
};

export const InputElement = (props) => {
  const isName = props.name === "name" ? "Transaction Name" : props.name;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium dark:text-slate-300 text-slate-600 first-letter:capitalize">
        {isName}
      </label>
      <input
        className="border-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white text-sm pl-2 rounded-lg h-[46px] text-slate-800 placeholder:font-medium outline-none"
        {...props}
      />
    </div>
  );
};

export default InputContainer;
