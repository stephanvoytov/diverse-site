import pino from "pino";

const isDev = process.env.NODE_ENV === "development";

const logger = pino({
  name: "diverse-site",
  level: isDev ? "debug" : "info",
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "HH:MM:ss" },
    },
  }),
});

export default logger;
