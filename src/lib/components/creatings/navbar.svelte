<script>
	// import { page } from "$app/stores";
    // $: Pgon = $page.route.id;
	import Frost from "../frosted.svelte";
	import {board} from "$lib/stores"
	var comp = "learning";

	function view(mode){
		// console.log(mode);
		if(mode == "learning"){
			comp="learning"
		} else if(mode == 'creating'){
			comp="creating"
		}
	}
</script>
<!-- <div class="fixed flex justify-between items-center top-0 z-50 bg-white bg-opacity-20 backdrop-blur-lg backdrop-filter backdrop-saturate-200" style="width: -webkit-fill-available; box-shadow: inset 0px 0px 12px 0px #A9C6FF;">
<div class="flex justify-between items-center top-0 z-50 bg-white bg-opacity-80 px-4 py-2 backdrop-blur-lg backdrop-filter backdrop-saturate-200" style="width: -webkit-fill-available;"> -->
<!-- svelte-ignore missing-declaration -->
<Frost cssS="flex justify-between items-center top-0 z-50 bg-white bg-opacity-80 px-4 py-2">
	<div class="logo font-bold text-base">Apni Company</div>
	 
	<div class="center">
	  <ul class="gap-6 flex items-center text-sm cursor-pointer">
		{#if $board == "Dashboard"}
			<li on:click={()=>{board.set("Dashboard")}} class="border-b-4 border-[#0066FF] scale-110 text-[#0066FF] py-1 px-1"><i class="fa fa-dashboard mr-1"></i>Dashboard</li>
		{:else}
			<li on:click={()=>{board.set("Dashboard")}} class="hover:border-[#0066FF] border-transparent hover:scale-110 hover:text-[#0066FF] border-b-4 hover:border-b-4 py-1 px-1"><i class="fa fa-dashboard mr-1"></i>Dashboard</li>
		{/if}
		{#if $board == "Projects"}
			<li on:click={()=>{board.set("Projects")}} class="border-b-4 border-[#0066FF] scale-110 text-[#0066FF] py-1 px-1"><i class="fa-solid fa-clipboard-list mr-1"></i>Projects</li>
		{:else}
			<li on:click={()=>{board.set("Projects")}} class="hover:border-[#0066FF] border-transparent hover:scale-110 hover:text-[#0066FF] border-b-4 hover:border-b-4 py-1 px-1 flex items-center"><i class="fa-solid fa-clipboard-list mr-1"></i>Projects</li>
		{/if}
		{#if $board == "Meetings"}
			<li on:click={()=>{board.set("Meetings")}} class="border-b-4 border-[#0066FF] scale-110 text-[#0066FF] py-1 px-1"><i class="fa fa-users mr-1"></i>Meetings</li>
		{:else}
			<li on:click={()=>{board.set("Meetings")}} class="hover:border-[#0066FF] border-transparent hover:scale-110 hover:text-[#0066FF] border-b-4 hover:border-b-4 py-1 px-1"><i class="fa fa-users mr-1"></i>Meetings</li>
		{/if}
		{#if $board == "Earnings"}
			<li on:click={()=>{board.set("Earnings")}} class="border-b-4 border-[#0066FF] scale-110 text-[#0066FF] py-1 px-1"><i class="fa fa-rupee mr-1"></i>Earnings</li>
		{:else}
			<li on:click={()=>{board.set("Earnings")}} class="hover:border-[#0066FF] border-transparent hover:scale-110 hover:text-[#0066FF] border-b-4 hover:border-b-4 py-1 px-1"><i class="fa fa-rupee mr-1"></i>Earnings</li>
		{/if}
	  </ul>
	</div>
	<div class="acc flex items-center gap-5">
		<div class="relative w-[145px] h-9 bg-[#5790FF] rounded-full">
			<ul class="absolute flex w-full h-9 items-center text-center text-[13px] z-10">
				<li class="w-1/2 py-1 px-2 rounded-full items-center transition-all duration-300 cursor-pointer {comp == 'learning' ? 'text-black font-medium':'text-white'}" on:click={()=>view("learning")}>Learning</li>
				<li class="w-1/2 py-1 px-2 rounded-full items-center transition-all duration-300 cursor-pointer {comp == 'creating' ? 'text-black font-medium':'text-white'}" on:click={()=>view("creating")}>Creating</li>
			</ul>
			<div class="absolute top-1 bg-white h-7 w-1/2 rounded-full transition-all duration-300 {comp=='learning' ? 'left-1' : 'left-[48%]'}"></div>
		</div>
	  <i class="fa fa-calendar flex items-center text-lg px-2 rounded-full w-8 h-8 hover:bg-gray-400 hover:text-white cursor-pointer"></i>
	  <i class="fa fa-bell flex items-center text-lg px-2 rounded-full w-8 h-8 hover:bg-gray-400 hover:text-white cursor-pointer"></i>
	  <img src="user.png" class="w-10 cursor-pointer" alt="">
	</div>
</Frost>