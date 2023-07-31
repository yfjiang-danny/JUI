const esbuild = require("esbuild");

const formats = ["esm", "cjs"];

function build() {
  formats.forEach((v) => {
    esbuild
      .build({
        entryPoints: [
          "src/icons/dist/normal/index.ts",
          "src/icons/dist/colorful/index.ts",
        ],
        outdir: "dist",
        outExtension: {
          ".js": v === "esm" ? ".mjs" : ".cjs",
        },
        target: "es6",
        format: v,
        bundle: true,
        minify: false,
        sourcemap: true,
        sourcesContent: false,
        logLevel: "silent",
        loader: {
          ".gif": "file",
          ".svg": "file",
        },
      })
      .catch((err) => {
        // eslint-disable-next-line no-undef
        console.log(err);
      });
  });
}

build();
