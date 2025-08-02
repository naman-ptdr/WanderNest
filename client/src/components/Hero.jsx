import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Already logged in
    } else {
      navigate("/login"); // Not logged in
    }
  };

  return (
    <section className="relative h-[90vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/hero.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Plan Your Perfect Trip</h1>
          <p className="text-lg md:text-xl mb-6">AI-powered travel planning made easy and fun!</p>
          <button
            onClick={handleStartPlanning}
            className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition"
          >
            Start Planning
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
