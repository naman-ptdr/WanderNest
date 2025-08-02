const destinations = [
  {
    name: "Paris",
    country: "France",
    image: "/assets/paris.jpg",
  },
  {
    name: "Tokyo",
    country: "Japan",
    image: "/assets/tokyo.jpg",
  },
  {
    name: "New York",
    country: "USA",
    image: "/assets/newyork.jpg",
  },
  {
    name: "Bali",
    country: "Indonesia",
    image: "/assets/bali.jpg",
  },
];

const PopularDestinations = () => {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{dest.name}</h3>
                <p className="text-gray-600">{dest.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
