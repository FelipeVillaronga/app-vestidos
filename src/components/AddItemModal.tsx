"use client";

import { useState } from "react";

type AddItemModalProps = {
  csrf: string;
};

export default function AddItemModal({ csrf }: AddItemModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "dress",
    pricePerDay: "",
    sizes: "",
    color: "",
    style: "",
    description: "",
    images: "",
    alt: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sizesArray = formData.sizes
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const imagesArray = formData.images
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const response = await fetch(`/api/admin/items/add`, {
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
          images: imagesArray.length > 0 ? imagesArray : undefined,
          alt: formData.alt || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Artículo agregado correctamente");
        setIsOpen(false);
        // Resetear formulario
        setFormData({
          name: "",
          category: "dress",
          pricePerDay: "",
          sizes: "",
          color: "",
          style: "",
          description: "",
          images: "",
          alt: "",
        });
        // Force a hard reload by adding a timestamp
        window.location.href = window.location.pathname + "?t=" + Date.now();
      } else {
        alert(
          "Error al agregar el artículo: " + (data.error || "Unknown error")
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el artículo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700"
      >
        + Agregar Artículo
      </button>

      {isOpen && (
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
                <h2 className="text-xl font-bold">Agregar Nuevo Artículo</h2>
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
                  <label className="block text-sm font-medium mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                    placeholder="Ej: Vestido de Noche Elegante"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Categoría <span className="text-red-500">*</span>
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
                    Precio por día ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.pricePerDay}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pricePerDay: e.target.value,
                      })
                    }
                    required
                    min="1"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                    placeholder="Ej: 79"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tallas (separadas por coma){" "}
                    <span className="text-red-500">*</span>
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
                  <label className="block text-sm font-medium mb-1">
                    Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    required
                    placeholder="Ej: champagne, black, red"
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
                    placeholder="evening, cocktail, casual, black-tie, etc."
                    className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                    placeholder="Describe el artículo..."
                    className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Imágenes (URLs separadas por coma, opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.images}
                    onChange={(e) =>
                      setFormData({ ...formData, images: e.target.value })
                    }
                    placeholder="/images/dresses/my-dress.jpg"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Si no se especifica, se usará una imagen por defecto
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Texto alternativo (alt, opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.alt}
                    onChange={(e) =>
                      setFormData({ ...formData, alt: e.target.value })
                    }
                    placeholder="Descripción para accesibilidad"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Guardando..." : "Guardar Artículo"}
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
      )}
    </>
  );
}
