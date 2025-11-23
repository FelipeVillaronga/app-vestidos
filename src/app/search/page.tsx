"use client";

import Link from "next/link";
import Image from "next/image";
import { type Category } from "../../../lib/RentalManagementSystem";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Item = {
  id: number;
  name: string;
  category: string;
  pricePerDay: number;
  sizes: string[];
  color: string;
  style?: string;
  image: string;
  alt: string;
};

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Local filter state - changes don't trigger search until button is clicked
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState<Category | "">(
    (searchParams.get("category") as Category) || ""
  );
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [color, setColor] = useState(searchParams.get("color") || "");
  const [style, setStyle] = useState(searchParams.get("style") || "");
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync local state with URL params when they change (e.g., back/forward navigation)
  useEffect(() => {
    setQ(searchParams.get("q") || "");
    setCategory((searchParams.get("category") as Category) || "");
    setSize(searchParams.get("size") || "");
    setColor(searchParams.get("color") || "");
    setStyle(searchParams.get("style") || "");
  }, [searchParams]);

  // Available filter options
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableStyles, setAvailableStyles] = useState<string[]>([]);

  // Fetch available filters
  useEffect(() => {
    const fetchFilters = async () => {
      const response = await fetch("/api/items/filters");
      const data = await response.json();
      setAvailableColors(data.colors || []);
      setAvailableStyles(data.styles || []);
    };
    fetchFilters();
  }, []);

  // Fetch items from API only on initial load based on URL params
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams.toString());

      const response = await fetch(`/api/items?${params.toString()}`);
      const data = await response.json();
      setItems(data.items || []);
      setIsLoading(false);
    };

    fetchItems();
  }, [searchParams]);

  // Reset size when category changes to avoid invalid combinations
  useEffect(() => {
    if (category === "bag") {
      setSize("");
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (size) params.set("size", size);
    if (color) params.set("color", color);
    if (style) params.set("style", style);
    router.push(`/search?${params.toString()}`);
  };

  const renderSizeInput = () => {
    const baseClassName = "rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all";
    
    // Bags don't have size
    if (category === "bag") {
      return null;
    }

    // Dresses and Jackets use XS, S, M, L, XL
    if (category === "dress" || category === "jacket") {
      return (
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={baseClassName}
        >
          <option value="">All sizes</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      );
    }

    // Shoes use numeric sizes
    if (category === "shoes") {
      return (
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={baseClassName}
        >
          <option value="">All sizes</option>
          {Array.from({ length: 14 }, (_, i) => i + 35).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      );
    }

    // Default: show dropdown with common sizes for when no category is selected
    return (
      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className={baseClassName}
      >
        <option value="">All sizes</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    );
  };

  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
              Browse Our Collection
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Discover luxury designer pieces for every occasion. Filter by style, size, and color to find your perfect look.
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-6xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3"
          >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, style, or color..."
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
              >
                <option value="">All categories</option>
                <option value="dress">Dresses</option>
                <option value="shoes">Shoes</option>
                <option value="bag">Bags</option>
                <option value="jacket">Jackets</option>
              </select>
              {renderSizeInput()}
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
              >
                <option value="">All colors</option>
                {availableColors.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
              >
                <option value="">All styles</option>
                {availableStyles.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-6 py-3 text-sm font-semibold hover:from-fuchsia-500 hover:to-rose-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Search →
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              {isLoading ? "Loading..." : `${items.length} ${items.length === 1 ? "Item" : "Items"} Found`}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {q || category || size || color || style
                ? "Filtered results based on your selection"
                : "Showing all available items"}
            </p>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full border-4 border-fuchsia-200 border-t-fuchsia-600 animate-spin mb-4"></div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Loading items...
            </p>
          </div>
        ) : (
          <>
            {items.map((it) => (
              <div
                key={it.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:border-fuchsia-200 dark:hover:border-fuchsia-900 transition-all duration-300"
              >
                <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={it.image}
                    alt={it.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-lg">
                      From ${it.pricePerDay}/day
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wider font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                    {it.category}
                  </p>
                  <h3 className="mt-2 font-semibold text-slate-900 dark:text-slate-100">
                    {it.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Sizes:</span> {it.sizes.join(", ")}
                  </p>
                  {it.color && (
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-medium">Color:</span> {it.color.charAt(0).toUpperCase() + it.color.slice(1)}
                    </p>
                  )}
                  <div className="mt-4">
                    <Link
                      href={`/items/${it.id}`}
                      className="inline-flex items-center justify-center w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 transition-all duration-300"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-100 to-rose-100 dark:from-fuchsia-900/30 dark:to-rose-900/30 flex items-center justify-center mb-4">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  No items found
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                  We couldn't find any items matching your filters. Try adjusting your search criteria or browse all items.
                </p>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
}
