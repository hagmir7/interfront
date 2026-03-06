import Link from "next/link";
import CLink from "./CLink";

export function CartItem({
  name,
  dimensions,
  color,
  price,
  discount,
  href,
  quantity,
}) {

  const details = [dimensions, color ? `(${color})` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
      <div className="flex items-center justify-between gap-6">

        <div>
          <CLink
            href={href}
            className="font-bold text-gray-900 hover:underline text-sm md:text-base"
          >
            {name}
            {details && ` - ${details}`}
          </CLink>
        </div>

        <div className="text-end">
          <p className="text-base font-bold text-red-600 whitespace-nowrap">
            {quantity} × {price} MAD
          </p>
        </div>

      </div>
    </div>
  );
}