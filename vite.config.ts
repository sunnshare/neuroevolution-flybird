import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";

export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  return {
    base: viteEnv.VITE_BASE_URL,
    plugins: [],
    build: {
      outDir: "dist",
      sourcemap: false,
    },
  };
});
