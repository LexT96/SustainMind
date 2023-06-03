import { Fragment, useEffect, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import MenuIcon from '@mui/icons-material/Menu';
import logo from "/logo.png";
import { UserButton } from '@clerk/clerk-react';

export function MainNavbar() {
    const pathName = window.location.pathname

  return (
    <Disclosure as="nav" className=" bg-white drop-shadow-lg  fixed top-0 left-0 right-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
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
                  <a
                    href="/"
                    className={`${pathName === "/" ? "text-green-700" : ""} inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-500`}
                  >
                    Home
                  </a>
                  <a
                    href="/products"
                    className={`${pathName === "/products" ? "text-green-700" : ""} inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-500`}
                  >
                    Products
                  </a>
                  <a
                    href="/suppliers"
                    className={`${pathName === "/suppliers" ? "text-green-700" : ""} inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-500`}
                  >
                    Suppliers
                  </a>
                  <a
                    href="/sites"
                    className={`${pathName === "/sites" ? "text-green-700" : ""} inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-500`}
                  >
                    Production Sites
                  </a>
                  <a
                    href="/goals"
                    className={`${pathName === "/goals" ? "text-green-700" : ""} inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-500`}
                  >
                    Goals
                  </a>
                  <a
                    href="/analysis"
                    className={`${pathName === "/analysis" ? "text-green-700" : ""} inline-flex cursor-pointer items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-black hover:text-gray-500`}
                  >
                    Risk Analysis
                  </a>
                </div>
              </div>
           <div className="flex justify-center items-center">
            <UserButton />
           </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden text-black">
            <div className="space-y-1 pb-4 pt-2">
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/products"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Products
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/suppliers"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Suppliers
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/sites"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Production Sites
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/goals"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Goals
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/analysis"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Risk Analysis
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
