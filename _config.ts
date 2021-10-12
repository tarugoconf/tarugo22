import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import inline from "lume/plugins/inline.ts";
import gpm from "https://deno.land/x/gpm@v0.3.0/mod.ts";

const site = lume();

site
  .ignore("README.md")
  .copy("img")
  .copy("fonts")
  .copy("static", "")
  .copy("vendor")
  .copy("interaction.js")
  .use(postcss({ includes: "_css" }))
  .use(inline());

site.addEventListener("beforeBuild", () => gpm(["oom-components/carousel"]));

export default site;
