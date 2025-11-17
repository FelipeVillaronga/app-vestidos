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

    if (!confirm("¿Estás seguro de que quieres actualizar este vestido?")) {
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
        alert("Artículo actualizado correctamente");
        setIsOpen(false);
        window.location.reload();
      } else {
        alert(
          "Error al actualizar el vestido: " + (data.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el vestido");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border px-3 py-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        Edit
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg border px-3 py-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
      >
        Edit
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
              <h2 className="text-xl font-bold">Editar Artículo</h2>
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
                <label className="block text-sm font-medium mb-1">Nombre</label>
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
                  Categoría
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
                  Precio por día ($)
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
                  Tallas (separadas por coma)
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
                  Estilo (opcional)
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
                  Descripción
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
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                  className="flex-1 border px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
