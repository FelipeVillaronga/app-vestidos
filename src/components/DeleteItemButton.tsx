"use client";

type DeleteItemButtonProps = {
  itemId: number | string;
  csrf: string;
};

export default function DeleteItemButton({
  itemId,
  csrf,
}: DeleteItemButtonProps) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/items/${itemId}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csrf }),
      });

      const data = await response.json();

      if (response.ok) {
        // Force a hard reload by adding a timestamp
        window.location.href = window.location.pathname + "?t=" + Date.now();
      } else {
        alert("Error deleting item: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting item");
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-lg border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 px-3 py-1.5 text-xs font-semibold text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 hover:border-red-300 dark:hover:border-red-700 transition-all"
      >
        <span>🗑️</span>
        <span>Delete</span>
      </button>
    </form>
  );
}
