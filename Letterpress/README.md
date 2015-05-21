# Swashbucklers' Letterpress

*Letterpress* is a small tool, built for Swashbuckler to:

- composite Mustache & Markdown to pure Markdown, using a database of variables and possibly a language-kit
- compile Markdown to HTML using an custom extended dialect

It is intended for local as well as remote (CI) build, and creates the HTML pages for web-view as well as print-view.
Letterpress is using the [gulp](http://gulpjs.com/) build system