import f from "https://deno.land/x/netlify_cms_config@v0.2.2/mod.ts";

// Set defaults
f.defaultRequired = false;
f.defaults.image.allowMultiple(false);
f.defaults.object.collapsed();
f.defaults.list.collapsed().minimizeCollapsed();
f.defaults.markdown.minimal();

const config = {
  backend: {
    name: "git-gateway",
    branch: "master",
  },
  media_folder: "img",
  collections: [],
};

// Create Data files collection
const data = f.files("Data")
  .description("Editar diferentes datos de la web")
  .sortableFields("title")
  .preview(false);

const speakers = data.createFile("Speakers", "/_data/home/speakers.yml", [
  f.string("Title"),
  f.markdown("Intro"),
  f.string("Teacher title"),
  f.markdown("Teacher intro"),
  f.list("Speakers", [
    f.string("Name").required(),
    f.select("Type", ["speaker", "teacher"]),
    f.string("Id").required(),
    f.string("Company"),
    f.string("Position"),
    f.image("Image").mediaFolder("/img/speakers"),
    f.markdown("Bio"),
    f.list("Links", [
      f.string("Title"),
      f.select("Type", ["twitter", "linkedin", "link"]),
      f.string("Url"),
    ]),
  ]),
]);

data.file("Agenda", "/_data/home/calendar.yml", [
  f.string("Title"),
  f.markdown("Intro"),
  f.list("Days", [
    f.string("Day"),
    f.list("Events", [
      f.string("Title"),
      f.string("Time"),
      f.relation("Speakers", speakers, "speakers.*.id")
        .multiple()
        .searchFields(["speakers.*.name"])
        .displayFields(["speakers.*.name"]),
      f.markdown("Details"),
    ]),
  ]),
])
  .file("Partners", "/_data/home/partners.yml", [
    f.string("Title"),
    f.markdown("Intro"),
    f.string("Title patrons"),
    f.markdown("Intro patrons"),
    f.object("Main", [
      f.string("Alt"),
      f.image("Img").mediaFolder("/img/partners"),
      f.string("Url"),
      f.markdown("Text"),
    ]),
    f.list("Partners", [
      f.string("Alt"),
      f.image("Img").mediaFolder("/img/partners"),
      f.string("Url"),
      f.markdown("Text"),
    ]),
    f.list("Collaborators", [
      f.string("Alt"),
      f.image("Img").mediaFolder("/img/partners"),
      f.string("Url"),
    ]),
    f.list("Patrons", [
      f.string("Alt"),
      f.image("Img").mediaFolder("/img/partners"),
      f.string("Url"),
    ]),
    f.object("Join", [
      f.string("Title"),
      f.markdown("Content"),
    ]),
  ])
  .file("Faq", "/_data/home/faq.yml", [
    f.string("Title"),
    f.list("Questions", [
      f.string("Question"),
      f.markdown("Answer"),
    ]),
  ])
  .file("Contacto", "/_data/home/contact.yml", [
    f.string("Title"),
    f.object("Manager", [
      f.string("Name"),
      f.image("Img"),
      f.string("Alt"),
      f.string("Position"),
      f.list("Links", [
        f.string("Text"),
        f.string("Url"),
        f.string("Icon"),
      ]),
    ]),
    f.markdown("Address"),
    f.list("Links", [
      f.string("Text"),
      f.string("Url"),
      f.string("Icon"),
    ]),
    f.object("Team", [
      f.string("Title"),
      f.list("People", [
        f.string("Name"),
        f.string("Title"),
        f.image("Img").mediaFolder("img/equipo"),
        f.string("Url"),
      ]),
    ]),
  ]);

config.collections.push(data.toJSON());

// Create Pages collection
const pages = f.files("Pages")
  .description("Páginas sueltas de la web")
  .sortableFields("title")
  .preview(false)
  .file("Home", "/index.yml", [
    f.hidden("layout"),
    metas(),
    f.string("Title"),
    f.string("Description"),
    f.list("Menu", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.object("Cta", [
      f.string("Text"),
      f.string("url"),
    ]),
    f.object("Header", [
      f.string("Title"),
      f.string("Subtitle"),
      f.string("Cta"),
    ]),
    f.object("Quote", [
      f.markdown("Text"),
      f.string("Footer"),
    ]),
    f.object("Intro", [
      f.markdown("Title"),
      f.markdown("Text"),
    ]),
    f.list("Features", [
      f.string("Title"),
      f.string("Svg"),
      f.string("Img"),
      f.string("Description"),
    ]),
    f.object("Image", [
      f.string("Src"),
      f.string("Alt"),
      f.number("Width"),
      f.number("Height"),
      f.object("Link", [
        f.string("Text"),
        f.string("Href"),
      ]),
    ]),
    f.object("Location", [
      f.string("Title"),
      f.markdown("Description"),
      f.markdown("Address"),
      f.object("Map", [
        f.string("Src"),
        f.string("Url"),
        f.string("Text"),
      ]),
    ]),
  ])
  .file("Speakers", "/speakers.yml", [
    f.hidden("layout"),
    metas(),
    f.string("Title"),
    f.string("Description"),
    f.list("Menu", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.object("Back", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.object("Header", [
      f.string("Title"),
      f.markdown("Intro"),
    ]),
    f.list("Highlights", [
      f.string("Title"),
      f.markdown("Description"),
    ]),
    f.object("Image", [
      f.string("Src"),
      f.string("Alt"),
      f.number("Width"),
      f.number("Height"),
    ]),
    f.object("Intro", [
      f.string("Title"),
      f.markdown("aside"),
      f.markdown("Text"),
    ]),
    f.object("Benefits", [
      f.string("Title"),
      f.markdown("Intro"),
      f.list("Benefits", [
        f.string("Title"),
        f.image("Icon").mediaFolder("/img/icons/"),
        f.text("Description"),
      ]),
    ]),
    f.object("Speakers", [
      f.string("Title"),
      metas(),
      f.list("Quotes", [
        f.markdown("Quote"),
        f.string("Name"),
        f.string("Position"),
        f.image("Image"),
      ]),
      f.list("Speakers", [
        f.string("Name"),
        f.string("Position"),
        f.image("Image").mediaFolder("/img/speakers"),
        f.list("Social", [
          f.string("Title"),
          f.image("Icon").mediaFolder("/img/icons/"),
          f.string("Href"),
        ]),
      ]),
    ]),
    f.object("Resources", [
      f.string("Title"),
      f.list("Links", [
        f.string("Text"),
        f.string("Href"),
      ]),
    ]),
  ])
  .file("Entradas", "/tickets.yml", [
    f.hidden("layout"),
    metas(),
    f.string("Title"),
    f.string("Description"),
    f.object("Back", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.object("Header", [
      f.string("Title"),
      f.markdown("Intro"),
    ]),
    f.list("Tickets", [
      f.string("Name"),
      f.string("Pricing"),
      f.markdown("Description"),
      f.object("Delivery", [
        f.string("Date"),
        f.string("Address"),
      ]),
      f.boolean("Complements"),
      f.number("Stock"),
    ]),
  ])
  .file("Tarugoff", "/tarugoff.yml", [
    f.hidden("layout"),
    metas(),
    f.string("Title"),
    f.string("Description"),
    f.list("Menu", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.object("Cta", [
      f.string("Text"),
      f.string("url"),
    ]),
    f.object("Back", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.object("Header", [
      f.string("Title"),
      f.markdown("Intro"),
    ]),
    f.object("Intro", [
      f.string("Title"),
      f.markdown("Text"),
      f.markdown("Aside"),
    ]),
    f.object("Sessions", [
      f.string("Title"),
      f.markdown("Text"),
      f.object("Cta", [
        f.string("Text"),
        f.string("url"),
      ]),
    ]),
    f.object("Faq", [
      f.string("Title"),
      f.list("Questions", [
        f.string("Question"),
        f.markdown("Answer"),
      ]),
    ]),
  ])
  .file("Aviso Legal", "/aviso-legal.md", [
    f.hidden("layout"),
    metas(),
    f.string("Title"),
    f.object("Back", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.markdown("Body"),
  ])
  .file("Código de conducta", "/codigo-de-conducta.md", [
    f.hidden("layout"),
    metas(),
    f.string("Title"),
    f.object("Back", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.markdown("Body"),
  ])
  .file("Política de privacidad", "/politica-de-privacidad.md", [
    f.hidden("layout"),
    metas(),
    f.string("Title"),
    f.object("Back", [
      f.string("Text"),
      f.string("Href"),
    ]),
    f.markdown("Body"),
  ]);

config.collections.push(pages.toJSON());

export default config;

function metas() {
  return f.object("Metas", [
    f.string("Title"),
    f.string("Description"),
    f.image("Image").mediaFolder("img"),
  ]);
}
