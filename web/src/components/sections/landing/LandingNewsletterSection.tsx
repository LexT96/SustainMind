/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export function LandingNewsletterSection() {
    return (
      <section id="signup" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden px-6 py-24 sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-green-600 sm:text-4xl">
              Get notified when we’re launching.
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 ">
              Sign up now and be one of the first to revolutize ESG-Reporting.
            </p>
            <form className="mx-auto mt-10 flex max-w-md gap-x-4" action="https://formspree.io/f/mnqyydgz" method="post">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-1 bg-white/5 px-3.5 py-2 text-black shadow-lg ring-1 focus:border-black ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Notify me
              </button>
            </form>

          </div>
        </div>
      </section>
    )
  }
  