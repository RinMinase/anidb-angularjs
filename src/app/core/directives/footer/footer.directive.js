import footerDOM from "./footer.html";

export function FooterDirective() {
	"ngInject";

	const directive = {
		restrict: "E",
		templateUrl: footerDOM,
		scope: {},
		controller: FooterController,
		controllerAs: "vm",
		bindToController: true,
	};

	return directive;
}

class FooterController {
	constructor() {
		"ngInject";
	}
}
