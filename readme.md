# Blueprint

Clickable Prototype Framework based on Bootstrap 3 and with Mustache.js

## Requirements
* [Twitter Bootstrap][1] (incl. jQuery & Modernizer)
* [Mixture.io][2]

#### Optional
* [jQuery.UI][3]

## Foreword
Brueprint is a framework to create clickable prototypes fast and easy. It is **not** meant for production use. Blueprint provides pragamtic workflow for _Interactione Designer_ who have knowledge of HTML/CSS.

Blueprint provides a optional _Blueprint like_ style to the default twitter bootstrap styles, which help to let clients focus on the layout and interaction without being mislead by something that looks already like somewhat of a design. It's like Basiliq but with a rather more appeling drafts look.

### Worklflow
Blueprint was build for the following type of workflow:

* **Blueprinting** a Clickable Prototype, building the layout and interactions.
* **Design** by removing the Blueprint stylesheets and start designing based on _Twitter Bootstrap_. All styles added in the _Blueprint_ process remain and can now be refined*.
* **Build** Wehn the design is done, you're ready to build, the markup is already done and the CSS may be reused for production*. You only need to handle the project to your Developer. :)

_*Please consider that the code might be stripped down to a minimum for developement, blueprint was designed to build prototypes fast and therefore has a lot of prefactured code under the hood which you might not use for your production app._

## Installation
Blueprint relies on [Mixture.io][2] to easily use Data delivered with JSON and the very useful Liquid template language.
Installation is dead simple, just clone the repository to your computer (or download as a ZIP) and open the folder in Mixture.


## General Usage
Please check the Mixture and Liquid Docs. 

## Blueprint specials

### Show the Grid Layout
There's a grid overlay for the blueprint and basic bootstrap style. it is turned in the Settings section of the blueprint.js:

```javascript
// SETTINGS!
var showgrid = true;
```

### Fake Login
Blueprint features a _fake login_ which helps you to visualize how your prototype will behave differently while a user is logged in or not. The users and passwords etc. can be created in the ```/models/_global.json```. When you attempt a login, blueprint will simply compare the input with the registered users in ```_global.json```. If there's a match, it will write this users name into the browsers local storage and considers the user as logged in. Logging out simply clears the local storage.

To show or hide elements when a user is logged in or not simply add a class to your elemnets (or complete container).

#### Example

```HTML
<div class="isout">I'm an element only shown to Guests</div>
<div class="isin">I'm an element only shown to logged in Users</div>
```

### Gallery
To display an image gallery quickly with scalable content, blueprint has a simple gallery with lightbox you may include. To add more images simply add more image-entries in the ```_global.json```. If you preffer to display images insetad of the placeholders, uncomment and comment the following accordingly in gallery.liquid on line 6 and 7:

```liquid
{% comment %}<span class="glyphicon glyphicon-picture"></span>{% endcomment %}
<img src="images/ph.png" style="background-image: url('{{url}}');" alt="{{caption}}">
```


## Contributing
If you build your own units you think they belong to the default selection or you have suggestions to make the code better. I'll gladly recieve a pull-request.

## Note
I'm a Interaction Designer and Frontend-Developer, mainly writing HTML/CSS and some Frontend jQuery. Don't judge me for my javascript code! :)




[1]: http://getbootstrap.com/
[2]: http://mixture.io/
[3]: https://jqueryui.com/
[4]: http://yeoman.io 
