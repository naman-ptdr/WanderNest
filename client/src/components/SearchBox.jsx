const SearchBox = () => {
  return (
    <section className="py-10 bg-white text-center">
      <h2 className="text-2xl font-bold mb-4">Where do you want to go?</h2>
      <input
        type="text"
        placeholder="Search destination..."
        className="w-[80%] md:w-[40%] px-4 py-2 border rounded shadow"
      />
    </section>
  );
};

export default SearchBox;
