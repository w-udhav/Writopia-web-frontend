import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../Utils/api/axiosInstance";
import cross from "../assets/svg/cross.svg";

const formSchema = {
  title: "",
  content: "",
  category: "",
};

export default function BlogModal({ setBlogModal, setModalData }) {
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // [null, setSelectedFile
  const [form, setForm] = useState(formSchema);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleClear = () => {
    setForm(formSchema);
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append("image", selectedFile);

    try {
      const res = await axiosInstance.post("/blog", formData);
      setModalData({
        title: "Success",
        content: "Blog created successfully",
      });
      setBlogModal(false);
    } catch (error) {
      setModalData({
        title: "Error",
        content: "Something went wrong",
      });
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="min-w-screen w-full h-full  fixed top-0 left-0 overflow-y-auto bg-black bg-opacity-50 p-3 flex justify-center items-center z-50"
    >
      <div className="bg-white relative rounded-xl shadow-xl p-8 max-w-[35rem] w-full h-max m-auto flex flex-col gap-5">
        <h1 className="text-3xl font-serif font-semibold">
          Write your creative blog
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md"
            />
            <textarea
              placeholder="Content"
              cols={30}
              rows={7}
              name="content"
              value={form.content}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md"
            ></textarea>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md capitalize"
            >
              <option value="" disabled selected>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              placeholder="Image URL"
              name="image"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="border-b"></div>
          <div className="flex gap-5 font-bold  text-sm">
            <button
              type="button"
              disabled={loading}
              onClick={handleClear}
              className="flex-1 px-3 py-4 tracking-wide rounded-[4px] bg-sky-100 bg-opacity-50"
            >
              CLEAR
            </button>
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="bg-purple-400 hover:bg-purple-500 tracking-wide flex-1 text-black px-3 py-2 rounded-[4px]"
            >
              {loading ? "LOADING..." : "CREATE"}
            </button>
          </div>
        </form>

        <button
          onClick={() => setBlogModal(false)}
          className="absolute top-2 right-2 rounded-full p-2 bg-sky-100"
        >
          <img src={cross} className="w-6 h-6" alt="cross" />
        </button>
      </div>
    </motion.div>
  );
}
