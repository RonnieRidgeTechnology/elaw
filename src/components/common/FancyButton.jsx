import { Button } from "antd";

const FancyButton = ({ loading, children, onClick, type, ...props }) => {
  return (
    <Button
      loading={false} // Ant Design default loader disable
      onClick={onClick}
      type={type}
      className={`
        w-full
        !bg-legal-bg 
        !border-white 
        !text-white 
        hover:!bg-legal-bg 
        hover:!border-white 
        hover:!text-white 
        focus:!bg-legal-bg 
        focus:!border-white 
        focus:!text-white 
        active:!bg-legal-bg 
        active:!border-white 
        active:!text-white
        relative 
        !rounded-xl
        cursor-pointer 
        overflow-hidden 
        text-center 
        !text-[16px] 
        !font-normal 
        uppercase 
        !leading-[45px] 
        no-underline 
        group 
        !h-[45px]
        !px-6
        !flex
        !items-center
        !justify-center
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2 z-10">
          <span className="custom-loader"></span>
          <span className="text-white text-[14px] font-normal">
            Processing...
          </span>
        </span>
      ) : (
        <span className="relative z-10">{children}</span>
      )}

      {/* Glow Effect */}
      <span
        className={`absolute top-[-50px] left-[-75px] h-[155px] w-[50px] rotate-[35deg] bg-white opacity-20 transition-all duration-[550ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:left-[120%] z-0 ${
          loading ? "opacity-0" : "opacity-20"
        }`}
      />
    </Button>
  );
};

export default FancyButton;