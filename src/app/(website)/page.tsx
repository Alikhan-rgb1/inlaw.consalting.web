import Hero from "../../components/Hero";
import Geography from "../../components/Geography";
import Services from "../../components/Services";
import Solutions from "../../components/Solutions";
import WhyUs from "../../components/WhyUs";
import Certifications from "../../components/Certifications";
import Process from "../../components/Process";
import Team from "../../components/Team";
import Stats from "../../components/Stats";
import Contact from "../../components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Geography />
      <Services />
      <Solutions />
      <WhyUs />
      <Certifications />
      <Process />
      <Team />
      <Stats />
      <Contact />
    </main>
  );
}
