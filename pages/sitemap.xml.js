import { getSortedPostsData } from '../lib/posts';

// Base URL (Apni live website ka URL yahan daalein)
const BASE_URL = 'https://www.mhxmllc.com';

// Yeh function Next.js ki API route ki tarah kaam karta hai
function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>${BASE_URL}/blog</loc>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${BASE_URL}/blog/${slug}`}</loc>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps() ya getStaticProps() istemaal na karein.
}

// Next.js mein yeh function build time par chalta hai
export async function getServerSideProps({ res }) {
  const posts = getSortedPostsData();

  // XML content generate karein
  const sitemap = generateSiteMap(posts);

  // Response ko XML content type ke saath bhejhein
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;