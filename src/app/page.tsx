import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { FeaturedProjects } from "@/components/featured-projects";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
      <Hero />

      <TechStack />

      <FeaturedProjects />
    </main>
  );
}