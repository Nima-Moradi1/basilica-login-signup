import { Api } from "../../core/http";
import Button from "./Button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "./Spinner";
import { SubscriptionSchema } from "../zod/SubscriptionSchema";
import Error from "./Error";
//prettier-ignore
const AddSub = () => {

  // const [changedDate, setChangedDate] = useState('');

  // const handleDateChange = (e) => {
  //   // we Format the date here
  //   const inputDate = e.target.value;
  //   // we Validate and format the date input as needed
  //   const formattedDate = new Date(inputDate).toISOString().split('T')[0]; // Format as YYYY-MM-DD

  //   setChangedDate(formattedDate);
  // };

      const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting , errors },
      } = useForm({
        resolver: zodResolver(SubscriptionSchema),
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
          toast.error("Subscription Adding Failed");
          return;
        } else {
          toast.success("Subscription Added Successfully!");
        }
    reset() ;
    }


  return (
    <div className="w-full h-full">
      
        <h1 className="text-2xl font-bold">Add Subscription</h1>
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 text-sm lg:pr-5 lg:w-full w-[60vw] 
        mx-auto gap-8 *:border-b-2 *:border-black *:outline-none 
        *:bg-slate-100">
            <input 
            {...register("user_email")}
            type="email"
            placeholder="User Email"
            />
            
            <input
            {...register("start")}
            id="start"
            type="date"
          />
            <input
           {...register("end")}
            id="end"
            type="date" 
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
                      {errors && <Error 
                      className='mt-4'
                      errorMsg={errors.message}/> }
        </form>
       </div>
  );
};

export default AddSub;
