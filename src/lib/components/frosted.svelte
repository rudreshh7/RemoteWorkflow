<script>
    export let 
    cssF = "fixed flex justify-between items-center top-0 z-50",
    cssS = "flex justify-between items-center top-0 z-50 bg-white bg-opacity-70 px-4 py-2",
    widthF = "-webkit-fill-available",
    widthS = "-webkit-fill-available",
    shadow= "inset 0px 0px 12px 0px #A9C6FF";
</script>

<div class="{cssF} bg-white bg-opacity-20 backdrop-blur-lg backdrop-filter backdrop-saturate-200" style="width: {widthF}; box-shadow: {shadow};">
    <div class="{cssS} backdrop-blur-lg backdrop-filter backdrop-saturate-200" style="width: {widthS};">
        <!-- svelte-ignore missing-declaration -->
        <slot></slot>
    </div>
</div>