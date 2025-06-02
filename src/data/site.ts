import {
  BarChart3,
  BookText,
  Compass,
  FolderCheck,
  MapPin,
  Search,
} from "lucide-react";

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Tool",
    href: "/tool",
  },
];

export const FOOTER_LINKS = [
  {
    label: "Tool",
    href: "/tool",
  },
  {
    label: "Read Paper",
    href: "#",
    isExternal: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/gauravfs-14/pedeval-pedsafe",
    isExternal: true,
  },
];

export const PAPER_LINK = "#";

export const SITE_CONFIG = {
  name: "PEDEVAL",
  expanded_name: "Pedestrian Element Development Evaluation and Analysis",
  description:
    "Explore critical insights into pedestrian-related transportation projects and crash incidents across Texas. This interactive tool brings together comprehensive datasets to support research, advocacy, and planning for safer streets.",
};

export const HERO_CTAS = [
  {
    label: "Explore the Tool",
    href: "/tool",
    icon: Compass,
    type: "primary",
  },
  {
    label: "Read the Paper",
    href: "#",
    icon: BookText,
    isExternal: true,
    type: "secondary",
  },
];

export const HOME_SECTIONS = [
  {
    type: "features",
    title: "Explore Our Features",
    description: `${SITE_CONFIG.name} brings together pedestrian project insights and crash analytics in one powerful, easy-to-navigate platform.`,
  },
  {
    type: "faq",
    title: "Learn more about " + SITE_CONFIG.name,
    description:
      "Explore the most frequently asked questions to understand the purpose, data sources, and impact of this pedestrian-focused research platform.",
  },
  {
    type: "cta",
    title: "Ready to Dive Deeper?",
    description:
      "Read our comprehensive research paper detailing the methodologies, findings, and implications of the PEDEVAL project. This document provides in-depth insights into pedestrian safety analysis and project evaluation across Texas.",
  },
];

export const TOOL_FEATURES = [
  {
    title: "Explore Critical Crash Insights",
    description:
      "Gain visibility into pedestrian-focused transportation infrastructure and crash trends across Texas. Filter by region, severity, year, and more — all from an intuitive dashboard.",
    icon: Search,
  },
  {
    title: "Map-Centric Visualization",
    description:
      "Interactive, high-performance maps help you explore TxDOT projects and crash incidents with geospatial clarity. Zoom in on local neighborhoods or get a statewide view instantly.",
    icon: MapPin,
  },
  {
    title: "Linked Crash + Project Data",
    description:
      "PEDEVAL is the only tool that shows both crash data and project investments side-by-side. Understand gaps, trends, and areas in need of attention — all in one interface.",
    icon: BarChart3,
  },
  {
    title: "Open, Extensible, Research-Ready",
    description:
      "All data used is open source and exportable. Whether you're a student, policymaker, or data scientist, PEDEVAL is built for transparency, reproducibility, and practical use.",
    icon: FolderCheck,
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is PEDEVAL?",
    answer:
      "PEDEVAL (Pedestrian Element Development Evaluation and Analysis) is an interactive research tool designed to visualize and analyze pedestrian-related transportation projects and crash data across Texas. It supports planners, researchers, and advocates working to improve pedestrian safety and infrastructure.",
  },
  {
    question: "What kind of data does PEDEVAL use?",
    answer:
      "PEDEVAL integrates data from official sources, including Texas Department of Transportation (TxDOT) pedestrian-related project funding records and CRIS crash datasets. The data is curated and transformed into an interactive format for deeper analysis.",
  },
  {
    question: "Who can benefit from using PEDEVAL?",
    answer:
      "City planners, policymakers, researchers, safety advocates, students, and the general public can all benefit from PEDEVAL’s insights. It is especially useful for identifying high-risk areas, evaluating investment patterns, and supporting data-driven pedestrian safety strategies.",
  },
  {
    question: "Is the data up to date and open source?",
    answer:
      "PEDEVAL is open-source and updated regularly with the latest available datasets. All source code and data transformation processes are documented and accessible via our GitHub repository to ensure transparency and reproducibility.",
  },
];
