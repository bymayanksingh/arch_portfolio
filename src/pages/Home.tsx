import { Hero } from '../components/Hero';
import { HomeAbout } from '../components/HomeAbout';
import { Timeline } from '../components/Timeline';
import { Projects } from '../components/Projects';
import { Testimonials } from '../components/Testimonials';
import { GraduationVideo } from '../components/GraduationVideo';

export function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <GraduationVideo />
      <Timeline />
      <Projects />
      <Testimonials />
    </>
  );
}