import { Hero } from '../components/Hero';
import { HomeAbout } from '../components/HomeAbout';
import { Timeline } from '../components/Timeline';
import { Projects } from '../components/Projects';
import { Testimonials } from '../components/Testimonials';
// import { GraduationGallery } from '../components/GraduationGallery';

export function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      {/* <GraduationGallery /> */}
      <Timeline />
      <Projects />
      <Testimonials />
    </>
  );
}