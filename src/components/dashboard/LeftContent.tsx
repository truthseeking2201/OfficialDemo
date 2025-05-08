import { ArrowUpRight } from "lucide-react";

const LeftContent = () => {
  return (
    <div>
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-4 flex items-center hover:bg-black transition duration-300 ease-in-out cursor-pointer">
        <div className="flex-1">Explore Predicton Market</div>
        <div className="ml-2">
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 flex items-center hover:bg-black transition duration-300 ease-in-out cursor-pointer">
        <div className="flex-1">Read Docs</div>
        <div className="ml-2">
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
