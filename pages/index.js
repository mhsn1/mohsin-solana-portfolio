import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import History from '../components/History';
import Contact from '../components/Contact';

// FIX: Yeh naya component yahan daalna zaroori hai.
const DummyStyleFix = () => <div className="hidden bg-gray-900" />;

export default function Home() {
  return (
    // 'bg-gray-900' aur 'text-white' classes yahan apply honi chahiye
    <div className="min-h-screen bg-gray-900 text-white font-sans"> 
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        
        {/* FIX: Yeh Dummy component yahan add karna hai */}
        <DummyStyleFix /> 
        
        <section id="expertise" className="py-16">
          <Expertise />
        </section>
        <hr className="border-gray-700 my-8" />
        <section id="history" className="py-16">
          <History />
        </section>
        <hr className="border-gray-700 my-8" />
        <section id="contact" className="py-16">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}