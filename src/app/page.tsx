import Image from "next/image";
import Link from "next/link";
import { listItems } from "@/lib/RentalManagementSystem";
import { headers } from "next/headers";
import NewsletterForm from "@/src/components/NewsletterForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  await headers();
  const allItems = listItems();
  console.log("Home page rendered. Total items:", allItems.length);
  const featured = allItems.slice(0, 4).map((item) => ({
    id: item.id,
    name: item.name,
    price: item.pricePerDay,
    image: item.images[0],
    alt: item.alt,
  }));

  const steps = [
    {
      emoji: "🧭",
      title: "Browse",
      text: "Find styles by size, color, designer, or occasion.",
    },
    {
      emoji: "📦",
      title: "Rent",
      text: "Pick dates and get it delivered to your door.",
    },
    {
      emoji: "✨",
      title: "Return",
      text: "Wear, wow, and send it back—cleaning included.",
    },
  ];

  return (
    <div>
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 mb-6 shadow-xl">
                <span className="text-4xl">👗</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                Rent designer dresses for every
                <span className="block mt-2 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                  occasion
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Look stunning without the price tag. Flexible rentals, free
                cleaning, and fast delivery.
              </p>
            </div>

            <form
              action="/search"
              method="GET"
              className="max-w-6xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 shadow-xl"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                  <input
                    name="q"
                    type="text"
                    placeholder="Search by name, style, or color..."
                    className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  />
                  <select
                    name="category"
                    className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  >
                    <option value="">All categories</option>
                    <option value="dress">Dresses</option>
                    <option value="shoes">Shoes</option>
                    <option value="bag">Bags</option>
                    <option value="jacket">Jackets</option>
                  </select>
                  <select
                    name="size"
                    className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  >
                    <option value="">All sizes</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  <select
                    name="color"
                    className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  >
                    <option value="">All colors</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="champagne">Champagne</option>
                  </select>
                  <select
                    name="style"
                    className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 outline-none transition-all"
                  >
                    <option value="">All styles</option>
                    <option value="evening">Evening</option>
                    <option value="cocktail">Cocktail</option>
                    <option value="casual">Casual</option>
                    <option value="black-tie">Black-tie</option>
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
        </section>

        <section
          id="featured"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        >
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured picks</h2>
            <Link
              href="/search"
              className="text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-500 transition-colors"
            >
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:border-fuchsia-200 dark:hover:border-fuchsia-900 transition-all duration-300"
              >
                <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={item.id === 1}
                  />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-lg">
                      From ${item.price}/day
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Free cleaning • 2–7 day rentals
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/items/${item.id}`}
                      className="inline-flex items-center justify-center w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 transition-all duration-300"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="how"
          className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-rose-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMzAgMzBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 mb-4 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 bg-clip-text text-transparent">
                How it works
              </h2>
              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Three simple steps to elevate your wardrobe
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-8 text-center hover:shadow-xl hover:border-fuchsia-200 dark:hover:border-fuchsia-900 transition-all duration-300"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-rose-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {i + 1}
                  </div>
                  <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-rose-100 dark:from-fuchsia-900/30 dark:to-rose-900/30 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {s.emoji}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">{s.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.text}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <NewsletterForm />
        </section>
      </main>
    </div>
  );
}
