import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/api/axiosInstance";
import hero1 from "../../assets/images/home/hero (3).jpg";
import redirect from "../../assets/svg/redirect.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cross from "../../assets/svg/cross.svg";

const initialValue = {
  title: "",
  content: "",
  category: "",
};

export default function Create() {
  const [data, setData] = useState(initialValue);
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [error, setError] = useState(null);

  const date = new Date();

  let blogId;

  const handlePreview = () => {
    window.open(`/blog/${blogId}`, "_blank");
  };

  const fetchCategory = async () => {
    try {
      const res = await axiosInstance.get("/category/all");
      setCategory(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("image", selectedFile);
    setOnSuccess(false);
    setLoading(true);
    try {
      const res = await axiosInstance.post("/blog", formData);
      console.log(res.data);
      blogId = res.data.newBlog._id;
      setLoading(false);
      setOnSuccess(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  return (
    <div className="flex gap-5">
      {/* Submission form */}
      <div className="max-w-[35rem] w-full flex flex-col gap-5">
        <p className="text-[15px] text-zinc-700 border-b border-zinc-200 pb-2">
          Write your blog here. Let your imagination run wild.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="title" className="capitalize text-[14px] font-pop">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
            />
          </div>
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="title" className="capitalize text-[14px] font-pop">
              Content
            </label>
            <textarea
              name="content"
              value={data.content}
              onChange={handleChange}
              cols="30"
              rows="10"
              className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
            ></textarea>
          </div>
          <div className="flex flex-col gap-[1px]">
            <label
              htmlFor="category"
              className="capitalize text-[14px] font-pop"
            >
              Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
            >
              <option value="">Select Category</option>
              {category?.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-[1px]">
            <label htmlFor="title" className="capitalize text-[14px] font-pop">
              Image
            </label>
            <div className="relative flex gap-2 justify-between items-center">
              <input
                type="file"
                name="image"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
              />
              <button
                onClick={() => setSelectedFile(null)}
                className="rounded-full p-1 bg-sky-50"
              >
                <img src={cross} className="w-5 h-5" alt="cross" />
              </button>
            </div>
          </div>
          <button
            disabled={loading}
            className="rounded-lg p-1 bg-[#1A7F37] disabled:bg-green-800 text-white font-semibold"
          >
            <h1>Create Blog</h1>
          </button>
        </form>
        {
          // Error
          error && <p className="text-red-600">{error}</p>
        }
      </div>

      {/* Preview */}
      <div className="w-full flex justify-center">
        <div className="">
          <div className="flex justify-between items-center z-10">
            <h1 className="text-3xl text-zinc-700 font-medium font-pop">
              Preview
            </h1>
            <AnimatePresence>
              {onSuccess && (
                <motion.button
                  onClick={handlePreview}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-10 h-10 p-2 bg-white shadow-sm hover:bg-primary rounded-xl transition-all animate-pulse"
                >
                  <img
                    src={redirect}
                    alt="redirect logo"
                    className="opacity-70"
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <br />
          <div className="max-w-[45rem] w-full flex flex-col gap-5">
            <div className="relative min-w-[45rem] h-[360px] rounded-2xl">
              {data.cover ? (
                <img
                  src={URL.createObjectURL(data.cover) || hero1}
                  alt="cover"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <img
                  src={hero1}
                  alt="cover"
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}
              <div
                className="absolute w-full h-full top-0 left-0 right-0 bottom-0 rounded-2xl bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    data.cover ? URL.createObjectURL(data.cover) : hero1
                  })`,
                  filter: "blur(15px)", // Apply a blur filter
                  boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.5)", // Apply a box shadow to create the glow
                  zIndex: -1, // Ensure the blurred image is behind the original image
                }}
              ></div>
            </div>
            <div className="z-10 flex justify-between items-center">
              <div>
                <p className="font-semibold text-xl"> Admin </p>
                <p className="text-[15px] -mt-1 text-zinc-700">
                  {date.getDate()}{" "}
                  {date.toLocaleString("default", { month: "long" })}{" "}
                  {date.getFullYear()}
                </p>
              </div>
              <div className="flex gap-2 items-center rounded-full px-3 py-1 bg-amber-200">
                <div className="w-2 h-2 rounded-full bg-white shadow-md"></div>
                <p className="text-[13px] mt-[1px] text-zinc-700 font-semibold capitalize">
                  {category.find((item) => item._id === data.category)?.name ||
                    "Category"}
                </p>
              </div>
            </div>

            {/* title */}
            <div>
              <h1 className="font-pop text-4xl font-bold text-zinc-800">
                {data.title}
              </h1>
            </div>

            <div>
              <p>{data.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
