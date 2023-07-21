<script>
    import {getContext, setContext} from 'svelte';
    import State from './state';
    import Section from './Section.svelte';
    import Body from './Body.svelte';
    import Day from './Day.svelte';
    import Week from './all-day/Week.svelte';
    import {datesEqual} from "../../core/src/lib";

    let state = getContext('state');
    let {_viewDates, _intlDayHeader, _viewClass, _scrollable, allDaySlot, theme, _today} = state;

    setContext('view-state', new State(state));

    $_viewClass = 'week';
</script>

<div class="{$theme.header}">
    <Section>
        {#each $_viewDates as date}
            <div class="{$theme.day} {datesEqual(date, $_today) ? "todayHeader" : ""}">{$_intlDayHeader.format(date)}</div>
        {/each}
    </Section>
    <div class="{$theme.hiddenScroll}"></div>
</div>
{#if $allDaySlot}
    <div class="{$theme.allDay}">
        <div class="{$theme.content}">
            <Section>
                <Week dates={$_viewDates}/>
            </Section>
            <div class="{$theme.hiddenScroll}"></div>
        </div>
    </div>
{/if}
<Body>
{#each $_viewDates as date}
    <Day {date}/>
{/each}
</Body>

<style>
    .todayHeader{
        background-color: rgba(100, 221, 245, 0.816);
    }
</style>