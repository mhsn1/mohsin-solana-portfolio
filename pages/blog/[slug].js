import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAllPostSlugs, getPostData } from '../../lib/posts';

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
  // Ensure excerpt is available for SEO description
  const excerpt = postData.excerpt || postData.title; 

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans">
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <Header />
      
      {/* FIX 1: Main Container ko max-w-2xl kiya gaya hai (Ads ke liye jagah) */}
      <main className="container mx-auto px-6 py-16 max-w-2xl flex-grow"> 
        <a href="/blog" className="text-blue-400 hover:underline mb-8 block">← Back to All Posts</a>
        
        {/* Title aur Metadata */}
        <h1 className="text-5xl font-extrabold text-white mb-4">
          {postData.title}
        </h1>
        <p className="text-gray-500 text-lg mb-10">
          Published: {postData.date} | By Mohsin Arif
        </p>

        {/* FIX 2: ARTICLE ko custom CSS class di gayi hai for spacing (article-custom) */}
        <article 
          className="prose prose-invert prose-xl max-w-none text-gray-300 article-custom" 
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />

      </main>
      <Footer />
    </div>
  );
};

export default Post;
