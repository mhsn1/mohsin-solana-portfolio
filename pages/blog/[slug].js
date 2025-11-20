import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAllPostSlugs, getPostData } from '../../lib/posts';
import { useTheme } from '../../components/ThemeContext'; // ✅ Theme Import

// Next.js ko batata hai ki kaunse paths (URLs) pehle se bana kar rakhne hain
export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

// Post ka pura content aur metadata fetch karta hai
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData,
    },
  };
}

const Post = ({ postData }) => {
  const { theme } = useTheme(); // ✅ Theme State Access
  const excerpt = postData.excerpt || postData.title; 

  // Dynamic Theme Classes
  const bgClass = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subTextColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-500'; // Gray remains similar
  const contentTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  // Prose for markdown content
  const proseClass = theme === 'dark' ? 'prose-invert' : 'prose-base';

  return (
    // ✅ Main div ko dynamic banaya
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${bgClass} ${textColor}`}>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <Header />
      
      <main className="container mx-auto px-6 py-16 max-w-2xl flex-grow"> 
        <a href="/blog" className="text-blue-500 hover:underline mb-8 block">← Back to All Posts</a>
        
        {/* Title aur Metadata */}
        <h1 className={`text-5xl font-extrabold mb-4 ${textColor}`}>
          {postData.title}
        </h1>
        <p className={`text-lg mb-10 ${subTextColor}`}>
          Published: {postData.date} | By Mohsin Arif
        </p>

        {/* ✅ ARTICLE ko dynamic classes di gayin */}
        <article 
          className={`prose prose-xl max-w-none article-custom ${proseClass} ${contentTextColor}`} 
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />

      </main>
      <Footer />
    </div>
  );
};

export default Post;