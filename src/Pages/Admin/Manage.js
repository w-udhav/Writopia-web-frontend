import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/api/axiosInstance";

export default function Manage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance("/blog?isPublished=false");
      setData(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-[50rem] w-full">
      <div>
        <p className="text-[15px] text-zinc-700 border-b border-zinc-200 pb-2">
          Approve or reject blogs
        </p>
        <div className="flex flex-col gap-1 mt-5">
          {data && data.length > 0 ? (
            <div className="border rounded-lg p-2 flex justify-between">
              <div>
                <p className="text-xl font-medium">Blog Title</p>
                <p className="italic">author</p>
              </div>
              <div className="flex gap-1 items-center text-white">
                <button className="bg-green-500 rounded-md px-2 py-1 font-semibold text-sm">
                  Approve
                </button>
                <button className="bg-red-500 rounded-md px-2 py-1 font-semibold text-sm">
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xl font-medium text-green-600">
              No blogs to approve
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
