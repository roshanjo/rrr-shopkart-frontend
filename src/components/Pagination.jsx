import { Link } from "react-router-dom";

export default function Pagination({ page, total }) {
  return (
    <div className="flex justify-center gap-2 my-10">
      {Array.from({ length: total }).map((_, i) => {
        const p = i + 1;
        return (
          <Link
            key={p}
            to={`?page=${p}`}
            className={`px-4 py-2 rounded border
              ${p === page
                ? "bg-black text-white"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-700"}`}
          >
            {p}
          </Link>
        );
      })}
    </div>
  );
}
