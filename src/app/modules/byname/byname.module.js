import { ByNameController } from "./byname.controller";

import byNameDOM from "./byname.html";

export default angular
	.module("byname", [])
	.controller("ByNameController", ByNameController)
	.config(($stateProvider) => {
		$stateProvider
			.state("byname", {
				url: "/byname",
				templateUrl: byNameDOM,
				controller: "ByNameController",
				controllerAs: "vm",
			});
	});
