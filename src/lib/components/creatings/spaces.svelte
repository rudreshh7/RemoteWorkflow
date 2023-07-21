<script>
	import {space, spaceName} from "$lib/stores";
    import { onMount } from "svelte";
    import { each, loop_guard } from "svelte/internal";
    import Kanban from "$lib/components/creatings/kanban/Kanban.svelte";
    import Calendar from "./Calendar-Space.svelte";
    // import Files from "./files.svelte";
    // import Members from "./members.svelte";
	
	var status=['Completed','Ongoing','Updates','Pending'];
	var select='l';
	let h = 500, h2;
	function selected(val){
		select=val;
	}

	var input=false;
	function edit(i,v){
		// input=!input
		console.log(i,v, input);
		for (let j = 0; j < $space.length; j++) {
			if(v==$space[j].title){
				for (let k = 0; k < $space[j].tasks.length; k++) {
					if(i==k){
						document.getElementById("edit-" + i + "-" + v).classList.toggle("hidden");
						document.getElementById("tasks-" + i + "-" + v).classList.toggle("hidden");
						$space=$space;
					}
				}
			}
		}	
	}
	
	const update = (event) =>{
		if(event.key == 'Enter'){
			console.log(event);
            input=false;
        }
    }
	var task={id:'', name:'' , due:'', assignee:''};
	var t,d,u;
	let curruser = "Samyak";
	function addNewTask(v){
		let sum = 0;
		for (let i = 0; i < $space.length; i++) {
			sum = $space[i].tasks.length + sum;
		}
		t=document.getElementById("input-" + v).value;
		if(t!=''){
			for (let i = 0; i < $space.length; i++) {
				if(v==$space[i].title){
					task={id: sum, name:t , due:'', assignee:curruser};
					// $space[i].tasks=[...$space[i].tasks, task]
					$space[i].tasks=[...$space[i].tasks, task];
					console.log($space[i].tasks);
				}
			}
			closed(v);
			task={id:'', name:'', due:'', assignee:''}
			document.getElementById("input-" + v).value="";
		}
	}
	function closed(v){
		for (let i = 0; i < $space.length; i++) {
			if(v==$space[i].title)
			{
				document.getElementById("addDiv-" + v).classList.toggle("hidden");
				document.getElementById("addNew-" + v).classList.toggle("hidden");
			}
		}
	}

	function remove(j,v){
		for (let i = 0; i < $space.length; i++) {
			if(v==$space[i].title){
				$space[i].tasks.splice(j,1)
				$space=$space
			}
		}
	}
	
	function statusChanged(j,title) {
		let selectElement = document.querySelector('#status-' + j + "-" + title);
		let output = selectElement.value;
		for (let i = 0; i < $space.length; i++) {
			if(title==$space[i].title){
				task=$space[i].tasks.splice(j,1);
				$space=$space;
				break;
			}
		}
		for (let i = 0; i < $space.length; i++) {
			if(output==$space[i].title){
				console.log(task);
				$space[i].tasks=[...$space[i].tasks, task[0]];
				console.log($space[i].tasks);
			}
		}
	}
	let AddTask = false, atname = 'Status', atcolor = 'white';

	let w=0;
</script>

<style>
	.date::-webkit-datetime-edit{
		display: none;
	}
	.date::-webkit-calendar-picker-indicator{
		height: 20px;
		width: 20px;
		background-color: #e5e7eb;
	}
	::-webkit-scrollbar{
		display: none;
		width: 0;
	}
</style>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- {#if AddTask}
	<div class="absolute w-[60%] z-50 bg-gray-300 bg-opacity-20 backdrop-blur-xl backdrop-filter backdrop-saturate-100 rounded-2xl" style="box-shadow: 0px 0px 12px 0px #9e9e9e;">
		<div class="top py-3 px-5">
			<div class="flex rounded-md items-center gap-2 w-fit px-3 py-1 bg-[{atcolor}]" style="box-shadow: 0px 0px 12px 0px #9e9e9e;">
				<h2 >{atname}</h2>
				<i class="fa fa-angle-down mt-0.5"></i>
			</div>
			<div class="absolute left-4 top-8 w-36 bg-white rounded-md px-1.5 py-2 shadow-md bg-opacity-95 backdrop-blur-md backdrop-filter backdrop-saturate-200">
				<ul class="">
					<li class="flex items-center rounded hover:bg-gray-200" on:click={()=>{atname = 'Ongoing'; atcolor='bg-[#DCDC00]'}}>
						<i class="fa fa-square text-[#DCDC00]"></i>
						<h3 class="text-sm {atname == "Ongoing" ? "font-bold" : ""}">Ongoing</h3>
					</li> 
					<li class="flex items-center rounded hover:bg-gray-200" on:click={()=>{atname = 'Completed'; atcolor='bg-[#11CD00]'}}>
						<i class="fa fa-square text-[#11CD00]"></i>
						<h3 class="text-sm {atname == "Completed" ? "font-bold" : ""}">Completed</h3>
					</li>
					<li class="flex items-center rounded hover:bg-gray-200" on:click={()=>{atname = 'Updates'; atcolor='bg-[#FF0000]'}}>
						<i class="fa fa-square text-[#FF0000]"></i>
						<h3 class="text-sm {atname == "Updates" ? "font-bold" : ""}">Updates</h3>
					</li>
					<li class="flex items-center rounded hover:bg-gray-200" on:click={()=>{atname = 'Pending'; atcolor='bg-[#0037FC]'}}>
						<i class="fa fa-square text-[#0037FC]"></i>
						<h3 class="text-sm {atname == "Pending" ? "font-bold" : ""}">Pending</h3>
					</li>
				</ul>
			</div>
		</div>
	</div>
{/if} -->
<div class="absolute top-0 bottom-0 h-screen" bind:clientHeight={h}></div>
<div class="mt-[56px]">
	<div class="flex px-5 pr-8 pb-3 pt-2 border-b"  on:mouseenter={() => {w = 414}} on:mouseleave={() => {w = 0}}>
		<div class="left flex items-center gap-3 pr-5">
			<h1 class="text-xl font-semibold">{$spaceName}</h1>
			<i class="fa fa-arrow-right p-1.5 border rounded-full transition-all duration-500 {w>= 10 ? "rotate-180" : ""}"></i>
		</div>
		<div class="right relative flex items-center text-sm overflow-x-hidden transition-all duration-500" style="width: {w}px;">
			<div class="absolute bottom-0 rounded-lg h-1 bg-[#5790ff] transition-all duration-300 {select == "k" ? "left-0 w-[50px] mx-3.5" : select == "l" ? "left-[20%] mx-1.5 w-[40px]" : select == "c" ? "left-[40%] w-[72px] -ml-3" : select == "m" ? "left-[60%] w-[80px] ml-0.5" : select == "f" ? "left-[80%] w-[45px] ml-6" : ""}"></div>
			<li class="flex items-center justify-center gap-1.5 border-l-2 cursor-pointer hover:text-[#5790ff] border-gray-200 px-3 {select == "k" ? "text-[#5790ff]" : "text-gray-600"}" on:click={() => {select = 'k'}}>
				<i class="fa fa-home text-xs"></i>
				<h2 class="">Card</h2>
			</li>
			<li class="flex items-center justify-center gap-1.5 border-l-2 cursor-pointer hover:text-[#5790ff] border-gray-200 px-3 {select == "l" ? "text-[#5790ff]" : "text-gray-600"}" on:click={() => {select = 'l'}}>
				<i class="fa fa-list text-xs"></i>
				<h2 class="">List</h2>
			</li>
			<li class="flex items-center justify-center gap-1.5 border-l-2 cursor-pointer hover:text-[#5790ff] border-gray-200 px-3 {select == "c" ? "text-[#5790ff]" : "text-gray-600"}" on:click={() => {select = 'c'}}>
				<i class="fa fa-calendar text-xs"></i>
				<h2 class="">Calendar</h2>
			</li>
			<li class="flex items-center justify-center gap-1.5 border-l-2 cursor-pointer hover:text-[#5790ff] border-gray-200 px-3 {select == "m" ? "text-[#5790ff]" : "text-gray-600"}" on:click={() => {select = 'm'}}>
				<i class="fa fa-users text-xs"></i>
				<h2 class="">Members</h2>
			</li>
			<li class="flex items-center justify-center gap-1.5 border-l-2 cursor-pointer hover:text-[#5790ff] border-gray-200 px-3 {select == "f" ? "text-[#5790ff]" : "text-gray-600"}" on:click={() => {select = 'f'}}>
				<i class="fa fa-file-lines text-xs"></i>
				<h2 class="">Files</h2>
			</li>
		</div>
		<li class="flex items-center justify-center border-l-2 border-gray-200 pl-2">
			{#if select == "k" || select == "l" || select == "c"}
				<div class="flex items-center gap-1.5 justify-center px-2 py-1 border rounded-lg hover:bg-[#5790ff] hover:text-white">
					<i class="fa fa-plus text-xs"></i>
					<h2 class="text-sm">Task</h2>
				</div>
			{:else if select == "m"}
				<div class="flex items-center gap-1.5 justify-center px-2 py-1 border rounded-lg hover:bg-[#5790ff] hover:text-white">
					<i class="fa fa-plus text-xs"></i>
					<h2 class="text-sm">Member</h2>
				</div>
			{:else if select == "f"}
				<div class="flex items-center gap-1.5 justify-center px-2 py-1 border rounded-lg hover:bg-[#5790ff] hover:text-white">
					<i class="fa fa-plus text-xs"></i>
					<h2 class="text-sm">File</h2>
				</div>
			{/if}
		</li>
	</div>
	<!-- <div class="flex justify-between px-6">
		<p class="font-bold text-2xl">{$spaceName}</p>
		<div class="flex">
			<div class="relative w-[280px] h-9 bg-gray-200 py-1 mr-5 rounded-full">
				<ul class="absolute w-full flex items-center text-center text-sm z-10">
					<li class="flex justify-center items-center w-1/3 gap-2 cursor-pointer px-2 py-1 transition-all duration-300 {select=='k' ? 'text-white font-medium':'text-black'} rounded-full" on:click={()=>selected('k')}><img src="card.png" alt="">Card</li>
					<li class="flex justify-center items-center w-1/3 gap-2 cursor-pointer px-2 py-1 transition-all duration-300 {select=='l' ? 'text-white font-medium':'text-black'} rounded-full" on:click={()=>selected('l')}><i class="fa-solid fa-list-ul"></i>List</li>
					<li class="flex justify-center items-center w-1/3 gap-2 cursor-pointer px-2 py-1 transition-all duration-300 {select=='c' ? 'text-white font-medium':'text-black'} rounded-full" on:click={()=>selected('c')}><i class="fa fa-calendar"></i>Calendar</li>
				</ul>
				<div class="h-9 w-1/3 absolute top-0 bg-black transition-all duration-300 rounded-full  {select=='k'? 'left-0' : select=='l' ? 'left-1/3' : select == 'c' ? 'left-2/3' : ''}"></div>
			</div>
			<button class="px-3 py-1 border bg-gray-100 rounded-full text-sm hover:bg-gray-800 hover:text-white" on:click={() => AddTask = !AddTask}>+ Add Task</button>
		</div>
	</div> -->
	<div class="left py-2 mt-3 mx-3 rounded-2xl overflow-auto" style="box-shadow: 0 0 5px #E0E0E0; height: {h - 130}px;">
		{#if select == 'k'}
			<div class="px-2 overflow-auto"  style="height: {h - 145}px;" bind:clientHeight={h2}>
				<Kanban heights="{h2}" />
			</div>
		{:else if select == 'l'}
			<div class="h-full w-full rounded-2xl px-8">
				<div class="flex flex-wrap gap-2">
					{#each $space as c}
						<div class="w-full my-3 relative">
							<div class="flex items-center justify-between cursor-pointer" on:click={()=>{ c.status ? c.status=false : c.status=true }}>
								<div class="flex items-center justify-center">
									<div class="w-5 h-5 flex items-center justify-center bg-green-400 rounded-full">
										<i class="fa fa-angle-right text-xs { c.status ? 'origin-center rotate-90' : ''} transition-all "></i>
									</div>
									<p class="pl-4 font-semibold text-lg">{c.title}</p>
									<p class="ml-3 text-xs font-medium text-gray-500">{c.tasks.length} Tasks</p>
								</div>
							</div>
							{#if c.status}
								<div class=" w-full pl-8 -mt-6">
									<table cellpadding=3 class=" text-center w-full text-sm">
										{#if c.tasks.length!=0}
											<tr class="" >
												<th class=" pb-2"></th>
												<th class=" pb-2 text-sm font-semibold">Assignee</th>
												<th class=" pb-2 text-sm font-semibold">Due date</th>
												<th class=" pb-2 text-sm font-semibold">Status</th>
											</tr>
											{#each c.tasks as t,i}
												<tr class="hover:bg-gray-100 cursor-pointer">
													<td class="group flex items-center gap-2 cursor-pointer text-left text-base pl-3">
														<i class="fa fa-circle text-[8px] text-green-500"></i>
														<div class="space-x-2 hidden" id="edit-{i}-{c.title}">
																<input type="text" name="" class="focus:outline-none border-[0.5px] px-1 rounded" bind:value="{t.name}" on:keydown={update(i, c.title)}>
																<button on:click={edit(i,c.title)} class=""><i class="fa fa-check"></i></button>
														</div>
														<div class="flex gap-2" id="tasks-{i}-{c.title}">
															<p class="hover:text-blue-400">{t.name}</p>
															<div class="hidden group-hover:block"><i class="fa fa-edit text-gray-400 hover:text-gray-700" on:click={edit(i,c.title)}></i></div>
														</div>
													</td>
														<td width=15% class="text-gray-600" style="-webkit-line-clamp: 1">{t.assignee}</td>
													<td width=10% class="">{t.due}</td>
													<td width=10% class="">
														<select name="" class="focus:outline-none" id="status-{i}-{c.title}"  on:change={statusChanged(i,c.title)}>
															{#each status as s}
																{#if s==c.title}
																	<option value="{s}" selected>{s}</option>
																{:else}
																	<option value="{s}" >{s}</option>
																{/if}
															{/each}
														</select>
													</td>
													<td width=5% class=""><i class="fa fa-trash text-gray-400 hover:text-gray-700 cursor-pointer" on:click={remove(i,c.title)}></i></td>
												</tr>
											{/each}
										{/if}
									</table>
									<div class="hidden {c.tasks.length==0 ? 'mt-7': ''}" id="addDiv-{c.title}">
										<div class="group flex items-center text-center justify-between text-sm bg-gray-200 px-4 py-2">
											<input type="text" placeholder="Task name" id="input-{c.title}" class="focus:outline-none rounded-[4px] px-2 py-0.5">

											<div class="flex gap-5">
												<input type="date" class="date mt-1 rounded-full focus:outline-none" id="dt-{c.title}">
												<button class="bg-green-700 text-white px-4 py-1 rounded-[4px]" on:click={()=>addNewTask(c.title)}>Save</button>
												<button on:click={()=>closed(c.title)}><i class="fa fa-close"></i></button>
											</div>
										</div>
									</div>
									<button class="text-gray-400 text-xs hover:text-gray-700 {c.tasks.length==0 ? 'mt-7': ''}" id="addNew-{c.title}" on:click={()=>closed(c.title)}>+ Add task</button>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{:else if select == 'c'}
			<div class="h-full w-full rounded-2xl px-8">
				<Calendar />
			</div>
		{/if}
	</div>
	<!-- {#if select=='c'}
	<div class="m-4 px-3 overflow-auto"  st yle="box-shadow: 0 0 5px #E0E0E0; height: {h - 130}px;" bind:clientHeight={h2}>
		<Kanban heights="{h2}" />
	</div> -->
		<!-- <div class="m-4 rounded-2xl py-2 bg-gray-50" style="box-shadow: 0 0 5px #E0E0E0; height: {h-130}px" bind:clientHeight={h2}>
			<Kanban heights={h2} />
		</div> -->
	<!-- {:else if select=='l'}
		<div class="m-4 h-full w-[97%] rounded-2xl py-2 px-10 space-y-2" style="box-shadow: 0 0 5px #E0E0E0;">
			<div class="flex flex-wrap gap-2">
				{#each $space as c}
					<div class="w-full my-3 relative">
						
						<div class="flex items-center justify-between cursor-pointer" on:click={()=>{ c.status ? c.status=false : c.status=true }}>
							<div class="flex items-center justify-center">
								<div class="w-5 h-5 flex items-center justify-center bg-green-400 rounded-full">
									<i class="fa fa-angle-right text-xs { c.status ? 'origin-center rotate-90' : ''} transition-all "></i>
								</div>
								<p class="pl-4 font-semibold text-lg">{c.title}</p>
								<p class="ml-3 text-xs font-medium text-gray-500">{c.tasks.length} Tasks</p>
							</div>

						</div>
						{#if c.status}
							<div class=" w-full pl-8 -mt-6">
								<table cellpadding=2 class=" text-center w-full text-sm">
									{#if c.tasks.length!=0}
										<tr class="" >
											<th class=" pb-2"></th>
											<th class=" pb-2 text-sm font-semibold">Assignee</th>
											<th class=" pb-2 text-sm font-semibold">Due date</th>
											<th class=" pb-2 text-sm font-semibold">Status</th>
										</tr>
										{#each c.tasks as t,i}
											<tr class=" hover:bg-gray-100">
												<td width=50% class="flex items-center gap-2 cursor-pointer text-left text-base pl-3">
													<i class="fa fa-circle text-[8px] text-green-500"></i>
													<div class="space-x-2 hidden" id="edit-{i}-{c.title}">
															<input type="text" name="" class="" bind:value="{t.name}" on:keydown={update}>
															<button on:click={edit(i,c.title)} class=""><i class="fa fa-check"></i></button>
													</div>
													<div class="flex gap-2" id="tasks-{i}-{c.title}">
														<p class="hover:text-blue-400">{t.name}</p>
														<div class=" goup-hover:block"><i class="fa fa-edit text-gray-400 hover:text-gray-700" on:click={edit(i,c.title)}></i></div>
													</div>
												</td>
												<td width=15% class="">{t.assignee}</td>
												<td width=10% class="">{t.due}</td>
												<td width=10% class="">
													<select name="" class="focus:outline-none" id="status-{i}-{c.title}"  on:change={statusChanged(i,c.title)}>
														{#each status as s}
															{#if s==c.title}
																<option value="{s}" selected>{s}</option>
															{:else}
																<option value="{s}" >{s}</option>
															{/if}
														{/each}
													</select>
												</td>
												<td width=5% class=""><i class="fa fa-trash text-gray-400 hover:text-gray-700 cursor-pointer" on:click={remove(i,c.title)}></i></td>
											</tr>
										{/each}
									{/if}
								</table>
								<div class="hidden {c.tasks.length==0 ? 'mt-7': ''}" id="addDiv-{c.title}">
									<div class="group flex items-center text-center justify-between text-sm bg-gray-200 px-4 py-2">
										<input type="text" placeholder="Task name" id="input-{c.title}" class="focus:outline-none rounded-[4px] px-2 py-0.5">

										<div class="flex gap-5">
											<input type="date" name="" class="date mt-1" id="">
											<button class="bg-green-700 text-white px-4 py-1 rounded-[4px]" on:click={()=>addNewTask(c.title)}>Save</button>
											<button on:click={()=>closed(c.title)}><i class="fa fa-close"></i></button>
										</div>
									</div>
								</div>
								<button class="text-gray-400 text-xs hover:text-gray-700 {c.tasks.length==0 ? 'mt-7': ''}" id="addNew-{c.title}" on:click={()=>closed(c.title)}>+ Add task</button>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>		
	{/if} -->
</div>