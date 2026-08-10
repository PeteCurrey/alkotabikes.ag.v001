import BuildsClient from "./BuildsClient";

export const metadata = {
  title: "Saved Builds & Demand Analytics — Alkota Studio",
  description: "View customer saved builds, aggregate demand analytics, filter by region and platform specification, and export build data.",
};

export default function StudioBuildsPage() {
  return <BuildsClient />;
}
