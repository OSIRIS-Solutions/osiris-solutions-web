module.exports = {
  // eine Seite pro Sprache
  pagination: {
    data: "languages",
    size: 1,
    alias: "langData"
  },

  // dynamische Werte abhängig von langData
  eleventyComputed: {
    lang: (data) => data.langData.code,
    permalink: (data) => (data.langData.code === "de" ? "/media/" : "/en/media/"),
    title: (data) =>
      data.langData.code === "de"
        ? "Medien"
        : "Media"
  },

  layout: "layouts/base.njk"
};