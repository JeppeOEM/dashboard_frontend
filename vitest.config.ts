import { defineConfig } from "vitest/config";
//configuration object
export default defineConfig({
  test: {
    environment: "jsdom",
  },
});
