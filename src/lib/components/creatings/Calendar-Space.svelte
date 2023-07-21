<script>
    import Calendar from '../calendar/core/src/Calendar.svelte';
    import TimeGrid from '../calendar/time-grid/src/index.js';
    import DayGrid from '../calendar/day-grid/src/index.js';
    import Interaction from '../calendar/interaction/src/index.js';
    import {onMount, onDestroy} from "svelte";
    import {space} from "$lib/stores.js";
    let arr = [];
    for (let i = 0; i < $space.length; i++) {
        for (let j = 0; j < $space[i].tasks.length; j++) {
            arr = [...arr , $space[i].tasks[j]];
        }
        
    }
    
    let plugins = [TimeGrid, Interaction, DayGrid];
    let options = {
        view: 'timeGridWeek',
        events: arr,  
        slotDuration: "00:30:00",
        eventDrop: function(event){
          for (let i = 0; i < $space.length; i++) {
            for (let j = 0; j < $space[i].tasks.length; j++) {
              if(event.event.id == $space[i].tasks[j].id){
                $space[i].tasks[j].start=convertToISOString(event.event.start);
                $space[i].tasks[j].end=convertToISOString(event.event.end);
                startend($space[i].tasks[j].start, $space[i].tasks[j].end, $space[i].tasks[j]);
                // console.log(event.event.id == $space[i].tasks[j].id);
              }
            }
          }
          $space = $space;
        },
        allDaySlot: false,
        slotHeight: 30,
        eventResize: function(event){
          for (let i = 0; i < $space.length; i++) {
            for (let j = 0; j < $space[i].tasks.length; j++) {
              if(event.event.id == $space[i].tasks[j].id){
                $space[i].tasks[j].start=convertToISOString(event.event.start);
                $space[i].tasks[j].end=convertToISOString(event.event.end);
                startend($space[i].tasks[j].start, $space[i].tasks[j].end, $space[i].tasks[j]);
                // console.log(event.event.id == $space[i].tasks[j].id);
              }
            }
          }
          // $space.find(eventId=>{
          //   if(event.event.id === eventId.id){
          //     eventId.start=convertToISOString(event.event.start);
          //     eventId.end=convertToISOString(event.event.end);
          //   }
          // })
          $space = $space;        
        },
        eventClick: function(event){
          console.log(event);
        },
        dayHeaderFormat: function(date){
          return new Date(date).toLocaleDateString("en-GB", {weekday: 'short', month: 'long', day: 'numeric'})
        },
        buttonText: {today: 'Today', dayGridMonth:'Month', timeGridDay:'Day', timeGridWeek:'Week' },
        headerToolbar: {start: 'today prev,next', center: 'title', end: 'timeGridDay,timeGridWeek,dayGridMonth'},
        nowIndicator: true,
        slotLabelFormat: function(event){
          return new Date(event).toLocaleString("en-US", {hour: 'numeric'})
        }
    };

    var ec;
    onMount(async()=>{
      console.log(ec);
    });

    onDestroy(async()=>{
      console.log($space);
    });

    function convertToISOString(date) {
      const d = new Date(date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      var isoString = d.toISOString(); 
      return isoString;
    }
    function correctTimeZone(date) {
      const d = new Date(date);
      d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
      return d;
    }
    function startend(start,end,event) {
      var now = new Date();
      var startTime = correctTimeZone(start);
      var endTime = correctTimeZone(end);
      console.log(event);
      if (now > endTime) {
        console.log("Completed");  
        event.status="Completed";
        event.backgroundColor="green";
      }
      else if(now >= startTime && now <= endTime){
        console.log("Ongoing");
        event.status="Ongoing";
        event.backgroundColor="#dcdc00";
      }
      else if(now < startTime){
        console.log("Upcoming");
        event.status="Upcoming";
        event.backgroundColor="#0037FC";
      }
    }
</script>

<Calendar bind:this={ec} {plugins} {options} />