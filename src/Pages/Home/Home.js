import React, { useState } from "react";
import hero1 from "../../assets/images/home/hero (1).jpg";
import hero2 from "../../assets/images/home/hero (2).jpg";
import hero3 from "../../assets/images/home/hero (3).jpg";
import hero4 from "../../assets/images/home/hero (4).jpg";
import hero5 from "../../assets/images/home/hero5.png";
import hero6 from "../../assets/images/home/hero6.jpg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../../Components/Footer";

const cat = [
  "Technology",
  "Business",
  "Entertainment",
  "Sports",
  "Health",
  "Science",
  "General",
  "Politics",
];

export default function Home({ user }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleVisitViewALl = () => {
    if (user) {
      return navigate("/blog");
    } else {
      return navigate("/auth/login");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="w-full"
    >
      {/* Hero Section */}
      <div className="p-2 flex flex-col gap-2">
        <header className="relative w-full max-w-[1920px] h-[534px] m-auto rounded-[32px] overflow-hidden flex justify-center items-center">
          <div className="absolute top-0 left-0 w-full h-full -z-10">
            <img
              src={hero5}
              alt=""
              className="w-full h-full object-cover object-center "
            />
            {/* <div className="bg-black w-full h-full absolute top-0 left-0 bg-opacity-10"></div> */}
          </div>
          <div className="p-10 font-pop flex flex-col items-center gap-6 z-20">
            <h1 className="text-8xl font-medium">Getting Started</h1>
            <p className="text-xl text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
              quibusdam.
            </p>
            <Link
              to={user ? "/blog" : "/auth/login"}
              className="text-2xl rounded-full bg-white hover:bg-primary transition-all px-10 py-5"
            >
              {user ? "Visit Blog" : "Login"}
            </Link>
          </div>
        </header>
      </div>

      <main className="mx-auto max-w-[80rem] w-full mt-24 flex flex-col gap-28">
        <section className="flex flex-col gap-5">
          <h1 className="font-pop font-medium text-6xl">Featured</h1>
          <div className="flex gap-10">
            <div className="w-[70%]">
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full text-left rounded-[32px] overflow-hidden bg-[#F8FAFD] hover:bg-sky-100 transition-all"
              >
                <div className="relative w-full h-[400px] rounded-[32px] overflow-hidden">
                  <img
                    src={hero6}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    className={`bg-black w-full h-full absolute top-0 left-0 transition-all ${
                      isHovered ? "bg-opacity-30" : "bg-opacity-10"
                    }`}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end gap-5 p-5 z-10">
                    <h1 className="text-3xl font-medium font-pop text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quod, quibusdam.
                    </h1>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[19px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod, quibusdam.
                  </p>
                </div>
              </button>
            </div>

            <div className="w-[30%]">
              <div className="flex justify-between gap-2 items-center">
                <h4 className="font-pop"> Recent Blogs</h4>
                <button
                  onClick={handleVisitViewALl}
                  className="font-pop text-[14px] font-medium text-sky-500"
                >
                  View all
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <button className="border border-zinc-50 rounded-xl flex gap-2 items-center p-2 bg-white1 text-left">
                  <img
                    src={hero6}
                    className="w-12 h-12 rounded-xl object-cover"
                    alt=""
                  />
                  <div>
                    <h2 className="font-pop text-lg font-medium">Title</h2>
                    <p className="text-[14px]">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quod, quibusdam.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="flex flex-col gap-6">
          <h1 className="font-pop font-medium text-6xl">Categorize</h1>
          <div className="grid grid-cols-2 gap-5">
            {cat.map((item, index) => {
              return (
                <button
                  key={index}
                  className="text-xl font-medium text-center p-5 py-8 bg-white1 hover:bg-amber-50 transition-all rounded-2xl "
                >
                  {item}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}
