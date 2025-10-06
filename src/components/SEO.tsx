import { Helmet } from 'react-helmet-async';
interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
}
export function SEO({ title, description, name, type }: SEOProps) {
  const siteTitle = `Cesta básnikov | ${title}`;
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || 'Cesta Básnikov'} />
      <meta name="twitter:card" content={type || 'summary_large_image'} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
}