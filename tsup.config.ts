import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        button: "src/components/Button/index.ts",
        input: "src/components/Input/index.ts",
    },
    format: ["esm"],
    dts: true,
    clean: true,
    minify: true,
    splitting: true,
    treeshake: true,
    external: ["react", "react-dom"],
    outDir: "dist",
});