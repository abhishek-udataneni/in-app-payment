import nodeResolve from "@rollup/plugin-node-resolve";
import common from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";

export default [
  {
    input: "src/server/index.js",
    preserveEntrySignatures: false,
    output: [
      {
        dir: "dist/server",
        format: "cjs"
      }
    ],
    external: ["solid-js", "solid-js/web", "path", "express", "server"],
    plugins: [
      // nodeResolve({ preferBuiltins: true, exportConditions: ["solid", "node"] }),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "ssr", hydratable: true }]]
      }),
      common()
    ]
  },
  {
    input: "src/index.js",
    output: [
      {
        dir: "dist/assets/js",
        format: "esm"
      }
    ],
    preserveEntrySignatures: false,
    plugins: [
      nodeResolve({ exportConditions: ["solid"] }),
      babel({
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true }]]
      }),
      common(),
      copy({
        targets: [
          {
            src: ["src/assets/*"],
            dest: "dist/assets"
          }, 
          {
            src: ["src/styles/*"],
            dest: "dist/assets"
          },
        ]
      })
    ]
  }
];
