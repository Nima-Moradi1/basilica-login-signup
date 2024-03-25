import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../zod/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../core/http";
import { Spinner } from "./Spinner";
import toast from "react-hot-toast";
import Logo from "./Logo";
import Button from "./Button";
import Error from "./Error";

const Login = () => {
  // we use router dom hooks to navigate SPA (no extra loading)

  const navigate = useNavigate();
  const api = new Api();
  // we use react hook form to handle form data
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  // here we send the data to the server through fetch
  const onSubmit = async (data) => {
    const response = await api.post("login", JSON.stringify(data));
    // we can use toast to actually show user something
    // i still have no data to what to do next
    const responseData = await response.json();

    if (!response.ok) {
      // response status is not 2xx
      toast.error(JSON.stringify(responseData.detail));
      return;
    } else {
      toast.success("logged in successfully!");
      navigate("/preds");
    }
  };

  return (
    <div className="">
      <div className="max-w-4xl mx-auto bg-white lg:translate-y-[20%] shadow-md shadow-black rounded-xl">
        <div className="flex flex-col lg:flex-row mb-10 lg:mb-0 ">
          <div className=" lg:rounded-l-xl flex items-center justify-center w-[60vw] lg:mr-5 mb-10 lg:mb-0 bg-primary">
            <img
              src="src/assets/login2.png"
              className=" w-screen h-[40vh] lg:h-[50vh] lg:w-[30vw] lg:pr-5"
            />
          </div>
          <div className="flex gap-10 flex-col items-center lg:w-[50vw]">
            <div>
              <Logo />
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col text-sm lg:pr-5 lg:w-full w-[60vw] gap-14 *:border-b-2 *:border-black *:outline-none ">
              <input
                {...register("email")}
                type="email"
                placeholder="Username Or Email"
              />
              {errors.email && <Error errorMsg={errors.email.message} />}
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
              />
              {errors.password && <Error errorMsg={errors.password.message} />}
              <a
                href="/"
                className="text-primary font-extrabold border-none text-end">
                Forgot Password ?
              </a>
              <Button
                type="submit"
                disabled={isSubmitting}
                label={isSubmitting ? <Spinner /> : "LOGIN"}
              />
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
    </div>
  );
};

export default Login;
