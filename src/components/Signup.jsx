import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../zod/SignupSchema";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../../core/http";
import { Spinner } from "./Spinner";
import toast from "react-hot-toast";
import Logo from "./Logo";
import Button from "./Button";
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
              {...register("email")}
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className="text-sm text-error -my-8 border-none">{`${errors.email.message}`}</p>}

            <input
              {...register("fname")}
              type="text"
              placeholder="FirstName"
            />
            {errors.fname && <p className="text-sm text-error -my-8 border-none">{`${errors.fname.message}`}</p>}
            <input
              {...register("lname")}
              type="text"
              placeholder="LastName"
            />
            {errors.lname && <p className="text-sm text-error -my-8 border-none">{`${errors.lname.message}`}</p>}
            <input
              {...register("phone")}
              type="tel"
              placeholder="+989121111111"
            />
            {errors.phone && <p className="text-sm text-error -my-8 border-none">{`${errors.phone.message}`}</p>}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && <p className="text-sm text-error -my-8 border-none">{`${errors.password.message}`}</p>}
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-error -my-8 border-none">{`${errors.confirmPassword.message}`}</p>
            )}
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
            {errors.checkbox && <p className="text-sm text-error -mt-8 border-none">{`${errors.checkbox.message}`}</p>}
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
