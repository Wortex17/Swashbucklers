module.exports = {


    /**
     * This configuration file contains various settings for the bookpress on how to behave
     */

    //The MD stage is where mustache/markdown gets compiled and composited to markdown files
    MD: {
        //The input directory of where to read mustache/markdown partial files from
        inputDirectory: "partials/",
        //The file extension of mustache/markdown partial files
        partialExt: "md",

        //The blob for main files that you want to compile.
        mainFile: "partials/README.md",

        //The output directory of generated markdown files
        outputDirectory: "_md/"
    },

    //The HTML stage is where markdown gets compiled to html
    HTML: {
        //The input directory of where to read markdown files from
        inputDirectory: "_md/",
        //The output directory of generated html files
        outputDirectory: "_html/",

        //Settings for markdown-it
        markdown: {
            html: true,
            linkify: true,
            typographer: true
        }
    }
};