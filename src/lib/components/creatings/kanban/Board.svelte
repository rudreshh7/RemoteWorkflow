<script>
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import Column from "./Column.svelte";
  import {space} from '$lib/stores';
  export let heights;

  const flipDurationMs = 300;
  export let onFinalUpdate;

  function handleDndConsiderColumns(e) {
    $space = e.detail.items;
  }

  function handleDndFinalizeColumns(e) {
    onFinalUpdate(e.detail.items);
  }

  function handleItemFinalize(columnIdx, newItems) {
    $space[columnIdx].tasks = newItems;
    onFinalUpdate($space);
  }
</script>

<style>
  .board {
    width: 100%;
    display: flex;
  }
  .column {
    height: 100%;
    width: 260px;
    margin-left: 15px;
    margin-right: 15px;
  }
</style>

<section class="board" use:dndzone={{ items: $space, flipDurationMs, type: 'column', dropTargetStyle:{outline:"none"} }} on:consider={handleDndConsiderColumns} on:finalize={handleDndFinalizeColumns}>
  {#each $space as { id, title, boco, tasks }, idx (id)}
    <class class="column" animate:flip="{{ duration: flipDurationMs }}" >    
      <Column name={title} items={tasks} {boco} onDrop={(newItems) => handleItemFinalize(idx, newItems)} {heights} />
    </class>
  {/each}
</section>