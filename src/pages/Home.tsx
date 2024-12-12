import { Hero } from '../components/Hero';
import { HomeAbout } from '../components/HomeAbout';
import { Timeline } from '../components/Timeline';
import { Projects } from '../components/Projects';
import { Testimonials } from '../components/Testimonials';
import { SkillUpgrade } from '../components/SkillUpgrade';
// import { GraduationGallery } from '../components/GraduationGallery';

export function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <SkillUpgrade />
      {/* <GraduationGallery /> */}
      <Timeline />
      <Projects />
      <Testimonials />
    </>
  );
}