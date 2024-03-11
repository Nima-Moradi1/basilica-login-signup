import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../zod/SignupSchema";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  function createForm(data) {
    return { ...data, last_name: data.lname, name: data.fname };
  }

  async function onSubmit(data) {
    const create = createForm(data);
    const response = await fetch("http://198.244.146.216:8000/user/create", {
      method: "POST",
      body: JSON.stringify(create),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      // response status is not 2xx
      alert("Submitting form failed!");
      return;
    } else {
      alert("account successfully created");
      navigate("/login");
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
      } else if (errors.checkbox) {
        setError("checkbox", {
          type: "server",
          message: errors.checkbox,
        });
      } else {
        alert("Something went wrong!");
      }
    }

    reset();
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row mb-10 lg:mb-0">
        <div>
          <img
            src="src/assets/signup.jpg"
            className=" w-screen h-[40vh] lg:w-[50vw] lg:h-screen"
          />
        </div>
        <div className="flex gap-10 flex-col items-center lg:w-[50vw]">
          <div>
            <img
              src="src/assets/logo2.png"
              className="hidden lg:flex w-60"
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-11 *:border-b-2 *:border-black *:outline-none ">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className="text-sm text-red-500 -my-8 border-none">{`${errors.email.message}`}</p>}

            <input
              {...register("fname")}
              type="text"
              placeholder="FirstName"
            />
            {errors.fname && <p className="text-sm text-red-500 -my-8 border-none">{`${errors.fname.message}`}</p>}
            <input
              {...register("lname")}
              type="text"
              placeholder="LastName"
            />
            {errors.lname && <p className="text-sm text-red-500 -my-8 border-none">{`${errors.lname.message}`}</p>}
            <input
              {...register("phone")}
              type="tel"
              placeholder="Phone Number"
            />
            {errors.phone && <p className="text-sm text-red-500 -my-8 border-none">{`${errors.phone.message}`}</p>}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 -my-8 border-none">{`${errors.password.message}`}</p>
            )}
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 -my-8 border-none">{`${errors.confirmPassword.message}`}</p>
            )}
            <div className="border-none">
              <input
                {...register("checkbox")}
                type="checkbox"
              />
              <span>
                {" "}
                I agree to the platform&apos;s&nbsp;
                <a
                  href="/"
                  className="text-blue-950 underline">
                  Terms of Service
                </a>{" "}
                and&nbsp;
                <a
                  href="/"
                  className="text-blue-950 underline">
                  Privacy Policy
                </a>
              </span>
            </div>
            {errors.checkbox && (
              <p className="text-sm text-red-500 -mt-8 border-none">{`${errors.checkbox.message}`}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="disabled:bg-gray-600 hover:scale-105 hover:transition-all duration-200 border-none text-white bg-blue-950 p-2 rounded-xl w-40 mx-auto">
              Sign up
            </button>
          </form>
          <p>
            Already have an account ?{" "}
            <Link to="/login">
              <span className="text-blue-950 font-extrabold text-xl">Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
