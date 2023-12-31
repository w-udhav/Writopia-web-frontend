import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="p-3">
      <Link
        to="/auth/login"
        className="w-full p-2 rounded-xl bg-white border border-zinc-300"
      >
        to Login
      </Link>
    </div>
  );
}
