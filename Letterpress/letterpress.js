module.exports = {


    /**
     * This configuration file contains various settings for the bookpress on how to behave
     */

    //The barber is where mustache/markdown gets composited  to pure markdown files
    barber: {
        //The input directory of where to read mustache/markdown partial files from
        inputDirectory: "partials/",
        //The file extension of mustache/markdown partial files
        partialExt: "md",

        //The blob for main files that you want to compile.
        mainFile: "partials/Markdown.md",

        //The output directory of generated markdown files
        outputDirectory: "_md/",

        insertDebugMarkers: true
    },

    //The markdowner is where markdown gets compiled to html
    markdowner: {
        //The input directory of where to read markdown files from
        inputDirectory: "_md/",
        //The output directory of generated html files
        outputDirectory: "_html/",
        //if the output should be cleaned before generation, ensuring no artifacts from a previous build are left
        cleanOnGeneration: false,

        //Settings for markdown-it
        'markdown-it': {
            html: true,
            linkify: true,
            typographer: true
        }
    }
};