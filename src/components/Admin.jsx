import { Link, Route, Routes } from "react-router-dom";
import AddSub from "./AddSub";
import CheckSub from "./CheckSub";
import GetUsers from "./GetUsers";
import { GrUserAdmin } from "react-icons/gr";
import { IoPersonAdd } from "react-icons/io5";
import { FaUsersViewfinder } from "react-icons/fa6";
import { TbUserStar } from "react-icons/tb";

const Admin = () => {
  return (
    <>
      <div className="flex bg-slate-100">
        <aside className="h-screen px-3 bg-primary w-20 text-sm md:w-40 text-white font-extrabold">
          <div>
            <img
              src="/src/assets/logomain.png "
              className="w-20 mx-auto"
            />
            <ul className="text-center flex flex-col gap-7 pt-5">
              <Link to="/adm/checksub">
                <div className="flex items-center justify-center md:justify-start gap-3 ">
                  <TbUserStar className="text-xl md:text-lg" />
                  <li className="hidden md:flex">Check Subs</li>
                </div>
              </Link>
              <hr />
              <Link to="/adm/addsub">
                {" "}
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <IoPersonAdd className="text-xl md:text-lg" />
                  <li className="hidden md:flex">Add Subs</li>
                </div>
              </Link>
              <hr />
              <Link to="/adm/getusers">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <FaUsersViewfinder className="text-xl md:text-lg" />
                  <li className="hidden md:flex">Get Users</li>
                </div>
              </Link>
              <hr />
            </ul>
          </div>
        </aside>
        <div className="flex flex-col w-screen">
          <div className=" p-2 bg-primary w-[calc(100% - 240px)] mb-10 text-white">
            <div className="flex items-center justify-between">
              <div className="border-l-2 pl-3">
                <span> Basilica Admin Panel</span>
              </div>
              {/* here we need to get the user details 
              and show it in the user section */}
              <div className="border p-2 rounded-md flex gap-10 items-center justify-center">
                <div className="text-sm lg:text-base">Hi , Admin !</div>
                <div className="border rounded-full p-2">
                  <GrUserAdmin />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div
              className="max-w-2xl flex flex-col gap-10 shadow-md 
      lg:translate-y-[20%] p-4
       shadow-black sm:rounded-xl mx-auto text-center">
              <Routes>
                <Route
                  path="addsub"
                  element={<AddSub />}
                />
                <Route
                  path="checksub"
                  element={<CheckSub />}
                />
                <Route
                  path="getusers"
                  element={<GetUsers />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
