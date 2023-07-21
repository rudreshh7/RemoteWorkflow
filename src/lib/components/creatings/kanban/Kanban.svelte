<script>
	import Board from "./Board.svelte";
	import {space} from '$lib/stores';
	export let heights;
	  
	function handleBoardUpdated(newColumnsData) {
		// if you wanted to update a database or a server, this is where you would do it
		$space = newColumnsData;
	}
</script>
<Board columns={$space} onFinalUpdate={handleBoardUpdated} {heights}/>