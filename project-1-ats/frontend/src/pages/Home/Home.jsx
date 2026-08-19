
import MainLayout from "../../layouts/MainLayout";
import Hero from "../../components/Hero/Hero";
import TrustedCompanies from "../../components/TrustedCompanies/TrustedCompanies";
import Features from "../../components/Features/Features";
import HowItWorks from "../../components/HowItWorks/HowItWorks";

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <TrustedCompanies />
      <Features />
      <HowItWorks />
    </MainLayout>
  );
};

export default Home;