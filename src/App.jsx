import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
// import ParticlesBackground from "./components/ParticlesBackground";
import About from "./sections/About";
import Awards from "./sections/Awards";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import Project from "./sections/Projects";
import Skils from "./sections/Skils";

function App() {
  return (
    <>
      <div className="relative gradiant text-white">
        <CustomCursor />
        {/* <ParticlesBackground /> */}
        <Navbar />
        <Home />
        <About />
        <Skils />
        <Project />
        <Experience />
        {/* <Awards /> */}
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
