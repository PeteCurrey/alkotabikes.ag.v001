import HeroFullBleed from "@/components/sections/HeroFullBleed";
import HotspotViewer from "@/components/sections/HotspotViewer";
import ProductPhilosophy from "@/components/sections/ProductPhilosophy";
import DarkEngineeringTransition from "@/components/sections/DarkEngineeringTransition";
import WorkshopFeature from "@/components/sections/WorkshopFeature";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import TerrainBench from "@/components/sections/TerrainBench";
import ConfiguratorPreviewSection from "@/components/sections/ConfiguratorPreviewSection";
import MaterialSequence from "@/components/sections/MaterialSequence";
import AlkotaStory from "@/components/sections/AlkotaStory";
import JournalPreviewSection from "@/components/sections/JournalPreviewSection";
import FinalStatementSection from "@/components/sections/FinalStatementSection";

export default function HomePage() {
  return (
    <div className="w-full space-y-0">
      {/* Section 01 - Cinematic Hero */}
      <HeroFullBleed />

      {/* Section 02 - The Object (Hotspot Viewer) */}
      <HotspotViewer />

      {/* Section 03 - Product Philosophy */}
      <ProductPhilosophy />

      {/* Section 04 - Dark Engineering Transition */}
      <DarkEngineeringTransition />

      {/* Section 05 - Workshop Showcase */}
      <WorkshopFeature />

      {/* Section 06 - Process Timeline */}
      <ProcessTimeline />

      {/* Section 07 - Terrain Bench */}
      <TerrainBench />

      {/* Section 08 - Configurator Preview */}
      <ConfiguratorPreviewSection />

      {/* Section 09 - Material Detail Sequence */}
      <MaterialSequence />

      {/* Section 10 - ALKOTA Story */}
      <AlkotaStory />

      {/* Section 11 - Field Notes Journal */}
      <JournalPreviewSection />

      {/* Section 12 - Final Engineering Statement */}
      <FinalStatementSection />
    </div>
  );
}
