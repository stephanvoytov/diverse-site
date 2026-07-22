import { client } from "../../tina/__generated__/client";
import ClientPage from "./client-page";

export default async function Home() {
  const [hero, about, kpRating, franchise, marketBlock, trustModel, roadmap, caseStudies, faq, contacts, stores] =
    await Promise.allSettled([
      client.queries.hero({ relativePath: "hero.json" }),
      client.queries.about({ relativePath: "about.json" }),
      client.queries.kpRating({ relativePath: "kpRating.json" }),
      client.queries.franchise({ relativePath: "franchise.json" }),
      client.queries.marketBlock({ relativePath: "marketBlock.json" }),
      client.queries.trustModel({ relativePath: "trustModel.json" }),
      client.queries.roadmap({ relativePath: "roadmap.json" }),
      client.queries.caseStudies({ relativePath: "caseStudies.json" }),
      client.queries.faq({ relativePath: "faq.json" }),
      client.queries.contacts({ relativePath: "contacts.json" }),
      client.queries.stores({ relativePath: "stores.json" }),
    ]);

  function getResult<T>(result: PromiseSettledResult<T>): T | null {
    return result.status === "fulfilled" ? result.value : null;
  }

  return (
    <ClientPage
      blocks={{
        hero: getResult(hero),
        about: getResult(about),
        kpRating: getResult(kpRating),
        franchise: getResult(franchise),
        marketBlock: getResult(marketBlock),
        trustModel: getResult(trustModel),
        roadmap: getResult(roadmap),
        caseStudies: getResult(caseStudies),
        faq: getResult(faq),
        contacts: getResult(contacts),
        stores: getResult(stores),
      }}
    />
  );
}
