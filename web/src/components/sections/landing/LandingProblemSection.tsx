import { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const stats: {id: number, name: string, value: number, suffix: string}[] = [
    { id: 1, name: 'According to a groundbreaking 2020 survey by Accenture, an astounding 82% of consumers prefer sustainable products and services.', value: 82, suffix: "+" },
    { id: 2, name: "of companies report they don't have good tools that help them with LkSG compliance", value: 72, suffix: "%" },
    { id: 3, name: 'of companies viewed the temporal expenditure as their biggest challenge regarding the LkSG', value: 63, suffix: "%" },
  ]

  
  export function LandingProblemSection() {
    const [counterHasRun, setCounterHasRun] = useState(false)

    const handleCounterRun = (start: any) => {
        if (counterHasRun) return;
        start();
        setCounterHasRun(true);
    }
    return (
      <section id="problem" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  <CountUp end={stat.value} duration={5} suffix={stat.suffix}>
                  {({ countUpRef, start }) => (
            <VisibilitySensor onChange={() => handleCounterRun(start)} delayedCall>
                <span ref={countUpRef} />
            </VisibilitySensor>
        )}
                  </CountUp>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    )
  }
  