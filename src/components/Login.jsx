import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../zod/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    const response = await fetch("http://198.244.146.216:8000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      // response status is not 2xx
      alert("Login failed!");
      return;
    } else {
      alert("logged in successfully!");
      navigate("/");
    }

    if (responseData.errors) {
      const errors = responseData.errors;

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
    <div>
      <div className="flex flex-col lg:flex-row mb-10 lg:mb-0 ">
        <div>
          <img
            src="src/assets/login.jpg"
            className=" w-screen h-[40vh] lg:w-[50vw] lg:h-screen"
          />
        </div>
        <div className="flex gap-10 flex-col items-center lg:w-[50vw]">
          <div>
            <img
              src="src/assets/logo2.png"
              className="hidden lg:flex w-72"
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:w-[40vw] w-[80vw] gap-14 *:border-b-2 *:border-black *:outline-none ">
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
              className="text-blue-950 font-extrabold border-none text-end">
              Forgot Password ?
            </a>
            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:bg-gray-600 hover:scale-105 hover:transition-all duration-200 border-none text-white bg-blue-950 p-2 rounded-xl w-40 mx-auto">
              LOGIN
            </button>
          </form>
          <p>
            Do not have an account ?
            <Link to="/signup">
              <span className="text-blue-950 font-extrabold text-xl">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
