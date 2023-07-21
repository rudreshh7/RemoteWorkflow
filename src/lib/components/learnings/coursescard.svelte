<script>
	var course=[
		{name:"Data Science Bootcamp", color:"rgba(255, 199, 88, 0.4)", shadow:"rgb(255 199 88 /0.3)", image:"Data privacy.png", enrolled:"17", progress:"30%"},
		{name:"Machine Learning Bootcamp", color:"rgba(110, 122, 233, 0.4)", shadow:"rgb(110 122 233 /0.3)", image:"Data privacy.png", enrolled:"17", progress:"50%"},
		{name:"Python Bootcamp", color:"rgba(140, 140, 140, 0.4)", shadow:"rgb(140 140 140 /0.3)", image:"Data privacy.png", enrolled:"17", progress:"80%"},
		{name:"SvelteKit Bootcamp", color:"rgba(173, 0, 255, 0.4)", shadow:"rgb(173 0 255 /0.3)", image:"Data privacy.png", enrolled:"17", progress:"10%"},
		{name:"UI and UX Design Bootcamp", color:"rgba(33, 238, 0, 0.4)", shadow:"rgb(33 238 0 /0.3)", image:"Data privacy.png", enrolled:"17", progress:"60%"},
		{name:"Firebase Bootcamp", color:"rgba(140, 140, 140, 0.4)", shadow:"rgb(140 140 140 /0.3)", image:"Data privacy.png", enrolled:"17", progress:"50%"}
	];
	var shadow="box-shadow:  5px 5px 20px";
</script>

<div class="mt-20 ml-10">
	<p class="font-bold text-3xl">Courses</p>
	<div class="mt-8 flex space-x-10">
		<div class="w-2/5 space-y-3">
			{#each course as c}
				<div class="backdrop-blur-xl rounded-3xl p-6 px-7" style="{shadow} {c.shadow} ; background: {c.color};">
					<div class="flex justify-between">
						<div class="flex items-center space-x-2">
							<img src={c.image} class="h-16" alt="{c.image}">
							<div class="space-y-3 -mt-2 w-[75%]">
								<p class="font-bold text-2xl">{c.name}</p>
								<p class="font-medium text-xs">Follow these easy and simple steps</p>
							</div>
						</div>
						<div class="">
							<p class="bg-black text-white py-2 px-3.5 rounded-lg only:text-center font-medium text-lg w-fit m-auto">{c.enrolled}</p>
							<p class="text-xs mt-1 font-medium m-auto">Enrolled</p>
						</div>
					</div>
					<div class="flex justify-between mt-7 items-center">
						<div class="relative ml-2 h-2 w-2/3">
							<div class="bg-white opacity-80 rounded-full h-2"></div>
							<div class="absolute bg-black left-0 top-0 rounded-full h-2" style="width: {c.progress};"></div>
						</div>
						<div class="flex items-center space-x-1">
							<p class="font-semibold text-sm"> Resume </p>
							<i class="fa-solid fa-arrow-right-long"></i>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>