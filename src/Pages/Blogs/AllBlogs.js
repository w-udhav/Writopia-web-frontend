import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import hero from "../../assets/images/home/hero (1).jpg";
import axiosInstance from "../../Utils/api/axiosInstance";
import { motion } from "framer-motion";

export default function AllBlogs() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const category = [];

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = axiosInstance.delete(`/blog/${id}`);
      console.log(res);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/blog");
      console.log(res.data.blogs);
      setData(res.data.blogs);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="p-2 max-w-[80rem] mx-auto flex flex-col gap-6"
    >
      <Navbar />
      <div>
        <h1 className="text-4xl font-bold text-zinc-800">All Blogs</h1>
      </div>
      <div className="flex flex-col gap-10">
        {loading ? (
          <div className="w-full h-[300px] rounded-xl bg-zinc-100"></div>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className="max-w-[45rem] w-full flex flex-col gap-4 cursor-pointer border-zinc-100 rounded- border-b-2 last:border-b-0 pb-8"
            >
              <div className="relative max-w-[45rem] h-[360px] rounded-2xl">
                {/* {data.cover ? (
                <img
                  src={URL.createObjectURL(data.cover) || hero}
                  alt="cover"
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <img
                  src={hero}
                  alt="cover"
                  className="w-full h-full object-cover rounded-2xl"
                />
              )} */}
                <img
                  src={hero}
                  alt="cover"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div
                  className="absolute inset-0 rounded-2xl bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${hero})`,
                    filter: "blur(15px) brightness(0.75)", // Apply a blur filter and reduce brightness
                    boxShadow: "0 0 50px 50px rgba(135, 206, 235, 0.5) inset", // Apply an inset box shadow with a sky blue color
                    zIndex: -1, // Ensure the blurred image is behind the original image
                  }}
                ></div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-transparent text-[14px] font-bold text-red-500"
                >
                  {/* <img src={more} alt="more" className="w-10" /> */}
                  Delete
                </button>
              </div>

              <div className="z-10 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-xl">
                    <span className="font-bold">@</span>
                    {item.author.username}{" "}
                  </p>
                  <p className="text-[15px] text-zinc-700">
                    {new Date(item.createdAt).getDate() +
                      " " +
                      new Date(item.createdAt).toLocaleString("default", {
                        month: "long",
                      }) +
                      " " +
                      new Date(item.createdAt).getFullYear() +
                      " "}
                  </p>
                </div>

                <div className="flex gap-2 items-center rounded-full px-3 py-1 bg-amber-200">
                  <div className="w-2 h-2 rounded-full bg-white shadow-md"></div>
                  <p className="text-[13px] mt-[1px] text-zinc-700 font-semibold capitalize">
                    {category.find((item) => item._id === data.category)
                      ?.name || "Category"}
                  </p>
                </div>
              </div>

              <div>
                <h1 className="font-pop text-4xl font-bold text-zinc-800">
                  {item.title || "Title"}
                </h1>
              </div>

              <div>
                <p>
                  {item.content.length > 200
                    ? item.content.slice(0, 200) + "..."
                    : item.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
