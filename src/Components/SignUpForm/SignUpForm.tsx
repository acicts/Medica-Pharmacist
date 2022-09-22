import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../../utils/interfaces";
import {
  ContactSection,
  CredentialsSection,
  VerificationDataSection,
} from "./Sections";

const SignupForm = () => {
  const form = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [section, setSection] = useState<"a" | "b" | "c">("a");

  const nextSectionHandler = () => {
    setSection((curr) => (curr === "a" ? "b" : "c"));
  };
  const prevSectionHandler = () => {
    setSection((curr) => (curr === "c" ? "b" : "a"));
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="min-h-[70vh] flex flex-col items-start justify-between w-full"
    >
      {section === "a" ? (
        <ContactSection form={form} />
      ) : section === "b" ? (
        <VerificationDataSection form={form} />
      ) : (
        <CredentialsSection form={form} />
      )}
      <div className="w-full">
        <div className="flex items-end justify-between w-[40px] ml-[5px] mt-[45px] mb-[15px]">
          <div
            className={`w-[8px] h-[8px] transition-colors rounded-full ${
              section === "a" ? "bg-[#2F8D76]" : "bg-gray-400"
            }`}
          ></div>
          <div
            className={`w-[8px] h-[8px] transition-colors rounded-full ${
              section === "b" ? "bg-[#2F8D76]" : "bg-gray-400"
            }`}
          ></div>
          <div
            className={`w-[8px] h-[8px] transition-colors rounded-full ${
              section === "c" ? "bg-[#2F8D76]" : "bg-gray-400"
            }`}
          ></div>
        </div>
        <div className="flex items-center justify-between w-52 md:w-80">
          {(section === "b" || section === "c") && (
            <button
              type="button"
              onClick={prevSectionHandler}
              className="register-btn"
            >
              Back
            </button>
          )}
          {section === "a" || section === "b" ? (
            <button
              onClick={nextSectionHandler}
              type="button"
              className="register-btn"
            >
              Next
            </button>
          ) : (
            <input type="submit" className="register-btn" value="Submit" />
          )}
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
