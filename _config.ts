import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import inline from "lume/plugins/inline.ts";
import basePath from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import cms from "lume/plugins/netlify_cms.ts";
import metas from "lume/plugins/metas.ts";
import { config } from "https://deno.land/std@0.146.0/dotenv/mod.ts";

await config({
  export: true,
});

const site = lume({
  location: new URL("https://tarugoconf.github.io/tarugo22/"),
});

site
  .ignore("README.md")
  .copy("img")
  .copy("fonts")
  .copy("static", "")
  .copy([".js"])
  .use(postcss({ includes: "_css" }))
  .use(basePath())
  .use(date())
  .use(cms())
  .use(metas())
  .use(inline())
  .data("cache", Date.now())
  .remoteFile(
    "vendor/carousel/carousel.js",
    "https://unpkg.com/@oom/carousel@4.2.0/src/carousel.js",
  )
  .remoteFile(
    "vendor/carousel/navigation.js",
    "https://unpkg.com/@oom/carousel@4.2.0/src/navigation.js",
  );

export default site;
