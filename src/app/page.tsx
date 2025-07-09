// import Blog from "@/components/sections/blog";
import Blog from "../components/sections/blog";

// import CTA from "@/components/sections/cta";
import CTA from "../components/sections/cta";

// import FAQ from "@/components/sections/faq";
import FAQ from "../components/sections/faq";

// import Features from "@/components/sections/features";
import Features from "../components/sections/features";

// import Footer from "@/components/sections/footer";
import Footer from "../components/sections/footer";

// import Header from "@/components/sections/header";
import Header from "../components//sections/header";

// import Hero from "@/components/sections/hero";
import Hero from "../components/sections/hero";

// import HowItWorks from "@/components/sections/how-it-works";
import HowItWorks from "../components/sections/how-it-works";

// import Logos from "@/components/sections/logos";
import Logos from "../components/sections/logos";

// import Pricing from "@/components/sections/pricing";
import Pricing from "../components/sections/pricing";

// import Problem from "@/components/sections/problem";
import Problem from "../components/sections/problem";

// import Solution from "@/components/sections/solution";
import Solution from "../components/sections/solution";

// import Testimonials from "@/components/sections/testimonials";
import Testimonials from "../components/sections/testimonials";

// import TestimonialsCarousel from "@/components/sections/testimonials-carousel";
import TestimonialsCarousel from "../components/sections/testimonials-carousel";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      {/* <Logos /> */}
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <TestimonialsCarousel />
      {/* <Testimonials /> */}
      <Pricing />
      <FAQ />
      <Blog />
      <CTA />
      <Footer />
    </main>
  );
}
