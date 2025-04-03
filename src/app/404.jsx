import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}

function NotFoundContent() {
  const searchParams = useSearchParams();
  return <div>Page non trouvée</div>;
}