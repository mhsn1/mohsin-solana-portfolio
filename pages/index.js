import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import History from '../components/History';
import Contact from '../components/Contact';

export default function Home() {
  return (
    // 'bg-gray-900' aur 'text-white' classes yahan apply honi chahiye
    <div className="min-h-screen bg-gray-900 text-white font-sans"> 
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Sabse pehla masla: Yahan image ka Alt text nazar aa raha hai */}
        <Hero /> 
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