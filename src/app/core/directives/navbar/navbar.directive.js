import extend from "lodash/extend";

import navbarDOM from "./navbar.html";

export function NavbarDirective() {
	"ngInject";

	const directive = {
		restrict: "E",
		templateUrl: navbarDOM,
		scope: {},
		controller: NavbarController,
		controllerAs: "vm",
		bindToController: true,
	};

	return directive;
}

class NavbarController {
	constructor($state, firebase) {
		"ngInject";

		extend(this, {
			$state,
			firebase,
		});
	}

	logout() {
		this.firebase.logout()
			.then(() => this.$state.go("login"));
	}
}
