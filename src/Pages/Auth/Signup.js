import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Utils/api/auth";

const initialFormData = Object.freeze({
  username: "",
  email: "",
  password: "",
});

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) setError(null);
    if (
      formData.username === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      setError("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const res = await registerUser(formData);
      if (res == "OK") {
        setFormData(initialFormData);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="p-6 font-pop">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label
            htmlFor="username"
            className="text-[12px] uppercase font-bold  text-zinc-600 tracking-wide"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="border border-gray-300 p-1 w-full rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-[12px] uppercase font-bold text-zinc-600 tracking-wide"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-1 w-full rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-[12px] uppercase font-bold text-zinc-600 tracking-wide"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-1 w-full rounded-md"
          />
        </div>
        {error && (
          <div className="text-red-500 text-[13px] font-medium">{error}</div>
        )}
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-sky-500 text-white font-roboto font-medium tracking-wide text-[16px] py-[5px] mt-5"
          >
            {loading ? "Creating..." : "Create"}
          </button>
          <div className="text-[13px] text-center">
            <span>already have an account? </span>
            <Link to="/auth/login" className=" font-semibold text-blue-600">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
