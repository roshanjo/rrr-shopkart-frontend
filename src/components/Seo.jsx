// ==================================================
// IMPORTS
// ==================================================

import { Helmet } from "react-helmet";


// ==================================================
// SEO COMPONENT
// ==================================================

export default function Seo({ title, description }) {

  return (
    <Helmet>

      {/* Page Title */}
      <title>
        {title}
      </title>

      {/* Meta Description (Optional) */}
      {description && (
        <meta
          name="description"
          content={description}
        />
      )}

    </Helmet>
  );
}