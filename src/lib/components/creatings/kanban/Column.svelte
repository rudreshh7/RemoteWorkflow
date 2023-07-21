<script>
  import {space} from "$lib/stores";
  import { flip } from "svelte/animate";
  import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from "svelte-dnd-action";
  export let heights;

  const flipDurationMs = 150;

  export let name;
  export let items;
  export let boco;
  export let onDrop;

  function handleDndConsiderCards(e) {
    //console.warn("got consider", name);
    items = e.detail.items;
  }
  
  function handleDndFinalizeCards(e) {
    onDrop(e.detail.items);
  }

  let newItemName = "";
  var task={id:'', name:'' , due:'', assignee:''};
	let curruser = "Samyak";
	function addNewTask(n){
		let sum = 0;
		if(newItemName!=''){
			for (let i = 0; i < $space.length; i++) {
        if(n == $space[i].title){
					task={id: sum, name: newItemName, due: '', assignee: curruser}
					// $space[i].tasks=[...$space[i].tasks, task]
					$space[i].tasks=[...$space[i].tasks, task]
					// console.log($space[i].tasks);
        }
			}
      $space = $space;
			task={id:'', name:'', due:'', assignee:''}
			newItemName = "";
		}
	}
  function remove(a,v){
		for (let i = 0; i < $space.length; i++) {
      for (let j = 0; j < $space[i].tasks.length; j++) {
        if(v == $space[i].tasks[j].name){
          $space[i].tasks.splice(j,1);
          $space=$space;
        }
      }
		}
	}
</script>

<div class="wrapper" style="height: {heights - 46}px;">
  <div class="column-title bg-slate-50 p-2 font-normal mb-2 text-xs" style="border-top: 1.5px solid {boco};">
    {name}
  </div>
  <div class="column-content h-full overflow-auto" style="height: {heights - 88}px;" use:dndzone={{ items, flipDurationMs, zoneTabIndex: -1, dropTargetStyle:{outline:"none"} }} on:consider={handleDndConsiderCards} on:finalize={handleDndFinalizeCards} >
    {#each items as item, index (item)}
      <div class="card bg-white px-3 py-3 mb-2 mx-0.5 rounded" animate:flip={{ duration: flipDurationMs }} >
        <div class="card-content">
          <button class="delete-button" on:click={() => remove(item.id, item.name)}>x</button>
          {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
            <div class="task-name font-light text-sm custom-shadow-item">
              <img src="/ai.png" alt="" class="absolute right-2 top-7 w-7 h-7 border rounded-full">
              <h3 class="font-medium capitalize">{item.name}</h3>
              {#if boco == "#11CD00"}
                <h3 class="text-green-600 text-xs mt-1"><i class="fa fa-calendar-check-o"></i> {item.due}</h3>
              {:else}
                <h3 class="text-red-600 text-xs mt-1"><i class="fa fa-calendar-check-o"></i> {item.due}</h3>
              {/if}
              <h3 class="text-[13px]">{item.assignee}</h3>
            </div>
          {/if}
          <div class="task-name font-light text-sm">
            <img src="/ai.png" alt="" class="absolute right-2 top-7 w-7 h-7 border rounded-full">
            <h3 class="font-medium capitalize">{item.name}</h3>
            {#if boco == "#11CD00"}
              <h3 class="text-green-600 text-xs mt-1"><i class="fa fa-calendar-check-o"></i> {item.due}</h3>
            {:else}
              <h3 class="text-red-600 text-xs mt-1"><i class="fa fa-calendar-check-o"></i> {item.due}</h3>
            {/if}
            <h3 class="line-clamp-1 text-[13px]" title="Owner">{item.assignee}</h3>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <form class="input-container flex mt-2">
    <input type="text" id="wage" class="p-2 flex-grow mr-2 bg-slate-50 hover:bg-white text-xs" bind:value={newItemName} placeholder="New Task" />
    <button class="text-white bg-slate-200 text-[10px] px-3 rounded" on:click={() => addNewTask(name)}>Add</button>
  </form>
</div>

<style>
  .card {
    position: relative;
    box-shadow: 0 0 4px -2px grey;
  }

  .delete-button {
    position: absolute;
    top: -1px;
    right: 8px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .card:hover .delete-button {
    opacity: 1;
  }
  .custom-shadow-item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;
    border: 1px solid #f1f6f9;
    background: white;
    opacity: 0.5;
    margin: 0;
    cursor: grab;
  }
  ::-webkit-scrollbar{
    width: 0px;
  }
  .column-content:hover::-webkit-scrollbar{
    width: 5px;
  }
  ::-webkit-scrollbar-thumb{
    background: grey;
    border-radius: 10px;
  }
</style>
