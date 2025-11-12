import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getSortedPostsData } from '../../lib/posts'; 

// Next.js yeh function build time par chalaega
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Blog = ({ allPostsData }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans">
      <Head>
        <title>Blog | Web3 Security & Solana DApps | Mohsin Arif</title>
        <meta name="description" content="Mohsin Arif's latest insights on Solana smart contract security, DApp architecture, and Next.js performance optimization." />
      </Head>
      <Header />
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-16 max-w-4xl flex-grow">
        <h1 className="text-5xl font-extrabold text-white mb-10 text-center">
          Web3 Insights & Case Studies
        </h1>

        {/* Blog Listing Area */}
        <div className="space-y-12">
          {allPostsData.map(({ slug, title, date, excerpt }) => (
            // Har article ko sahi tarah se render karna
            <div key={slug} className="p-6 border-b border-gray-700 hover:bg-gray-800 transition duration-300 rounded-lg">
              <p className="text-sm text-solana-green mb-1">{date}</p>
              <a href={`/blog/${slug}`} className="text-3xl font-bold text-white hover:text-blue-400 block transition duration-300">
                {title}
              </a>
              <p className="mt-2 text-gray-400">{excerpt}</p>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;