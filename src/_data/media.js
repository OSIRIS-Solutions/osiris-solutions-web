const fg = require("fast-glob");
const path = require("path");

/**
 * Collect all media images from src/assets/media
 * and expose them as global `media` data.
 */
module.exports = async function () {
  const files = await fg("assets/media/**/*.{jpg,jpeg,png,webp,svg,pdf}", {
    cwd: "src",
  });

  return files.map((f) => {
    const base = path.basename(f, path.extname(f));
    return {
      src: "/" + f.replace(/\\/g, "/"),
      alt: base.replace(/[-_]/g, " "),
    };
  });
};