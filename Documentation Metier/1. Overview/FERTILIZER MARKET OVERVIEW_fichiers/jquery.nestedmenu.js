/*
 * Fonction permettant de générer le dropdown du menu principal
 */
(function($) {
	$.fn.nestedmenu = function() {
		$menu = this;
		$menu.find('li').hover(function() {
			$(this).addClass("selected");
		}, function() {
			$(this).removeClass("selected");
		});
	};
}(jQuery));