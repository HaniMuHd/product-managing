<script lang="ts">
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
	const currentYear = new Date().getFullYear();
</script>

<Footer
	class="rounded-none bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700
	shadow-inner">
	<div class="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row justify-between items-center gap-4">
			<FooterCopyright
				href="/"
				by="Product Manager™"
				year={currentYear}
				class="text-gray-600 dark:text-gray-400" />
			<!-- <FooterLinkGroup
				ulClass="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
				<FooterLink
					href="/about"
					class="hover:text-gray-900 dark:hover:text-white transition-colors">
					About
				</FooterLink>
				<FooterLink
					href="/privacy"
					class="hover:text-gray-900 dark:hover:text-white transition-colors">
					Privacy Policy
				</FooterLink>
				<FooterLink
					href="/terms"
					class="hover:text-gray-900 dark:hover:text-white transition-colors">
					Terms & Conditions
				</FooterLink>
				<FooterLink
					href="/contact"
					class="hover:text-gray-900 dark:hover:text-white transition-colors">
					Contact
				</FooterLink>
			</FooterLinkGroup> -->
		</div>
	</div>
</Footer>
