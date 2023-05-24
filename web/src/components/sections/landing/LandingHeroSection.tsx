import { useRef } from 'react';
import heroBg from '/hero-bg.jpg'
import heroFg from '/hero-fg.png'
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import logo from "/logo.png";
import { Link } from "react-scroll";
export function LandingHeroSection() {
  return (
    <ParallaxProvider>
    <section id="home" className="relative h-screen w-screen overflow-hidden">
            <Parallax className="absolute h-screen w-screen" speed={-8}>
                <img src={heroBg} className="absolute inset-0 w-full h-full object-cover" />
            </Parallax>
            <Parallax speed={0} className="absolute h-full w-full">
            <img src={heroFg} className="absolute inset-0 w-full h-full object-cover" />
            </Parallax>
            <Parallax speed={0} className="absolute h-full w-full bg-black bg-opacity-40">
            </Parallax>
            
            <Parallax speed={-5} className="absolute h-full w-full">
            <div className="h-full w-full flex flex-col justify-center items-center relative z-10">
            <div className="relative max-w-2xl p-4 z-2 rounded-lg">
              <div className="text-center">
                <div className="flex space-x-6 justify-center items-center">
              <img
                    className="block h-20 w-auto lg:block"
                    src={logo}
                    alt="SustainMind"
                  />
                <h1 className="text-6xl font-bold tracking-tight  text-white sm:text-6xl">
                  SustainMind
                </h1>
                </div>
                <p className="mt-6 text-3xl text-white font-bold leading-8">
                  The collaborative ESG-Solution
                </p>
                <div className="mt-10 flex items-center text-white justify-center gap-x-6">
                  <Link
                    smooth
                    spy
                    to="signup"
                    className="rounded-md bg-green-500 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                  >
                    Sign up for the waitlist
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </Parallax>


    </section>
    </ParallaxProvider>
  );
}
