import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import HandshakeIcon from '@mui/icons-material/Handshake';
import screenshot from "/screenshot.jpg";
import { Slide } from '@mui/material';
import { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const features = [
  {
    name: 'Collaborate.',
    description:
      'Companies collaborate to collect data and to model their supply chains.',
    icon: HandshakeIcon,
  },
  {
    name: 'Automate.',
    description: 'Our software identifies risks and suggests steps for corporations and their suppliers to eliminate these risks.',
    icon: AutoModeIcon,
  },
  {
    name: 'Prove.',
    description: 'We allow your company to prove your sustainability with reports and certificates.',
    icon: WorkspacePremiumIcon,
  },
]

export function LandingFeaturesSection() {
    const [slideIn, setSlideIn] = useState(false);
  return (
    <section id="features" className="overflow-hidden bg-white py-24 sm:py-32">
        <VisibilitySensor minTopValue={300} partialVisibility={true} delayedCall scrollCheck onChange={(isVisible: boolean) => (isVisible) && setSlideIn(isVisible)}>

      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">

        <Slide timeout={750} direction={"right"} in={slideIn}  >
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Intuitive workflow</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                SustainMind allows you and your company to consider all the relevant aspects of building sustainable supply chains without requiring you to have any prior knowledge of ESG.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon className="absolute left-1 top-1 h-5 w-5 text-green-600" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          </Slide>




          <div className="sm:px-6 lg:px-0 ">
            <div className="relative isolate overflow-hidden bg-green-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-green-100 opacity-20 ring-1 ring-inset ring-white"
                aria-hidden="true"
              />
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <img
                  src={screenshot}
                  loading="lazy"
                  alt="Product screenshot"
                  width={2432}
                  height={1442}
                  className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      </VisibilitySensor>
    </section>
  )
}

export default LandingFeaturesSection;
