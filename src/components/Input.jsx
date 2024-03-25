/* eslint-disable react/prop-types */
const Input = ({ type, placeholder, data }) => {
  return (
    <input
      data={data}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
