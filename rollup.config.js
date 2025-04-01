import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';

const packageJson = require("./package.json");

export default [
    {
        input: "src/dist/index.tsx",
        output: [
            {
                dir: "dist/cjs",
                format: "cjs",
                sourcemap: true,
            },
            {
                dir: "dist/esm",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            terser(),
            postcss(),
            json(),
        ],
        external: ["react", "react-dom"],
    },
    {
        input: "src/dist/index.tsx",
        output: [{ file: packageJson.types }],
        plugins: [dts.default()],
        external: [/\.css$/],
    },
];
