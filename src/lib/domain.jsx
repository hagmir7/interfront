import { headers } from "next/headers";

export const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const forwardedProto = headersList.get("x-forwarded-proto") || "https";
  const protocol = forwardedProto.split(",")[0].trim();
  return `${protocol}://${host}`;
};