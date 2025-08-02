import Hero from "../components/Hero";
import SearchBox from "../components/SearchBox";
import PopularDestinations from "../components/PopularDestinations";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    if (isLoggedIn) navigate("/dashboard");
    else navigate("/login");
  };

  return (
    <div>
      <Hero onStartPlanning={handleStartPlanning} />
      <SearchBox />
      <PopularDestinations />
      <Features />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
