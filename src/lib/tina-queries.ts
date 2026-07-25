/* ============================================================
   tina-queries.ts — хелпер для визуального редактирования TinaCMS
   Связывает прямые JSON-read с GraphQL-запросами для useTina.
   ============================================================ */

import {
  HomeDocument,
  AboutDocument,
  FranchiseDocument,
  PageCollectionsDocument,
  StoresDocument,
} from "../../tina/__generated__/types.js";

/** Маппинг коллекций → query-документы */
const QUERY_MAP: Record<string, string> = {
  home: HomeDocument,
  about: AboutDocument,
  franchise: FranchiseDocument,
  pageCollections: PageCollectionsDocument,
  stores: StoresDocument,
};

/**
 * Возвращает query + variables для useTina на основе коллекции и файла.
 * @param collection — имя коллекции (home, about, franchise, ...)
 * @param file — имя файла (hero.json, about.json, ...)
 */
export function getTinaQuery(
  collection: string,
  file: string,
): { query: string; variables: Record<string, unknown> } {
  const query = QUERY_MAP[collection];

  if (!query) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[tina-queries] Unknown collection "${collection}", visual editing won't work for this block. Available: ${Object.keys(QUERY_MAP).join(", ")}`,
      );
    }
    return { query: "", variables: {} };
  }

  return {
    query,
    variables: { relativePath: file },
  };
}

/** Тип результата readTinaFile для совместимости с useTina */
export interface TinaResult<T = Record<string, unknown>> {
  data: Record<string, T>;
  query: string;
  variables: Record<string, unknown>;
}
