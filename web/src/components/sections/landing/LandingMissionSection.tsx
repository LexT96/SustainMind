const stats = [
    { label: 'Transactions every 24 hours', value: '44 million' },
    { label: 'Assets under holding', value: '$119 trillion' },
    { label: 'New users annually', value: '46,000' },
  ]
  
  export function LandingMissionSection() {
    return (
      <section id="mission" className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create sustainable supply chains through <br className="hidden md:block" /> cooperation</h2>
            <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
              <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                <p className="text-xl leading-8 text-gray-600">
                Revolutionize your supply chain and stay ahead of the game with our cutting-edge cloud-based collaboration software! We empower corporations and their suppliers to analyze, optimize, and drive sustainable practices across their entire supply chain, ensuring compliance with the latest regulations, including the LSKG (Lieferkettengesetz). </p>
                <p className="text-xl leading-8 text-gray-600">

                In today's rapidly evolving business landscape, it's more important than ever for companies to embrace environmental, social, and governance (ESG) principles. Our innovative software takes the guesswork out of ESG compliance and the requirements of the LSKG by providing comprehensive tools and automated reporting capabilities.
                </p>
                <p className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                With our solution, you can effortlessly identify and mitigate risks, ensure ethical sourcing, eliminate labor exploitation, reduce environmental impact, and enhance social responsibility throughout your supply chain. Collaborate seamlessly with your suppliers, exchange vital data, and gain valuable insights to make informed decisions that align with both your sustainability goals and legal obligations under the LSKG.
</p>
              </div>
              <div className="lg:flex lg:flex-auto lg:justify-center">
                <dl className="w-64 space-y-8 xl:w-80">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                      <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  