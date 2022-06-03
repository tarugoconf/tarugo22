import f from "https://deno.land/x/netlify_cms_config@v0.2.1/mod.ts";

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
  f.list("Speakers", [
    f.string("Name").required(),
    f.string("Id").required(),
    f.string("Company"),
    f.image("Image").mediaFolder("img/speakers"),
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
    f.object("Main", [
      f.string("Alt"),
      f.image("Img").mediaFolder("img/partners"),
      f.string("Url"),
      f.markdown("Text"),
    ]),
    f.list("Partners", [
      f.string("Alt"),
      f.image("Img").mediaFolder("img/partners"),
      f.string("Url"),
    ]),
    f.list("Patrons", [
      f.string("Alt"),
      f.image("Img").mediaFolder("img/patrons"),
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
  .file("Contact", "/_data/home/contact.yml", [
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

export default config;
