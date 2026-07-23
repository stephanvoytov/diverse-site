export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HeroPartsFragmentDoc = gql`
    fragment HeroParts on Hero {
  __typename
  tagline
  heading
  description
  pricing
  cta {
    __typename
    consultation
    cases
  }
  stats {
    __typename
    value
    label
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  eyebrow
  headingBefore
  headingAccent
  headingAfter
  body
  links {
    __typename
    about
    collection
  }
}
    `;
export const FranchisePartsFragmentDoc = gql`
    fragment FranchiseParts on Franchise {
  __typename
  eyebrow
  heading
  desc
  cta
  labels {
    __typename
    investment
    profitMonth
  }
  links {
    __typename
    allConditions
    example
  }
  disclaimer
}
    `;
export const MarketBlockPartsFragmentDoc = gql`
    fragment MarketBlockParts on MarketBlock {
  __typename
  eyebrow
  headingBefore
  headingAccent
  desc
  reasons
}
    `;
export const TrustModelPartsFragmentDoc = gql`
    fragment TrustModelParts on TrustModel {
  __typename
  eyebrow
  headingBefore
  headingAccent
  desc
}
    `;
export const RoadmapPartsFragmentDoc = gql`
    fragment RoadmapParts on Roadmap {
  __typename
  eyebrow
  headingBefore
  headingAccent
  desc
}
    `;
export const CaseStudiesPartsFragmentDoc = gql`
    fragment CaseStudiesParts on CaseStudies {
  __typename
  eyebrow
  headingBefore
  headingAccent
  desc
  labels {
    __typename
    payback
    profitMonth
    investment
    video
    photo
  }
  openedPrefix
  openedSuffix
}
    `;
export const FaqPartsFragmentDoc = gql`
    fragment FaqParts on Faq {
  __typename
  eyebrow
  headingBefore
  headingAccent
  desc
}
    `;
export const ContactsPartsFragmentDoc = gql`
    fragment ContactsParts on Contacts {
  __typename
  eyebrow
  heading
  desc
  form {
    __typename
    name
    namePlaceholder
    phone
    phonePlaceholder
    format
    formatPlaceholder
    message
    messagePlaceholder
    submit
    submitting
    submitted
    success
    error
    telegram
    or
    mail
    leadQueueFallback
  }
  company {
    __typename
    name
    inn
    address
  }
  sections {
    __typename
    details
    contacts
    socials
  }
  privacy
}
    `;
export const StoresPartsFragmentDoc = gql`
    fragment StoresParts on Stores {
  __typename
  eyebrow
  heading
  desc
  ghost {
    __typename
    label
    tooltip
    sidebarYourCity
    sidebarCTA
    sidebarSubtext
  }
}
    `;
export const KpRatingPartsFragmentDoc = gql`
    fragment KpRatingParts on KpRating {
  __typename
  eyebrow
  headingAccent
  headingAfter
  desc
  badge {
    __typename
    rank
    label
  }
  body
  cta
  source
  imageAlt
}
    `;
export const PageAboutPartsFragmentDoc = gql`
    fragment PageAboutParts on PageAbout {
  __typename
  heroEyebrow
  heroHeading
  heroDesc
  stats {
    __typename
    num
    suffix
    label
    accent
  }
  philosophyEyebrow
  philosophyHeading
  philosophyBody1
  philosophyBody2
  advantagesEyebrow
  advantagesHeading
  advantages {
    __typename
    title
    desc
  }
  timelineEyebrow
  timelineHeading
  milestones {
    __typename
    year
    title
    desc
  }
  repEyebrow
  repHeading
  repBody
  repInn
  repAddress
  ctaHeading
  ctaButton
}
    `;
export const PageFranchisePartsFragmentDoc = gql`
    fragment PageFranchiseParts on PageFranchise {
  __typename
  heroEyebrow
  heroHeading
  heroDesc
  plansEyebrow
  plansDesc
  plansHeading
  comparisonEyebrow
  comparisonHeading
  financialEyebrow
  financialDesc
  financialHeading
  financialRows {
    __typename
    label
    value
    detail
    accent
  }
  seasonalityNote
  benefitsEyebrow
  benefitsHeading
  galleryEyebrow
  galleryHeading
  contactHeading
  contactDesc
}
    `;
export const PageCollectionPartsFragmentDoc = gql`
    fragment PageCollectionParts on PageCollection {
  __typename
  heroEyebrow
  heroHeading
  heroDesc
  ctaEyebrow
  ctaHeading
  ctaDesc
  ctaButton
}
    `;
export const PageStoresPartsFragmentDoc = gql`
    fragment PageStoresParts on PageStores {
  __typename
  heroEyebrow
  heroHeading
  heroDesc
  storesEyebrow
  storesDesc
  storesHeading
  ctaHeading
  ctaDesc
  ctaButton
}
    `;
export const HeroDocument = gql`
    query hero($relativePath: String!) {
  hero(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HeroParts
  }
}
    ${HeroPartsFragmentDoc}`;
export const HeroConnectionDocument = gql`
    query heroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HeroFilter) {
  heroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HeroParts
      }
    }
  }
}
    ${HeroPartsFragmentDoc}`;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const FranchiseDocument = gql`
    query franchise($relativePath: String!) {
  franchise(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FranchiseParts
  }
}
    ${FranchisePartsFragmentDoc}`;
export const FranchiseConnectionDocument = gql`
    query franchiseConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FranchiseFilter) {
  franchiseConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FranchiseParts
      }
    }
  }
}
    ${FranchisePartsFragmentDoc}`;
export const MarketBlockDocument = gql`
    query marketBlock($relativePath: String!) {
  marketBlock(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...MarketBlockParts
  }
}
    ${MarketBlockPartsFragmentDoc}`;
export const MarketBlockConnectionDocument = gql`
    query marketBlockConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: MarketBlockFilter) {
  marketBlockConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...MarketBlockParts
      }
    }
  }
}
    ${MarketBlockPartsFragmentDoc}`;
export const TrustModelDocument = gql`
    query trustModel($relativePath: String!) {
  trustModel(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TrustModelParts
  }
}
    ${TrustModelPartsFragmentDoc}`;
export const TrustModelConnectionDocument = gql`
    query trustModelConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TrustModelFilter) {
  trustModelConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TrustModelParts
      }
    }
  }
}
    ${TrustModelPartsFragmentDoc}`;
export const RoadmapDocument = gql`
    query roadmap($relativePath: String!) {
  roadmap(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...RoadmapParts
  }
}
    ${RoadmapPartsFragmentDoc}`;
export const RoadmapConnectionDocument = gql`
    query roadmapConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: RoadmapFilter) {
  roadmapConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...RoadmapParts
      }
    }
  }
}
    ${RoadmapPartsFragmentDoc}`;
export const CaseStudiesDocument = gql`
    query caseStudies($relativePath: String!) {
  caseStudies(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CaseStudiesParts
  }
}
    ${CaseStudiesPartsFragmentDoc}`;
export const CaseStudiesConnectionDocument = gql`
    query caseStudiesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CaseStudiesFilter) {
  caseStudiesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CaseStudiesParts
      }
    }
  }
}
    ${CaseStudiesPartsFragmentDoc}`;
export const FaqDocument = gql`
    query faq($relativePath: String!) {
  faq(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FaqParts
  }
}
    ${FaqPartsFragmentDoc}`;
export const FaqConnectionDocument = gql`
    query faqConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FaqFilter) {
  faqConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FaqParts
      }
    }
  }
}
    ${FaqPartsFragmentDoc}`;
export const ContactsDocument = gql`
    query contacts($relativePath: String!) {
  contacts(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactsParts
  }
}
    ${ContactsPartsFragmentDoc}`;
export const ContactsConnectionDocument = gql`
    query contactsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactsFilter) {
  contactsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactsParts
      }
    }
  }
}
    ${ContactsPartsFragmentDoc}`;
export const StoresDocument = gql`
    query stores($relativePath: String!) {
  stores(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...StoresParts
  }
}
    ${StoresPartsFragmentDoc}`;
export const StoresConnectionDocument = gql`
    query storesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: StoresFilter) {
  storesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...StoresParts
      }
    }
  }
}
    ${StoresPartsFragmentDoc}`;
export const KpRatingDocument = gql`
    query kpRating($relativePath: String!) {
  kpRating(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...KpRatingParts
  }
}
    ${KpRatingPartsFragmentDoc}`;
export const KpRatingConnectionDocument = gql`
    query kpRatingConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: KpRatingFilter) {
  kpRatingConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...KpRatingParts
      }
    }
  }
}
    ${KpRatingPartsFragmentDoc}`;
export const PageAboutDocument = gql`
    query pageAbout($relativePath: String!) {
  pageAbout(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageAboutParts
  }
}
    ${PageAboutPartsFragmentDoc}`;
export const PageAboutConnectionDocument = gql`
    query pageAboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageAboutFilter) {
  pageAboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageAboutParts
      }
    }
  }
}
    ${PageAboutPartsFragmentDoc}`;
export const PageFranchiseDocument = gql`
    query pageFranchise($relativePath: String!) {
  pageFranchise(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageFranchiseParts
  }
}
    ${PageFranchisePartsFragmentDoc}`;
export const PageFranchiseConnectionDocument = gql`
    query pageFranchiseConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFranchiseFilter) {
  pageFranchiseConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageFranchiseParts
      }
    }
  }
}
    ${PageFranchisePartsFragmentDoc}`;
export const PageCollectionDocument = gql`
    query pageCollection($relativePath: String!) {
  pageCollection(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageCollectionParts
  }
}
    ${PageCollectionPartsFragmentDoc}`;
export const PageCollectionConnectionDocument = gql`
    query pageCollectionConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageCollectionFilter) {
  pageCollectionConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageCollectionParts
      }
    }
  }
}
    ${PageCollectionPartsFragmentDoc}`;
export const PageStoresDocument = gql`
    query pageStores($relativePath: String!) {
  pageStores(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageStoresParts
  }
}
    ${PageStoresPartsFragmentDoc}`;
export const PageStoresConnectionDocument = gql`
    query pageStoresConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageStoresFilter) {
  pageStoresConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageStoresParts
      }
    }
  }
}
    ${PageStoresPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    hero(variables, options) {
      return requester(HeroDocument, variables, options);
    },
    heroConnection(variables, options) {
      return requester(HeroConnectionDocument, variables, options);
    },
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    franchise(variables, options) {
      return requester(FranchiseDocument, variables, options);
    },
    franchiseConnection(variables, options) {
      return requester(FranchiseConnectionDocument, variables, options);
    },
    marketBlock(variables, options) {
      return requester(MarketBlockDocument, variables, options);
    },
    marketBlockConnection(variables, options) {
      return requester(MarketBlockConnectionDocument, variables, options);
    },
    trustModel(variables, options) {
      return requester(TrustModelDocument, variables, options);
    },
    trustModelConnection(variables, options) {
      return requester(TrustModelConnectionDocument, variables, options);
    },
    roadmap(variables, options) {
      return requester(RoadmapDocument, variables, options);
    },
    roadmapConnection(variables, options) {
      return requester(RoadmapConnectionDocument, variables, options);
    },
    caseStudies(variables, options) {
      return requester(CaseStudiesDocument, variables, options);
    },
    caseStudiesConnection(variables, options) {
      return requester(CaseStudiesConnectionDocument, variables, options);
    },
    faq(variables, options) {
      return requester(FaqDocument, variables, options);
    },
    faqConnection(variables, options) {
      return requester(FaqConnectionDocument, variables, options);
    },
    contacts(variables, options) {
      return requester(ContactsDocument, variables, options);
    },
    contactsConnection(variables, options) {
      return requester(ContactsConnectionDocument, variables, options);
    },
    stores(variables, options) {
      return requester(StoresDocument, variables, options);
    },
    storesConnection(variables, options) {
      return requester(StoresConnectionDocument, variables, options);
    },
    kpRating(variables, options) {
      return requester(KpRatingDocument, variables, options);
    },
    kpRatingConnection(variables, options) {
      return requester(KpRatingConnectionDocument, variables, options);
    },
    pageAbout(variables, options) {
      return requester(PageAboutDocument, variables, options);
    },
    pageAboutConnection(variables, options) {
      return requester(PageAboutConnectionDocument, variables, options);
    },
    pageFranchise(variables, options) {
      return requester(PageFranchiseDocument, variables, options);
    },
    pageFranchiseConnection(variables, options) {
      return requester(PageFranchiseConnectionDocument, variables, options);
    },
    pageCollection(variables, options) {
      return requester(PageCollectionDocument, variables, options);
    },
    pageCollectionConnection(variables, options) {
      return requester(PageCollectionConnectionDocument, variables, options);
    },
    pageStores(variables, options) {
      return requester(PageStoresDocument, variables, options);
    },
    pageStoresConnection(variables, options) {
      return requester(PageStoresConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/91229f05-3466-4894-8fa8-49ad837cf35b/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
