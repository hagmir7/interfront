import Image from 'next/image'


const FeatureIcon = ({ children }) => (
  <div className="relative group w-16 h-16">
    <div className="absolute inset-x-5 bottom-0 h- blur-md opacity-50" />
    <div className="relative h-16 w-16 overflow-hidden rounded-2xl p-px
      shadow-lg shadow-black/5">

      <div className="absolute inset-x-4 -bottom-2 h-4 blur-md dark:opacity-80" />

      <div className="relative flex h-full w-full items-center justify-center rounded-[15px] p-2 bg-white">
        {children}
      </div>
    </div>
  </div>
)

const features = [
  {
    title: (
      <>
        N°1  au Maroc dans la fabrication de meubles de cuisine sur mesure.
      </>
    ),
    icon: <Image src='/icons/forts/1.svg' width={50} height={50} alt='' aria-hidden="true" className="h-full w-full text-rose-400" />,
  },
  {
    title: (
      <>
        +16 années d'expertise reconnue et de savoir-faire industriel maîtrisé
      </>
    ),
    icon: <Image src='/icons/forts/4.svg' width={50} height={50} alt='' aria-hidden="true" className="h-full w-full text-rose-400" />,
  },
  {
    title: (
      <>
        Qualité premium conforme aux normes internationales
      </>
    ),
    icon: <Image src='/icons/forts/3.svg' width={50} height={50} alt='' aria-hidden="true" className="h-full w-full text-rose-400" />,
  },
  {
    title: (
      <>
        Grande capacité industrielle assurant une production fiable et continue
      </>
    ),
    icon: <Image src='/icons/forts/2.svg' width={50} height={50} alt='' aria-hidden="true" className="h-full w-full text-rose-400" />,
  }
]



const FeaturesSection = () => {
  return (
    <section className="relative mx-auto w-full px-6 sm:px-8 lg:px-8 pt-6 lg:pt-10" aria-label="Nos points forts">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <div className="mb-4 flex gap-6 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row">
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <p className="font-display text-md leading-tight text-gray-800 dark:text-white lg:text-lg font-semibold">
                {feature.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection