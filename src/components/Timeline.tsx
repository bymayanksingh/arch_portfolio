import React from 'react';

const timeline = [
  { year: 2023, event: "Lead Architect, Urban Harmony Center" },
  { year: 2021, event: "International Architecture Award" },
  { year: 2019, event: "Founded Studio Arc" },
  { year: 2017, event: "Senior Architect, Foster & Partners" },
  { year: 2013, event: "Started Professional Journey" }
];

export function Timeline() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Professional Journey</h2>
        <div className="relative">
          {timeline.map((item, index) => (
            <div key={index} className="mb-8 flex">
              <div className="flex-none w-24 text-right pr-4 pt-1">
                <span className="font-bold">{item.year}</span>
              </div>
              <div className="relative flex-grow pl-8 border-l-2 border-gray-300">
                <div className="absolute w-4 h-4 bg-white border-2 border-gray-300 rounded-full -left-[9px] top-1"></div>
                <p className="text-lg">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}