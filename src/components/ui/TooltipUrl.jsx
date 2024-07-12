import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";

const TooltipUrl = ({ textHover, content }) => {
  const truncateUrl = (url, maxLength = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="dark:text-white text-black hover:underline">
            <span className="inline-flex align-middle mr-2">
              <ArrowRight width={15} />
            </span>
            {textHover}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-pretty max-w-full overflow-hidden text-ellipsis">
            {truncateUrl(content)}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipUrl;
