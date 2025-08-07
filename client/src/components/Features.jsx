import { Sparkles, Map, Wallet, CalendarCheck } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "AI-Powered Planning",
    desc: "Get smart, personalized itineraries instantly with Gemini AI.",
  },
  {
    icon: <Map className="h-8 w-8 text-blue-600" />,
    title: "Discover Hidden Gems",
    desc: "Explore places most tourists miss — curated just for you.",
  },
  {
    icon: <Wallet className="h-8 w-8 text-blue-600" />,
    title: "Budget-Friendly",
    desc: "Plan the perfect trip within your price range.",
  },
  {
    icon: <CalendarCheck className="h-8 w-8 text-blue-600" />,
    title: "Easy Scheduling",
    desc: "Day-wise schedule, activities, and transport — auto-generated.",
  },
];

const Features = () => {
  return (
    <section className="py-12 bg-white px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose WanderNest?</h2>
        <p className="text-gray-600 mb-10">Smarter trips, simpler plans — all in one place.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
