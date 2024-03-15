import { Link } from "react-router-dom";
import Button from "./Button";

//prettier-ignore
const Home = () => {
  return (
    <div className="w-full h-full bg-primary">
      <div className="max-w-3xl flex flex-col gap-10 bg-white shadow-md shadow-black rounded-xl translate-y-[25%] mx-auto text-center">
      <div className="flex items-center justify-center">
        <img
          src="src/assets/logomain.png"
          className="flex w-32"
        />
      </div>
      <h2 className="max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Vestibulum nec velit sit amet felis tincidunt scelerisque. 
    Nullam nec varius nibh, sit amet elementum velit. 
    Cras at sem nec sapien rhoncus eleifend. 
    Donec ultrices nisl nec est iaculis, ut luctus ex convallis.</h2>
    <Link to='/login'>
    <Button label='LOGIN'/></Link>
    <h3 className="pb-5">
            Do not have an Account ? &nbsp;
            <Link to="/signup">
              <span className="text-primary font-extrabold text-xl">Sign Up</span>
            </Link>
          </h3>
      </div>
    </div>
  );
};

export default Home;
