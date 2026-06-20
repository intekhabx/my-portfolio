// app/page.tsx
// SSG page — built at compile time
// Add revalidate for ISR on projects

import SideNav from "@/components/home/Sidebar";
import HeroSection from "@/components/home/Herosection";
import ProjectsSection from "@/components/home/Projectssection";
import AboutSection from "@/components/home/Aboutsection";
import ContactSection from "@/components/home/Contactsection";
import Footer from "@/components/home/Footer";
import dbConnection from "@/lib/db";
import { projectModel } from "@/models/project.model";
import TechStack from "@/components/home/Techstack";
import MernStack from "@/components/home/Mernstack";
import SocialBanner from "@/components/home/Socialbanner";
import ContactIllustration from "@/components/home/Contactillustration";
import SkillsMarquee from "@/components/home/Skillsmarquee";

export const revalidate = 60; // ISR — rebuild every 60 seconds
 
async function getProjects() {
  try {
    await dbConnection();
    const projects = await projectModel.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return [];
  }
}
 
export default async function HomePage() {
  const projects = await getProjects();
 
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden" style={{ background: "var(--bg)" }}>
 
      {/* Fixed vertical sidebar */}
      <SideNav />
 
      {/* Main content — offset by sidebar width (52px) */}
      <main className="flex-1 min-w-0 flex flex-col md:ml-[52px] overflow-x-hidden">
        <HeroSection />
        <MernStack />
        <TechStack />
        <SkillsMarquee />
        <ProjectsSection projects={projects} />
        <AboutSection />
        <ContactSection />
        <ContactIllustration />
        <SocialBanner />
        <Footer />
      </main>
 
    </div>
  );
}
