import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import inline from "lume/plugins/inline.ts";
import basePath from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import cms from "lume/plugins/netlify_cms.ts";
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
  .use(basePath())
  .use(date())
  .use(cms())
  .use(inline());

site.addEventListener("beforeBuild", () => gpm(["oom-components/carousel"]));

export default site;
