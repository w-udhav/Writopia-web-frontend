import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../Utils/api/axiosInstance";
import { AuthContext } from "../../extras/AuthContext";

export default function Manage() {
  const [data, setData] = useState([]);
  const { setModalData } = useContext(AuthContext);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axiosInstance("/blog?isPublished=false");
      setData(res.data.blogs);
      console.log(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      const res = await axiosInstance.put(`/blog/${id}`, {
        isPublished: status,
      });
      if (res.status === 200) {
        setModalData({
          type: "SUCCESS",
          msg: "Blog is published",
        });
      }
      fetchData();
    } catch (error) {
      console.log(error);
      setModalData({
        type: "ERROR",
        msg: "Something went wrong. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex gap-10">
      <div className="max-w-[50rem] w-full">
        <div>
          <p className="text-[15px] text-zinc-700 border-b border-zinc-200 pb-2">
            Approve or reject blogs
          </p>
          <div className="flex flex-col gap-1 mt-5">
            {data && data.length > 0 ? (
              data.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => setSelectedBlog(blog)}
                  className="border-2 rounded-xl bg-white1 p-2 flex justify-between cursor-pointer"
                >
                  <div>
                    <p className="text-xl font-medium">{blog?.title}</p>
                    <p className="italic">{blog.author?.username}</p>
                  </div>
                  <div className="flex gap-1 items-center text-white">
                    <button
                      onClick={() => handleStatus(blog._id, true)}
                      className="bg-green-500 rounded-md px-2 py-1 font-semibold text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatus(blog._id, false)}
                      className="bg-red-500 rounded-md px-2 py-1 font-semibold text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xl font-medium text-green-600">
                No blogs to approve
              </p>
            )}
          </div>
        </div>
      </div>

      {selectedBlog && (
        <div className="w-full flex justify-center">
          <br />
          <div className="max-w-[45rem] w-full flex flex-col gap-5">
            <div className="relative min-w-[45rem] h-[360px] flex flex-col gap-4 ">
              {selectedBlog?.imageUrl && selectedBlog.imageUrl !== "" && (
                <div className="relative max-w-[45rem] h-[380px] rounded-2xl">
                  <img
                    src={selectedBlog.imageUrl}
                    alt="cover"
                    className="w-full h-full object-cover rounded-2xl"
                  />

                  <div
                    className="absolute inset-0 rounded-2xl bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${selectedBlog.imageUrl})`,
                      filter: "blur(15px) brightness(0.75)", // Apply a blur filter and reduce brightness
                      boxShadow: "0 0 50px 50px rgba(135, 206, 235, 0.5) inset", // Apply an inset box shadow with a sky blue color
                      zIndex: -1, // Ensure the blurred image is behind the original image
                    }}
                  ></div>
                </div>
              )}
              <div>
                <h1 className="font-pop text-4xl font-bold text-zinc-800">
                  {selectedBlog.title || "Title"}
                </h1>
              </div>

              <div className="z-10 flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold ">
                    <span className="font-bold">@</span>
                    {selectedBlog.author.username}{" "}
                  </p>
                  <p className="text-[15px] text-zinc-700">
                    {new Date(selectedBlog.createdAt).getDate() +
                      " " +
                      new Date(selectedBlog.createdAt).toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      ) +
                      " " +
                      new Date(selectedBlog.createdAt).getFullYear() +
                      " "}
                  </p>
                </div>

                <div className="flex gap-2 items-center rounded-full px-3 py-1 bg-amber-200">
                  <div className="w-2 h-2 rounded-full bg-white shadow-md"></div>
                  <p className="text-[13px] mt-[1px] text-zinc-700 font-semibold capitalize">
                    {selectedBlog.category?.name || "Category"}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div>
                <p>{selectedBlog.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
