const Discuss = () => {
  return (
    <div className="px-5 md:pl-24 pr-6 py-8 w-full flex flex-col bg-base-200">
      <h1 className="text-2xl text-base-content">Discussion Board</h1>
      <div className="mt-4">
        <label className="input input-bordered flex items-center gap-2 max-w-xs">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="mt-4 flex flex-col-reverse lg:flex-row md:justify-between">
        <div className="flex-1">
          <h1 className="my-20">Questions</h1>
        </div>
      </div>
    </div>
  );
};

export default Discuss;
