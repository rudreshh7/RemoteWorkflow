<script>
    import {getContext} from 'svelte';

    let {theme, _intlDayHeader} = getContext('state');
    let {_days} = getContext('view-state');
</script>

<div class="{$theme.header}">
    <div class="{$theme.days}">
        {#each $_days as day}
            <div class="{$theme.day}">{$_intlDayHeader.format(day)}</div>
        {/each}
    </div>
    <div class="{$theme.hiddenScroll}"></div>
</div>
