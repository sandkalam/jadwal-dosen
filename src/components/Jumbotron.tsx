import jumbotron from "../assets/jumbotron.webp";

const Jumbotron = () => {
  return (
    <div
      className="hero h-[80vh] bg-base-200 bg-cover bg-center bg-no-repeat bg-fixed print:hidden"
      style={{ backgroundImage: `url(${jumbotron})` }}
    >
      <div className="hero-overlay bg-opacity-40 bg-black"></div>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1
            className="text-5xl font-bold text-white"
            style={{ fontFamily: "Playwrite GB S" }}
          >
            Hello there
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
