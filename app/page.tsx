// app/page.tsx
import SideNav from "@/components/home/Sidebar";
import HeroSection from "@/components/home/Herosection";
import ProjectsSection from "@/components/home/Projectssection";
import AboutSection from "@/components/home/Aboutsection";
import ContactSection from "@/components/home/Contactsection";
import Footer from "@/components/home/Footer";
import dbConnection from "@/lib/db";
import { projectModel } from "@/models/project.model";
import TechStack from "@/components/home/Techstack";
import SocialBanner from "@/components/home/Socialbanner";
import ContactIllustration from "@/components/home/Contactillustration";
import SkillsMarquee from "@/components/home/Skillsmarquee";
import DragableBox from "@/components/home/Dragbox";

export const revalidate = 60;

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
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--bg)]">
      {/* Fixed vertical sidebar */}
      <SideNav />

      {/* Main content area — strictly isolated with md:pl-[52px] */}
      <main className="w-full min-w-0 md:pl-[52px] pb-16 md:pb-0 overflow-x-hidden flex flex-col">
        <HeroSection />
        <TechStack />
        <SkillsMarquee />
        <ProjectsSection projects={projects} />
        <div className="md:block hidden">
          <DragableBox />
        </div>
        <AboutSection />
        <ContactSection />
        <ContactIllustration />
        <SocialBanner />
        <Footer />
      </main>
    </div>
  );
}