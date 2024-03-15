import AddSub from "./AddSub";
import Logo from "./Logo";

const Admin = () => {
  return (
    <>
      <div className="flex">
        <aside className="h-screen px-3 rounded-tr-md bg-primary w-60 text-white font-extrabold">
          <div>
            <Logo />
            <ul className="text-center flex flex-col gap-7 pt-5">
              <li>Check User Subscription</li>
              <hr />
              <li>Add Subscription</li>
              <hr />
              <li>Get Users List</li>
              <hr />
            </ul>
          </div>
        </aside>
        {/* <div className=" p-5 w-full bg-red-50 h-full">
          <div className="flex items-center justify-between">
            <div>
              <div>Admin Panel</div>
            </div>
            <GrUserAdmin />
          </div>
        </div> */}
        <div className="w-full">
          <AddSub />
        </div>
      </div>
    </>
  );
};

export default Admin;
