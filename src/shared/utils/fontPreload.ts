// import { readdirSync } from "fs";
// import { resolve } from "path";
// import { HtmlTagDescriptor } from "vite";

// const fontsDirectory = resolve(__dirname, "public/fonts");
// console.log("fontsDirectory", fontsDirectory);

// const fontFiles = readdirSync(fontsDirectory).filter((file) =>
//   file.endsWith(".woff2"),
// );

// export const injectFontsToHead: HtmlTagDescriptor[] = fontFiles.map(
//   (fontFile) => ({
//     injectTo: "head",
//     tag: "link",
//     attrs: {
//       rel: "preload",
//       href: `/public/fonts/${fontFile}`,
//       as: "font",
//       type: "font/woff2",
//       crossOrigin: "anonymous",
//     },
//   }),
// );
