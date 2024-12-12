import { GraduationCap, Brain, Lightbulb, ArrowUpRight, Clock, Target, Rocket } from 'lucide-react';

export function SkillUpgrade() {
  return (
    <div className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10 text-center lg:text-left">
              {/* Upskilling Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 text-primary 
                           font-semibold text-base mb-8 relative group cursor-default
                           border border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.05)]">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-sm opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500"></div>
                <GraduationCap className="w-5 h-5 relative group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative whitespace-nowrap">
                  Currently Upskilling
                  <span className="absolute -bottom-0.5 left-0 w-full h-[3px] bg-primary/20 rounded-full"></span>
                </span>
                <span className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-primary/20 animate-ping"></span>
                <span className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-primary/40"></span>
              </div>

              {/* Main Content */}
              <div className="space-y-6 sm:space-y-8">
                <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 max-w-xl mx-auto lg:mx-0">
                  Embracing the Future with
                  <span className="relative inline-block px-4">
                    <span className="relative z-10">BIM</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/10 -skew-x-12"></span>
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  I'm currently immersed in an intensive BIM (Building Information Modelling) certification program, equipping myself with cutting-edge skills in Building Information Modeling to deliver exceptional architectural solutions.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto lg:mx-0">
                  <div className="group p-4 sm:p-6 rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <Clock className="w-8 h-8 text-primary/80 mb-3 group-hover:scale-110 transition-transform mx-auto lg:mx-0" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">In Progress</h3>
                    <p className="text-sm text-gray-600">Currently mastering Revit, AutoCAD, and other industry-standard BIM tools with hands-on projects.</p>
                  </div>

                  <div className="group p-4 sm:p-6 rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <Target className="w-8 h-8 text-primary/80 mb-3 group-hover:scale-110 transition-transform mx-auto lg:mx-0" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Core Focus</h3>
                    <p className="text-sm text-gray-600">Deep diving into 3D modeling, parametric design, and collaborative BIM workflows.</p>
                  </div>

                  <div className="group p-4 sm:p-6 rounded-xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                    <Rocket className="w-8 h-8 text-primary/80 mb-3 group-hover:scale-110 transition-transform mx-auto lg:mx-0" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Future Ready</h3>
                    <p className="text-sm text-gray-600">Preparing to integrate sustainable design principles with advanced BIM technologies.</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2 sm:pt-4">
                  <a 
                    href="https://www.novatr.com/courses/building-information-modelling" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 hover:bg-primary/10 text-primary 
                             font-medium rounded-full group transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Know more about the course
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-first lg:order-last">
              <img
                src="/BIM.jpeg"
                alt="BIM Course"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm"></div>
        </div>
      </div>
    </div>
  );
}
