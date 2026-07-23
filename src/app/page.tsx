import { client } from "../../tina/__generated__/client";
import ClientPage from "./client-page";

export default async function Home() {
  const [hero, about, kpRating, franchise, marketBlock, trustModel, roadmap, caseStudies, faq, contacts, stores] =
    await Promise.allSettled([
      client.queries.home({ relativePath: "hero.json" }),
      client.queries.home({ relativePath: "about.json" }),
      client.queries.home({ relativePath: "kpRating.json" }),
      client.queries.home({ relativePath: "franchise.json" }),
      client.queries.home({ relativePath: "marketBlock.json" }),
      client.queries.home({ relativePath: "trustModel.json" }),
      client.queries.home({ relativePath: "roadmap.json" }),
      client.queries.home({ relativePath: "caseStudies.json" }),
      client.queries.home({ relativePath: "faq.json" }),
      client.queries.home({ relativePath: "contacts.json" }),
      client.queries.home({ relativePath: "stores.json" }),
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