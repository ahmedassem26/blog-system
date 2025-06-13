import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PostsContext } from "../context/PostsContext";

const AddEditPost = () => {
  const { createPost, updatePost } = useContext(PostsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: id
      ? {
          title: searchParams.get("title") || "",
          description: searchParams.get("description") || "",
          imageUrl: searchParams.get("imageUrl") || "",
        }
      : {},
  });

  const handleFormSubmit = async (data) => {
    try {
      if (!id) {
        await createPost(data);
      } else {
        await updatePost(id, data);
      }
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {!id ? "Add New Post" : "Edit Post"}
      </h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium ">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 p-2 block w-full rounded-md border-2 border-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="4"
            className="mt-1 p-2 block w-full rounded-md border-2 border-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium ">Image URL</label>
          <input
            type="text"
            {...register("imageUrl", { required: "Image URL is required" })}
            className="mt-1 p-2 block w-full rounded-md border-2 border-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-600">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium  hover:bg-red-950 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-all duration-300"
          >
            {!id ? "Add Post" : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditPost;
