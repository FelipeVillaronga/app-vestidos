"use client";

import Link from "next/link";
import Image from "next/image";
import {listItems, type Category} from "../../../lib/RentalManagementSystem";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState<Category | "">(
    (searchParams.get("category") as Category) || ""
  );
  const [size, setSize] = useState(searchParams.get("size") || "");
  const [color, setColor] = useState(searchParams.get("color") || "");
  const [style, setStyle] = useState(searchParams.get("style") || "");

  const items = listItems({
    q: q || undefined,
    category: category || undefined,
    size: size || undefined,
    color: color || undefined,
    style: style || undefined,
  });

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
          className="rounded-xl border px-3 py-2 text-sm"
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
          className="rounded-xl border px-3 py-2 text-sm"
        >
          <option value="">All sizes</option>
          {Array.from({ length: 14 }, (_, i) => i + 35).map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      );
    }

    // Default: show dropdown with common sizes for when no category is selected
    return (
      <select 
        value={size} 
        onChange={(e) => setSize(e.target.value)}
        className="rounded-xl border px-3 py-2 text-sm"
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold">Browse catalog</h1>
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <input 
          value={q} 
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…" 
          className="rounded-xl border px-3 py-2 text-sm" 
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value as Category | "")}
          className="rounded-xl border px-3 py-2 text-sm"
        >
          <option value="">All categories</option>
          <option value="dress">Dresses</option>
          <option value="shoes">Shoes</option>
          <option value="bag">Bags</option>
          <option value="jacket">Jackets</option>
        </select>
        {renderSizeInput()}
        <input 
          value={color} 
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color" 
          className="rounded-xl border px-3 py-2 text-sm" 
        />
        <input 
          value={style} 
          onChange={(e) => setStyle(e.target.value)}
          placeholder="Style (e.g., cocktail)" 
          className="rounded-xl border px-3 py-2 text-sm" 
        />
        <button type="submit" className="rounded-xl bg-fuchsia-600 text-white px-4 py-2 text-sm">Search</button>
      </form>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden">
            <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800">
              <Image src={it.images[0]} alt={it.alt} fill className="object-cover" />
              <div className="absolute inset-0 flex items-end p-3">
                <span className="rounded-full bg-white/85 dark:bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-100">
                  From ${it.pricePerDay}/day
                </span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">{it.category}</p>
              <p className="font-medium">{it.name}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Sizes: {it.sizes.join(", ")}</p>
              <div className="mt-3">
                <Link href={`/items/${it.id}`} className="text-sm rounded-lg border px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-slate-600 dark:text-slate-400">No items match your filters.</p>
        )}
      </div>
    </div>
  );
}
