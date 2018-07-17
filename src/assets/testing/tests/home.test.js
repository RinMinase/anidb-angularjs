module.exports = {
	tags: ["home"],

	'Home: Navbar and Footer': function(browser) {
		browser
			.url(browser.launchUrl + "login")
			.waitForElementVisible("body")
			.assert.title("Rin's Anime Database")
			.waitForElementVisible("input[type=email]")
			.waitForElementVisible("input[type=password]")
			.setValue("input[type=email]", "nightwatch@testing.com")
			.setValue("input[type=password]", "nightwatch")
			.submitForm("form")
			.assert.urlEquals(browser.launchUrl)
			.waitForElementVisible("body")
			.assert.elementPresent("anidb-navbar")
			.assert.elementPresent("anidb-footer")
			.end();
	},

	'Home: Add Modal': function(browser) {
		browser
			.url(browser.launchUrl + "login")
			.waitForElementVisible("body")
			.assert.title("Rin's Anime Database")
			.waitForElementVisible("input[type=email]")
			.waitForElementVisible("input[type=password]")
			.setValue("input[type=email]", "nightwatch@testing.com")
			.setValue("input[type=password]", "nightwatch")
			.submitForm("form")
			.assert.urlEquals(browser.launchUrl)
			.waitForElementVisible("body")
			.assert.elementPresent("a.btn-success")
			.click(".manage-home .row .form-group a.btn-success")
			.waitForElementVisible(".modal")
			.assert.containsText(".modal h4.modal-title", "Add Title")
			.end();
	}
};
