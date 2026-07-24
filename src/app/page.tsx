import { readFileSync } from "fs";
import { join } from "path";
import ClientPage from "./client-page";

function readTinaFile<T>(collection: string, file: string): { data: Record<string, T>; query: string; variables: Record<string, unknown> } | null {
  try {
    const content = JSON.parse(readFileSync(join(process.cwd(), "content", collection, file), "utf-8"));
    return { data: { [collection]: content }, query: "", variables: {} };
  } catch {
    return null;
  }
}

export default async function Home() {
  const blocks = {
    hero: readTinaFile("home", "hero.json"),
    about: readTinaFile("home", "about.json"),
    kpRating: readTinaFile("home", "kpRating.json"),
    franchise: readTinaFile("home", "franchise.json"),
    marketBlock: readTinaFile("home", "marketBlock.json"),
    trustModel: readTinaFile("home", "trustModel.json"),
    roadmap: readTinaFile("home", "roadmap.json"),
    caseStudies: readTinaFile("home", "caseStudies.json"),
    faq: readTinaFile("home", "faq.json"),
    contacts: readTinaFile("home", "contacts.json"),
    stores: readTinaFile("home", "stores.json"),
  };

  return <ClientPage blocks={blocks} />;
}