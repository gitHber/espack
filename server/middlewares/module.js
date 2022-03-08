// node_modules 模块打包
const fs = require("fs");
const path = require("path");
const { rollup } = require("rollup");
const commonjs = require("@rollup/plugin-commonjs");
const { default: resolve } = require("@rollup/plugin-node-resolve");
const replace = require("@rollup/plugin-replace");

module.exports = async (ctx, next) => {
  if (ctx.path.startsWith("/@modules/")) {
    const filepath = path.resolve("." + ctx.path);
    if (!fs.existsSync(filepath)) {
      const bundle = await rollup({
        input: ctx.path.slice(10, -3),
        external: ["react", "react-dom"],
        plugins: [
          resolve({
            browser: true,
            dedupe: ["react", "react-dom"],
            mainFields: ["browser", "jsnext", "module", "main"],
          }),
          commonjs({
            defaultIsModuleExports: "auto",
          }),
          replace({
            "process.env.NODE_ENV": JSON.stringify("development"),
            preventAssignment: true,
          }),
        ],
      });

      await bundle.write({
        file: filepath,
        format: "esm",
        paths: (id) => `/@modules/${id}.js`,
      });
    }
  }
  await next();
};
