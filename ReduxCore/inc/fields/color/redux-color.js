/**
 *  Field Color (color)
 */

/*global jQuery, document, redux_change, redux, colorValidate */

(function( $ ) {
	'use strict';

	redux.field_objects       = redux.field_objects || {};
	redux.field_objects.color = redux.field_objects.color || {};

	redux.field_objects.color.init = function( selector ) {

		if ( ! selector ) {
			selector = $( document ).find( '.redux-group-tab:visible' ).find( '.redux-container-color:visible' );
		}

		$( selector ).each(
			function() {
				var el     = $( this );
				var parent = el;

				if ( ! el.hasClass( 'redux-field-container' ) ) {
					parent = el.parents( '.redux-field-container:first' );
				}

				if ( parent.is( ':hidden' ) ) {
					return;
				}

				if ( parent.hasClass( 'redux-field-init' ) ) {
					parent.removeClass( 'redux-field-init' );
				} else {
					return;
				}

				el.find( '.redux-color-init' ).wpColorPicker(
					{
						change: function( e, ui ) {
							$( this ).val( ui.color.toString() );

							redux_change( $( this ) );

							el.find( '#' + e.target.getAttribute( 'data-id' ) + '-transparency' ).removeAttr( 'checked' );
						}, clear: function() {
							$( this ).val( '' );

							redux_change( $( this ).parent().find( '.redux-color-init' ) );
						}
					}
				);

				el.find( '.redux-color' ).on(
					'focus',
					function() {
						$( this ).data( 'oldcolor', $( this ).val() );
					}
				);

				el.find( '.redux-color' ).on(
					'keyup',
					function() {
						var value = $( this ).val();
						var color = colorValidate( this );
						var id    = '#' + $( this ).attr( 'id' );

						if ( 'transparent' === value ) {
							$( this ).parent().parent().find( '.wp-color-result' ).css( 'background-color', 'transparent' );

							el.find( id + '-transparency' ).attr( 'checked', 'checked' );
						} else {
							el.find( id + '-transparency' ).removeAttr( 'checked' );

							if ( color && color !== $( this ).val() ) {
								$( this ).val( color );
							}
						}
					}
				);

				// Replace and validate field on blur.
				el.find( '.redux-color' ).on(
					'blur',
					function() {
						var value = $( this ).val();
						var id    = '#' + $( this ).attr( 'id' );

						if ( 'transparent' === value ) {
							$( this ).parent().parent().find( '.wp-color-result' ).css( 'background-color', 'transparent' );

							el.find( id + '-transparency' ).attr( 'checked', 'checked' );
						} else {
							if ( colorValidate( this ) === value ) {
								if ( 0 !== value.indexOf( '#' ) ) {
									$( this ).val( $( this ).data( 'oldcolor' ) );
								}
							}

							el.find( id + '-transparency' ).removeAttr( 'checked' );
						}
					}
				);

				// Store the old valid color on keydown.
				el.find( '.redux-color' ).on(
					'keydown',
					function() {
						$( this ).data( 'oldkeypress', $( this ).val() );
					}
				);

				// When transparency checkbox is clicked.
				el.find( '.color-transparency' ).on(
					'click',
					function() {
						var prevColor;

						if ( $( this ).is( ':checked' ) ) {
							el.find( '.redux-saved-color' ).val( $( '#' + $( this ).data( 'id' ) ).val() );
							el.find( '#' + $( this ).data( 'id' ) ).val( 'transparent' );
							el.find( '#' + $( this ).data( 'id' ) ).parent().parent().find( '.wp-color-result' ).css( 'background-color', 'transparent' );
						} else {
							if ( 'transparent' === el.find( '#' + $( this ).data( 'id' ) ).val() ) {
								prevColor = $( '.redux-saved-color' ).val();

								if ( '' === prevColor ) {
									prevColor = $( '#' + $( this ).data( 'id' ) ).data( 'default-color' );
								}

								el.find( '#' + $( this ).data( 'id' ) ).parent().parent().find( '.wp-color-result' ).css( 'background-color', prevColor );

								el.find( '#' + $( this ).data( 'id' ) ).val( prevColor );
							}
						}

						redux_change( $( this ) );
					}
				);
			}
		);
	};

	redux.field_objects.color.customizer_preview_output = function( $selector_array, $style ) {
		// Expected Input
		// - type=>color, selector_array => {background_color: ".site-background", color: ".site-title"}, $style => #000000
		// Desired Output
		// - .site-background {background-color: #000000}, .site-title {color: #000000}
		var $output = [];
		if (typeof $selector_array === 'object') {
			Object.keys($selector_array).forEach(function($key) {
				var $atom = {};
				$atom[$key] = $style;

				$output.push(`${$selector_array[$key]} {${$key}: ${$style}}`);
			});
			return $output.join(", ");
		}

		return "CONTACT YOU Later";

	};
})( jQuery );
