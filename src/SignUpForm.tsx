import { ReactNode } from "react";
import Dropzone from "react-dropzone";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { BsCloudUploadFill } from "react-icons/bs";

type Inputs = {
  email: string;
  ID: string;
  shopName: string;
};

interface Props {
  form: UseFormReturn<Inputs, object>;
  name: "email" | "ID" | "shopName";
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
    <div className="flex flex-col text-gray-500 focus-within:text-[#5E9486]">
      <label htmlFor={name} className="text-[1.2rem]">
        {children}
      </label>
      <input
        {...register(name, { required: true })}
        type={type}
        autoFocus={autofocus}
        className="focus:border-[#5E9486] rounded-xl border-2 border-gray-300 w-10/12 min-w-[300px] h-10 px-3 mb-3 text-black"
      />
      {error && <span className="text-red-500">This field is required</span>}
    </div>
  );
};

const SignupForm = () => {
  const form = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-4/5 flex flex-col mt-10"
    >
      <Field form={form} name="shopName" autofocus>
        Shop name
      </Field>

      <Field form={form} name="email" type="email">
        Email
      </Field>
      <Field form={form} name="ID">
        Pharmacy Pass ID
      </Field>
      <div className="">
        <label htmlFor="upload" className="text-gray-500 text-[1.2rem]">
          Logo
        </label>
        <Dropzone onDrop={console.log}>
          {({ getRootProps, getInputProps }) => (
            <section
              className="aspect-square w-40 border-gray-300 border-2 rounded-xl px-3 text-center items-center flex flex-col justify-center cursor-pointer"
              {...getRootProps()}
            >
              <BsCloudUploadFill className="w-32 h-16" fill="#555" />
              <input
                {...getInputProps()}
                accept="image/png, image/jpg, image/jpeg"
              />
              {<p className="text-[#6C6C6C]">Upload JPG, JPEG, PNG file</p>}
            </section>
          )}
        </Dropzone>
      </div>
      <input
        type="submit"
        className="w-40 h-12 bg-[#2F8D76] rounded-md text-white font-bold text-[1.6rem] mt-20"
        value="Next"
      />
    </form>
  );
};

export default SignupForm;
