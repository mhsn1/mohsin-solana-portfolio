import { getSortedPostsData } from '../lib/posts';

// Base URL (Apni live website ka URL yahan daalein)
const BASE_URL = 'https://www.mhxmllc.com'; 

// Content sirf URLs ka
function generateSiteMapContent(posts) {
  return `
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
 `;
}

function SiteMap() {
  return null; 
}

export async function getServerSideProps({ res }) {
  let posts = [];
  try {
    posts = getSortedPostsData();
  } catch (error) {
    console.error("Error fetching posts data for sitemap:", error);
    posts = []; 
  }

  const sitemapContent = generateSiteMapContent(posts);
  
  // FINAL ASSEMBLY: Saaf XML string yahan banaya gaya hai.
  const finalSitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   ${sitemapContent}
   </urlset>
  `;

  // Set Headers aur Response ko seedha likhein
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.write(finalSitemap.trim());
  res.end(); 

  return {
    props: {},
  };
}

export default SiteMap;