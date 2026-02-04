import {
  Award,
  History,
  BadgeCheck,
  Factory,
  Sparkles,
} from 'lucide-react'


const FeatureIcon = ({ children }) => (
  <div className="relative group w-14 h-14">
    <div className="absolute inset-x-5 bottom-0 h-2 bg-rose-400 blur-md opacity-50" />

    <div className="relative h-14 w-14 overflow-hidden rounded-2xl p-px
      bg-gradient-to-b from-slate-200 to-slate-300
      dark:from-slate-700 dark:to-[#171C23]
      shadow-lg shadow-black/5">

      <div className="absolute inset-x-4 -bottom-2 h-4 bg-rose-400 blur-md dark:opacity-80" />

      <div className="relative flex h-full w-full items-center justify-center
        rounded-[15px]
        bg-gradient-radial from-white to-slate-100
        dark:from-[#393C45] dark:to-[#171C23]">
        {children}
      </div>
    </div>
  </div>
)

const features = [
  {
    title: (
      <>
        N°1  au Maroc dans la fabrication de meubles
        <br />
         de cuisine sur mesure
      </>
    ),
    icon: <Award className="h-7 w-7 text-rose-400" />,
  },
  {
    title: (
      <>
        Plus de 16 années d’expertise reconnue
        <br />
        et de savoir-faire industriel maîtrisé
      </>
    ),
    icon: <History className="h-7 w-7 text-rose-400" />,
  },
  {
    title: (
      <>
        Qualité premium certifiée
        <br />
        conforme aux normes internationales
      </>
    ),
    icon: <BadgeCheck className="h-7 w-7 text-rose-400" />,
  },
  {
    title: (
      <>
        Grande capacité industrielle assurant
        <br />
        une production fiable et continue
      </>
    ),
    icon: <Factory className="h-7 w-7 text-rose-400" />,
  },
  {
    title: (
      <>
        Innovation constante et design personnalisé
        <br />
        adaptés aux besoins de chaque client
      </>
    ),
    icon: <Sparkles className="h-7 w-7 text-rose-400" />,
  },
]



const FeaturesSection = () => {
  return (
    <section className="relative mx-auto w-full px-6 sm:px-8 lg:px-8 pt-6 lg:pt-10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-x-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col">
            <div className="mb-4 flex flex-col gap-6 sm:flex-row sm:items-center
              lg:flex-col lg:items-start xl:flex-row">

              <FeatureIcon>{feature.icon}</FeatureIcon>

              <h3 className="font-display text-md leading-tight text-black dark:text-white lg:text-lg">
                {feature.title}
              </h3>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
