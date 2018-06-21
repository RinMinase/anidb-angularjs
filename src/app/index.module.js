import "angular";
import "angular-animate";
import "angular-chart.js";
import "angular-filter";
import "angular-sweetalert";
import "ui-bootstrap4";
import uiRouter from "@uirouter/angularjs";
// import "angular-hammer";
// import "angular-messages";
// import "angular-sanitize";
// import "angular-toastr";

import "sweetalert";
import "velocity-animate";

import { config, run } from "./index.config";

import CoreModule from "./core/core.module";

import AboutModule from "./modules/about/about.module";
import ByNameModule from "./modules/byname/byname.module";
import DownloadModule from "./modules/download/download.module";
import HddModule from "./modules/hdd/hdd.module";
import HomeModule from "./modules/home/home.module";
import LastwatchModule from "./modules/lastwatch/lastwatch.module";
import LoginModule from "./modules/login/login.module";
import SummerModule from "./modules/summer/summer.module";

angular.module(
	"anidbAngular", [
		"angular.filter",
		"chart.js",
		// "hmTouchEvents",
		"ngAnimate",
		// "ngMessages",
		// "ngSanitize",
		"oitozero.ngSweetAlert",
		// "toastr",
		uiRouter,
		"ui.bootstrap",

		CoreModule.name,

		AboutModule.name,
		ByNameModule.name,
		DownloadModule.name,
		HddModule.name,
		HomeModule.name,
		LastwatchModule.name,
		LoginModule.name,
		SummerModule.name,
	])
	.config(config)
	.run(run);
