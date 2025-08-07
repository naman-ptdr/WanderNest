import { MapPin, Brain, PlaneTakeoff } from "lucide-react";

const steps = [
  {
    icon: <MapPin className="w-10 h-10 text-blue-600" />,
    title: "Choose Destination",
    desc: "Tell us where you want to go — city, country, or even a vibe.",
  },
  {
    icon: <Brain className="w-10 h-10 text-blue-600" />,
    title: "Let AI Plan It",
    desc: "Our AI creates a full travel plan with places, timings, and tips.",
  },
  {
    icon: <PlaneTakeoff className="w-10 h-10 text-blue-600" />,
    title: "Enjoy Your Trip",
    desc: "Follow your personalized itinerary and enjoy stress-free travel!",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 mb-10">Plan smarter in just 3 simple steps.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white shadow-md rounded-2xl p-6 text-center">
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
