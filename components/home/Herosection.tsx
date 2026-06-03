// components/HeroSection.tsx
// SERVER COMPONENT — assembles 3 hero sub-components

import HeroTopBar from "./Herotopbar";
import HeroMiddle from "./Heromiddle";
import HeroBottomBar from "./Herobottombar";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="flex flex-col min-h-screen"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <HeroTopBar />
      <HeroMiddle />
      <HeroBottomBar />
    </section>
  );
}