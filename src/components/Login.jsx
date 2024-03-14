import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../zod/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../core/http";
import { Spinner } from "./Spinner";
import toast from "react-hot-toast";
const Login = () => {
  // we use router dom hooks to navigate SPA (no extra loading)

  const navigate = useNavigate();
  const api = new Api();
  // we use react hook form to handle form data
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  // here we send the data to the server through fetch
  const onSubmit = async (data) => {
    const response = await api.post("login", JSON.stringify(data));
    console.log(response);
    // we can use toast to actually show user something
    // i still have no data to what to do next
    const responseData = await response.json();
    if (!response.ok) {
      // response status is not 2xx
      toast.error("Login Failed");
      return;
    } else {
      toast.success("logged in successfully!");
      navigate("/preds");
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      // we handle the errors with zod through r-h-f
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("Something went wrong!");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white lg:translate-y-[10%] shadow-md shadow-black rounded-xl">
      <div className="flex flex-col lg:flex-row mb-10 lg:mb-0 ">
        <div className=" lg:rounded-l-xl lg:mr-5 mb-10 lg:mb-0 bg-[#0b2744]">
          <img
            src="src/assets/login.png"
            className=" w-screen h-[40vh] lg:h-full lg:w-[60vw] lg:pr-5"
          />
        </div>
        <div className="flex gap-10 flex-col items-center lg:w-[50vw]">
          <div>
            <img
              src="src/assets/logo.png"
              className="hidden lg:flex w-72"
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:pr-5 lg:w-full w-[60vw] gap-14 *:border-b-2 *:border-black *:outline-none ">
            <input
              {...register("email")}
              type="email"
              placeholder="Username Or Email"
            />
            {errors.email && <p className="text-sm text-red-500 -my-8 border-none">{`${errors.email.message}`}</p>}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 -my-8 border-none">{`${errors.password.message}`}</p>
            )}
            <a
              href="/"
              className="text-primary font-extrabold border-none text-end">
              Forgot Password ?
            </a>
            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:bg-gray-600 flex items-center justify-center hover:scale-105 hover:transition-all duration-200 border-none text-white bg-primary p-2 rounded-xl w-40 mx-auto">
              {isSubmitting ? <Spinner /> : "LOGIN"}
            </button>
          </form>
          <p className="mb-3">
            Do not have an account ? &nbsp;
            <Link to="/signup">
              <span className="text-primary font-extrabold text-xl">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
