import NewNotebookModal from "@/components/NewNotebookModal";

const NotebooksPage = () => {
  return (
    <div className="px-6 md:pl-24 py-8 w-full flex flex-col bg-base-200">
      <h1 className="text-2xl text-base-content">Your Notebooks</h1>
      <div className="mt-4">
        <NewNotebookModal />
      </div>
    </div>
  );
};

export default NotebooksPage;
