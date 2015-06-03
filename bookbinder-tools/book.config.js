module.exports = {


    /**
     * This configuration file contains various settings for the bookpress on how to behave
     */

    //The barber is where mustache/markdown gets composited  to pure markdown files
    barber: {
        //The input directory of where to read mustache/markdown partial files from
        inputDirectory: "../Rulebook/Content/",
        //The file extension of mustache/markdown partial files
        partialExt: "md",

        //The base definition files, extended from right to left, so the leftmost has top priority
        definitions: {
            //This is the fallback definition, always loaded no matter the set language
            "*": ["../Rulebook/Definitions/basic_en"],

            //Each further definition list can be keyed with a language (or any other identifier)
            //The definitions will be inserted before the fallback definition list
            "english": ["../Rulebook/Definitions/basic_en"],
            "german": ["../Rulebook/Definitions/basic_de"]
        },


        //The blob for main files that you want to compile.
        mainFile: "../Rulebook/Content/index.md",

        //The output directory of generated markdown files
        outputDirectory: "_md/",

        insertDebugMarkers: true
    },

    //The markdowner is where markdown gets compiled to html
    markdowner: {
        //The input directory of where to read markdown files from
        inputDirectory: "_md/",
        //The output directory of generated html files
        outputDirectory: "../public/book_contents/",
        //if the output should be cleaned before generation, ensuring no artifacts from a previous build are left
        cleanOnGeneration: false,
        //if the input should be cleaned after generation, ensuring no intermediate artifacts are left
        cleanInputOnGeneration: true,

        //Settings for markdown-it
        'markdown-it': {
            html: true,
            linkify: true,
            typographer: true
        }
    },

    demoserver: {
        //The directory from which the server serves static files
        staticRootDirectory: "../public/",
        //The port on which the server will run
        port: 50002,
        //The port on which the live-reload will communicate
        lrPort: 35729
    }
};