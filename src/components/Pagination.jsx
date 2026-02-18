// ==================================================
// IMPORTS
// ==================================================

import { Link } from "react-router-dom";


// ==================================================
// PAGINATION COMPONENT
// ==================================================

export default function Pagination({ page, total }) {

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="flex justify-center gap-2 my-10">

      {Array.from({ length: total }).map((_, index) => {

        const currentPage = index + 1;

        return (
          <Link
            key={currentPage}
            to={`?page=${currentPage}`}
            className={`
              px-4 py-2 rounded border
              ${
                currentPage === page
                  ? "bg-black text-white"
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }
            `}
          >
            {currentPage}
          </Link>
        );
      })}

    </div>
  );
}