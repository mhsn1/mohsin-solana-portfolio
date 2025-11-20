import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlackHoleBackground from '../../components/BlackHoleBackground'; 
import BlogSlider from '../../components/BlogSlider'; 
import { getSortedPostsData } from '../../lib/posts'; 
import { useTheme } from '../../components/ThemeContext'; 

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

const Blog = ({ allPostsData }) => {
  const { theme } = useTheme(); 
  const [activeCategory, setActiveCategory] = useState('View All');
  
  const categories = [
    'View All',
    'Smart Contracts',
    'Security Audits',
    'DeFi',
    'Solana Dev',
    'Tutorials'
  ];

  const filteredPosts = activeCategory === 'View All' 
    ? allPostsData 
    : allPostsData.filter(post => post.category === activeCategory);

  const recentPosts = allPostsData.slice(0, 5);

  // ✅ FIXED: Colors par '!important' (!) lagaya hai taake wo zaroor apply hon
  const pageClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white !text-black';
  
  const cardClass = theme === 'dark' 
    ? 'bg-gray-900/60 border-gray-700 hover:border-blue-500'
    : '!bg-white border-gray-200 hover:border-blue-600 shadow-lg hover:shadow-2xl'; // Solid White Card
    
  const textTitle = theme === 'dark' ? 'text-white' : '!text-black'; // Force Black
  const textBody = theme === 'dark' ? 'text-gray-300' : '!text-gray-800'; // Dark Gray for readability
  const textSub = theme === 'dark' ? 'text-gray-500' : '!text-gray-600';
  
  // Buttons
  const activeBtnClass = 'bg-blue-600 border-blue-600 text-white shadow-lg scale-105';
  const inactiveBtnClass = theme === 'dark' 
    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-black';

  // Badge
  const badgeClass = theme === 'dark' 
    ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' 
    : 'bg-blue-100 text-blue-800 border-blue-200 font-bold';

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${pageClass}`}>
      <Head>
        <title>Blog | Web3 Security & Solana DApps | Mohsin Arif</title>
        <meta name="description" content="Insights on Solana smart contract security." />
      </Head>
      
      {/* Background: Hamesha Render hoga (White Hole in Light Mode) */}
      <div className="fixed inset-0 z-0">
         <BlackHoleBackground />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-12 flex-grow">
          
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className={`text-5xl font-extrabold mb-6 drop-shadow-xl ${textTitle}`}>
              Web3 Insights
            </h1>
            
            {/* CATEGORIES */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border ${
                    activeCategory === cat ? activeBtnClass : inactiveBtnClass
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* BLOG GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(({ slug, title, date, excerpt, category }) => (
                <Link href={`/blog/${slug}`} key={slug} className="group">
                  <div className={`h-full p-6 border rounded-xl transition-all duration-300 flex flex-col backdrop-blur-md ${cardClass}`}>
                    
                    {/* Badge */}
                    <div className="mb-4">
                      <span className={`text-xs px-3 py-1 rounded-full border ${badgeClass}`}>
                        {category || 'Article'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-2xl font-bold transition-colors mb-3 ${textTitle} group-hover:text-blue-500`}>
                      {title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className={`text-sm mb-4 flex-grow line-clamp-3 ${textBody}`}>
                      {excerpt}
                    </p>
                    
                    {/* Date */}
                    <div className={`text-xs font-mono mt-auto ${textSub}`}>
                      {date}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className={`col-span-full text-center py-10 ${textBody}`}>
                No posts found in this category.
              </div>
            )}
          </div>

          <div className={`w-full h-px my-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

          {/* SLIDER SECTION */}
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-8 text-center ${textTitle}`}>
              Trending & Recent
            </h2>
            
            <div className="w-full">
               <BlogSlider posts={recentPosts} />
            </div>
          </div>

        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Blog;