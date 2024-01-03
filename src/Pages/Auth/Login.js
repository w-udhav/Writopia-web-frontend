import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Utils/api/auth";

const initialFormData = Object.freeze({
  name: "",
  password: "",
});

export default function Login() {
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
      const res = await loginUser(formData);
      console.log(res);
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
            htmlFor="name"
            className="text-[12px] uppercase font-bold  text-zinc-600 tracking-wide"
          >
            Username <span className="text-zinc-400">or</span> Email
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
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
            disabled={loading}
            type="submit"
            className="w-full rounded-md bg-sky-500 text-white font-roboto font-medium tracking-wide text-[16px] py-[5px] p-1 mt-5"
          >
            {loading ? "Loading..." : "Continue"}
          </button>
          <div className="text-[13px] text-center">
            <span>don't have an account? </span>
            <Link to="/auth/signup" className=" font-semibold text-blue-600">
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
