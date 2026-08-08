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
import FromTheNotebook from "@/components/sections/FromTheNotebook";
import JournalPreviewSection from "@/components/sections/JournalPreviewSection";
import RoadToProduction from "@/components/editorial/RoadToProduction";
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

      {/* Section 11 - FROM THE NOTEBOOK — Development Archive */}
      <FromTheNotebook />

      {/* Section 12 - Field Notes Journal */}
      <JournalPreviewSection />

      {/* Section 13 - Programme Timeline */}
      <section className="w-full bg-alkota-carbon border-t border-white/10 py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RoadToProduction />
        </div>
      </section>

      {/* Section 14 - Final Engineering Statement */}
      <FinalStatementSection />
    </div>
  );
}
