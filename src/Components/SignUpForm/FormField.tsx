import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Inputs } from "../../utils/interfaces";

interface Props {
  form: UseFormReturn<Inputs, object>;
  name: "email" | "ID" | "shopName" | "password" | "address" | "contactNo";
  children: ReactNode;
  type?: string;
  autofocus?: boolean;
}
const Field = ({
  form: { register, formState },
  children,
  name,
  type,
  autofocus,
}: Props) => {
  const { [name]: error } = formState.errors;
  return (
    <div className="flex flex-col text-gray-500 focus-within:text-[#5E9486] w-full my-[15px]">
      <label htmlFor={name} className="text-sm mb-[4px] text-[#6C6C6C]">
        {children}
      </label>
      <input
        {...register(name, { required: true })}
        type={type}
        autoFocus={autofocus}
        className="focus:border-[#5E9486] rounded-md border-2 border-[#BCBCBC] w-full min-w-[300px] h-10 px-3 text-black"
      />
      {error && (
        <span className="text-red-500 text-xs">This field is required</span>
      )}
    </div>
  );
};

export default Field;
