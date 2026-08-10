/**
 * ALKOTA PROJECT 01 — BUILD MATRIX
 * 
 * Defines option relationships, standard choices, configurable items, and
 * compatibility rules for the Project 01 pre-production platform.
 */

import { EngineeringStatus } from "./specification";

export interface BuildMatrixItem {
  systemId: string;
  systemName: string;
  isConfigurable: boolean;
  defaultComponentId: string;
  selectableComponentIds: string[];
  status: EngineeringStatus;
  statusText: string;
  notes?: string;
}

export const PROJECT_01_BUILD_MATRIX: BuildMatrixItem[] = [
  {
    systemId: "chassis",
    systemName: "FRAME / CHASSIS",
    isConfigurable: false,
    defaultComponentId: "chassis-p01-carbon",
    selectableComponentIds: ["chassis-p01-carbon"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "Full carbon chassis architecture is fixed for Project 01 platform.",
  },
  {
    systemId: "finish",
    systemName: "LAUNCH FINISH",
    isConfigurable: true,
    defaultComponentId: "finish-carbon",
    selectableComponentIds: ["finish-glacier", "finish-carbon"],
    status: "OPTION",
    statusText: "CONFIGURABLE LAUNCH OPTION",
    notes: "Glacier White architectural painted finish vs. Naked Carbon raw UD finish.",
  },
  {
    systemId: "fork",
    systemName: "FRONT SUSPENSION",
    isConfigurable: true,
    defaultComponentId: "fork-fox38-factory",
    selectableComponentIds: ["fork-fox38-factory", "fork-rockshox-zeb-ultimate"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "FOX 38 Factory 160mm GRIP X2 is baseline. RockShox ZEB Ultimate under engineering review.",
  },
  {
    systemId: "rear-shock",
    systemName: "REAR SUSPENSION",
    isConfigurable: true,
    defaultComponentId: "shock-fox-floatx2-factory",
    selectableComponentIds: ["shock-fox-floatx2-factory", "shock-fox-dhx2-factory"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "FOX FLOAT X2 Factory 205x65 Trunnion is baseline. FOX DHX2 Factory Coil under review.",
  },
  {
    systemId: "brakes-front",
    systemName: "FRONT BRAKE",
    isConfigurable: false,
    defaultComponentId: "brake-front-hope-evov6ti",
    selectableComponentIds: ["brake-front-hope-evov6ti"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "Hope EVO V6Ti 6-piston titanium hardware front brake.",
  },
  {
    systemId: "brakes-rear",
    systemName: "REAR BRAKE",
    isConfigurable: false,
    defaultComponentId: "brake-rear-hope-tr4",
    selectableComponentIds: ["brake-rear-hope-tr4"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "Hope TR4 4-piston CNC rear brake.",
  },
  {
    systemId: "wheels",
    systemName: "WHEELSET",
    isConfigurable: false,
    defaultComponentId: "wheels-dt-swiss-exc1200",
    selectableComponentIds: ["wheels-dt-swiss-exc1200"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "DT Swiss EXC 1200 carbon 29\" wheelset.",
  },
  {
    systemId: "tyres-front",
    systemName: "FRONT TYRE",
    isConfigurable: false,
    defaultComponentId: "tyre-front-maxxis-assegai",
    selectableComponentIds: ["tyre-front-maxxis-assegai"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "Maxxis Assegai 29 x 2.5 MaxTerra Exo+.",
  },
  {
    systemId: "tyres-rear",
    systemName: "REAR TYRE",
    isConfigurable: false,
    defaultComponentId: "tyre-rear-maxxis-minionDHR",
    selectableComponentIds: ["tyre-rear-maxxis-minionDHR"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "Maxxis Minion DHR II 29 x 2.4 MaxTerra Exo+ Tan Wall.",
  },
  {
    systemId: "drivetrain",
    systemName: "DRIVETRAIN",
    isConfigurable: false,
    defaultComponentId: "drivetrain-sram-xx-eagle-axs",
    selectableComponentIds: ["drivetrain-sram-xx-eagle-axs"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "SRAM XX Eagle AXS Transmission hangerless Full Mount.",
  },
  {
    systemId: "cockpit",
    systemName: "HANDLEBAR",
    isConfigurable: false,
    defaultComponentId: "cockpit-renthal-fatbar-carbon",
    selectableComponentIds: ["cockpit-renthal-fatbar-carbon"],
    status: "DEVELOPMENT_BASELINE",
    statusText: "DEVELOPMENT BASELINE",
    notes: "Renthal Fatbar Carbon 35mm / 800mm width.",
  },
  {
    systemId: "grips",
    systemName: "GRIPS",
    isConfigurable: false,
    defaultComponentId: "grips-ergon-ge1-evo",
    selectableComponentIds: ["grips-ergon-ge1-evo"],
    status: "UNDER_REVIEW",
    statusText: "UNDER ENGINEERING REVIEW",
    notes: "Ergon GE1 Evo enduro grips.",
  },
];

export function getBuildMatrix(): BuildMatrixItem[] {
  return PROJECT_01_BUILD_MATRIX;
}
