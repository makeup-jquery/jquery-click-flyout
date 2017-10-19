# jquery-click-flyout

<p>
    <a href="https://travis-ci.org/makeup-jquery/jquery-click-flyout"><img src="https://api.travis-ci.org/makeup-jquery/jquery-click-flyout.svg?branch=master" alt="Build Status" /></a>
    <a href='https://coveralls.io/github/makeup-jquery/jquery-click-flyout?branch=master'><img src='https://coveralls.io/repos/makeup-jquery/jquery-click-flyout/badge.svg?branch=master&service=github' alt='Coverage Status' /></a>
    <a href="https://david-dm.org/makeup-jquery/jquery-click-flyout"><img src="https://david-dm.org/makeup-jquery/jquery-click-flyout.svg" alt="Dependency status" /></a>
    <a href="https://david-dm.org/makeup-jquery/jquery-click-flyout#info=devDependencies"><img src="https://david-dm.org/makeup-jquery/jquery-click-flyout/dev-status.svg" alt="devDependency status" /></a>
</p>

jQuery plugin that creates the basic interactivity for a button that expands and collapse a flyout.

```js
$(selector).clickFlyout(options);
```

## Experimental

This plugin is still in an experimental state, until it reaches v1.0.0 you must consider all minor releases as breaking changes. Patch releases may introduce new features, but will be backwards compatible.

## Install

```js
npm install jquery-click-flyout
```

## Example

Markup before plugin:

```html
<div class="flyout">
    <button class="flyout__trigger" type="button">Notifications</button>
    <span class="flyout__live-region" aria-live="off">
        <div class="flyout__overlay">
            <!-- flyout content -->
        </div>
    </span>
</div>
```

Execute plugin:

```js
$('.flyout').clickFlyout();
```

Markup after plugin:

```html
<div class="flyout" id="flyout-0">
    <button class="flyout__trigger" type="button" aria-controls="flyout-0-overlay" aria-expanded="false">Notifications</button>
    <span class="flyout__live-region" aria-live="off">
        <div class="flyout__overlay" id="flyout-0-overlay">
            <!-- flyout content -->
        </div>
    </span>
</div>
```

'Click' event on button will now toggle aria-expanded state of button. CSS can use this state to hide/show overlay. For example:

```css
.flyout__overlay {
    display: none;
    position: absolute;
    z-index: 1;
}
.flyout__trigger[aria-expanded=true] ~ .flyout__live-region > .flyout__overlay {
    display: block;
}
```

## Options

* `autoCollapse` - auto collapse flyout when focus leaves the widget (default: true)
* `closeOnEsc` - collapse the flyout when ESCAPE key is pressed (default: false)
* `debug` - print debug statements to console (defualt: false)
* `focusManagement` - set focus to 'none, 'overlay', 'first' or an ID (default: 'none')
* `overlaySelector` - selector for overlay element (default: '.flyout__overlay')
* `triggerSelector` - selector for button element (default: '.flyout__trigger')

## Events

* `flyoutCollapse` - the flyout has collapsed
* `flyoutExpand` - the flyout has expanded

## Development

Useful NPM task runners:

* `npm start` for local browser-sync development.
* `npm test` runs tests & generates reports (see reports section below)
* `npm run tdd` test driven development: watches code and re-tests after any change
* `npm run build` cleans, lints, tests and minifies

Execute `npm run` to view all available CLI scripts.

## Reports

Each test run will generate the following reports:

* `/test_reports/coverage` contains Istanbul code coverage report
* `/test_reports/html` contains HTML test report
* `/test_reports/junit` contains JUnit test report

## CI Build

https://travis-ci.org/makeup-jquery/jquery-click-flyout

## Code Coverage

https://coveralls.io/github/makeup-jquery/jquery-click-flyout?branch=master
