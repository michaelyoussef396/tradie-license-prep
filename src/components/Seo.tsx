import { Helmet } from "react-helmet-async";
import { titleForPath } from "@/lib/page-titles";

const SITE = "https://www.qualifypro.com.au";

interface SeoProps {
  description: string;
  path: string;
  noindex?: boolean;
}

/** The page's title comes from PAGE_TITLES by `path` (src/lib/page-titles.ts). */
const Seo = ({ description, path, noindex }: SeoProps) => {
  const url = `${SITE}${path}`;
  const title = titleForPath(path) ?? "Qualify Pro";
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
    </Helmet>
  );
};

export default Seo;
