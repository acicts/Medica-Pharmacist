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
  const [currSection, secCurrSection] = useState(0);
  const sections = [0, 1, 2];

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="min-h-[70vh] flex flex-col items-start justify-between w-full"
    >
      {currSection === 0 ? (
        <ContactSection form={form} />
      ) : currSection === 1 ? (
        <VerificationDataSection form={form} />
      ) : (
        <CredentialsSection form={form} />
      )}
      <div className="w-full">
        <div className="flex items-end justify-between w-[40px] ml-[5px] mt-[45px] mb-[15px]">
          {sections.map((section) => (
            <div
              className={`w-[8px] h-[8px] transition-colors rounded-full ${
                currSection === section ? "bg-[#2F8D76]" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between w-52 md:w-80">
          {currSection !== 0 && (
            <button
              type="button"
              onClick={() => secCurrSection(currSection - 1)}
              className="register-btn"
            >
              Back
            </button>
          )}
          {currSection === 2 ? (
            <input type="submit" className="register-btn" value="Submit" />
          ) : (
            <button
              onClick={() => secCurrSection(currSection + 1)}
              type="button"
              className="register-btn"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
