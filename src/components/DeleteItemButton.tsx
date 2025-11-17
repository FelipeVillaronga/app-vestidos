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

    if (!confirm("¿Estás seguro de que quieres borrar este vestido?")) {
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
        alert("Error al borrar el vestido: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al borrar el vestido");
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        className="rounded-lg border px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
      >
        Delete
      </button>
    </form>
  );
}
