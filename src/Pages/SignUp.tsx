import SignUpForm from "./SignUpForm";

const SignUp = () => (
  <div className="flex w-full">
    <div className="flex flex-col md:w-5/12 w-full lg:px-[40px] px-[20px] justify-evenly items-start h-[100vh]">
      <img src="/logo.png" alt="ubetatta" className="w-60" />
      <p className="text-[3rem] font-black  w-full text-left">Sign Up</p>
      <SignUpForm />
    </div>

    <div className="w-7/12 h-[100vh] bg-[url('https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80')] bg-cover bg-center hidden md:block" />
  </div>
);

export default SignUp;
