const CardPulseBorder = ({ children }) => {
  return (
    <div className="relative mt-10  w-full 2xl:w-[80%]">
      <div className="absolute top-0 flex w-full justify-center">
        <div className="left-0 h-[1px] animate-borderWidth rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-black dark:via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
      </div>
      <div className=" rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-[#131313] p-3 shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default CardPulseBorder;
