import { headers } from "next/headers";



export const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "https";
  return `${protocol}://${host}`;
}
