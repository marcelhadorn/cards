---
title: "Blueprint Instructions"
date: 2013-06-11 00:00
published: true
tags: 
- blueprint
- docs
---
# Blueprint

Clickable Prototype Framework based on Bootstrap 3 and with Mustache.js

## Requirements
* [Twitter Bootstrap][1] (incl. jQuery & Modernizer)
* [Mixture.io][2]

## Optional (needs editing)
* [jQuery.UI][3]


## Foreword
Brueprint is a framework to create clickable prototypes fast and easy. It is **not** meant for production use. Blueprint provides pragamtic workflow for _Interactione Designer_ who have knowledge of HTML/CSS.

Blueprint provides a optional _Blueprint like_ style to the default twitter bootstrap styles, which help to let clients focus on the layout and interaction without being mislead by something that looks already like somewhat of a design. It's like Basiliq but with a rather more appeling drafts look.

### Worklflow
Blueprint was build for the following type of workflow:
* **Blueprinting** a Clickable Prototype, building the layout and interactions.
* **Design** by removing the Blueprint stylesheets and start designing based on Twitter Bootstrap. All styles added in the _Blueprint_ process remain and can now be refined.
* **Build** Wehn the design is done, you're ready to build, the markup is already done and the CSS may be reused for production. You only need to handle the project to your Developer. :)

## Installation
Blueprint relies on [Mixture.io][2] to easily use Data delivered with JSON and the very useful Liquid template language.
Installation is dead simple, just clone the repository to your computer (or download as a ZIP) and open the folder in Mixture.


## General Usage
Please check the Mixture Docs. 

## Blueprint specials

### Show the Grid
There's a grid overlay for the blueprint and basic bootstrap style. it is turned in the Settings section of the blueprint.js:
```javascript
// SETTINGS!
var showgrid = true;
```

## Contributing
If you build your own units you think they belong to the default selection or you have suggestions to make the code better. I'll gladly recieve a pull-request.

## Note
I'm a Interaction Designer and Frontend-Developer, mainly writing HTML/CSS and some Frontend jQuery. Don't judge me for my javascript code! :)




[1]: http://getbootstrap.com/
[2]: http://mixture.io/
[3]: https://jqueryui.com/
[4]: http://yeoman.io 
