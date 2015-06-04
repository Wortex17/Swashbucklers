var fs = require('fs');
var path = require('path');

var loremipsum = fs.readFileSync(path.join(__dirname, './loremipsum.txt')).toString();

module.exports = {
    "current_language": "english",
    "current_language_en": "english",

    "lorem_ipsum": loremipsum.trim(),
    "lorem_ipsum16": loremipsum.slice(0, 16).trim(),
    "lorem_ipsum32": loremipsum.slice(0, 32).trim(),
    "lorem_ipsum64": loremipsum.slice(0, 64).trim(),
    "lorem_ipsum128": loremipsum.slice(0, 128).trim(),
    "lorem_ipsum256": loremipsum.slice(0, 256).trim()
};