<script>
	import Navbar from "$lib/components/creatings/navbar.svelte";
	import Sidebar from "$lib/components/creatings/sidebar.svelte";
	import Courses from "$lib/components/learnings/courses.svelte";
	import Meetings from "../lib/components/creatings/meetings.svelte";
    import Spaces from "$lib/components/creatings/spaces.svelte";
	import {board , space} from "$lib/stores";
</script>

<!-- Main -->
<div class="w-full h-screen flex">
	<!-- Sidebar -->
	<Sidebar />
	<!-- Content -->
	<div class=" w-full pl-[250px]">
		<!-- <Navbar /> -->
		{#if $board == "Dashboard" }
			<Courses />
		{:else if $board == "Spaces"  }
			<Spaces />
		{:else if $board == "Meetings"  }
			<Meetings />
		{/if}
	</div>
</div>

<!-- <div class="bg-white h-[1000px] w-[10px]"></div> -->


