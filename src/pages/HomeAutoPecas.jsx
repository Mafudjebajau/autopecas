import React, { useState, useCallback, useRef} from "react";
import { Helmet } from "react-helmet";

import { Header } from "../components/Header";
import { Hero } from "../components/HeroSection";
import { BrandsSection } from "../components/BrandsSection";
import { ServicesSection } from "../components/ServicesSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { Footer } from "../components/Footer";


/* ---------------------------
   MAIN COMPONENT
----------------------------*/
export default function HomeAutoPecas() {
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);


  const handleSearch = useCallback((value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(value), 220);
  }, []);

  return (
    <div className="min-vh-100">
      <Helmet>
        <title>AutoPeças e-trading - Peças Originais e Autênticas</title>
        <meta name="description" content="AutoPeças e-trading - Peças originais para Toyota, BMW, Mercedes, Bosch, Philips e outras marcas. Qualidade garantida e entrega rápida." />
        <html lang="pt-BR" />
      </Helmet>

      <Header />

      <main>
        <Hero />
        <BrandsSection />
        <ServicesSection />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}