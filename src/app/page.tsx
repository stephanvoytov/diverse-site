import { readFileSync } from "fs";
import { join } from "path";
import ClientPage from "./client-page";
import { getTinaQuery, type TinaResult } from "@/lib/tina-queries";

function readTinaFile<T>(collection: string, file: string): TinaResult<T> | null {
  try {
    const content = JSON.parse(readFileSync(join(process.cwd(), "content", collection, file), "utf-8"));
    const { query, variables } = getTinaQuery(collection, file);
    return { data: { [collection]: content }, query, variables };
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
    partners: readTinaFile("home", "partners.json"),
    footer: readTinaFile("home", "footer.json"),
  };

  return <ClientPage blocks={blocks} />;
}