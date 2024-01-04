import React, { useEffect, useState } from "react";
import axiosInstance from "../../Utils/api/axiosInstance";

export default function Category() {
  const [data, setData] = useState();
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/category/all");
      setCategory(res.data.categories);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/category/create", {
        name: data,
      });
      console.log(res);
      setData("");
      fetchData();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  console.log(category);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex gap-20 pt-10">
      <div className="max-w-[20rem] w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="category"
              className="capitalize text-[14px] font-pop"
            >
              Write your category here
            </label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={data}
              className="w-full outline-none border-2 border-zinc-300 rounded-lg focus:border-sky-500 p-1"
              onChange={(e) => setData(e.target.value.toLowerCase())}
            />
          </div>
          <button className="rounded-lg p-1 bg-[#1A7F37] text-white font-semibold">
            <h1>Add</h1>
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-2">
        {category && category.length > 0 ? (
          category.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-sky-400 min-w-[300px] rounded-lg p-2 capitalize text-center"
              >
                <h1>{item.name}</h1>
              </div>
            );
          })
        ) : (
          <h1>No data</h1>
        )}
      </div>
    </div>
  );
}
