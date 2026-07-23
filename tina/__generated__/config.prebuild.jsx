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
      {
        name: "hero",
        label: "Hero (\u0433\u043B\u0430\u0432\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D)",
        path: "content/blocks/hero",
        format: "json",
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
        name: "about",
        label: "About (\u041E \u0431\u0440\u0435\u043D\u0434\u0435)",
        path: "content/blocks/about",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
          { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
          { type: "string", name: "headingAfter", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u043F\u043E\u0441\u043B\u0435 \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
          { type: "string", name: "body", label: "\u0422\u0435\u043A\u0441\u0442", ui: { component: "textarea" } },
          {
            type: "object",
            name: "links",
            label: "\u0421\u0441\u044B\u043B\u043A\u0438",
            fields: [
              { type: "string", name: "about", label: "\u041E \u0431\u0440\u0435\u043D\u0434\u0435" },
              { type: "string", name: "collection", label: "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438" }
            ]
          }
        ]
      },
      {
        name: "franchise",
        label: "Franchise (\u0424\u0440\u0430\u043D\u0448\u0438\u0437\u0430 \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u043E\u0439)",
        path: "content/blocks/franchise",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "heading", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
          { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
          { type: "string", name: "cta", label: "\u041A\u043D\u043E\u043F\u043A\u0430 CTA" },
          {
            type: "object",
            name: "labels",
            label: "\u041F\u043E\u0434\u043F\u0438\u0441\u0438 \u043A \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u043C",
            fields: [
              { type: "string", name: "investment", label: "\u0418\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u0438" },
              { type: "string", name: "profitMonth", label: "\u041F\u0440\u0438\u0431\u044B\u043B\u044C / \u043C\u0435\u0441" }
            ]
          },
          {
            type: "object",
            name: "links",
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
        name: "marketBlock",
        label: "MarketBlock (\u041F\u043E\u0447\u0435\u043C\u0443 \u0441\u0435\u0439\u0447\u0430\u0441)",
        path: "content/blocks/marketBlock",
        format: "json",
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
        name: "trustModel",
        label: "TrustModel (\u041A\u0430\u043A \u0443\u0441\u0442\u0440\u043E\u0435\u043D\u0430 \u043C\u043E\u0434\u0435\u043B\u044C)",
        path: "content/blocks/trustModel",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
          { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
          { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
        ]
      },
      {
        name: "roadmap",
        label: "Roadmap (\u041A\u0430\u043A \u043E\u0442\u043A\u0440\u044B\u0442\u044C)",
        path: "content/blocks/roadmap",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
          { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
          { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
        ]
      },
      {
        name: "caseStudies",
        label: "CaseStudies (\u041A\u0435\u0439\u0441\u044B)",
        path: "content/blocks/caseStudies",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
          { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
          { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
          {
            type: "object",
            name: "labels",
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
        name: "faq",
        label: "FAQ (\u0427\u0430\u0441\u0442\u043E \u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442)",
        path: "content/blocks/faq",
        format: "json",
        fields: [
          { type: "string", name: "eyebrow", label: "\u0410\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "headingBefore", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0434\u043E \u0430\u043A\u0446\u0435\u043D\u0442\u0430)" },
          { type: "string", name: "headingAccent", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0430\u043A\u0446\u0435\u043D\u0442)" },
          { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
        ]
      },
      {
        name: "contacts",
        label: "Contacts (\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B)",
        path: "content/blocks/contacts",
        format: "json",
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
        name: "stores",
        label: "Stores (\u041F\u0430\u0440\u0442\u043D\u0451\u0440\u0441\u043A\u0430\u044F \u0441\u0435\u0442\u044C)",
        path: "content/blocks/stores",
        format: "json",
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
        name: "kpRating",
        label: "KpRating (\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u041A\u041F)",
        path: "content/blocks/kpRating",
        format: "json",
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
          { type: "string", name: "cta", label: "\u0422\u0435\u043A\u0441\u0442 \u0441\u0441\u044B\u043B\u043A\u0438" },
          { type: "string", name: "source", label: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A" },
          { type: "string", name: "imageAlt", label: "Alt \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F" }
        ]
      },
      /* ——— Page content collections ——— */
      {
        name: "pageAbout",
        label: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430: \u041E \u0431\u0440\u0435\u043D\u0434\u0435",
        path: "content/pages/about",
        format: "json",
        fields: [
          { type: "string", name: "heroEyebrow", label: "Hero: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "heroHeading", label: "Hero: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "heroDesc", label: "Hero: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
          {
            type: "object",
            name: "stats",
            label: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
            list: true,
            fields: [
              { type: "number", name: "num", label: "\u0427\u0438\u0441\u043B\u043E" },
              { type: "string", name: "suffix", label: "\u0421\u0443\u0444\u0444\u0438\u043A\u0441 (+)" },
              { type: "string", name: "label", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C" },
              { type: "boolean", name: "accent", label: "\u0410\u043A\u0446\u0435\u043D\u0442\u043D\u044B\u0439 \u0446\u0432\u0435\u0442" }
            ]
          },
          { type: "string", name: "philosophyEyebrow", label: "\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "philosophyHeading", label: "\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "philosophyBody1", label: "\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F: \u0430\u0431\u0437\u0430\u0446 1", ui: { component: "textarea" } },
          { type: "string", name: "philosophyBody2", label: "\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F: \u0430\u0431\u0437\u0430\u0446 2", ui: { component: "textarea" } },
          { type: "string", name: "advantagesEyebrow", label: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "advantagesHeading", label: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          {
            type: "object",
            name: "advantages",
            label: "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432",
            list: true,
            fields: [
              { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
              { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } }
            ]
          },
          { type: "string", name: "timelineEyebrow", label: "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "timelineHeading", label: "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
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
          },
          { type: "string", name: "repEyebrow", label: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "repHeading", label: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
          { type: "string", name: "repBody", label: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C: \u0442\u0435\u043A\u0441\u0442", ui: { component: "textarea" } },
          { type: "string", name: "repInn", label: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C: \u0418\u041D\u041D" },
          { type: "string", name: "repAddress", label: "\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u0438\u0442\u0435\u043B\u044C: \u0430\u0434\u0440\u0435\u0441" },
          { type: "string", name: "ctaHeading", label: "CTA: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "ctaButton", label: "CTA: \u043A\u043D\u043E\u043F\u043A\u0430" }
        ]
      },
      {
        name: "pageFranchise",
        label: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430: \u0424\u0440\u0430\u043D\u0448\u0438\u0437\u0430",
        path: "content/pages/franchise",
        format: "json",
        fields: [
          { type: "string", name: "heroEyebrow", label: "Hero: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "heroHeading", label: "Hero: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "heroDesc", label: "Hero: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
          { type: "string", name: "plansEyebrow", label: "\u041F\u043B\u0430\u043D\u044B: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "plansDesc", label: "\u041F\u043B\u0430\u043D\u044B: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
          { type: "string", name: "plansHeading", label: "\u041F\u043B\u0430\u043D\u044B: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "comparisonEyebrow", label: "\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "comparisonHeading", label: "\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "financialEyebrow", label: "\u0424\u0438\u043D\u0430\u043D\u0441\u044B: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "financialDesc", label: "\u0424\u0438\u043D\u0430\u043D\u0441\u044B: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
          { type: "string", name: "financialHeading", label: "\u0424\u0438\u043D\u0430\u043D\u0441\u044B: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          {
            type: "object",
            name: "financialRows",
            label: "\u0421\u0442\u0440\u043E\u043A\u0438 \u0444\u0438\u043D. \u043C\u043E\u0434\u0435\u043B\u0438",
            list: true,
            fields: [
              { type: "string", name: "label", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" },
              { type: "string", name: "value", label: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435" },
              { type: "string", name: "detail", label: "\u0414\u0435\u0442\u0430\u043B\u0438" },
              { type: "boolean", name: "accent", label: "\u0410\u043A\u0446\u0435\u043D\u0442" }
            ]
          },
          { type: "string", name: "seasonalityNote", label: "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 \u043E \u0441\u0435\u0437\u043E\u043D\u043D\u043E\u0441\u0442\u0438", ui: { component: "textarea" } },
          { type: "string", name: "benefitsEyebrow", label: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "benefitsHeading", label: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "galleryEyebrow", label: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "galleryHeading", label: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
          { type: "string", name: "contactHeading", label: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "contactDesc", label: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }
        ]
      },
      {
        name: "pageCollection",
        label: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430: \u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438",
        path: "content/pages/collection",
        format: "json",
        fields: [
          { type: "string", name: "heroEyebrow", label: "Hero: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "heroHeading", label: "Hero: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "heroDesc", label: "Hero: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
          { type: "string", name: "ctaEyebrow", label: "CTA: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "ctaHeading", label: "CTA: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "ctaDesc", label: "CTA: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
          { type: "string", name: "ctaButton", label: "CTA: \u043A\u043D\u043E\u043F\u043A\u0430" }
        ]
      },
      {
        name: "pageStores",
        label: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430: \u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B",
        path: "content/pages/stores",
        format: "json",
        fields: [
          { type: "string", name: "heroEyebrow", label: "Hero: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "heroHeading", label: "Hero: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "heroDesc", label: "Hero: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
          { type: "string", name: "storesEyebrow", label: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B: \u0430\u0439\u0431\u0440\u043E\u0443" },
          { type: "string", name: "storesDesc", label: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
          { type: "string", name: "storesHeading", label: "\u041C\u0430\u0433\u0430\u0437\u0438\u043D\u044B: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "ctaHeading", label: "CTA: \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
          { type: "string", name: "ctaDesc", label: "CTA: \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
          { type: "string", name: "ctaButton", label: "CTA: \u043A\u043D\u043E\u043F\u043A\u0430" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
