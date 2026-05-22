"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  Layers3,
  Loader2,
  User,
} from "lucide-react";
import { updateUser } from "@/services/auth";
import { api } from "@/lib/api";
import SearchableSelect from "@/components/ui/SearchableSelect";
import Alert from "@/components/ui/Alert";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";





export default function OnboardingContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null)
  const [cities, setCities] = useState([]);
  const { user } = useAuth()
  const router = useRouter();

  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    type: "",
    company_name: "",
    first_name: "",
    last_name: "",
    gender: "",
    city_id: "",
    address: "",
    zip: "",
  });

  const PANELS = [
    {
      title: "Bienvenue !",
      sub: "Quelques étapes rapides pour configurer votre espace personnel.",
      bullets: [
        "Processus simple en 3 étapes",
        "Compte adapté à vos besoins",
        "Accès immédiat après inscription",
      ],
    },
    {
      title: "Parlez-nous de vous",
      sub: "Ces informations nous permettent de personnaliser votre expérience.",
      bullets: [
        "Données sécurisées et confidentielles",
        "Modifiables à tout moment",
        "Jamais partagées sans consentement",
      ],
    },
    {
      title: "Presque terminé !",
      sub: "Votre adresse nous permet de vous proposer les services disponibles près de chez vous.",
      bullets: [
        "Livraison adaptée à votre zone",
        "Showrooms et partenaires proches",
        "Suivi de commande en temps réel",
      ],
    },
  ];

  const currentPanel = PANELS[currentStep];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectType = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      const response = await updateUser(formData);
      if (response.errors) {
        setError(response.message);
      } else {
        setSuccess(true);
        setError(null)
        const next = searchParams.get("next")
        console.log(response.user)
        if (next) {
          router.push(next)
        } else if (response?.user?.type) {
          router.push('/profile')
        } else {
          router.push('/onboarding')
        }
      }

    } catch (error) {
      console.error("Update user error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user?.type !== null && user?.type !== undefined) {
      router.push("/profile");
    }
  }, [user, router]);


  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('cities');
        setCities(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const steps = [0, 1, 2];

  return (
    <div className="bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-sm flex flex-col lg:flex-row">
        {/* LEFT PANEL */}
        <div className="relative w-full lg:w-5/12 overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-pink-900 p-10 hidden lg:flex flex-col justify-between">
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
              <Layers3 className="h-5 w-5 text-white" />
            </div>

            <h2 className="mb-3 text-3xl font-bold leading-tight text-white">
              {currentPanel.title}
            </h2>

            <p className="max-w-sm text-sm leading-7 text-red-100/80">
              {currentPanel.sub}
            </p>
          </div>

          <div className="relative z-10 my-10 space-y-4">
            {currentPanel.bullets.map((bullet, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-[10px] text-red-300">✦</span>

                <span className="text-sm text-red-50/90">{bullet}</span>
              </div>
            ))}
          </div>

          <p className="relative z-10 text-xs text-red-200/70">
            Déjà un compte ?{" "}
            <a
              href="#"
              className="font-medium text-white underline underline-offset-2"
            >
              Se connecter
            </a>
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 px-6 py-8 sm:px-10 lg:px-12 flex flex-col justify-center">
          {/* STEP INDICATOR */}
          <div className="mb-8 flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`
                    flex items-center justify-center rounded-full transition-all duration-300
                    ${step < currentStep
                      ? "h-6 w-6 bg-red-600"
                      : step === currentStep
                        ? "h-6 w-6 bg-red-600 ring-4 ring-red-100"
                        : "h-2 w-2 bg-gray-300"
                    }
                  `}
                >
                  {step < currentStep && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`h-[1px] w-8 ${step < currentStep ? "bg-red-600" : "bg-gray-200"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>



          {/* STEP 0 */}
          {currentStep === 0 && (
            <div>
              <h3 className="mb-1 text-2xl font-bold text-gray-900">
                Quel type de compte ?
              </h3>

              <p className="mb-6 text-sm text-gray-500">
                Choisissez le profil qui vous correspond le mieux.
              </p>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* INDIVIDUAL */}
                <button
                  onClick={() => selectType(0)}
                  className={`
                    relative rounded-2xl border-2 p-5 text-left transition-all
                    ${formData.type === 0
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/40"
                    }
                  `}
                >
                  {formData.type === 0 && (
                    <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}

                  <div
                    className={`
                      mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-all
                      ${formData.type === 0
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    <User className="h-5 w-5" />
                  </div>

                  <p className="mb-1 text-sm font-semibold text-gray-800">
                    Particulier
                  </p>

                  <p className="text-xs leading-6 text-gray-500">
                    Compte personnel pour vos projets et commandes
                    individuelles.
                  </p>
                </button>

                {/* COMPANY */}
                <button
                  onClick={() => selectType(1)}
                  className={`
                    relative rounded-2xl border-2 p-5 text-left transition-all
                    ${formData.type === 1
                      ? "border-red-600 bg-red-50"
                      : "border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/40"
                    }
                  `}
                >
                  {formData.type === 1 && (
                    <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}

                  <div
                    className={`
                      mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-all
                      ${formData.type === 1
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    <Briefcase className="h-5 w-5" />
                  </div>

                  <p className="mb-1 text-sm font-semibold text-gray-800">
                    Entreprise
                  </p>

                  <p className="text-xs leading-6 text-gray-500">
                    Compte professionnel avec gestion multi-utilisateurs et
                    facturation.
                  </p>
                </button>
              </div>

              <button
                disabled={!formData.type}
                onClick={() => setCurrentStep(1)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuer
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* STEP 1 */}
          {currentStep === 1 && (
            <div>
              <h3 className="mb-1 text-2xl font-bold text-gray-900">
                {formData.type === 1
                  ? "Informations entreprise"
                  : "Informations personnelles"}
              </h3>

              <p className="mb-6 text-sm text-gray-500">
                Parlez-nous un peu de vous.
              </p>

              <div className="space-y-4">
                {formData.type === 1 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Nom de l'entreprise
                    </label>

                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Acme SARL"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Prénom
                    </label>

                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Votre prénom"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Nom
                    </label>

                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Genre
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                  >
                    <option value="">Sélectionner</option>
                    <option value="Mâle">Mâle</option>
                    <option value="Femelle">Femelle</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </button>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Continuer
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div>
              <h3 className="mb-1 text-2xl font-bold text-gray-900">
                Votre localisation
              </h3>

              <p className="mb-6 text-sm text-gray-500">
                Pour mieux vous servir selon votre région.
              </p>

              <div className="space-y-4">
                <SearchableSelect
                  label="Ville"
                  placeholder="Rechercher une ville..."
                  value={formData.city_id}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      city_id: value,
                    }))
                  }
                  options={cities.map((city) => ({
                    label: city.name,
                    value: city.id,
                  }))}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Adresse
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Rue, numéro, quartier…"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Code postal{" "}
                    <span className="font-normal text-gray-400">
                      (optionnel)
                    </span>
                  </label>

                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="20000"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </button>

                <button
                  onClick={handleFinish}
                  disabled={loading || success}
                  className={`
                    flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition
                    ${success
                      ? "bg-green-600"
                      : "bg-red-600 hover:bg-red-700"
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Création en cours…
                    </>
                  ) : success ? (
                    <>
                      <Check className="h-4 w-4" />
                      Compte créé !
                    </>
                  ) : (
                    <>
                      Créer mon compte
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="mt-3">
            {error ? <Alert message={error} type="error" /> : ''}
          </div>
        </div>

      </div>
    </div>
  );
}