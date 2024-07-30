import { FilePlus } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="px-6 md:pl-24 py-8 w-full flex flex-col bg-base-200">
      <h1 className="text-2xl text-base-content">Your Notebooks</h1>
      <div className="mt-4">
        <button className="btn btn-sm sm:btn-md btn-primary">
          <FilePlus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm">Create</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
