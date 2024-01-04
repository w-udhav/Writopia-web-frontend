import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/api/axiosInstance";
import hero1 from "../../assets/images/home/hero (3).jpg";
import redirect from "../../assets/svg/redirect.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const initialValue = {
  title: "",
  content: "",
  category: "",
  cover: "",
};

export default function Create() {
  const [data, setData] = useState(initialValue);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [error, setError] = useState(null);

  const date = new Date();

  let blogId;

  const fields = [
    {
      name: "title",
      type: "text",
      placeholder: "Title",
    },
    {
      name: "content",
      type: "textarea",
      placeholder: "Content",
    },
    {
      name: "category",
      type: "select",
      placeholder: "select category",
    },
    {
      name: "cover",
      type: "file",
      placeholder: "Cover",
    },
  ];

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
    console.log(data);
    setOnSuccess(false);
    setLoading(true);
    try {
      const res = await axiosInstance.post("/blog", {
        title: data.title,
        content: data.content,
        category: data.category,
      });
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
          {fields.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-[1px]">
                <label
                  htmlFor={item.name}
                  className="capitalize text-[14px] font-pop"
                >
                  {" "}
                  {item.name}
                </label>
                {item.type === "text" && (
                  <input
                    type={item.type}
                    name={item.name}
                    id={item.name}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
                  />
                )}
                {item.type === "textarea" && (
                  <textarea
                    name={item.name}
                    id={item.name}
                    cols="30"
                    rows="10"
                    placeholder={item.placeholder}
                    className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
                    onChange={handleChange}
                  ></textarea>
                )}
                {item.type === "select" && (
                  <select
                    name={item.name}
                    id={item.name}
                    className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
                    onChange={handleChange}
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
                )}
                {item.type === "file" && (
                  <input
                    type={item.type}
                    name={item.name}
                    id={item.name}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setData({ ...data, cover: file });
                    }}
                    placeholder={item.placeholder}
                    className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
                  />
                )}
              </div>
            );
          })}
          <br />
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
