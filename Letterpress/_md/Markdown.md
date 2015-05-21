# Sample Markdown App

github.com

<!-- Markdown/basics BEGIN -->On July 2, an alien mothership entered Earth's orbit and deployed several dozen saucer-shaped "destroyer" spacecraft, each 15 miles (24 km) wide.

On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, participated in an assault on a destroyer near the city of Los Angeles.

## The second largest heading

###### The 6th largest heading

In the words of Abraham Lincoln:

> Pardon my french

*This text will be italic*
**This text will be bold**

**Everyone _must_ attend the meeting at 5 o'clock today.**

* Item
* Item
* Item

- Item
- Item
- Item

1. Item 1
2. Item 2
3. Item 3

1. Item 1
  1. A corollary to the above item.
  2. Yet another point to consider.
2. Item 2
  * A corollary that does not need to be ordered.
    * This is indented four spaces, because it's two spaces further than the item above.
    * You might want to consider making a new list.
3. Item 3

Here's an idea: why don't we take `SuperiorProject` and turn it into `**Reasonable**Project`.

Check out this neat program I wrote:

```
x = 0
x = 2 + 2
what is x
```

[Visit GitHub!](www.github.com)<!-- END Markdown/basics -->
- - -

<!-- Markdown/gfm BEGIN -->http://example.com

~~Mistaken text.~~

Fenced Code:

```
function test() {
  console.log("notice the blank line before this function?");
}
```

Syntax Highlighting:

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

First Header  | Second Header
------------- | -------------
Content Cell  | Content Cell
Content Cell  | Content Cell

| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |

| Name | Description          |
| ------------- | ----------- |
| Help      | Display the help window.|
| Close     | Closes a window     |

| Name | Description          |
| ------------- | ----------- |
| Help      | ~~Display the~~ help window.|
| Close     | _Closes_ a window     |

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |

<!-- END Markdown/gfm -->