/**
* @file jQuery plugin that creates the basic interactivity for a flyout that opens on click of trigger element
* @version 0.0.3
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @requires jquery-next-id
* @requires jquery-focusable
* @requires jquery-focus-exit
*/
(function($, window, document, undefined) {
    /**
    * jQuery plugin that creates the basic interactivity for a flyout that opens on click of trigger element
    *
    * @method "jQuery.fn.clickFlyout"
    * @param {Object} [options]
    * @param {boolean} [options.autoCollapse] - collapse overlay when focus exits widget (default: true)
    * @param {boolean} [options.debug] - print debug statements to console (default: false)
    * @param {boolean} [options.focusManagement] - set focus to 'none, 'overlay', 'first' or an ID (default: 'none')
    * @param {boolean} [options.overlaySelector] - css selector for overlay element (default: '.flyout__overlay')
    * @param {boolean} [options.triggerSelector] - css selector for button element (default: '.flyout__trigger')
    * @fires {object} flyoutCollapse - the flyout has collapsed
    * @fires {object} flyoutExpand - the flyout has expanded
    * @return {jQuery} chainable jQuery class
    */
    $.fn.clickFlyout = function clickFlyout(options) {
        options = $.extend({
            autoCollapse: true,
            debug: false,
            focusManagement: 'none',
            triggerSelector: '.flyout__trigger',
            overlaySelector: '.flyout__overlay'
        }, options);

        return this.each(function onEach() {
            var $widget = $(this);
            var $trigger = $widget.find(options.triggerSelector).first();
            var $overlay = $widget.find(options.overlaySelector).first();

            var isExpanded = function() {
                return $trigger.attr('aria-expanded') === 'true';
            };

            var setFocusToOverlay = function() {
                $overlay.focus();
            };

            var setFocusToFirst = function() {
                $overlay.focusable().first().focus();
            };

            var setFocusToId = function() {
                $overlay.find('#' + options.focusManagement).focus();
            };

            var getFocusManagementBehaviour = function() {
                var func;

                switch (options.focusManagement) {
                    case 'none':
                        func = Function;
                        break;
                    case 'overlay':
                        $overlay.attr('tabindex', '-1');
                        func = setFocusToOverlay;
                        break;
                    case 'first':
                        func = setFocusToFirst;
                        break;
                    default:
                        func = setFocusToId;
                        break;
                }

                return func;
            };

            // cache the focus management routine
            var doFocusManagement = getFocusManagementBehaviour();

            // set state to expanded
            var expandFlyout = function(e) {
                if (isExpanded() === false) {
                    $trigger.attr('aria-expanded', 'true');
                    $overlay.attr('aria-hidden', 'false');
                    $widget.trigger('flyoutExpand');
                    doFocusManagement();
                }
            };

            // set state to collapsed
            var collapseFlyout = function(e) {
                if (isExpanded() === true) {
                    $trigger.attr('aria-expanded', 'false');
                    $overlay.attr('aria-hidden', 'true');
                    $widget.trigger('flyoutCollapse');
                }
            };

            // toggle visibility of overlay element
            var toggleFlyout = function(e) {
                var _void = isExpanded() ? collapseFlyout() : expandFlyout();
            };

            // handler for click event on trigger
            var onTriggerClick = function(e) {
                toggleFlyout();
            };

            // assign next id in sequence if one doesn't already exist
            $widget.nextId('flyout');

            // the button controls the overlay's expanded state
            $trigger
                .attr('aria-controls', $overlay.prop('id'))
                .attr('aria-expanded', 'false');

            // listen for click events on trigger
            $trigger.on('click', onTriggerClick);

            // listen for focus exit if autoCollapse is true
            if (options.autoCollapse === true) {
                $widget.focusExit().on('focusExit', collapseFlyout);
                $trigger.on('focus', collapseFlyout);
            }

            // assign id to overlay and hide element
            $overlay
                .prop('id', $widget.prop('id') + '-overlay')
                .attr('aria-hidden', 'true');

            // add class to signify that js is available
            $widget.addClass('flyout--js');
        });
    };
}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* flyoutExpand event
*
* @event flyoutExpand
* @type {object}
* @property {object} event - event object
*/

/**
* flyoutCollapse event
*
* @event flyoutCollapse
* @type {object}
* @property {object} event - event object
*/
