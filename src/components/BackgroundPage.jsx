const BackgroundPage = () => {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#ededed] bg-[linear-gradient(to_right,#d9d9d9_1px,transparent_1px),linear-gradient(to_bottom,#d9d9d9_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      
      <div className="absolute top-0 -z-10 h-screen w-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,255,10,38%)_0,rgba(0,163,255,0)_70%,rgba(0,163,255,0)_100%)]"></div>
    </>
  );
};

export default BackgroundPage;
