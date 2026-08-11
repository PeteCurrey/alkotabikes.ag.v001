/**
 * ALKOTA CYCLES — TYPED CMS SLOT REGISTRY
 * src/lib/cms/registry.ts
 *
 * Defines every editable page and slot across the application.
 * All page keys and slot keys are exported as strict TypeScript string literal unions.
 */

export type SlotType = 'image' | 'image_set' | 'text' | 'rich_text' | 'link' | 'video';

export interface SlotDefinition {
  slotKey: string;
  label: string;
  type: SlotType;
  required: boolean;
  description: string;
  fallbackAssetPath?: string;
  fallbackText?: string;
}

export interface PageDefinition {
  pageKey: string;
  label: string;
  slots: SlotDefinition[];
}

export const CMS_REGISTRY: PageDefinition[] = [
  {
    pageKey: "home",
    label: "Home Page",
    slots: [
      {
        slotKey: "hero_image",
        label: "Hero White Bike Photo",
        type: "image",
        required: true,
        description: "Primary flagship presentation image on dark tech grid background",
        fallbackAssetPath: "/images/project01-glacier-white-hero.jpg",
      },
      {
        slotKey: "hero_heading",
        label: "Hero Headline Text",
        type: "text",
        required: true,
        description: "Main H1 headline text on homepage hero",
        fallbackText: "ENGINEERED TO GO FURTHER.",
      },
      {
        slotKey: "hero_subheading",
        label: "Hero Subheading Text",
        type: "text",
        required: true,
        description: "Lead introductory paragraph below hero headline",
        fallbackText: "Performance mountain bikes shaped by precision engineering, real terrain and an obsession with the details that change the ride.",
      },
      {
        slotKey: "philosophy_image",
        label: "Engineering Sheet Photo",
        type: "image",
        required: true,
        description: "Development specification sheet photo in philosophy section",
        fallbackAssetPath: "/images/story/technical-cad-material.jpg",
      },
      {
        slotKey: "workshop_image",
        label: "Workshop Feature Photo",
        type: "image",
        required: true,
        description: "Engineering workshop assembly bench photo",
        fallbackAssetPath: "/images/story/workshop-chassis-assembly.jpg",
      },
      {
        slotKey: "story_image",
        label: "Story Standalone Bike Photo",
        type: "image",
        required: true,
        description: "White standalone bike photo in brand story card",
        fallbackAssetPath: "/images/story/pete-currey-glacier-white-presentation.jpg",
      },
    ],
  },
  {
    pageKey: "about",
    label: "Philosophy & Origin",
    slots: [
      { slotKey: "hero_image", label: "Founder Glacier White Hero", type: "image", required: true, description: "Pete Currey with Glacier White Project 01", fallbackAssetPath: "/images/story/pete-currey-glacier-white-presentation.jpg" },
      { slotKey: "finish_white_image", label: "Glacier White Finish", type: "image", required: true, description: "Glacier White paint finish detail", fallbackAssetPath: "/images/story/pete-currey-glacier-white-presentation.jpg" },
      { slotKey: "finish_carbon_image", label: "Naked Carbon Finish", type: "image", required: true, description: "Naked Carbon weave finish detail", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
      { slotKey: "engineering_image", label: "Chassis Engineering Review", type: "image", required: true, description: "Engineering chassis review on bench", fallbackAssetPath: "/images/story/chassis-engineering-review.jpg" },
      { slotKey: "components_image", label: "Development Bench", type: "image", required: true, description: "Component development workbench", fallbackAssetPath: "/images/story/component-development-bench.jpg" },
      { slotKey: "alpine_image", label: "Haute-Savoie Alpine Test", type: "image", required: true, description: "High altitude trail testing", fallbackAssetPath: "/images/story/haute-savoie-alpine-field-test.jpg" },
      { slotKey: "lab_image", label: "Laboratory Stress Test", type: "image", required: true, description: "Fatigue testing rig", fallbackAssetPath: "/images/story/laboratory-stress-fatigue-rig.jpg" },
      { slotKey: "closing_image", label: "Closing Naked Carbon Presentation", type: "image", required: true, description: "Final section carbon presentation", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
    ],
  },
  {
    pageKey: "about_story",
    label: "Origin Story",
    slots: [
      { slotKey: "hero_image", label: "Story Hero", type: "image", required: true, description: "Alpine field test hero photo", fallbackAssetPath: "/images/story/haute-savoie-alpine-field-test.jpg" },
      { slotKey: "workshop_image", label: "Workshop Assembly", type: "image", required: true, description: "Chassis assembly in workshop", fallbackAssetPath: "/images/story/workshop-chassis-assembly.jpg" },
      { slotKey: "riding_history_image", label: "Riding History", type: "image", required: true, description: "Riding history archival photo", fallbackAssetPath: "/images/story/pete-currey-riding-history.jpg" },
      { slotKey: "paddock_image", label: "Paddock Environment", type: "image", required: true, description: "Paddock environment photo", fallbackAssetPath: "/images/story/paddock-environment.jpg" },
      { slotKey: "dialogue_image", label: "Founder Rider Dialogue", type: "image", required: true, description: "Dialogue between founder and rider", fallbackAssetPath: "/images/story/founder-rider-dialogue.jpg" },
      { slotKey: "trade_show_image", label: "Trade Show Presentation", type: "image", required: true, description: "Trade show presentation booth", fallbackAssetPath: "/images/story/trade-show-presentation.jpg" },
      { slotKey: "design_meeting_image", label: "Design Meeting", type: "image", required: true, description: "Engineering design team meeting", fallbackAssetPath: "/images/story/engineering-design-meeting.jpg" },
      { slotKey: "closing_image", label: "Closing Carbon Bike", type: "image", required: true, description: "Closing carbon presentation", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
      { slotKey: "cad_image", label: "Technical CAD Material", type: "image", required: true, description: "CAD material study", fallbackAssetPath: "/images/story/technical-cad-material.jpg" },
      { slotKey: "kinematics_image", label: "Kinematics Analysis", type: "image", required: true, description: "Kinematic dynamics chart", fallbackAssetPath: "/images/story/kinematic-dynamics-analysis.jpg" },
      { slotKey: "carbon_layup_image", label: "Carbon Layup", type: "image", required: true, description: "Carbon layup process", fallbackAssetPath: "/images/story/carbon-layup-development.jpg" },
      { slotKey: "mould_image", label: "Frame Mould", type: "image", required: true, description: "Aluminum frame mould tool", fallbackAssetPath: "/images/story/frame-development-mould.jpg" },
      { slotKey: "integration_image", label: "Complete Machine Integration", type: "image", required: true, description: "Integrated bike machine", fallbackAssetPath: "/images/story/complete-machine-integration.jpg" },
      { slotKey: "prototype_image", label: "Prototype Validation", type: "image", required: true, description: "Prototype build validation", fallbackAssetPath: "/images/story/prototype-build-validation.jpg" },
      { slotKey: "alpine_test_image", label: "Alpine Test Action", type: "image", required: true, description: "Alpine test action photo", fallbackAssetPath: "/images/story/haute-savoie-alpine-field-test.jpg" },
      { slotKey: "trail_action_image", label: "Trail Action", type: "image", required: true, description: "Trail testing action photo", fallbackAssetPath: "/images/story/alpine-trail-testing-action.jpg" },
    ],
  },
  {
    pageKey: "about_build_process",
    label: "Build Process",
    slots: [
      { slotKey: "cad_image_1", label: "CAD Material", type: "image", required: true, description: "CAD material photo", fallbackAssetPath: "/images/story/technical-cad-material.jpg" },
      { slotKey: "carbon_layup_image", label: "Carbon Layup", type: "image", required: true, description: "Carbon layup photo", fallbackAssetPath: "/images/story/carbon-layup-development.jpg" },
      { slotKey: "mould_image", label: "Frame Mould", type: "image", required: true, description: "Frame mould photo", fallbackAssetPath: "/images/story/frame-development-mould.jpg" },
      { slotKey: "white_bike_image", label: "White Bike Presentation", type: "image", required: true, description: "White bike photo", fallbackAssetPath: "/images/story/pete-currey-glacier-white-presentation.jpg" },
      { slotKey: "dialogue_image", label: "Founder Dialogue", type: "image", required: true, description: "Founder dialogue photo", fallbackAssetPath: "/images/story/founder-rider-dialogue.jpg" },
      { slotKey: "kinematics_image", label: "Kinematics Analysis", type: "image", required: true, description: "Kinematics chart photo", fallbackAssetPath: "/images/story/kinematic-dynamics-analysis.jpg" },
      { slotKey: "telemetry_image", label: "Reverse Telemetry", type: "image", required: true, description: "Telemetry telemetry photo", fallbackAssetPath: "/images/story/reverse-engineering-telemetry.jpg" },
      { slotKey: "chassis_review_image", label: "Chassis Review", type: "image", required: true, description: "Chassis engineering review", fallbackAssetPath: "/images/story/chassis-engineering-review.jpg" },
      { slotKey: "black_bike_image", label: "Black Bike Presentation", type: "image", required: true, description: "Black bike photo", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
      { slotKey: "prototype_image", label: "Prototype Validation", type: "image", required: true, description: "Prototype validation photo", fallbackAssetPath: "/images/story/prototype-build-validation.jpg" },
      { slotKey: "workshop_image", label: "Workshop Assembly", type: "image", required: true, description: "Workshop assembly photo", fallbackAssetPath: "/images/story/workshop-chassis-assembly.jpg" },
      { slotKey: "bench_image", label: "Development Bench", type: "image", required: true, description: "Development bench photo", fallbackAssetPath: "/images/story/component-development-bench.jpg" },
      { slotKey: "lab_image", label: "Lab Stress Rig", type: "image", required: true, description: "Lab stress rig photo", fallbackAssetPath: "/images/story/laboratory-stress-fatigue-rig.jpg" },
      { slotKey: "alpine_image", label: "Alpine Test", type: "image", required: true, description: "Alpine test photo", fallbackAssetPath: "/images/story/haute-savoie-alpine-field-test.jpg" },
      { slotKey: "closing_carbon_image", label: "Closing Carbon Layup", type: "image", required: true, description: "Closing carbon layup photo", fallbackAssetPath: "/images/story/carbon-layup-development.jpg" },
    ],
  },
  {
    pageKey: "about_materials",
    label: "Materials & Composites",
    slots: [
      { slotKey: "carbon_layup_image", label: "Carbon Layup", type: "image", required: true, description: "Carbon layup photo", fallbackAssetPath: "/images/story/carbon-layup-development.jpg" },
      { slotKey: "mould_image", label: "Frame Mould", type: "image", required: true, description: "Frame mould photo", fallbackAssetPath: "/images/story/frame-development-mould.jpg" },
      { slotKey: "chassis_image", label: "Chassis Review", type: "image", required: true, description: "Chassis engineering review photo", fallbackAssetPath: "/images/story/chassis-engineering-review.jpg" },
      { slotKey: "bench_image", label: "Development Bench", type: "image", required: true, description: "Development bench photo", fallbackAssetPath: "/images/story/component-development-bench.jpg" },
      { slotKey: "cad_image", label: "CAD Material", type: "image", required: true, description: "Technical CAD photo", fallbackAssetPath: "/images/story/technical-cad-material.jpg" },
      { slotKey: "black_bike_image", label: "Naked Carbon Presentation", type: "image", required: true, description: "Naked carbon presentation photo", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
      { slotKey: "white_bike_image", label: "Glacier White Presentation", type: "image", required: true, description: "Glacier white presentation photo", fallbackAssetPath: "/images/story/pete-currey-glacier-white-presentation.jpg" },
      { slotKey: "lab_image", label: "Laboratory Rig", type: "image", required: true, description: "Laboratory rig photo", fallbackAssetPath: "/images/story/laboratory-stress-fatigue-rig.jpg" },
    ],
  },
  {
    pageKey: "about_philosophy",
    label: "Design Philosophy",
    slots: [
      { slotKey: "white_bike_image", label: "White Bike Presentation", type: "image", required: true, description: "White bike presentation photo", fallbackAssetPath: "/images/story/pete-currey-glacier-white-presentation.jpg" },
      { slotKey: "black_bike_image", label: "Black Bike Presentation", type: "image", required: true, description: "Black bike presentation photo", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
    ],
  },
  {
    pageKey: "about_reverse_engineering",
    label: "Reverse Engineering",
    slots: [
      { slotKey: "black_bike_image", label: "Black Bike Presentation", type: "image", required: true, description: "Black bike presentation photo", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
      { slotKey: "bench_image", label: "Development Bench", type: "image", required: true, description: "Development bench photo", fallbackAssetPath: "/images/story/component-development-bench.jpg" },
      { slotKey: "telemetry_image", label: "Reverse Telemetry", type: "image", required: true, description: "Reverse telemetry photo", fallbackAssetPath: "/images/story/reverse-engineering-telemetry.jpg" },
      { slotKey: "kinematics_image", label: "Kinematics Analysis", type: "image", required: true, description: "Kinematic dynamics photo", fallbackAssetPath: "/images/story/kinematic-dynamics-analysis.jpg" },
      { slotKey: "chassis_image", label: "Chassis Review", type: "image", required: true, description: "Chassis review photo", fallbackAssetPath: "/images/story/chassis-engineering-review.jpg" },
      { slotKey: "workshop_image", label: "Workshop Assembly", type: "image", required: true, description: "Workshop assembly photo", fallbackAssetPath: "/images/story/workshop-chassis-assembly.jpg" },
      { slotKey: "integration_image", label: "Machine Integration", type: "image", required: true, description: "Machine integration photo", fallbackAssetPath: "/images/story/complete-machine-integration.jpg" },
      { slotKey: "mould_image", label: "Frame Mould", type: "image", required: true, description: "Frame mould photo", fallbackAssetPath: "/images/story/frame-development-mould.jpg" },
      { slotKey: "cad_image", label: "CAD Material", type: "image", required: true, description: "CAD material photo", fallbackAssetPath: "/images/story/technical-cad-material.jpg" },
      { slotKey: "closing_black_image", label: "Closing Black Bike", type: "image", required: true, description: "Closing black bike photo", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
      { slotKey: "closing_white_image", label: "Closing White Bike", type: "image", required: true, description: "Closing white bike photo", fallbackAssetPath: "/images/story/pete-currey-glacier-white-presentation.jpg" },
    ],
  },
  {
    pageKey: "about_testing",
    label: "Testing & Validation",
    slots: [
      { slotKey: "lab_image", label: "Laboratory Rig", type: "image", required: true, description: "Laboratory fatigue rig photo", fallbackAssetPath: "/images/story/laboratory-stress-fatigue-rig.jpg" },
      { slotKey: "alpine_image", label: "Alpine Test", type: "image", required: true, description: "Alpine field test photo", fallbackAssetPath: "/images/story/haute-savoie-alpine-field-test.jpg" },
      { slotKey: "telemetry_image", label: "Telemetry", type: "image", required: true, description: "Telemetry photo", fallbackAssetPath: "/images/story/reverse-engineering-telemetry.jpg" },
      { slotKey: "trail_action_image", label: "Trail Action", type: "image", required: true, description: "Trail testing action photo", fallbackAssetPath: "/images/story/alpine-trail-testing-action.jpg" },
      { slotKey: "prototype_image", label: "Prototype Validation", type: "image", required: true, description: "Prototype validation photo", fallbackAssetPath: "/images/story/prototype-build-validation.jpg" },
    ],
  },
  {
    pageKey: "racing",
    label: "Alkota Racing 2027",
    slots: [
      { slotKey: "hero_image", label: "Racing Hero Action", type: "image", required: true, description: "Race action hero photo", fallbackAssetPath: "/images/story/racing-hero-action.jpg" },
      { slotKey: "dialogue_image", label: "Founder Rider Dialogue", type: "image", required: true, description: "Founder and rider dialogue photo", fallbackAssetPath: "/images/story/founder-rider-dialogue.jpg" },
      { slotKey: "trade_show_image", label: "Trade Show Presentation", type: "image", required: true, description: "Trade show presentation photo", fallbackAssetPath: "/images/story/trade-show-presentation.jpg" },
      { slotKey: "prototype_image", label: "Prototype Build", type: "image", required: true, description: "Prototype build photo", fallbackAssetPath: "/images/story/prototype-build-validation.jpg" },
      { slotKey: "white_bike_image", label: "Glacier White Presentation", type: "image", required: true, description: "Glacier white presentation photo", fallbackAssetPath: "/images/story/pete-currey-glacier-white-presentation.jpg" },
      { slotKey: "carbon_bike_image", label: "Naked Carbon Presentation", type: "image", required: true, description: "Naked carbon presentation photo", fallbackAssetPath: "/images/story/pete-currey-naked-carbon-presentation.jpg" },
      { slotKey: "paddock_image", label: "Paddock Environment", type: "image", required: true, description: "Paddock environment photo", fallbackAssetPath: "/images/story/paddock-environment.jpg" },
    ],
  },
  {
    pageKey: "order",
    label: "How to Order / Registration",
    slots: [
      { slotKey: "white_hero_image", label: "White Hero Presentation", type: "image", required: true, description: "White bike hero presentation", fallbackAssetPath: "/images/project01-glacier-white-hero.jpg" },
      { slotKey: "carbon_hero_image", label: "Carbon Hero Presentation", type: "image", required: true, description: "Carbon bike hero presentation", fallbackAssetPath: "/images/project01-naked-carbon-hero.jpg" },
    ],
  },
  {
    pageKey: "configure",
    label: "Configurator",
    slots: [
      { slotKey: "glacier_white_image", label: "Glacier White Hero", type: "image", required: true, description: "Glacier white hero frame photo", fallbackAssetPath: "/images/project01-glacier-white-hero.jpg" },
      { slotKey: "naked_carbon_image", label: "Naked Carbon Hero", type: "image", required: true, description: "Naked carbon hero frame photo", fallbackAssetPath: "/images/project01-naked-carbon-hero.jpg" },
    ],
  },
];

export type PageKey = typeof CMS_REGISTRY[number]['pageKey'];
