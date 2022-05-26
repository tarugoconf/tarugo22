const config = {
  backend: {
    name: "git-gateway",
    branch: "master",
  },
  media_folder: "img",
  collections: [],
};

config.collections.push({
  label: "Datos",
  name: "data",
  description: "Editar diferentes datos de la web",
  sortable_fields: ["title"],
  preview: false,
  files: [
    {
      label: "Agenda",
      name: "calendar",
      file: "/_data/home/calendar.yml",
      fields: [
        field("Title"),
        field("Intro", "markdown"),
        field("Days", "list", {
          fields: [
            field("Day"),
            field("Events", "list", {
              fields: [
                field("Title"),
                field("Time"),
                field("Speakers", "list", {
                  hint: "Comma separated list of speakers identities",
                }),
                field("Details", "markdown"),
              ],
            }),
          ],
        }),
      ]
    },{
      label: "Speakers",
      name: "speakers",
      file: "/_data/home/speakers.yml",
      fields: [
        field("Title"),
        field("Intro", "markdown"),
        field("Speakers", "list", {
          fields: [
            field("Name"),
            field("Id"),
            field("Company"),
            field("Position"),
            field("Image", "image", {
              allow_multiple: false,
              media_folder: "/img/speakers",
            }),
            field("Links", "list", {
              fields: [
                field("Text"),
                field("Type", "select", {
                  options: ["twitter", "linkedin", "web"],
                }),
                field("URL"),
              ]
            }),
          ],
        }),
      ]
    }, {
      label: "Partners",
      name: "partners",
      file: "_data/home/partners.yml",
      fields: [
        field("Title"),
        field("Intro", "markdown"),
        field("Main", "object", {
          fields: [
            field("Alt"),
            field("Img", "image", {
              allow_multiple: false,
              media_folder: "/img/partners",
            }),
            field("URL"),
            field("Text", "markdown"),
          ]
        }),
        field("Partners", "list", {
          fields: [
            field("Alt"),
            field("Img", "image", {
              allow_multiple: false,
              media_folder: "/img/partners",
            }),
            field("URL"),
            field("Text", "markdown"),
          ]
        }),
        field("Patrons", "list", {
          fields: [
            field("Alt"),
            field("Img", "image", {
              allow_multiple: false,
              media_folder: "/img/partners",
            }),
            field("URL"),
          ]
        }),
        field("Join", "object", {
          fields: [
            field("Title"),
            field("Content", "markdown"),
          ]
        }) 
      ]
    }
  ]
});


function field(label, widget = "string", extra = {}) {
  const defaults = {};

  if (typeof widget === "object") {
    extra = widget;
    widget = "string";
  }

  if (widget === "list") {
    defaults.collapsed = true;
    defaults.minimize_collapsed = true;
  } else if (widget === "object") {
    defaults.collapsed = true;
  } else if (widget === "markdown") {
    defaults.minimal = true;
  } else if (widget === "select" || widget === "boolean") {
    defaults.required = false;
  }

  return {
    label,
    name: label.toLowerCase().replaceAll(" ", "_"),
    widget,
    ...defaults,
    ...extra,
  };
}

export default config;