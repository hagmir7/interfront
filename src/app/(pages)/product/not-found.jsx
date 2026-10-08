import CLink from "@/components/CLink";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Produit introuvable</h2>
      <p className="text-gray-600">
        Le produit que vous recherchez n’existe pas.
      </p>
      <CLink href="/" className="mt-4 text-blue-600 hover:underline">
        Retour à l’accueil
      </CLink>
    </div>
  );
}
