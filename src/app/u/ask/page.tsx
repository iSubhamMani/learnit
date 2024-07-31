"use client";

import TagInput from "@/components/TagInput";
import useTagInput from "@/hooks/useTagInput";
import { questionSchema, tagSchema } from "@/schemas/QuestionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AskPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    deleteTag,
    inputValue,
    setInputValue,
    setTagError,
    setTags,
    tagError,
    tags,
  } = useTagInput();

  const onSubmit = (formData: any) => {
    const { success, data, error } = tagSchema.safeParse(tags);
    if (error) {
      setTagError(error.errors[0].message);
    }
    if (!success) return;
    console.log(formData);
    console.log(data);
  };

  return (
    <div className="px-5 md:pl-24 py-8 w-full flex flex-col bg-base-200">
      <div className="mx-auto w-full max-w-4xl">
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl text-base-content mb-4">Ask a question</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label className="text-base-content/85" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Type here"
                  className="text-base-content input input-bordered w-full"
                />
                <p className="text-sm text-error font-medium">
                  {errors.title?.message}
                </p>
              </div>

              <TagInput
                deleteTag={deleteTag}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setTagError={setTagError}
                setTags={setTags}
                tagError={tagError}
                tags={tags}
              />

              <div className="flex flex-col gap-2">
                <label className="text-base-content/85" htmlFor="description">
                  Describe your question
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  className="text-base-content textarea textarea-bordered w-full h-80 resize-none"
                  placeholder="Type here..."
                ></textarea>
                <p className="text-sm text-error font-medium">
                  {errors.description?.message}
                </p>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskPage;
