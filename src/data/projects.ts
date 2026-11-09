export interface Project {
  name: string;
  summary: string;
  tags: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "Hills Ahead",
    summary:
      "An illustrated road-trip app for the back seat. It shows the hills and climbs coming up on the drive, so passengers can see what's ahead. Built and published under Hyphen Labs LLC.",
    tags: ["Mobile", "Elevation data", "Hyphen Labs"],
    links: [{ label: "hyphenlabsllc.com", href: "https://hyphenlabsllc.com" }],
    featured: true,
  },
  {
    name: "ahtocsv.com",
    summary:
      "A private Apple Health to CSV converter. It streams an Apple Health export in the browser and writes one CSV per selected metric. Nothing is uploaded.",
    tags: ["Static site", "Streaming parser", "Privacy"],
    links: [{ label: "ahtocsv.com", href: "https://ahtocsv.com" }],
    featured: true,
  },
  {
    name: "api-sports-kotlin",
    summary:
      "Unofficial Kotlin client libraries for the API-SPORTS APIs, starting with API-NBA. Typed models, a generated parameter DSL, and errors surfaced as exceptions. Published to Maven Central.",
    tags: ["Kotlin", "Ktor", "kotlinx.serialization", "KSP", "Dokka", "Gradle"],
    links: [
      { label: "GitHub", href: "https://github.com/mille5a9/api-sports-kotlin" },
      {
        label: "Maven Central",
        href: "https://central.sonatype.com/artifact/io.github.mille5a9/api-nba-kotlin",
      },
    ],
    featured: true,
  },
  {
    name: "Hyphen Console",
    summary:
      "A self-hosted console for an indie developer with apps on the App Store and Google Play. It hosts test builds, health-checks backends, and tracks reviews and store vitals, with email alerts and a weekly digest. It has no runtime dependencies beyond Node built-ins.",
    tags: ["TypeScript", "Node", "SQLite", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/mille5a9/hyphen-console" }],
  },
  {
    name: "Discord bots",
    summary:
      "Bots for a friends' Discord server and for server administration, split into gRPC and Protobuf microservices backed by MongoDB, with Docker and GitHub Actions CI.",
    tags: ["Kotlin", "gRPC", "MongoDB", "Docker"],
    links: [
      { label: "waambookt", href: "https://github.com/mille5a9/waambookt" },
      { label: "pepper", href: "https://github.com/mille5a9/pepper" },
    ],
  },
  {
    name: "Compiler",
    summary:
      "A compiler written for EECS 6083, Compiler Theory, at the University of Cincinnati.",
    tags: ["Coursework"],
    links: [{ label: "GitHub", href: "https://github.com/mille5a9/compiler" }],
  },
];
