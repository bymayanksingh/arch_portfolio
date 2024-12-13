import { Hero } from '../components/Hero';
import { HomeAbout } from '../components/HomeAbout';
import { Timeline } from '../components/Timeline';
import { Projects } from '../components/Projects';
import { Testimonials } from '../components/Testimonials';
import { SkillUpgrade } from '../components/SkillUpgrade';

export function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <SkillUpgrade />
      <Timeline />
      <Projects />
      <Testimonials />
    </>
  );
}