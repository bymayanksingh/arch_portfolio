import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Timeline } from '../components/Timeline';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Timeline />
      <Testimonials />
      <Contact />
    </>
  );
}