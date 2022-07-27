import SignUpForm from "./SignUpForm";

const SignUp = () => (
  <div className="flex w-full">
    <div className="flex flex-col w-full lg:px-16 items-center lg:items-start">
      <img src="/logo.png" alt="ubetatta" className="w-60 mt-10" />
      <span className="text-[3rem] mt-10 w-10/12">Sign Up</span>
      <SignUpForm />
    </div>

    <div className="w-full h-[100vh] bg-[url('https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80')] bg-cover bg-center hidden md:block" />
  </div>
);

export default SignUp;
