/* eslint-disable react/prop-types */
const Button = ({ label, type, disabled }) => {
  return (
    <div className="border-none">
      <button
        disabled={disabled}
        className="disabled:bg-gray-600 flex items-center justify-center
        hover:shadow-md hover:shadow-primary
        hover:text-primary hover:bg-white
        hover:border hover:border-primary border border-white
         hover:transition-colors duration-200 
      text-white bg-primary p-4 rounded-xl w-44 mx-auto"
        type={type}>
        {label}
      </button>
    </div>
  );
};

export default Button;
