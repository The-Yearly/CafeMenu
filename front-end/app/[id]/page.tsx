"use client";
import { Food } from "../assets/interface/food";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import AddButton from "../components/addButton";
import Image from "next/image";
import Categories from "../assets/interface/categories";
import Cart from "../components/cart";
import { useState, useEffect, use } from "react";
import "swiper/css/bundle";
import Navbar from "../components/Navbar";
interface Items {
  items: Food[];
}
interface Category {
  categories: Categories[];
}
export default function Home({ params }: { params: Promise<{ id: number }> }) {
  const id = use(params);
  const tid = id.id;
  const [route, setRoute] = useState("all");
  const [category, setCategory] = useState<Categories[] | null>();
  const [data, setData] = useState<Food[] | null>(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilter] = useState<Food[] | null>(null);
  const status = localStorage.getItem("status");
  if (status != null) {
    sessionStorage.setItem("status", "false");
  }
  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch("http://localhost:3001/api/v1/getCategories");
      const cats: Category = await res.json();
      setCategory(cats.categories);
    };
    getCategory();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const link = "http://localhost:3001/api/v1/category/";
      setFilter(null);

      let res;
      if (route == "all") {
        res = await fetch("http://localhost:3001/api/v1/menu");
      } else {
        res = await fetch(link + route);
      }
      const item: Items = await res.json();
      setData(item.items);
    };
    fetchdata();
  }, [route]);
  useEffect(() => {
    const Search = () => {
      if (data != null) {
        const a = data.filter((food) =>
          food.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilter(a);
      }
    };
    Search();
  }, [search]);

  function gotInput(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value != "") {
      setSearch(event.target.value);
    } else {
      setSearch("");
    }
  }

  if (data != null && category != null) {
    const top5 = data.slice(0, 5);
    console.log(data);
    return (
      <>
        <Cart tid={tid} />
        <div>
          {/* navabr component */}

          <Navbar />

          <input
            className="border border-red-500 sm:h-[15vw] sm:top-[35vw] sm:left-[2vw] sm:w-[96vw] sm:pl-[5vw] sm:rounded-[3vw] xl-phone:h-[15vw] xl-phone:top-[35vw] xl-phone:left-[2vw] xl-phone:w-[96vw] xl-phone:pl-[5vw] xl-phone:rounded-[3vw] h-[15vw] top-[35vw] left-[2vw] w-[96vw] pl-[5vw] rounded-[3vw] bg-white p-[1vw]"
            value={search}
            onChange={gotInput}
            placeholder="Search"
          />
          <p className=" sm:text-[5vw] sm:left-[5vw] sm:top-[55vw] xl-phone:text-[5vw] xl-phone:left-[5vw] xl-phone:top-[55vw] text-[5vw] left-[5vw] top-[55vw] font-playwrite ">
            Categories
          </p>
          <div className="relative grid xl-phone:grid-cols-2 xl-phone:gap-4 xl-phone:top-[0vw] grid-cols-2 gap-y-10 top-[8vw]">
            {(filteredData ?? data).map((food) => (
              <div
                className="relative shadow-lg bg-white flex items-center justify-center 2xl:top-[9vw] 2xl:rounded-[2vw] 2xl:w-[14vw] 2xl:min-h-[17vw] 2xl:p-4 h-auto lg:p-8 lg:top-[9vw] lg:rounded-[3vw] lg:w-[18vw] lg:min-h-[23vw] md:p-8 md:top-[9vw] md:rounded-[4vw] md:w-[24vw] md:min-h-[30vw] sm:p-8 sm:top-[9vw] sm:rounded-[4vw] sm:w-[40vw] sm:min-h-[35vw] xl-phone:min-h-[65vw] xl-phone:h-auto xl-phone:p-8 xl-phone:top-[5vw] p-8 top-[0vw] left-[3vw] rounded-[10vw] w-[47vw] min-h-[70vw] "
                key={food.itemId}
              >
                <Image
                  className="absolute 2xl:top-[-2vw] z-0 xl:top-[-2vw] md:top-[-2vw] 2xl:w-[10vw] lg:w-[10vw] lg:h-[10vw] md:w-[15vw] md:h-[14vw] sm:w-[23vw] sm:h-[23vw] sm:rounded-[15vw] sm:top-[-5vw] xl-phone:w-[46vw] xl-phone:h-[45vw] xl-phone:rounded-[10vw] xl-phone:top-[0vw] w-[46vw] h-[45vw] rounded-[10vw] top-[0vw]"
                  alt={"Food Item" + food.itemId}
                  width={1000}
                  height={1000}
                  src={food.image}
                />
                <p className="absolute text-center text-black font-playwrite 2xl:text-[1.5vw] break-words  2xl:w-[10vw] 2xl:top-[8.5vw] lg:text-[2vw] lg:w-[15vw] lg:top-[11vw]  md:text-[2.5vw] md:w-[20vw] md:top-[13vw]  sm:text-[3vw] sm:w-[20vw] sm:top-[18vw]  xl-phone:text-[4vw] xl-phone:w-[35vw] xl-phone:top-[48vw] text-[4.5vw] w-[30vw] top-[45vw] ">
                  {food.name}
                </p>
                <p className="absolute text-center 2xl:top-[13.7vw] 2xl:text-[1.5vw] font-playwrite lg:text-[2vw] lg:top-[19vw] md:text-[2.5vw] md:top-[24vw] sm:text-[3vw] sm:top-[29vw] xl-phone:text-[4vw] xl-phone:top-[60vw] text-[4.5vw] top-[60vw]">
                  {food.cost}
                </p>
                <AddButton item={food} location={"item"} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
