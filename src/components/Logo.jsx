/* eslint-disable react/prop-types */
const Logo = ({ className }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <img
          src="src/assets/logomain.png"
          className={` hidden ${className} lg:flex w-20`}
        />
      </div>
    </>
  );
};

export default Logo;
