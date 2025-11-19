// src/components/DeleteRecipeButton.jsx
import { useState } from "react";
import { useRecipeStore } from "../store/recipeStore";

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    if (onDelete) {
      onDelete();
    }
  };

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Confirm Delete
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
    >
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
