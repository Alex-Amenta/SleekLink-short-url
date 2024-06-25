import StarIcon from "./ui/icons/StarIcon";

const CustomizeUrl = () => {
  return (
    <>
      <div className="text-center">
        <h2 className="text-5xl text-pretty font-bold my-28 mb-6 bg-gradient-to-r from-slate-950 to-green-500 inline-block text-transparent bg-clip-text">
          Personaliza tus Enlaces
        </h2>
        <p className="text-lg text-black/65">
          En nuestra aplicación, tienes la libertad de personalizar tus enlaces
          acortados. ¿Cómo? Es sencillo: simplemente ingresa la URL original y
          elige una palabra clave relevante o un nombre fácil de recordar para
          tu enlace. Así, podrás crear enlaces más significativos y adaptados a
          tus necesidades. ¡Haz que tus enlaces sean únicos y memorables! 🚀
        </p>
        
      </div>

      <div className="mt-10 flex justify-center items-center gap-4 flex-wrap">
        {/* <input
          className="p-2 border border-l-8 bg-white border-black rounded-md max-w-[500px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="Ejemplo: https://tu-url.com/"
          required
        />
        <input
          className="p-2 border border-l-8 bg-white border-black rounded-md max-w-[300px] w-full focus-visible:border-green-400 shadow-lg"
          type="text"
          placeholder="Ingresa tu marca: mi-marca"
          required
        /> */}

        <button className="bg-green-950 text-green-400 border border-green-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group shadow-lg">
          <span className="bg-green-400 shadow-green-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          <span className="inline-flex align-middle mr-2"><StarIcon/></span>
          Personalizar URL
        </button>
      </div>
    </>
  );
};

export default CustomizeUrl;
