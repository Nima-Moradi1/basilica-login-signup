import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../zod/SignupSchema";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../core/http";
import { Spinner } from "./Spinner";
import toast from "react-hot-toast";
import Logo from "./Logo";
import Button from "./Button";
import Error from "./Error";

const Signup = () => {
  const api = new Api();
  // we use router dom hook for SPA routing (no extra loading)
  const navigate = useNavigate();
  // now we handle the form validation using rhf and zod
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
  // we send the sign up data to server using fetch async
  async function onSubmit(data) {
    const create = createForm(data);
    const response = await api.post("user/create", JSON.stringify(create));
    const responseData = await response.json();
    if (!response.ok) {
      // we should change the alert (this is just a test)
      // have no more data what to do here and where to navigate to !
      toast.error("Submitting form failed!");
      return;
    } else {
      toast.success("account successfully created");
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
    <div className="max-w-4xl mx-auto bg-white lg:translate-y-5 shadow-md shadow-black rounded-xl">
      <div className="flex flex-col lg:flex-row mb-10 lg:mb-0">
        <div className="bg-primary lg:rounded-l-xl lg:mr-5 mb-10 lg:mb-0">
          <img
            src="src/assets/signup2.png"
            className=" w-screen h-[40vh] lg:h-[80vh] lg:w-[60vw] lg:pr-5"
          />
        </div>
        <div className="flex gap-1 flex-col items-center lg:w-[50vw]">
          <div>
            <Logo />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col text-sm lg:pr-5 lg:w-full w-[60vw] gap-8 *:border-b-2 *:border-black *:outline-none ">
            <input
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && <Error errorMsg={errors.email.message} />}
            <input
              {...register("fname")}
              type="text"
              placeholder="FirstName"
            />
            {errors.fname && <Error errorMsg={errors.fname.message} />}
            <input
              {...register("lname")}
              type="text"
              placeholder="LastName"
            />
            {errors.lname && <Error errorMsg={errors.lname.message} />}
            <input
              {...register("phone")}
              type="tel"
              placeholder="+989121111111"
            />
            {errors.phone && <Error errorMsg={errors.phone.message} />}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && <Error errorMsg={errors.password.message} />}
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <Error errorMsg={errors.confirmPassword.message} />}
            <div className="border-none">
              <input
                {...register("checkbox")}
                type="checkbox"
              />
              <span className="text-sm">
                {" "}
                I agree to the platform&apos;s&nbsp;
                <a
                  href="/"
                  className="text-primary underline">
                  Terms of Service
                </a>{" "}
                and&nbsp;
                <a
                  href="/"
                  className="text-primary underline">
                  Privacy Policy
                </a>
              </span>
            </div>
            {errors.checkbox && (
              <Error
                className="mb-1"
                errorMsg={errors.checkbox.message}
              />
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? <Spinner /> : "SIGN UP"}
            />
          </form>
          <p className="my-1">
            Already have an account ?{" "}
            <Link to="/login">
              <span className="text-primary font-extrabold text-xl">Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
