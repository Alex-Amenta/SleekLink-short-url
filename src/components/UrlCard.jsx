import TrendingIcon from "./ui/icons/TrendingIcon";
import DeleteIcon from "./ui/icons/DeleteIcon";
import CopyButton from "./ui/icons/CopyButton";
import { formatDate } from "@/helpers/formatDate";

const UrlCard = ({urlData}) => {
  return (
    <div className="mt-7 border border-black rounded p-3 bg-white shadow-lg w-full md:w-[80%]">
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">
          <span
            className={`inline-flex align-middle ${
              urlData.active === 1 ? "bg-green-500" : "bg-red-600"
            } rounded-full w-[6px] h-[6px] mr-1`}
          ></span>
          {urlData.shortUrl}
        </p>
        <div className="flex justify-center items-center gap-2">
          <p className="flex justify-center items-center gap-2 mr-2 pr-3 border-r-2 border-black/40">
            <TrendingIcon /> {urlData.countClick} clicks
          </p>
          <button>
            <CopyButton />
          </button>
          <button>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <p className="my-3 text-wrap max-w-72 text-black/50">{urlData.originalUrl}</p>
      <p className="text-sm text-end">{formatDate(urlData.createdAt)}</p>
    </div>
  );
};

export default UrlCard;
