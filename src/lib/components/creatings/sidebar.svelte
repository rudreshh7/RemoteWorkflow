<script>
	import { onMount } from 'svelte';
	import {board, space, spaceName} from '$lib/stores';
	// import { navigate } from "svelte-routing";
	// import frosted from "$lib/components/frosted.svelte";

	var spaces=[
		{id:0, name:"Design", team:[{id:0, name:"Edward", profile:"Edward.png", msg:""},{id:1, name:"Stan", profile:"Stan.png", msg:""},{id:2, name:"Elly", profile:"Elly.png", msg:""},{id:3, name:"John", profile:"John.png", msg:""},{id:4, name:"Tony", profile:"Tony.png", msg:""}]},
		{id:1, name:"Development", team:[{id:5, name:"Stew", profile:"Stew.png", msg:""},{id:6, name:"Eddy", profile:"Eddy.png", msg:""},{id:7, name:"Sara", profile:"Sara.png", msg:""},{id:8, name:"Tarun", profile:"Tarun.png", msg:""},{id:9, name:"Varun", profile:"Varun.png", msg:""}]},
		{id:2, name:"Marketing", team:[{id:10, name:"Stew", profile:"Stew.png", msg:""},{id:11, name:"Eddy", profile:"Eddy.png", msg:""},{id:12, name:"Sara", profile:"Sara.png", msg:""},{id:13, name:"Tarun", profile:"Tarun.png", msg:""},{id:14, name:"Varun", profile:"Varun.png", msg:""}]},
	];
	var category={
		"Design":[
			{id:'c1', status:true, boco:'#11CD00', title:'Completed', tasks:[{id:1, name:'task-1', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-13T11:45:00.000Z", start: "2023-06-13T09:45:00.000Z"},{id:2, name:'task-5', due:'13-12-2023', assignee:'Vanshaf uguayg fyuagfuyagffgf', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"},{id:3, name:'task-6', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"},{id:4, name:'task-7', due:'13-12-2023', assignee:'Modi', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c2', status:true, boco:'#DCDC00', title:'Ongoing', tasks:[{id:5, name:'task-2', due:'13-12-2023', assignee:'Prajju', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c3', status:true, boco:'#FF0000', title:'Updates', tasks:[{id:6, name:'task-3', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c4', status:true, boco:'#0037FC', title:'Pending', tasks:[{id:7, name:'task-4', due:'13-12-2023', assignee:'Vansh', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]}
		],
		"Development":[
			{id:'c1', status:true, boco:'#11CD00', title:'Completed', tasks:[{id:1, name:'task-1', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-13T11:45:00.000Z", start: "2023-06-13T09:45:00.000Z"},{id:2, name:'task-5', due:'13-12-2023', assignee:'Vanshaf uguayg fyuagfuyagffgf', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"},{id:3, name:'task-6', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"},{id:4, name:'task-7', due:'13-12-2023', assignee:'Modi', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c2', status:true, boco:'#DCDC00', title:'Ongoing', tasks:[{id:5, name:'task-2', due:'13-12-2023', assignee:'Prajju', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c3', status:true, boco:'#FF0000', title:'Updates', tasks:[{id:6, name:'task-3', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c4', status:true, boco:'#0037FC', title:'Pending', tasks:[{id:7, name:'task-4', due:'13-12-2023', assignee:'Vansh', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]}
		],
		"Marketing":[
			{id:'c1', status:true, boco:'#11CD00', title:'Completed', tasks:[{id:1, name:'task-1', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-13T11:45:00.000Z", start: "2023-06-13T09:45:00.000Z"},{id:2, name:'task-5', due:'13-12-2023', assignee:'Vanshaf uguayg fyuagfuyagffgf', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"},{id:3, name:'task-6', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"},{id:4, name:'task-7', due:'13-12-2023', assignee:'Modi', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c2', status:true, boco:'#DCDC00', title:'Ongoing', tasks:[{id:5, name:'task-2', due:'13-12-2023', assignee:'Prajju', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c3', status:true, boco:'#FF0000', title:'Updates', tasks:[{id:6, name:'task-3', due:'13-12-2023', assignee:'Samyak', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]},
			{id:'c4', status:true, boco:'#0037FC', title:'Pending', tasks:[{id:7, name:'task-4', due:'13-12-2023', assignee:'Vansh', backgroundColor: "green", end: "2023-06-12T11:42:17.000Z", start: "2023-06-12T09:42:17.000Z"}]}
		],
	};
	
	var v=false, n, i;
	let h;

	

	
	
	function viewspace(names){
		board.set("Spaces");
		space.set(category[names]);
		spaceName.set(names)
	}
</script>

<div class="w-[250px] border z-50 fixed top-0 bottom-0 ;" bind:clientHeight={h}>
	
	<div class="w-[250px] fixed top-0 bottom-0 h-screen px-2 my-0" bind:clientHeight={h}>
		<div class="text-slate-700">Workflow</div>
	  <div class="bg-opacity-80 bg-white  my-3 mx-1.5">
		<!-- <div class="py-5 px-2">
		 Dashboard
		 </div>
		
		<div class=" py-5 px-2">
			Meetings
		   </div>
		   <div class="py-5 px-2">
		Courses
		   </div>
		   <div class=" py-5 px-2">
			Profile
		   </div> -->

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
	  </div>


	  <div class="text-slate-400">Spaces</div>
	  
	  <div class="relative overflow-auto mt-2 pb-1 px-1" style="height: {h - 289}px;">
		{#each spaces as s}
		  <div class="relative p-1 px-2 mt-3.5 rounded-2xl" style="box-shadow: 0 0 5px -1px #5790FF;">
			<div class="flex items-center px-1 justify-between cursor-pointer" on:click={()=>viewspace(s.name)}>
			  <p class="mt-1 font-medium text-xs">{s.name}</p>
			  <i class="fa fa-angle-right mt-2"></i>
			</div>
			<hr class="mt-2 h-1">
			<div class="flex items-center text-center mt-1 overflow-x-auto pb-2">
			  <div class="flex w-fit">
				{#each s.team as t}
				  <!-- svelte-ignore a11y-click-events-have-key-events -->
				  <div class="w-14">
				  </div>
				{/each}
			  </div>
			</div>
		  </div>  
		{/each}
	  </div>
	</div>
  </div>
  


<style>
	::-webkit-scrollbar{
	 	height:0px;
		width: 0px;
	}
	::-webkit-scrollbar-thumb{
		background: rgb(202, 202, 202);
		border-radius: 10px;
	}
</style>