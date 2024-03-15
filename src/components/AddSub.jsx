import { Api } from "../../core/http";
import Button from "./Button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "./Spinner";

//prettier-ignore
const AddSub = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
      } = useForm({
        resolver: zodResolver("here we need to add something"),
      });
    const api = new Api() ;
        const onSubmit = async (data) => {
            const response = await api.post("add-subscription", JSON.stringify(data));
        // we can use toast to actually show user something
        // i still have no data to what to do next
        const responseData = await response.json();
        console.log(responseData)
        if (!response.ok) {
          // response status is not 2xx
          toast.error("Subscription Failed");
          return;
        } else {
          toast.success("Subscription Successfully!");
        }
    reset() ;
    }

  return (
    <div className="w-full h-full">
      <div className="max-w-2xl flex flex-col gap-10 shadow-md 
      lg:translate-y-[20%] p-4
       shadow-black sm:rounded-xl mx-auto text-center">
        <h1 className="text-2xl font-bold">Add Subscription</h1>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 text-sm lg:pr-5 lg:w-full w-[60vw] mx-auto gap-8 *:border-b-2 *:border-black *:outline-none ">
            <input 
            {...register("user_email")}
            type="email"
            placeholder="User Email"
            />
            <input type="date"
            {...register("start")}
            />
            <input type="date"   
            {...register("end")} 
            />
            <select 
            {...register("subscription_type")}>
                <option>Gold</option>
                <option>Platinium</option>
                <option>Free</option>
            </select>
            <Button
            label={isSubmitting ? <Spinner /> : "ADD SUBSCRIPTION"} 
            type='submit'
            disabled={isSubmitting}
            />
        </form>
       </div>
    </div>
  );
};

export default AddSub;
