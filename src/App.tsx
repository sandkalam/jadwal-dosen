import Jumbotron from "./components/Jumbotron";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Chat from "./components/Chat";
import Schedule from "./components/Schedule";
export default function App() {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Contact />
      <Chat />
      <Schedule />
    </div>
  );
}
