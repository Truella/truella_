<script lang="ts">
	import Readme from '$lib/components/sections/Readme.svelte';
	import PackageJson from '$lib/components/sections/PackageJson.svelte';
	import Changelog from '$lib/components/sections/Changelog.svelte';
</script>

<Readme />
<p class="editor-section-divider">{'{/* ─────────────────── */}'}</p>
<PackageJson />
<p class="editor-section-divider">{'{/* ─────────────────── */}'}</p>
<Changelog />
