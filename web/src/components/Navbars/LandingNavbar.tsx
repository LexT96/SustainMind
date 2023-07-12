import { Fragment, useEffect, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link } from "react-scroll";
import logo from "/logo.png";
export function LandingNavBar() {
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!navRef?.current) return;
            const ref = navRef.current as any;

            if (window.scrollY > window.innerHeight) {
                ref.classList.add("bg-white");
                ref.classList.remove("bg-transparent");
            } else {
                ref.classList.add("bg-transparent");
                ref.classList.remove("bg-white");
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);
  return (
    <Disclosure
      as="nav"
      ref={navRef}
      className="bg-transparent fixed top-0 left-0 right-0 z-50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <div className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <div className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-12 w-auto hidden lg:block"
                    src={logo}
                    alt="SustainMind"
                  />
                  <img
                    className="block h-10 w-auto lg:hidden"
                    src={logo}
                    alt="SustainMind"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    smooth
                    spy
                    to="home"
                    activeClass="text-green-700"
                    className="inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-300"
                  >
                    Home
                  </Link>
                  <Link
                    smooth
                    spy
                    to="solution"
                    activeClass="text-green-700"
                    className="inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-300"
                  >
                    ESG Software
                  </Link>
                  <Link
                    smooth
                    spy
                    to="value_propositions"
                    activeClass="text-green-700"
                    className="inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-300"
                  >
                    Why SustainMind?
                  </Link>
                  <Link
                    smooth
                    spy
                    to="features"
                    activeClass="text-green-700"
                    className="inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-300"
                  >
                    Features
                  </Link>
                  <Link
                    smooth
                    spy
                    to="user_interface"
                    activeClass="text-green-700"
                    className="inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-300"
                  >
                    User Interface
                  </Link>
                </div>
              </div>
              <div className="flex">
                <button className="inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-300"
                onClick={() => {
                    window.location.href = "/login";
                }}>
                  Dashboard
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
            <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                ESG Software
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Why SustainMind?
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Features
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                User Interface
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
