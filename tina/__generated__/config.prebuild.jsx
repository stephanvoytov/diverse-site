// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.NEXT_PUBLIC_TINA_TOKEN,
  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      /* ==================================================================
         COLLECTION: Главная (home)
         ================================================================== */
      {
        name: "home",
        label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F",
        path: "content/home",
        format: "json",
        ui: { router: () => "/" },
        templates: [
          {
            name: "homeHero",
            label: "Hero (\u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D)",
            fields: [
              { type: "string", name: "tagline", label: "\u0422\u044D\u0433\u043B\u0430\u0439\u043D" },
              { type: "string", name: "heading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (H1)" },
              { type: "string", name: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
              { type: "string", name: "pricing", label: "\u0426\u0435\u043D\u0430 (\u0441\u0442\u0440\u043E\u043A\u0430)" },
              {
                type: "object",
                name: "cta",
                label: "\u041A\u043D\u043E\u043F\u043A\u0438",
                fields: [
                  { type: "string", name: "consultation", label: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E" },
                  { type: "string", name: "cases", label: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0435\u0439\u0441\u044B" }
                ]
              },
              {
                type: "object",
                name: "stats",
                label: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
                list: true,
                fields: [
                  { type: "string", name: "value", label: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435" },
                  { type: "string", name: "label", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C" }
                ]
              }
            ]
          },
          {
            name: "homeAbout",
            label: "About (\u041E \u0431\u0440\u0435\u043D\u0434\u0435)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
              { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
              { type: "string", name: "headingAfter", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u043F\u043E\u0441\u043B\u0435 \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
              { type: "string", name: "body", label: "\u0422\u0435\u043A\u0441\u0442", ui: { component: "textarea" } },
              {
                type: "object",
                name: "aboutLinks",
                label: "\u0421\u0441\u044B\u043B\u043A\u0438",
                fields: [
                  { type: "string", name: "about", label: "\u041E \u0431\u0440\u0435\u043D\u0434\u0435" },
                  { type: "string", name: "collection", label: "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438" }
                ]
              }
            ]
          },
          {
            name: "homeFranchise",
            label: "Franchise (\u0424\u0440\u0430\u043D\u0448\u0438\u0437\u0430 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u043E\u0439)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "heading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              { type: "string", name: "ctaButton", label: "\u041A\u043D\u043E\u043F\u043A\u0430 CTA" },
              {
                type: "object",
                name: "franchiseLabels",
                label: "\u041F\u043E\u0434\u043F\u0438\u0441\u0438 \u043A \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u043C",
                fields: [
                  { type: "string", name: "investment", label: "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438" },
                  { type: "string", name: "profitMonth", label: "\u041F\u0440\u0438\u0431\u044B\u043B\u044C / \u043C\u0435\u0441" }
                ]
              },
              {
                type: "object",
                name: "franchiseLinks",
                label: "\u0421\u0441\u044B\u043B\u043A\u0438 \u043F\u043E\u0434 CTA",
                fields: [
                  { type: "string", name: "allConditions", label: "\u0412\u0441\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0444\u0440\u0430\u043D\u0448\u0438\u0437\u044B" },
                  { type: "string", name: "example", label: "\u041F\u0440\u0438\u043C\u0435\u0440 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430" }
                ]
              },
              { type: "string", name: "disclaimer", label: "\u0414\u0438\u0441\u043A\u043B\u0435\u0439\u043C\u0435\u0440", ui: { component: "textarea" } }
            ]
          },
          {
            name: "homeMarketBlock",
            label: "MarketBlock (\u041F\u043E\u0447\u0435\u043C\u0443 \u0441\u0435\u0439\u0447\u0430\u0441)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
              { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              {
                type: "string",
                name: "reasons",
                label: "\u041F\u0440\u0438\u0447\u0438\u043D\u044B",
                list: true,
                ui: { component: "textarea" }
              }
            ]
          },
          {
            name: "homeTrustModel",
            label: "TrustModel (\u041A\u0430\u043A \u0443\u0441\u0442\u0440\u043E\u0435\u043D\u0430 \u043C\u043E\u0434\u0435\u043B\u044C)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
              { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
            ]
          },
          {
            name: "homeRoadmap",
            label: "Roadmap (\u041A\u0430\u043A \u043E\u0442\u043A\u0440\u044B\u0442\u044C)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
              { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
            ]
          },
          {
            name: "homeCaseStudies",
            label: "CaseStudies (\u041A\u0435\u0439\u0441\u044B)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
              { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              {
                type: "object",
                name: "caseLabels",
                label: "\u041F\u043E\u0434\u043F\u0438\u0441\u0438",
                fields: [
                  { type: "string", name: "payback", label: "\u041E\u043A\u0443\u043F\u0430\u0435\u043C\u043E\u0441\u0442\u044C" },
                  { type: "string", name: "profitMonth", label: "\u041F\u0440\u0438\u0431\u044B\u043B\u044C / \u043C\u0435\u0441" },
                  { type: "string", name: "investment", label: "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438" },
                  { type: "string", name: "video", label: "\u0412\u0438\u0434\u0435\u043E" },
                  { type: "string", name: "photo", label: "\u0424\u043E\u0442\u043E" }
                ]
              },
              { type: "string", name: "openedPrefix", label: "\u041F\u0440\u0435\u0444\u0438\u043A\u0441 \u0434\u0430\u0442\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F" },
              { type: "string", name: "openedSuffix", label: "\u0421\u0443\u0444\u0444\u0438\u043A\u0441 \u0434\u0430\u0442\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F" }
            ]
          },
          {
            name: "homeFaq",
            label: "FAQ (\u0427\u0430\u0441\u0442\u043E \u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
              { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
            ]
          },
          {
            name: "homeContacts",
            label: "Contacts (\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "heading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              {
                type: "object",
                name: "form",
                label: "\u0424\u043E\u0440\u043C\u0430",
                fields: [
                  { type: "string", name: "name", label: "\u0418\u043C\u044F (label)" },
                  { type: "string", name: "namePlaceholder", label: "\u0418\u043C\u044F (placeholder)" },
                  { type: "string", name: "phone", label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D (label)" },
                  { type: "string", name: "phonePlaceholder", label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D (placeholder)" },
                  { type: "string", name: "format", label: "\u0424\u043E\u0440\u043C\u0430\u0442 (label)" },
                  { type: "string", name: "formatPlaceholder", label: "\u0424\u043E\u0440\u043C\u0430\u0442 (placeholder)" },
                  { type: "string", name: "message", label: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 (label)" },
                  { type: "string", name: "messagePlaceholder", label: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 (placeholder)" },
                  { type: "string", name: "submit", label: "\u041A\u043D\u043E\u043F\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438" },
                  { type: "string", name: "submitting", label: "\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430..." },
                  { type: "string", name: "submitted", label: "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E" },
                  { type: "string", name: "success", label: "\u0423\u0441\u043F\u0435\u0445" },
                  { type: "string", name: "error", label: "\u041E\u0448\u0438\u0431\u043A\u0430" },
                  { type: "string", name: "telegram", label: "Telegram (\u0442\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438)" },
                  { type: "string", name: "or", label: "\u0438\u043B\u0438" },
                  { type: "string", name: "mail", label: "\u043F\u043E\u0447\u0442\u0430 (\u0442\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438)" },
                  { type: "string", name: "leadQueueFallback", label: "\u0424\u043E\u043B\u0431\u044D\u043A \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F" }
                ]
              },
              {
                type: "object",
                name: "company",
                label: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F",
                fields: [
                  { type: "string", name: "name", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" },
                  { type: "string", name: "inn", label: "\u0418\u041D\u041D" },
                  { type: "string", name: "address", label: "\u0410\u0434\u0440\u0435\u0441" }
                ]
              },
              {
                type: "object",
                name: "sections",
                label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u0441\u0435\u043A\u0446\u0438\u0439",
                fields: [
                  { type: "string", name: "details", label: "\u0420\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B" },
                  { type: "string", name: "contacts", label: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" },
                  { type: "string", name: "socials", label: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438" }
                ]
              },
              { type: "string", name: "privacy", label: "Privacy text", ui: { component: "textarea" } }
            ]
          },
          {
            name: "homeStores",
            label: "Stores (\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u043A\u0430\u044F \u0441\u0435\u0442\u044C)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "heading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              {
                type: "object",
                name: "ghost",
                label: "Ghost marker",
                fields: [
                  { type: "string", name: "label", label: "\u041C\u0435\u0442\u043A\u0430" },
                  { type: "string", name: "tooltip", label: "\u0422\u0443\u043B\u0442\u0438\u043F" },
                  { type: "string", name: "sidebarYourCity", label: "\u0412\u0430\u0448 \u0433\u043E\u0440\u043E\u0434" },
                  { type: "string", name: "sidebarCTA", label: "CTA \u0432 \u0441\u0430\u0439\u0434\u0431\u0430\u0440\u0435" },
                  { type: "string", name: "sidebarSubtext", label: "\u041F\u043E\u0434\u0442\u0435\u043A\u0441\u0442" }
                ]
              }
            ]
          },
          {
            name: "homeKpRating",
            label: "KpRating (\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u041A\u041F)",
            fields: [
              { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
              { type: "string", name: "headingAfter", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u043F\u043E\u0441\u043B\u0435 \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              {
                type: "object",
                name: "badge",
                label: "\u0411\u0435\u0439\u0434\u0436",
                fields: [
                  { type: "string", name: "rank", label: "\u0420\u0430\u043D\u0433" },
                  { type: "string", name: "label", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C" }
                ]
              },
              { type: "string", name: "body", label: "\u0422\u0435\u043A\u0441\u0442", ui: { component: "textarea" } },
              { type: "string", name: "ctaLink", label: "\u0422\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438" },
              { type: "string", name: "source", label: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A" },
              { type: "string", name: "imageAlt", label: "Alt \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F" }
            ]
          }
        ]
      },
      /* ==================================================================
         COLLECTION: О бренде (about)
         ================================================================== */
      {
        name: "about",
        label: "\u041E \u0431\u0440\u0435\u043D\u0434\u0435",
        path: "content/about",
        format: "json",
        ui: { router: () => "/about" },
        templates: [
          {
            name: "aboutHero",
            label: "Hero",
            fields: [
              { type: "string", name: "heroEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "heroHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "heroDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
            ]
          },
          {
            name: "aboutStats",
            label: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
            fields: [
              {
                type: "object",
                name: "stats",
                label: "\u0426\u0438\u0444\u0440\u044B",
                list: true,
                fields: [
                  { type: "number", name: "num", label: "\u0427\u0438\u0441\u043B\u043E" },
                  { type: "string", name: "suffix", label: "\u0421\u0443\u0444\u0444\u0438\u043A\u0441 (+)" },
                  { type: "string", name: "label", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C" },
                  { type: "boolean", name: "accent", label: "\u0410\u043A\u0446\u0435\u043D\u0442\u043D\u044B\u0439 \u0446\u0432\u0435\u0442" }
                ]
              }
            ]
          },
          {
            name: "aboutPhilosophy",
            label: "\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F",
            fields: [
              { type: "string", name: "philosophyEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "philosophyHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "philosophyBody1", label: "\u0410\u0431\u0437\u0430\u0446 1", ui: { component: "textarea" } },
              { type: "string", name: "philosophyBody2", label: "\u0410\u0431\u0437\u0430\u0446 2", ui: { component: "textarea" } }
            ]
          },
          {
            name: "aboutAdvantages",
            label: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430",
            fields: [
              { type: "string", name: "advantagesEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "advantagesHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              {
                type: "object",
                name: "advantages",
                label: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
                  { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            name: "aboutTimeline",
            label: "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D",
            fields: [
              { type: "string", name: "timelineEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "timelineHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              {
                type: "object",
                name: "milestones",
                label: "\u0421\u043E\u0431\u044B\u0442\u0438\u044F",
                list: true,
                fields: [
                  { type: "string", name: "year", label: "\u0413\u043E\u0434" },
                  { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
                  { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            name: "aboutRepresentative",
            label: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C",
            fields: [
              { type: "string", name: "repEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "repHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
              { type: "string", name: "repBody", label: "\u0422\u0435\u043A\u0441\u0442", ui: { component: "textarea" } },
              { type: "string", name: "repInn", label: "\u0418\u041D\u041D" },
              { type: "string", name: "repAddress", label: "\u0410\u0434\u0440\u0435\u0441" }
            ]
          },
          {
            name: "aboutCta",
            label: "CTA",
            fields: [
              { type: "string", name: "ctaHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "ctaButton", label: "\u041A\u043D\u043E\u043F\u043A\u0430" }
            ]
          }
        ]
      },
      /* ==================================================================
         COLLECTION: Франшиза (franchise)
         ================================================================== */
      {
        name: "franchise",
        label: "\u0424\u0440\u0430\u043D\u0448\u0438\u0437\u0430",
        path: "content/franchise",
        format: "json",
        ui: { router: () => "/franchise" },
        templates: [
          {
            name: "franchiseHero",
            label: "Hero",
            fields: [
              { type: "string", name: "heroEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "heroHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "heroDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } }
            ]
          },
          {
            name: "franchisePlans",
            label: "\u041F\u043B\u0430\u043D\u044B",
            fields: [
              { type: "string", name: "plansEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "plansDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              { type: "string", name: "plansHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } }
            ]
          },
          {
            name: "franchiseComparison",
            label: "\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435",
            fields: [
              { type: "string", name: "comparisonEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "comparisonHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } }
            ]
          },
          {
            name: "franchiseFinancial",
            label: "\u0424\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C",
            fields: [
              { type: "string", name: "financialEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "financialDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
              { type: "string", name: "financialHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              {
                type: "object",
                name: "financialRows",
                label: "\u0421\u0442\u0440\u043E\u043A\u0438",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" },
                  { type: "string", name: "value", label: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435" },
                  { type: "string", name: "detail", label: "\u0414\u0435\u0442\u0430\u043B\u0438" },
                  { type: "boolean", name: "accent", label: "\u0410\u043A\u0446\u0435\u043D\u0442" }
                ]
              },
              { type: "string", name: "seasonalityNote", label: "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 \u043E \u0441\u0435\u0437\u043E\u043D\u043D\u043E\u0441\u0442\u0438", ui: { component: "textarea" } }
            ]
          },
          {
            name: "franchiseBenefits",
            label: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430",
            fields: [
              { type: "string", name: "benefitsEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "benefitsHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } }
            ]
          },
          {
            name: "franchiseGallery",
            label: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F",
            fields: [
              { type: "string", name: "galleryEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "galleryHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" }
            ]
          },
          {
            name: "franchiseContact",
            label: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
            fields: [
              { type: "string", name: "contactHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "contactDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
            ]
          }
        ]
      },
      /* ==================================================================
         COLLECTION: Коллекции (collections)
         ================================================================== */
      {
        name: "pageCollections",
        label: "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438",
        path: "content/collection",
        format: "json",
        ui: { router: () => "/collection" },
        templates: [
          {
            name: "collectionHero",
            label: "Hero",
            fields: [
              { type: "string", name: "heroEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "heroHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "heroDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } }
            ]
          },
          {
            name: "collectionCta",
            label: "CTA",
            fields: [
              { type: "string", name: "ctaEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "ctaHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "ctaDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
              { type: "string", name: "ctaButton", label: "\u041A\u043D\u043E\u043F\u043A\u0430" }
            ]
          }
        ]
      },
      /* ==================================================================
         COLLECTION: Магазины (stores)
         ================================================================== */
      {
        name: "stores",
        label: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B",
        path: "content/stores",
        format: "json",
        ui: { router: () => "/stores" },
        templates: [
          {
            name: "storesHero",
            label: "Hero",
            fields: [
              { type: "string", name: "heroEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "heroHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "heroDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
            ]
          },
          {
            name: "storesList",
            label: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B (\u0441\u043F\u0438\u0441\u043E\u043A)",
            fields: [
              { type: "string", name: "storesEyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
              { type: "string", name: "storesDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              { type: "string", name: "storesHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } }
            ]
          },
          {
            name: "storesCta",
            label: "CTA",
            fields: [
              { type: "string", name: "ctaHeading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              { type: "string", name: "ctaDesc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
              { type: "string", name: "ctaButton", label: "\u041A\u043D\u043E\u043F\u043A\u0430" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
