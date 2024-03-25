/* eslint-disable react/prop-types */
const Error = ({ errorMsg, className }) => {
  return (
    <>
      <p className={`${className} " text-[10px] text-error -my-8 border-none " `}>{errorMsg}</p>
    </>
  );
};

export default Error;
