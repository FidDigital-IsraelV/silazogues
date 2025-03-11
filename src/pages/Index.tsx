
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Components from "@/components/Components";
import Information from "@/components/Information";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Components />
        <Information />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
