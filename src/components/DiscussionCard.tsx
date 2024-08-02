"use client";

import { CalendarIcon } from "lucide-react";
import Image from "next/image";

const DiscussionCard = () => {
  return (
    <div className="w-full max-w-xl card bg-base-100 shadow-md rounded-md">
      <div className="card-body p-4 sm:p-6 md:p-8">
        <div className="card-title">
          <p className="text-lg sm:text-xl text-base-content font-bold">
            How do I set up a CI/CD pipeline for my React app?
          </p>
        </div>
        <div className="flex flex-wrap gap-3 my-1">
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-4 rounded-full">
                <Image src="" alt="avatar" width={16} height={16} />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-base-content font-medium">
              John Doe
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-base-content/85" />
            <p className="text-xs sm:text-sm text-base-content/85">
              2 days ago
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="badge badge-secondary">react</div>
        </div>
        <div className="mt-4">
          <p className="text-sm sm:text-base text-base-content line-clamp-2">
            Im building a React app and I want to set up a CI/CD pipeline to
            automate my builds and deployments. Can someone guide me through the
            process?
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
