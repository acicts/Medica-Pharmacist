import { ReactNode, useState } from "react";
import Dropzone from "react-dropzone";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { BsCloudUploadFill } from "react-icons/bs";

type Inputs = {
  email: string;
  ID: string;
  shopName: string;
  password:string;
};

interface Props {
  form: UseFormReturn<Inputs, object>;
  name: "email" | "ID" | "shopName" | "password";
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
        className="focus:border-[#5E9486] rounded-xl border-2 border-[#BCBCBC] w-full min-w-[300px] h-10 px-3 text-black"
      />
      {error && <span className="text-red-500">This field is required</span>}
    </div>
  );
};

const ContactSection = (props: {form: UseFormReturn<Inputs>}) => {
  return <section>
        <Field form={props.form} name="shopName" autofocus>
            Shop name
          </Field>

          <Field form={props.form} name="email" type="email">
            Email
          </Field>
          <Field form={props.form} name="ID">
            Pharmacy Pass ID
          </Field>
          <div className="w-full">
            <label htmlFor="upload" className="text-gray-500 text-md text-center lg:text-left w-full">
              Logo
            </label>
            <Dropzone onDrop={console.log}>
              {({ getRootProps, getInputProps }) => (
                <section
                  className="aspect-square w-40 border-gray-300 border-2 rounded-xl px-3 text-center items-center flex flex-col justify-center cursor-pointer"
                  {...getRootProps()}
                >
                  <BsCloudUploadFill className="w-24 h-12" fill="#6c6c6c" />
                  <input
                    {...getInputProps()}
                    accept="image/png, image/jpg, image/jpeg"
                  />
                  {<p className="text-[#6C6C6C] text-[0.8rem]">Upload JPG, JPEG, PNG file</p>}
                </section>
              )}
            </Dropzone>
          </div>
          
    </section>
}

const VerificationDataSection = (props: {form: UseFormReturn<Inputs>}) => {
  return <section>
    <Field form={props.form} name="ID">
      Pharmacy Pass ID
    </Field>
    <div className="w-full">
      <label htmlFor="upload" className="text-gray-500 text-md text-center lg:text-left w-full">
        Logo
      </label>
      <Dropzone onDrop={console.log}>
        {({ getRootProps, getInputProps }) => (
          <section
            className="aspect-square w-40 border-gray-300 border-2 rounded-xl px-3 text-center items-center flex flex-col justify-center cursor-pointer"
            {...getRootProps()}
          >
            <BsCloudUploadFill className="w-24 h-12" fill="#6c6c6c" />
            <input
              {...getInputProps()}
              accept="image/png, image/jpg, image/jpeg"
            />
            {<p className="text-[#6C6C6C] text-[0.8rem]">Upload JPG, JPEG, PNG file</p>}
          </section>
        )}
      </Dropzone>
    </div>
  </section>
}

const CredentialsSection = (props: {form: UseFormReturn<Inputs>}) => {
  return <section>
    <Field form={props.form} name="email" type="email">
      Email
    </Field>
    <Field form={props.form} name="password" type="password">
      Password
    </Field>
  </section>
}

const SignupForm = () => {
  const form = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [section, setSection] = useState<"a" | "b" | "c">("a");

  const nextSectionHandler = () => {
    setSection(curr => curr === "a" ? "b" : "c")
  }
  const prevSectionHandler = () => {
    setSection(curr => curr === "c" ? "b" : "a");
  }
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="items-start justify-between w-full"
    >
      {section === "a" ? 
        <ContactSection form={form} />: section === "b" ? 
        <VerificationDataSection form={form}/> : 
        <CredentialsSection form={form}/> 
      }
      <div className="flex items-end justify-between w-[40px] ml-[5px] mt-[45px] mb-[15px]">
        <div className="w-[8px] h-[8px] rounded-full bg-[#2F8D76]"></div>
        <div className="w-[8px] h-[8px] rounded-full bg-[#2F8D76]"></div>
        <div className="w-[8px] h-[8px] rounded-full bg-[#2F8D76]"></div>
      </div>
      <div className="flex items-center justify-between w-52 md:w-80">
      {(section === "b" || section === "c") && <button type="button" onClick={prevSectionHandler} className="register-btn">Back</button>}
      {section === "a" || section === "b" ? 
        <button onClick={nextSectionHandler} type="button" className="register-btn">Next</button>
       :<button type="submit" className="register-btn">Submit</button>}
      </div>
    </form>
  );
};

export default SignupForm;
