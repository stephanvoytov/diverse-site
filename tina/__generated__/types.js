export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomePartsFragmentDoc = gql`
    fragment HomeParts on Home {
  __typename
  ... on HomeHomeHero {
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
  ... on HomeHomeAbout {
    eyebrow
    headingBefore
    headingAccent
    headingAfter
    body
    aboutLinks {
      __typename
      about
      collection
    }
  }
  ... on HomeHomeFranchise {
    eyebrow
    heading
    desc
    ctaButton
    franchiseLabels {
      __typename
      investment
      profitMonth
    }
    franchiseLinks {
      __typename
      allConditions
      example
    }
    disclaimer
  }
  ... on HomeHomeMarketBlock {
    eyebrow
    headingBefore
    headingAccent
    desc
    reasons
  }
  ... on HomeHomeTrustModel {
    eyebrow
    headingBefore
    headingAccent
    desc
  }
  ... on HomeHomeRoadmap {
    eyebrow
    headingBefore
    headingAccent
    desc
  }
  ... on HomeHomeCaseStudies {
    eyebrow
    headingBefore
    headingAccent
    desc
    caseLabels {
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
  ... on HomeHomeFaq {
    eyebrow
    headingBefore
    headingAccent
    desc
  }
  ... on HomeHomeContacts {
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
  ... on HomeHomeStores {
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
  ... on HomeHomeKpRating {
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
    ctaLink
    source
    imageAlt
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  ... on AboutAboutHero {
    heroEyebrow
    heroHeading
    heroDesc
  }
  ... on AboutAboutStats {
    stats {
      __typename
      num
      suffix
      label
      accent
    }
  }
  ... on AboutAboutPhilosophy {
    philosophyEyebrow
    philosophyHeading
    philosophyBody1
    philosophyBody2
  }
  ... on AboutAboutAdvantages {
    advantagesEyebrow
    advantagesHeading
    advantages {
      __typename
      title
      desc
    }
  }
  ... on AboutAboutTimeline {
    timelineEyebrow
    timelineHeading
    milestones {
      __typename
      year
      title
      desc
    }
  }
  ... on AboutAboutRepresentative {
    repEyebrow
    repHeading
    repBody
    repInn
    repAddress
  }
  ... on AboutAboutCta {
    ctaHeading
    ctaButton
  }
}
    `;
export const FranchisePartsFragmentDoc = gql`
    fragment FranchiseParts on Franchise {
  __typename
  ... on FranchiseFranchiseHero {
    heroEyebrow
    heroHeading
    heroDesc
  }
  ... on FranchiseFranchisePlans {
    plansEyebrow
    plansDesc
    plansHeading
  }
  ... on FranchiseFranchiseComparison {
    comparisonEyebrow
    comparisonHeading
  }
  ... on FranchiseFranchiseFinancial {
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
  }
  ... on FranchiseFranchiseBenefits {
    benefitsEyebrow
    benefitsHeading
  }
  ... on FranchiseFranchiseGallery {
    galleryEyebrow
    galleryHeading
  }
  ... on FranchiseFranchiseContact {
    contactHeading
    contactDesc
  }
}
    `;
export const PageCollectionsPartsFragmentDoc = gql`
    fragment PageCollectionsParts on PageCollections {
  __typename
  ... on PageCollectionsCollectionHero {
    heroEyebrow
    heroHeading
    heroDesc
  }
  ... on PageCollectionsCollectionCta {
    ctaEyebrow
    ctaHeading
    ctaDesc
    ctaButton
  }
}
    `;
export const StoresPartsFragmentDoc = gql`
    fragment StoresParts on Stores {
  __typename
  ... on StoresStoresHero {
    heroEyebrow
    heroHeading
    heroDesc
  }
  ... on StoresStoresList {
    storesEyebrow
    storesDesc
    storesHeading
  }
  ... on StoresStoresCta {
    ctaHeading
    ctaDesc
    ctaButton
  }
}
    `;
export const HomeDocument = gql`
    query home($relativePath: String!) {
  home(relativePath: $relativePath) {
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
    ...HomeParts
  }
}
    ${HomePartsFragmentDoc}`;
export const HomeConnectionDocument = gql`
    query homeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeFilter) {
  homeConnection(
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
        ...HomeParts
      }
    }
  }
}
    ${HomePartsFragmentDoc}`;
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
export const PageCollectionsDocument = gql`
    query pageCollections($relativePath: String!) {
  pageCollections(relativePath: $relativePath) {
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
    ...PageCollectionsParts
  }
}
    ${PageCollectionsPartsFragmentDoc}`;
export const PageCollectionsConnectionDocument = gql`
    query pageCollectionsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageCollectionsFilter) {
  pageCollectionsConnection(
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
        ...PageCollectionsParts
      }
    }
  }
}
    ${PageCollectionsPartsFragmentDoc}`;
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
export function getSdk(requester) {
  return {
    home(variables, options) {
      return requester(HomeDocument, variables, options);
    },
    homeConnection(variables, options) {
      return requester(HomeConnectionDocument, variables, options);
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
    pageCollections(variables, options) {
      return requester(PageCollectionsDocument, variables, options);
    },
    pageCollectionsConnection(variables, options) {
      return requester(PageCollectionsConnectionDocument, variables, options);
    },
    stores(variables, options) {
      return requester(StoresDocument, variables, options);
    },
    storesConnection(variables, options) {
      return requester(StoresConnectionDocument, variables, options);
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
