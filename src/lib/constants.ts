export const Constants = {
  TEMPLATES_FOLDER: "templates",
  COMMON_TEMPL_FOLDER: "common",
};

export const Templates = {
  general: "mod_template",
  script: "script_template",
};

export type TTemplates = keyof typeof Templates;
