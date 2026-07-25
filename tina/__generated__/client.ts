import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '223db15508d788cb3a8793b6c7c7c2bfd244e358', queries,  });
export default client;
  