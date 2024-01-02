import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialFormData = Object.freeze({
  name: "",
  password: "",
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
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
        <button
          type="submit"
          className="w-full rounded-md bg-sky-500 text-white font-roboto font-medium tracking-wide text-[16px] py-[5px] p-1 mt-5"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
