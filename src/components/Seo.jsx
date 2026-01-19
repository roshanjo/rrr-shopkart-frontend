import { Helmet } from "react-helmet";

export default function Seo({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      {description && (
        <meta name="description" content={description} />
      )}
    </Helmet>
  );
}
