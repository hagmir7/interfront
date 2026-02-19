import Image from "next/image";

const features = [
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/fast-and-easy-assembly-1.svg", label: "Montage facile et rapide" },
  { icon: "https://www.kastamonuentegre.com/uploads/2023/05/zeminden-isitma.svg", label: "Adapté au chauffage au sol" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/impact-resistant-1.svg", label: "Résistant aux coups" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/resistant-to-uv-rays-1.svg", label: "Résistant aux rayons UV" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/base-panel-high-density-fiberboard-1.svg", label: "Panneau en fibre à haute densité" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/resistant-to-stratch-1-1.svg", label: "Résistant aux rayures" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/environmentally-friendly-1-1.svg", label: "Respectueux de l'environnement" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/not-affected-by-stains-1.svg", label: "Anti-tache" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/resistant-to-cigarette-fire-1.svg", label: "Résistant aux brûlures de cigarette" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/hijyenik.svg", label: "Nettoyage et entretien facile, hygiénique" },
  { icon: "https://www.kastamonuentegre.com/uploads/2022/12/resistant-to-furniture-wheel-abrasion-1.svg", label: "Résistant à l'abrasion due aux meubles à roulettes" },
  { icon: "https://www.kastamonuentegre.com/uploads/2024/10/hygiene-in-circle.svg", label: "Hygiénique" },
];

export default function ParqetCaracteristiques() {
  return (
    <>
      <style>{`
        .features-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 0;
          list-style: none;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
            margin-bottom: 2rem;
          }
        }
        @media (min-width: 1280px) {
          .features-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <div className="bg-white shadow-2xs border p-4 rounded-2xl mt-10">
        <div className="block">
          {/* <h2 className="mb-8 text-2xl font-semibold">Caractéristiques</h2> */}
          <ul className="features-grid">
            {features.map((feature, index) => (
              <li key={index} className="text-center space-y-5">
                <div className="w-full flex justify-center mb-3">
                  <Image width={50} height={50}  className="w-16 text-center" src={feature.icon} alt="FEATURES" />
                </div>
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}