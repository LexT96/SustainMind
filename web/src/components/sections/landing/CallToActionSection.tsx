import { Link } from 'react-router-dom';

export function LandingCallToActionSection() {
    return (
      <section id="signup" className="bg-white py-8 sm:py-2">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden px-6 py-24 sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-green-600 sm:text-4xl">
              Ready for a sustainable future?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 ">
              Sign up now and boost your effectivity!
            </p>
            <div className="flex justify-center mt-4">
              <Link to="/login">
                <button type="submit" className="flex-none rounded-md bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
