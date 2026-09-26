import HeroTopBar from "./Herotopbar";
import HeroMiddle from "./Heromiddle";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="flex flex-col lg:min-h-screen bg-[var(--bg)] relative overflow-hidden"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <HeroTopBar />
      <HeroMiddle />
    </section>
  );
}
