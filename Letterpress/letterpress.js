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

        //The base definition files, extended from right to left, so the leftmost has top priority
        definitions: {
            //This is the fallback definition, always loaded no matter the sez language
            "*": ["./definitions/basic_en"],

            //Each further definition list can be keyed with a language (or any other identifier)
            //The definitions will be inserted before the fallback definition list
            "english": [],
            "german": ["./definitions/basic_de"]
        },


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