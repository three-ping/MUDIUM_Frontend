<template>
	<div>
		<details class="dropdown" ref="menu">
			<summary>Theme</summary>
			<ul>
				<li>
					<a href="#" data-theme-switcher="auto" @click.prevent="setScheme('auto')">Auto (System
						Preference)</a>
				</li>
				<li>
					<a href="#" data-theme-switcher="light" @click.prevent="setScheme('light')">Light</a>
				</li>
				<li>
					<a href="#" data-theme-switcher="dark" @click.prevent="setScheme('dark')">Dark</a>
				</li>
			</ul>
		</details>
	</div>
</template>

<script>
export default {
	data() {
		return {
			_scheme: 'auto',
			menuTarget: "details.dropdown",
			buttonAttribute: "data-theme-switcher",
			rootAttribute: "data-theme",
			localStorageKey: "picoPreferredColorScheme",
		};
	},
	computed: {
		preferredColorScheme() {
			return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		},
	},
	mounted() {
		this._scheme = this.schemeFromLocalStorage || 'auto';
		this.applyScheme();

		// Listen for system preference changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.handleSystemPreferenceChange);
	},
	beforeDestroy() {
		// Cleanup event listener when component is destroyed
		window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.handleSystemPreferenceChange);
	},
	methods: {
		setScheme(scheme) {
			if (scheme === 'auto') {
				this._scheme = this.preferredColorScheme;
			} else if (scheme === 'dark' || scheme === 'light') {
				this._scheme = scheme;
			}
			this.applyScheme();
			this.schemeToLocalStorage();
			this.closeDropdown();
		},
		applyScheme() {
			const scheme = this._scheme === 'auto' ? this.preferredColorScheme : this._scheme;
			document.querySelector('html')?.setAttribute(this.rootAttribute, scheme);
		},
		schemeToLocalStorage() {
			window.localStorage.setItem(this.localStorageKey, this._scheme);
		},
		closeDropdown() {
			this.$refs.menu.removeAttribute('open');
		},
		handleSystemPreferenceChange(event) {
			if (this._scheme === 'auto') {
				this.applyScheme();  // Apply new system preference if theme is set to auto
			}
		},
	},
	computed: {
		schemeFromLocalStorage() {
			return window.localStorage.getItem(this.localStorageKey) || this._scheme;
		},
	},
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
