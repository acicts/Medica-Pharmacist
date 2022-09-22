import Dropzone from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import { BsCloudUploadFill } from "react-icons/bs";
import { Inputs } from "../../utils/interfaces";
import Field from "./FormField";

interface Props {
  form: UseFormReturn<Inputs>;
}

export const ContactSection = ({ form }: Props) => {
  return (
    <section>
      <Field form={form} name="shopName" autofocus>
        Shop name
      </Field>

      <Field form={form} name="address">
        Address
      </Field>
      <Field form={form} name="contactNo">
        Contact Number
      </Field>
      <div className="w-full">
        <label
          htmlFor="upload"
          className="text-gray-500 text-md text-center lg:text-left w-full"
        >
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
              {
                <p className="text-[#6C6C6C] text-[0.8rem]">
                  Upload JPG, JPEG, PNG file
                </p>
              }
            </section>
          )}
        </Dropzone>
      </div>
    </section>
  );
};

export const VerificationDataSection = ({ form }: Props) => {
  return (
    <section>
      <Field form={form} name="ID">
        Pharmacy Pass ID
      </Field>
      <div className="w-full">
        <label
          htmlFor="upload"
          className="text-gray-500 text-md text-center lg:text-left w-full"
        >
          Photo of the Pharmacy Pass
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
              {
                <p className="text-[#6C6C6C] text-[0.8rem]">
                  Upload JPG, JPEG, PNG file
                </p>
              }
            </section>
          )}
        </Dropzone>
      </div>
    </section>
  );
};

export const CredentialsSection = ({ form }: Props) => {
  return (
    <section>
      <Field form={form} name="email" type="email">
        Email
      </Field>
      <Field form={form} name="password" type="password">
        Password
      </Field>
    </section>
  );
};
