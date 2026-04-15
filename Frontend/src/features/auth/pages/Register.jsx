import { useState } from "react";
import { useAuth } from "../hook/useAuth.js";
import { Link, useNavigate } from "react-router";
import ContinueWithGoogle from "../components/ContinueWithGoogle.jsx";
import Footer from "../components/Footer.jsx";
import LeftPanel from "../components/LeftPanel.jsx";

const EyeIcon = ({ open }) =>
  open ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);


// const AppleIcon = () => (
//   <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
//   </svg>
// );

export default function Register() {


  const initialState = {
    fullName: "",
    email: "",
    contactNumber: "",
    password: "",
    isSeller: false,
  };


  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);


  const { handleRegister } = useAuth();
  const navigate = useNavigate();




  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = () => {
    setForm((prev) => ({ ...prev, isSeller: !prev.isSeller }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleRegister({
      fullname: form.fullName,
      email: form.email,
      password: form.password,
      contact: form.contactNumber,
      isSeller: form.isSeller,
    });

    navigate("/");

    setForm(initialState);
  };



  return (
    <div className="flex flex-col bg-[#0e0e0e] font-sans md:h-screen md:overflow-hidden">

      {/* Main content — 2 columns */}
      <div className="flex flex-col md:flex-row flex-1 md:overflow-hidden">

        {/* Left — Fashion Image (unchanged) */}
        <LeftPanel />

        {/* Right — Register Form */}
        <div className="w-full md:w-1/2 bg-[#111111] flex items-center justify-center px-8 sm:px-14 py-10 md:overflow-y-auto">
          <div className="w-full max-w-md">
            {/* Brand */}
            <p className="text-white text-xl font-bold tracking-[0.2em] uppercase mb-6">
              SNITCH
            </p>

            {/* Heading */}
            <div className="mb-6">
              <h1 className="text-white text-2xl font-semibold mb-1">
                Begin your journey.
              </h1>
              <p className="text-[#6b6b6b] text-sm">
                Join the exclusive world of Snitch Atelier.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="relative group">
                <span className="absolute left-0 bottom-3 text-[#4a4a4a] group-focus-within:text-[#c9a84c] transition-colors duration-200">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#c9a84c] text-white text-sm placeholder-[#4a4a4a] pl-6 pr-2 py-3 outline-none transition-colors duration-200"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <span className="absolute left-0 bottom-3 text-[#4a4a4a] group-focus-within:text-[#c9a84c] transition-colors duration-200">
                  <MailIcon />
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#c9a84c] text-white text-sm placeholder-[#4a4a4a] pl-6 pr-2 py-3 outline-none transition-colors duration-200"
                />
              </div>

              {/* Contact Number */}
              <div className="relative group">
                <span className="absolute left-0 bottom-3 text-[#4a4a4a] group-focus-within:text-[#c9a84c] transition-colors duration-200">
                  <PhoneIcon />
                </span>
                <input
                  type="tel"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#c9a84c] text-white text-sm placeholder-[#4a4a4a] pl-6 pr-2 py-3 outline-none transition-colors duration-200"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <span className="absolute left-0 bottom-3 text-[#4a4a4a] group-focus-within:text-[#c9a84c] transition-colors duration-200">
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create Password"
                  className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#c9a84c] text-white text-sm placeholder-[#4a4a4a] pl-6 pr-8 py-3 outline-none transition-colors duration-200"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-0 bottom-3 text-[#4a4a4a] hover:text-[#c9a84c] transition-colors duration-200"
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* Register as Seller */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleCheckbox}
                  className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-all duration-200 ${
                    form.isSeller
                      ? "bg-[#c9a84c] border-[#c9a84c]"
                      : "border-[#3a3a3a] bg-transparent hover:border-[#c9a84c]"
                  }`}
                  aria-checked={form.isSeller}
                  role="checkbox"
                >
                  {form.isSeller && (
                    <svg
                      className="w-2.5 h-2.5 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  )}
                </button>
                <span
                  className="text-[#6b6b6b] text-sm select-none cursor-pointer"
                  onClick={handleCheckbox}
                >
                  Register as Seller
                </span>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold tracking-[0.2em] uppercase text-black bg-linear-to-r from-[#c9a84c] via-[#e2c46a] to-[#c9a84c] hover:from-[#d4b55a] hover:to-[#d4b55a] transition-all duration-300 hover:shadow-[0_0_24px_rgba(201,168,76,0.3)]"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-[#222]" />
              <span className="text-[#3a3a3a] text-[10px] tracking-[0.15em] uppercase">
                Or Join With
              </span>
              <div className="flex-1 h-px bg-[#222]" />
            </div>

            {/* Continue With Google Button */}
            <ContinueWithGoogle />

            {/* Login Link */}
            <p className="text-center text-[#4a4a4a] text-sm mt-6 flex gap-1">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#c9a84c] hover:text-[#e2c46a] transition-colors duration-200 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        
      </div>

      {/* Footer — full width, pinned to bottom */}
      <Footer />
    </div>
  );
}
