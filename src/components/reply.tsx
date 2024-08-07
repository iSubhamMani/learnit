import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";

const Reply = () => {
  return (
    <div className="border-b border-base-content/35 py-2">
      <div className="flex gap-2 items-center">
        <div className="avatar">
          <div className="ring-neutral-content ring-offset-base-100 ring-1 ring-offset-2 w-4 sm:w-6 rounded-full">
            <Image src="/avatar.jpg" alt="avatar" width={24} height={24} />
          </div>
        </div>
        <span className="text-base-content text-sm font-bold">John Doe</span>
      </div>
      <div className="mt-2">
        <p className="text-base-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
          reiciendis tenetur ea repellendus a. Ipsam modi sed distinctio
          deleniti voluptas!
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <ArrowUp className="cursor-pointer text-base-content w-4 h-4 sm:w-5 sm:h-5" />
          <ArrowDown className="cursor-pointer text-base-content w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <span className="text-xs text-base-content/80">
          {new Date().toDateString()}
        </span>
      </div>
    </div>
  );
};

export default Reply;
