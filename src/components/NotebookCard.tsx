import { NotebookData } from "@/interfaces/notebook.interface";
import { convertDateTime } from "@/utils/convertDateTime";

const NotebookCard = ({
  notebook,
  index,
}: {
  notebook: NotebookData;
  index: number;
}) => {
  return (
    <div className="grid grid-cols-[1fr_150px] items-center p-3 sm:p-4 border-b-2 border-base-300 dark:border-gray-700 hover:bg-base-300 dark:hover:bg-gray-800 transition duration-150 ease-in-out cursor-pointer">
      <div className="text-base-content text-xs sm:text-base line-clamp-1">
        {notebook.name}
      </div>
      <div className="text-right text-base-content text-xs sm:text-sm line-clamp-1">
        {convertDateTime(notebook.createdAt.toString())}
      </div>
    </div>
  );
};

export default NotebookCard;
