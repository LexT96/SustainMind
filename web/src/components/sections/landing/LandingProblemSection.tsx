const stats = [
    { id: 1, name: 'of ESG-regulations and steadily increasing', value: 'Large amount' },
    { id: 2, name: "of companies report they don't have good tools that help them with LkSG compliance", value: '72%' },
    { id: 3, name: 'of companies viewed the temporal expenditure as their biggest challenge regarding the LkSG', value: '63%' },
  ]
  
  export function LandingProblemSection() {
    return (
      <section id="problem" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    )
  }
  