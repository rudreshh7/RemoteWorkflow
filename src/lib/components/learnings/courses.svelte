

<script>
	console.log("Hello");
	import { onMount } from 'svelte';
//   import Kanban from '../creatings/kanban/Kanban.svelte
//   import {space, spaceName} from "$lib/stores";
//   import MiniApp from './minikanban.svelte/MiniApp.svelte';

  

  let taskDone = 0;
  let approveRate = 0;
  let timeCompletionRate = 0;

  onMount(() => {
    // Fetch the data for the last 30 days and update the variables
    // taskDone, approveRate, and timeCompletionRate accordingly
    // You can replace this with your actual data fetching logic
    taskDone = 120;
    approveRate = 75;
    timeCompletionRate = 90;
  });


  // Define an array of tasks
  let tasks = [
    {
      id: 1,
      companyLogo: '/Apple_1.png',
      title: 'Task 1',
      date: '2023-06-23',
      profileIcons: [
        '/01.png',
        '/02.png',
        '/03.png',
      ],
      completion: 50, // Completion percentage (0-100)
    },
	{
      id: 2,
      companyLogo: 'LinkedIn_1.png',
      title: 'Task 1',
      date: '2023-06-23',
      profileIcons: [
		'/01.png',
        '/02.png',
        '/03.png',
      ],
      completion: 50, // Completion percentage (0-100)
    },
	{
      id: 3,
      companyLogo: 'Facebook_1.png',
      title: 'Task 1',
      date: '2023-06-23',
      profileIcons: [
		'/01.png',
        '/02.png',
        '/03.png',
      ],
      completion: 50, // Completion percentage (0-100)
    },
	{
      id: 4,
      companyLogo: 'Behance_1.png',
      title: 'Task 1',
      date: '2023-06-23',
      profileIcons: [
		'/01.png',
        '/02.png',
        '/03.png',
      ],
      completion: 50, // Completion percentage (0-100)
    },
	{
      id: 5,
      companyLogo: 'VueJS_1.png',
      title: 'Task 1',
      date: '2023-06-23',
      profileIcons: [
		'/01.png',
        '/02.png',
        '/03.png',
      ],
      completion: 50, // Completion percentage (0-100)
    },
	{
      id: 6,
      companyLogo: 'Adobe_1.png',
      title: 'Task 1',
      date: '2023-06-23',
      profileIcons: [
		'/01.png',
        '/02.png',
        '/03.png',
      ],
      completion: 50, // Completion percentage (0-100)
    },
    // Add more tasks as needed
  ];



  let skills = [
    { name: 'React.js', rating: Math.random() },
    { name: 'Svelte Kit', rating: Math.random() },
    { name: 'JavaScript', rating: Math.random() }
  ];

  onMount(() => {
    skills = skills.map(skill => ({
      ...skill,
      rating: Math.random()
    }));
  });

  let projects = [
    {
      name: 'Design',
      time: '2 hours'
    },
    {
      name: 'Development',
      time: '4 hours'
    },
    {
      name: 'Marketing',
      time: '3 hours'
    }
  ];

</script>




<div class="mt-1">
	<!-- Mini Rectangle -->
	<div>
		<h3 class="text-m text-slate-500 font-bold mb-2">Last 30 Days</h3>
		<div class="flex flex-row ">
			
			<div class="flex-1 p-4 bg-gray-100 border border-gray-300 shadow-sm">
			 
			  <div class="flex flex-row">
				<div class="flex-1">
				  <div class="text-3xl font-bold text-blue-500 mb-1">{taskDone}</div>
				  <div class="text-gray-500">Task done</div>
				</div>
				<div class="flex-1">
				  <div class="text-3xl font-bold text-green-500 mb-1">{approveRate}%</div>
				  <div class="text-gray-500">Approve Rate</div>
				</div>
				<div class="flex-1">
				  <div class="text-3xl font-bold text-purple-500 mb-1">{timeCompletionRate}%</div>
				  <div class="text-gray-500">Time Completion Rate</div>
				</div>
			  </div>
			</div>
		  </div>
	</div>
</div>

<div class="flex flex-row justify-between">
<h3 class="text-m text-slate-500 font-bold mb-2 mx-5">Tasks</h3>
<h3 class="text-m text-slate-500 font-bold mb-2 mx-60">Profile</h3>

</div>



<div class="flex flex-row">
	<!-- Square 1 -->
	
	<div class="flex flex-wrap gap-4 w-3/4 mx-5 my-2">
		
	  {#each tasks as task (task.id)}
		<div class="bg-white rounded-lg shadow py-4 px-16 flex flex-col items-center">
		  <div class="flex items-center mb-4">
			<img src={task.companyLogo} alt="Company Logo" class="w-8 h-8 mr-2" />
			<h3 class="text-lg font-medium">{task.title}</h3>
		  </div>
		  <p class="text-gray-500 mb-2">Date: {task.date}</p>
		  <div class="flex mb-2">
			{#each task.profileIcons as profileIcon (profileIcon)}
			  <img src={profileIcon} alt="Profile Icon" class="w-6 h-6 -ml-2 rounded-full border-white border-2" />
			{/each}
		  </div>
		  <div class="bg-gray-200 rounded-full h-2 mb-2 w-full">
			<div class="bg-black h-2 rounded-full" style={`width: ${task.completion}%`}></div>
		  </div>
		</div>
	  {/each}
	</div>
  
	<!-- Square 2 -->
	<div class="max-w-md mx-5 my-5 w-1/4">
	  <div class="bg-white shadow-md rounded-lg p-4">
		<div class="flex items-center mb-4">
		  <img
			src="/22.png"
			alt="Profile Image"
			class="w-12 h-12 rounded-full mr-4"
		  />
		  <div>
			<h2 class="font-bold text-lg">Rudresh Jha</h2>
			<p class="text-gray-500 text-sm">Web Developer</p>
			<p class="text-gray-500 text-sm">Jaipur , India</p>
		  </div>
		</div>
		<div>
		  <h3 class="text-gray-500 text-sm mb-2">Skills</h3>
		  {#each skills as { name, rating }}
			<div class="flex items-center mb-2">
			  <div class="w-1/4">{name}</div>
			  <div class="w-3/4 bg-gray-200 rounded-full h-2">
				<div
				  class="filler-bar"
				  style="width: {rating * 100}%"
				>
				  <div class="filler"></div>
				</div>
			  </div>
			</div>
		  {/each}
		</div>
	  </div>
	</div>
  </div>
  

<!-- Rectangle 2 -->
<div>
	<div class="flex flex-row justify-between">
		<h3 class="text-m text-slate-500 font-bold mb-2 mx-5">Projects </h3>
		
		
		</div>
	
<!-- Square 1 -->

<div class="flex flex-wrap">
	{#each projects as project}
	  <div class="flex-1 m-2 bg-white rounded-lg shadow-md py-5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
		<div class="p-4">
		  <h2 class="text-lg font-bold mb-4">{project.name}</h2>
		  <div class="relative" style="display: flex;">
			<div class="h-6 w-6 relative">
			  <img src="/01.png" style="width: 100%; height: 100%;">
			</div>
			<div class="h-6 w-6 relative" style="margin-left: -8px;">
			  <img src="/02.png" style="width: 100%; height: 100%;">
			</div>
			<div class="h-6 w-6 relative" style="margin-left: -8px;">
			  <img src="/01.png" style="width: 100%; height: 100%;">
			</div>
			<div class="h-6 w-6 relative" style="margin-left: -8px;">
			  <img src="/01.png" style="width: 100%; height: 100%;">
			</div>
		  </div>
		  
		  <p class="text-gray-500 mt-4">Time assigned: {project.time}</p>
		</div>
	  </div>
	{/each}
  </div>
  
 
  
  






</div>




<!-- Rectangle 2 -->
<!-- Square 1 -->
<!-- Square 2 -->


