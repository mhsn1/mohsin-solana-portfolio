import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Posts directory ka path, jahan saari .md files hain
const postsDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Saare blog posts ko fetch karta hai aur unhein title/date ke mutabiq sort karta hai.
 * @returns {Array} Sorted list of posts (metadata only).
 */
export function getSortedPostsData() {
  // Filenames ko read karein (i.e., 'post-name.md')
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // '.md' extension hata kar slug (id) nikaalein
    const slug = fileName.replace(/\.md$/, '');

    // Full path read karein
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Metadata (front matter) ko parse karein
    const matterResult = matter(fileContents);

    // Excerpt (short summary) create karein aur Markdown characters hataein
    // Yeh Fix zaroori hai taake Blog Listing Page par kacha text na dikhe.
    const cleanContent = matterResult.content
      .replace(/#+\s/g, '') // Remove Markdown headings (#)
      .replace(/(\r\n|\n|\r)/gm, ' ') // Remove new lines
      .replace(/\*\*/g, '') // Remove bold/italic stars
      .replace(/\[.*\]\(.*\)/g, '') // Remove links
      .substring(0, 200) + '...';

    // Data ko return karein
    return {
      slug,
      excerpt: cleanContent.trim(),
      ...matterResult.data,
    };
  });

  // Posts ko date ke mutabiq sort karein (Naya post sabse upar)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Har post ka pura content (HTML mein) aur metadata fetch karta hai.
 * @param {string} slug - Post ka unique slug.
 * @returns {Object} Post data aur HTML content.
 */
export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Metadata aur content ko parse karein
  const matterResult = matter(fileContents);

  // Markdown ko HTML string mein convert karein
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  // Data aur HTML content return karein
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}

/**
 * Har post ke slug (paths) ko nikalta hai.
 * @returns {Array} Array of slugs.
 */
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}