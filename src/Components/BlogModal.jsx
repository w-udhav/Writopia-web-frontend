import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../Utils/api/axiosInstance";

export default function BlogModal({ setBlogModal, setModalData }) {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance("/category/all");
      setCategories(response.data.categories);
    } catch (error) {
      setModalData({
        title: "Error",
        content: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-w-screen w-full h-full  fixed top-0 left-0 overflow-y-auto bg-black bg-opacity-50 p-3 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl p-3 max-w-[30rem] w-full h-max m-auto">
        <h1 className="text-3xl font-semibold text-center">Add</h1>
        <form>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Title"
              className="border border-gray-300 p-2 rounded-md"
            />
            <textarea
              placeholder="Content"
              maxLength={200}
              cols={30}
              rows={7}
              className="border border-gray-300 p-2 rounded-md"
            ></textarea>
            <input
              type="text"
              placeholder="Image URL"
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex justify-end mt-3">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
              onClick={() => {
                setBlogModal(false);
                setModalData({});
              }}
            >
              Cancel
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md ml-2">
              Add
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
