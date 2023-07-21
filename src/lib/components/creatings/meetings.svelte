<script>
    // import Card from "$lib/components/creatings/kanban/Kanban.svelte";
    import { clickOutside } from "$lib/clickOutside.js";
    import { viewStores, events } from "$lib/stores.js";
    import Calander from "./Calendar-Meet.svelte";
	// var meet=[
	// 	{color:"#DCDC00", time:"2:20 PM", duration:"30 minutes", title:"UI/UX Design Conference Meeting", host:"Meghan Smith", date:"May 08, 2023", sorted: "Ongoing", status:"Started 5m ago"},
	// 	{color:"#0037FC", time:"2:20 PM", duration:"30 minutes", title:"UI/UX Design Conference Meeting", host:"Meghan Smith", date:"May 08, 2023", sorted: "Upcoming", status:"Upcoming"},
	// 	{color:"#FF0000", time:"2:20 PM", duration:"30 minutes", title:"UI/UX Design Conference Meeting", host:"Meghan Smith", date:"May 08, 2023", sorted: "Cancelled", status:"Cancelled"},
	// 	{color:"#11CD00", time:"2:20 PM", duration:"30 minutes", title:"UI/UX Design Conference Meeting", host:"Meghan Smith", date:"May 08, 2023", sorted: "Completed", status:"Completed"},
	// 	{color:"#11CD00", time:"2:20 PM", duration:"30 minutes", title:"UI/UX Design Conference Meeting", host:"Meghan Smith", date:"May 08, 2023", sorted: "Completed", status:"Completed"},
	// 	{color:"#11CD00", time:"2:20 PM", duration:"30 minutes", title:"UI/UX Design Conference Meeting", host:"Meghan Smith", date:"May 08, 2023", sorted: "Completed", status:"Completed"},
	// 	{color:"#11CD00", time:"2:20 PM", duration:"30 minutes", title:"UI/UX Design Conference Meeting", host:"Meghan Smith", date:"May 08, 2023", sorted: "Completed", status:"Completed"},
	// ]

	// var cardtext="", cardbg="", listtext="", listbg="";
    let h = 500, h2;
	
	// function view(mode){
	// 	if(mode=="card"){
	// 		comp="card";
	// 	} else if(mode == 'list'){
	// 		comp="list";
	// 	}
	// }
    let showOptions= false;
    var select = "l";
    function selected(val) {
        select = val;
    }
    viewStores.set("All");
    var meetsort = $events;
	function sort(val) {
		viewStores.set(val);
		meetsort = [];
		for (let i = 0; i < $events.length; i++) {
			if ($viewStores == $events[i].status) {
				meetsort = [...meetsort, $events[i]];
			}
			else if($viewStores == "All"){
				meetsort = $events;
			}
		}
		console.log(meetsort);
	}
    function changetime(t) {
		const utcTime = new Date(t);
		utcTime.setUTCHours(utcTime.getUTCHours() - 5);
		utcTime.setUTCMinutes(utcTime.getUTCMinutes() - 30);
		const normalTime = utcTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

		console.log(normalTime);
		return(normalTime)
	}
	function startDate(d) {
		const utcDate=new Date(d)
		const options = { day: '2-digit', month: 'short' };
		const localDate = utcDate.toLocaleDateString('en-US', options);

		console.log(localDate);
		return(localDate)
	}
	function duration(s,e) {
		const startTime = new Date(s);
		const endTime = new Date(e);
		const durationMs = endTime - startTime;
		const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
		const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
		let d;
		if (durationHours == 0) {
			d = durationMinutes + ' min';
		}
		else{
			d = durationHours + ':' + durationMinutes + ' min';
		}
		return(d);
	}
	function Ongoing(s) {
		console.log(s);
		var startTime = new Date(s)
      startTime.setMinutes(startTime.getMinutes() + startTime.getTimezoneOffset());
	  console.log(startTime);
		const endTime = new Date();
		const durationMs = endTime - startTime;
		const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
		const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
		let d;
		if (durationHours == 0) {
			d = durationMinutes + ' mins ago';
		}
		else if(durationMinutes <= 0){
			d = 'Not Started';
		}
		else{
			d = durationHours + 'h ' + durationMinutes + 'm ago';
		}
		// console.log(durationHours);
		return(d);
	}
</script>
<div class="h-screen absolute -z-30" bind:clientHeight={h}></div>
<div class="main w-full pl-4 pr-2" style="width: -webkit-fill-available;">
    <div class="top w-full m-3">
        <div class="flex justify-between">
            <h1 class="text-[22px] ml-2 font-bold">Your meetings</h1>
            <div class="relative w-[200px] h-9 bg-gray-200 py-1 mr-7 rounded-full">
                <ul class="absolute w-full flex items-center text-center text-sm z-10">
                    <li class="flex justify-center items-center w-1/2 gap-2 cursor-pointer px-2 py-1 transition-all duration-300 {select=='c' ? 'text-white font-medium':'text-black'} rounded-full" on:click={()=>selected('c')}><i class="fa fa-calendar"></i> Calendar</li>
                    <li class="flex justify-center items-center w-1/2 gap-2 cursor-pointer px-2 py-1 transition-all duration-300 {select=='l' ? 'text-white font-medium':'text-black'} rounded-full" on:click={()=>selected('l')}><i class="fa-solid fa-list-ul"></i>List</li>
                </ul>
                <div class="h-9 w-1/2 absolute top-0 bg-black transition-all duration-300 rounded-full  {select=='c'? 'left-0' : select=='l' ? 'left-1/2' : ''}"></div>
            </div>
        </div>
    </div>
    <div class="bottom flex gap-4">
        <div class="left py-2 mt-3 rounded-2xl w-full" style="box-shadow: 0 0 5px #E0E0E0; height: {h - 130}px;">
            {#if select=="l"}
                <div class="px-5 overflow-auto"  style="height: {h - 145}px;">
                    <div class="flex justify-between mb-3">
                        <span></span>
                        <!-- <p class="font-medium my-2">Today</p> -->
                        <div class="w-32 relative flex justify-end">
                            <button type="button" on:click={()=>{showOptions = !showOptions;}} use:clickOutside on:click_outside={()=>{showOptions = false;}} class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 mr-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50" id="menu-button" aria-expanded="false" aria-haspopup="true">
                                {$viewStores}
                                <svg class="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                            <div class="{showOptions?"":"hidden"} focus:outline-none absolute z-30 right-0 mt-11 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                <a href={null} on:click={()=>{sort("All")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">All</a>
                                <a href={null} on:click={()=>{sort("Ongoing")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Ongoing</a>
                                <a href={null} on:click={()=>{sort("Upcoming")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Upcoming</a>
                                <a href={null} on:click={()=>{sort("Completed")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Completed</a>
                                <a href={null} on:click={()=>{sort("Cancelled")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Cancelled</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {#each meetsort as m}
                    <div class="flex mb-3 w-full">
                        <div class="flex w-full h-16 items-center border-l-2 rounded-[10px] px-2" style="box-shadow: 0 0 5px #E0E0E0; border-color: {m.color};">
                            <div class="left w-[100px]">
                                <p class="w-fit m-auto font-medium text-sm">{changetime(m.start)}</p>
                                <p class="w-fit m-auto font-medium text-xs text-gray-400">{duration(m.start, m.end)}</p>
                            </div>
                            <div class="w-0.5 h-[70%] bg-gray-200"></div>
                            <div class="right w-full flex items-center justify-between px-5">
                                <div class="left">
                                    <p class="font-medium text-[13px]">{m.title}</p>
                                    <p class="text-[11px] text-gray-400 font-medium">
                                        Created by <span class="text-black">{m.host}</span>
                                    </p>
                                </div>
                                <div class="right w-[25%] min-w-[130px] flex items-center justify-between">
                                    <div class="first mr-1 w-[100px]">
                                        <p class="w-fit m-auto font-medium text-[15px]">{startDate(m.start)}</p>
                                        {#if  m.status == "Ongoing"}
                                            <p class="w-fit m-auto font-medium text-xs" style="color: {m.color};">{Ongoing(m.start)}</p>
                                        {:else}
                                            <p class="w-fit m-auto font-medium text-xs" style="color: {m.color};">{m.status}</p>
                                        {/if}
                                    </div>
                                    <div class="second text-lg text-slate-400 flex gap-4">
                                        <i class="fa-regular fa-pen-to-square cursor-pointer hover:text-black"></i>
                                        <i class="fa-solid fa-close cursor-pointer hover:text-black"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                      
                    {/each}
                </div>
            {:else}
                <div class="px-3 overflow-auto"  style="height: {h - 145}px;" bind:clientHeight={h2}>
                    <!-- <Card heights="{h2}" /> -->
                    <Calander />
                </div>
            {/if}
        </div>
        <div class="right mt-2 w-[340px] {select=="c" ? 'hidden' : ''} flex flex-col items-center justify-center gap-3">
            <div class="middle w-full py-2.5 px-2.5 text-center rounded-2xl" style="box-shadow: 0 0 5px #E0E0E0;">
                <p class="font-bold text-lg">Klatsch Details</p>
                <p class="flex items-center justify-center gap-1 text-blue-500 mt-1.5 text-xs font-semibold"><i class="fa fa-circle text-[8px]"></i>Confirmed</p>
                <div class="flex gap-4 justify-center items-center mt-4">
                    <img src="meet1.jpg" class="w-16 h-16 rounded-full" alt="">
                    <img src="cup.png" class="h-8" alt="">
                    <img src="meet2.jpg" class="w-16 h-16 rounded-full" alt="">
                </div>
                <div class="mt-2">
                    <p class="font-bold text-lg">Meghan Smith</p>
                    <p class="font-medium text-sm text-gray-400">+1(987)78-0497</p>
                </div>
                <hr class="w-[90%] m-auto bg-gray-300 mt-3 h-0.5">
                <div class="text-left px-5 mt-3 space-y-3">
                    <div class="">
                        <p class="font-bold text-[15px]">Topic</p>
                        <p class="font-medium text-gray-400 text-xs">UI/UX Design Conference Meeting</p>
                    </div>
                    <div class="">
                        <p class="font-bold text-[15px]">Date & Time</p>
                        <p class="font-medium text-gray-400 text-xs">2:20 PM - 2:50 PM</p>
                    </div>
                    <div class="">
                        <p class="font-bold text-[15px]">Duration</p>
                        <p class="font-medium text-gray-400 text-xs">30 minutes</p>
                    </div>
                </div>
                <hr class="w-[90%] m-auto bg-gray-300 mt-3 h-0.5">
                <div class="flex justify-center items-center mt-2 gap-6">
                    <p class="font-medium">Status</p>
                    <p class="font-medium text-gray-400 text-sm">Not started</p>
                </div>
            </div>
            <div class="bottom">
                <div class="flex items-center gap-2 bg-green-600 text-white rounded-full px-6 py-2 cursor-pointer text-sm">
                    <i class="fa-solid fa-video fa-lg mt-1"></i>
                    <a href="https://meet.google.com/zfn-qust-gfy" class="font-bold">Join meeting</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- <div class="main w-full flex justify-between mt-[75px] gap-2 pl-5 pr-2">
    <div class="left" style="width: -webkit-fill-available;">
        <div class="head">
            <div class="flex justify-between">
                <h1 class="text-[22px] font-bold">Your meetings</h1>
                <div class="relative w-[200px] h-9 bg-gray-200 py-1 rounded-full">
                    <ul class="absolute w-full flex items-center text-center text-sm z-10">
                        <li class="flex justify-center items-center w-1/2 gap-2 cursor-pointer px-2 py-1 transition-all duration-300 {select=='c' ? 'text-white font-medium':'text-black'} rounded-full" on:click={()=>selected('c')}><img src="card.png" alt=""> Calendar</li>
                        <li class="flex justify-center items-center w-1/2 gap-2 cursor-pointer px-2 py-1 transition-all duration-300 {select=='l' ? 'text-white font-medium':'text-black'} rounded-full" on:click={()=>selected('l')}><i class="fa-solid fa-list-ul"></i>List</li>
                    </ul>
                    <div class="h-9 w-1/2 absolute top-0 bg-black transition-all duration-300 rounded-full  {select=='c'? 'left-0' : select=='l' ? 'left-1/2' : ''}"></div>
                </div>
            </div>
        </div>
        <div class="w-full">
            <div class="py-2 mt-3 rounded-2xl w-[100%]" style="box-shadow: 0 0 5px #E0E0E0; height: {h - 130}px;">
                {#if select=="l"}
                    <div class="px-5 overflow-auto"  style="height: {h - 145}px;">
                        <div class="flex justify-between mb-3">
                            <p class="font-medium my-2">Today</p>
                            <div class="w-32 relative">
                                <button type="button" on:click={()=>{showOptions = !showOptions;}} use:clickOutside on:click_outside={()=>{showOptions = false;}} class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 ml-6 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50" id="menu-button" aria-expanded="false" aria-haspopup="true">
                                    {$viewStores}
                                    <svg class="ml-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <div class="{showOptions?"":"hidden"} focus:outline-none absolute z-30 right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                    <a href={null} on:click={()=>{sort("All")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">All</a>
                                    <a href={null} on:click={()=>{sort("Ongoing")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Ongoing</a>
                                    <a href={null} on:click={()=>{sort("Upcoming")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Upcomings</a>
                                    <a href={null} on:click={()=>{sort("Completed")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Completed</a>
                                    <a href={null} on:click={()=>{sort("Cancelled")}} class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Cancelled</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {#each meetsort as m}
                            <div class="mb-3">
                                <div class="border-l-2 rounded-xl flex items-center space-x-4 px-4 h-16 w-[100%]" style="box-shadow: 0 0 5px #E0E0E0; border-color: {m.color};">
                                    <div class="w-[10%] ml-5">
                                        <p class="font-medium text-base">{m.time}</p>
                                        <p class="text-xs font-medium text-gray-400">{m.duration}</p>
                                    </div>
                                    <div class="w-0.5 h-[70%] bg-gray-200"></div>
                                    <div class="flex space-x-4 items-center w-[70%]">
                                        <div class="w-[70%]">
                                            <p class="font-medium text-sm">{m.title}</p>
                                            <p class="text-xs text-gray-400 font-medium">
                                                Created by 
                                                <span class="text-black">{m.host}</span>
                                            </p>
                                        </div>
                                        <div class="w-[30%]">
                                            <p class="font-medium text-[15px]">{m.date}</p>
                                            <p class="font-medium text-xs" style="color: {m.color};">{m.status}</p>
                                        </div>
                                    </div>
                                    <div class="flex justify-between w-[8%] text-xl text-slate-400 ">
                                        <i class="fa-regular fa-pen-to-square cursor-pointer hover:text-black"></i>
                                        <i class="fa-solid cursor-pointer hover:text-black"></i>
                                    </div>
                                </div>				
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="px-5 overflow-auto"  style="height: {h - 145}px;">
                        <Card />
                    </div>
                {/if}
            </div>
		</div>
    </div>
    <div class="right w-[340px] {select=="c" ? 'hidden' : ''} flex flex-col items-center justify-center gap-3">
        <div class="top">
            <div class="flex items-center gap-2 bg-[#5790FF] text-white rounded-full px-4 py-2 cursor-pointer text-sm">
                <i class="fa fa-plus fa-lg mt-1"></i>
                <p class="">Meeting</p>
            </div>
        </div>
        <div class="middle w-full py-2.5 px-2.5 text-center rounded-2xl" style="box-shadow: 0 0 5px #E0E0E0;">
            <p class="font-bold text-lg">Klatsch Details</p>
            <p class="flex items-center justify-center gap-1 text-blue-500 mt-1.5 text-xs font-semibold"><i class="fa fa-circle text-[8px]"></i>Confirmed</p>
            <div class="flex gap-4 justify-center items-center mt-4">
                <img src="meet1.jpg" class="w-16 h-16 rounded-full" alt="">
                <img src="cup.png" class="h-8" alt="">
                <img src="meet2.jpg" class="w-16 h-16 rounded-full" alt="">
            </div>
            <div class="mt-2">
                <p class="font-bold text-lg">Meghan Smith</p>
                <p class="font-medium text-sm text-gray-400">+1(987)78-0497</p>
            </div>
            <hr class="w-[90%] m-auto bg-gray-300 mt-3 h-0.5">
            <div class="text-left px-5 mt-3 space-y-3">
                <div class="">
                    <p class="font-bold text-[15px]">Topic</p>
                    <p class="font-medium text-gray-400 text-xs">UI/UX Design Conference Meeting</p>
                </div>
                <div class="">
                    <p class="font-bold text-[15px]">Date & Time</p>
                    <p class="font-medium text-gray-400 text-xs">2:20 PM - 2:50 PM</p>
                </div>
                <div class="">
                    <p class="font-bold text-[15px]">Duration</p>
                    <p class="font-medium text-gray-400 text-xs">30 minutes</p>
                </div>
            </div>
            <hr class="w-[90%] m-auto bg-gray-300 mt-3 h-0.5">
            <div class="flex justify-center items-center mt-2 gap-6">
                <p class="font-medium">Status</p>
                <p class="font-medium text-gray-400 text-sm">Not started</p>
            </div>
        </div>
        <div class="bottom">
            <div class="flex items-center gap-2 bg-green-600 text-white rounded-full px-6 py-2 cursor-pointer text-sm">
                <i class="fa-solid fa-video fa-lg mt-1"></i>
                <p class="font-bold">Join meeting</p>
            </div>
        </div>
    </div>
</div> -->

<style>
	::-webkit-scrollbar{
	 	height:0px;
		width: 0px;
	}
</style>