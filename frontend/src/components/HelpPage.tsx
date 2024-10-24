const HelpPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg max-w-3xl w-full p-6">
        <h1 className="text-4xl text-center mb-6">Help</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            How does this app work?
          </h2>
          <p className="text-gray-600 text-justify">
            The <strong>Soho Shopping Route Generator</strong> - a fully
            customizable experience - creates shopping routes based on
            preferences like store types, trends, price range and brands you
            like. Just select your options and we will generate the best route
            for you!
          </p>
          <h2 className="text-2xl font-semibold mb-4 mt-8">
            What if no stores showed up?
          </h2>
          <p className="text-gray-600 text-justify">
            If no stores showed up, it means that there are no stores that match
            your preferences. Try adjusting your filters by increasing your
            price range, selecting different categories or removing some
            restrictions to explore more options.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HelpPage;
