const path = require("node:path");
const sass = require("sass");
// const sitemap = require("@quasibit/eleventy-plugin-sitemap");


module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addFilter('year', function () {
        // date is now
        return new Date().toLocaleDateString('en-US', { year: 'numeric' });
    });
    // eleventyConfig.addPlugin(sitemap, {
    //     sitemap: {
    //         hostname: "https://osiris-solutions.de",
    //     },
    // });
    // add `date` filter
  eleventyConfig.addFilter('date', function (date, dateFormat) {
    return new Date(date).toLocaleDateString('en-US', dateFormat);
  })
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",

        // opt-out of Eleventy Layouts
        useLayouts: false,

        compile: async function (inputContent, inputPath) {
            let parsed = path.parse(inputPath);
            // Don’t compile file names that start with an underscore
            if (parsed.name.startsWith("_")) {
                return;
            }

            let result = sass.compileString(inputContent, {
                loadPaths: [
                    parsed.dir || ".",
                    this.config.dir.includes,
                ]
            });

            // Map dependencies for incremental builds
            this.addDependencies(inputPath, result.loadedUrls);

            return async (data) => {
                return result.css;
            };
        },
    });
    // Translation helper: use in Nunjucks as {{ t("DE", "EN") }}
    eleventyConfig.addShortcode("t", function (de, en) {
        const lang = this.ctx.lang || "de";
        return lang === "en" ? en : de;
    });
    // Copy CNAME file to root of output
    eleventyConfig.addPassthroughCopy("src/CNAME");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    
    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "dist"
        },
        templateFormats: ["njk", "md", "html", "scss"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk"
    };
};