<template>
	<div>
		<details class="dropdown" ref="menu">
			<summary>Theme</summary>
			<ul>
				<li>
					<a href="#" data-theme-switcher="auto" @click.prevent="setScheme('auto')">Auto</a>
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
			document.querySelector('html')?.setAttribute(this.rootAttribute, this._scheme);
		},
		schemeToLocalStorage() {
			window.localStorage.setItem(this.localStorageKey, this._scheme);
		},
		closeDropdown() {
			this.$refs.menu.removeAttribute('open');
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
