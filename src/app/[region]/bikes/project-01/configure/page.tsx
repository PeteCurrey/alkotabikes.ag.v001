import { redirect } from "next/navigation";

export default async function BikeConfigureRedirect({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  redirect(`/${region}/configure`);
}
