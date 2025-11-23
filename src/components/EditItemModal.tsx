"use client";

import { useState } from "react";

type EditItemModalProps = {
  item: {
    id: number | string;
    name: string;
    category: string;
    sizes: string[];
    pricePerDay: number;
    color: string;
    style?: string;
    description: string;
  };
  csrf: string;
};

export default function EditItemModal({ item, csrf }: EditItemModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: item.name,
    category: item.category,
    pricePerDay: item.pricePerDay,
    sizes: item.sizes.join(", "),
    color: item.color,
    style: item.style || "",
    description: item.description,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!confirm("Are you sure you want to update this item?")) {
      setIsLoading(false);
      return;
    }

    try {
      const sizesArray = formData.sizes
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const response = await fetch(`/api/admin/items/${item.id}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          csrf,
          name: formData.name,
          category: formData.category,
          pricePerDay: Number(formData.pricePerDay),
          sizes: sizesArray,
          color: formData.color,
          style: formData.style || undefined,
          description: formData.description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Item updated successfully");
        setIsOpen(false);
        // Force a hard reload by adding a timestamp
        window.location.href = window.location.pathname + "?t=" + Date.now();
      } else {
        alert(
          "Error updating item: " + (data.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating item");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
      >
        <span>✏️</span>
        <span>Edit</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
      >
        <span>✏️</span>
        <span>Edit</span>
      </button>

      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={() => !isLoading && setIsOpen(false)}
      >
        <div
          className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Item</h2>
              <button
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                >
                  <option value="dress">Dress</option>
                  <option value="shoes">Shoes</option>
                  <option value="bag">Bag</option>
                  <option value="jacket">Jacket</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Price per day ($)
                </label>
                <input
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricePerDay: Number(e.target.value),
                    })
                  }
                  required
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Sizes (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={(e) =>
                    setFormData({ ...formData, sizes: e.target.value })
                  }
                  required
                  placeholder="XS, S, M, L, XL"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Style (optional)
                </label>
                <input
                  type="text"
                  value={formData.style}
                  onChange={(e) =>
                    setFormData({ ...formData, style: e.target.value })
                  }
                  placeholder="evening, cocktail, casual, etc."
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 text-sm font-semibold hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  {isLoading ? "Saving..." : "Confirm changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                  className="flex-1 rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-3 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
