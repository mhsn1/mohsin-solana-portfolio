import { getSortedPostsData } from '../lib/posts';

// Base URL ko dynamic banayenge (Hamein iski zarurat getServerSideProps mein padegi)
// const BASE_URL = 'https://www.mhxmllc.com'; // Ab iski jagah naya logic aayega

// Content sirf URLs ka
function generateSiteMapContent(BASE_URL, posts) { // BASE_URL ko argument banaya
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

export async function getServerSideProps({ req, res }) { // req object yahan zaroori hai
  
  // 🛑 FIX: Yahan Base URL ko determine kiya gaya hai
  const currentDomain = process.env.NODE_ENV === 'production'
    ? 'https://www.mhxmllc.com'
    : `http://${req.headers.host}`; // Localhost par chalao
    
  let posts = [];
  try {
    posts = getSortedPostsData();
  } catch (error) {
    console.error("Error fetching posts data for sitemap:", error);
    posts = []; 
  }

  // Ab currentDomain ko pass karein
  const sitemapContent = generateSiteMapContent(currentDomain, posts);
  
  // FINAL ASSEMBLY: XSLT link mein bhi currentDomain use hoga.
  const xslLink = `<?xml-stylesheet type="text/xsl" href="${currentDomain}/sitemap-style.xsl"?>`;

  const finalSitemap = `<?xml version="1.0" encoding="UTF-8"?>
   ${xslLink}  <!-- XSLT link yahan hai -->
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