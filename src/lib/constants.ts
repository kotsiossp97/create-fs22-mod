export const Constants = {
  TEMPLATES_FOLDER: "templates",
  MOD_TEMPL_FOLDER: "mod_template",
  COMMON_TEMPL_FOLDER: "common",
};

export const Templates = {
  general: "mod_template",
  script: "script_template",
};

export type TTemplates = keyof typeof Templates;
