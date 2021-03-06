const { task, src, dest, series } = require("gulp");
const conf = require("../../../gulpfile.js");

const angularTemplatecache = require("gulp-angular-templatecache");
const clean = require("gulp-clean");
const filter = require("gulp-filter");
const htmlmin = require("gulp-htmlmin");
const inject = require("gulp-inject");
const rev = require("gulp-rev");
const revReplace = require("gulp-rev-replace");
const useref = require("gulp-useref");

const htmlminOptions = {
	removeComments: true,
	removeEmptyAttributes: true,
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
};

task("html", () => {
	const htmlFilter = filter("*.html", { restore: true });
	const jsFilter = filter("**/*.js", { restore: true });
	const cssFilter = filter("**/*.css", { restore: true });
	const partialsFile = src(`${conf.paths.tmp}/serve/app/index.template.js`, { read: false });
	const partialsOptions = {
		starttag: "<!-- inject:partials -->",
		ignorePath: `${conf.paths.tmp}/serve`,
		addRootSlash: false,
		transform: (path) => `<script src="${path}" defer></script>`,
	};

	return src(`${conf.paths.tmp}/serve/*.html`)
		.pipe(inject(partialsFile, partialsOptions))
		.pipe(useref({ noconcat: true }))
		.pipe(jsFilter)
		.pipe(rev())
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		.pipe(rev())
		.pipe(cssFilter.restore)
		.pipe(revReplace())
		.pipe(htmlFilter)
		.pipe(htmlFilter.restore)
		.pipe(dest(`${conf.paths.dist}/`))
		.on("end", () =>
			src(`${conf.paths.dist}/index.html`)
				.pipe(clean())
				.pipe(htmlmin(htmlminOptions))
				.pipe(dest(`${conf.paths.dist}/`))
				.on("end", series("clean:tmp"))
		);
});

task("partials", () =>
	src([
		`${conf.paths.src}/app/**/*.html`,
		`${conf.paths.tmp}/serve/app/**/*.html`,
	]).pipe(htmlmin(htmlminOptions))
		.pipe(angularTemplatecache(
			"index.template.js", {
				module: "anidbAngular",
				root: "app",
			}
		))
		.pipe(dest(`${conf.paths.tmp}/serve/app/`))
);

task("other", () =>
	src([
		`${conf.paths.src}/**/*`,
		`!${conf.paths.src}/**/*.{html,css,js,scss}`,
		`!${conf.paths.src}/assets/firebase/*`,
		`!${conf.paths.src}/assets/testing/*`,
		`!${conf.paths.src}/assets/robots.txt`,
		`!${conf.paths.src}/assets/.env.example`,
		`!${conf.paths.src}/assets/.env`,
		`!${conf.paths.src}/res/**/*`,
	]).pipe(filter((file) => file.stat.isFile()))
		.pipe(dest(`${conf.paths.dist}/`))
		.on("end", () =>
			src(`${conf.paths.src}/assets/robots.txt`)
				.pipe(dest(`${conf.paths.dist}/`))
		)
);

task("relocate", () =>
	src(`${conf.paths.dist}/**/*`)
		.pipe(dest(conf.paths.www))
);
