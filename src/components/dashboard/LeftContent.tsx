import { ArrowUpRight } from "lucide-react";

const LeftContent = () => {
  return (
    <div className="w-[252px] flex-shrink-0">
      <div
        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 flex items-center hover:bg-white/20 transition duration-300 ease-in-out cursor-pointer"
        onClick={() => {
          window.open(`${import.meta.env.VITE_NODO_APP_URL}`, "_blank");
        }}
      >
        <div className="flex-1">Explore Predicton Market</div>
        <div className="ml-2">
          <ArrowUpRight
            size={16}
            className="text-white"
          />
        </div>
      </div>

      <div
        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center hover:bg-white/20 transition duration-300 ease-in-out cursor-pointer"
        onClick={() => {
          window.open("https://docs.nodo.xyz", "_blank");
        }}
      >
        <div className="flex-1">Read Docs</div>
        <div className="ml-2">
          <ArrowUpRight
            size={16}
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
