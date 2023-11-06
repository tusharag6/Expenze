import { useNavigate } from "react-router-dom";

const theme = {
  colors: {
    primary: "#05445E",
    secondary: "#75E6DA",
    textColor: "#767676",
  },
  fontSizes: {
    small: "12px",
    medium: "16px",
    large: "24px",
  },
};

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="flex flex-row justify-center items-center p-4">
        <div className="flex flex-row items-center space-x-2 pt-16 ">
          <img
            src="../../src/assets/logo.png"
            alt="Expenze Logo"
            className="w-48"
          />
        </div>
      </nav>
      <section className="flex flex-row justify-center items-center z-10">
        <div className="flex flex-col justify-center space-y-4 p-4 flex-1">
          <div className="pl-48">
            <h1 className="text-5xl font-bold pb-8">
              Every Expense Counts, and Expenze Counts Them All
            </h1>
            <p
              className="text-2xl pb-8"
              style={{ color: theme.colors.textColor }}
            >
              Managing your money can be a challenge, but with Expenze, it's
              easy. Our intuitive, free, and open-source expense manager puts
              you in control of your financial journey.
            </p>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-16 rounded cursor-pointer"
                style={{ backgroundColor: theme.colors.primary }}
                onClick={handleGetStarted}
              >
                Get Started
              </button>
              <div className="mt-2 ml-16">
                <img src="../../src/assets/line.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center space-y-4 p-4 flex-1 relative"
          style={{
            backgroundImage: `url("../../src/assets/hero-mask.png"), url("../../src/assets/hero.png")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        >
          <img src="../../src/assets/hero.png" alt="Expenze Logo" />
        </div>
      </section>
      <div style={{ position: "absolute", bottom: 0, left: 0 }}>
        <img
          src="../../src/assets/hero2.png"
          alt="Expenze Logo"
          className="-z-40"
        />
      </div>
    </>
  );
};

export default Home;
