/* eslint-disable react/prop-types */
const Button = ({ label, type, disabled }) => {
  return (
    <div className="border-none">
      <button
        disabled={disabled}
        className="disabled:bg-gray-600 flex items-center justify-center hover:scale-105 hover:transition-all duration-200 text-white bg-primary p-4 rounded-xl w-44 mx-auto"
        type={type}>
        {label}
      </button>
    </div>
  );
};

export default Button;
