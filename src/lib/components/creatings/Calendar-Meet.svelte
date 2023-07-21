<script>
    import Calendar from '../calendar/core/src/Calendar.svelte';
    import TimeGrid from '../calendar/time-grid/src/index.js';
    import DayGrid from '../calendar/day-grid/src/index.js';
    import Interaction from '../calendar/interaction/src/index.js';
    import {onMount, onDestroy} from "svelte";
    import {events} from "$lib/stores.js";

    let plugins = [TimeGrid, Interaction, DayGrid];
    let options = {
        view: 'timeGridWeek',
        events: $events,  
        slotDuration: "00:30:00",
        eventDrop: function(event){
          $events.find(eventId=>{
            if(event.event.id === eventId.id){
              eventId.start=convertToISOString(event.event.start);
              eventId.end=convertToISOString(event.event.end);
              startend(eventId.start, eventId.end, eventId);
            }
          })
          $events = $events;
          console.log($events);
        },
        allDaySlot: false,
        // height: '600px',
        slotHeight: 30,
        eventResize: function(event){
          $events.find(eventId=>{
            if(event.event.id === eventId.id){
              eventId.start=convertToISOString(event.event.start);
              eventId.end=convertToISOString(event.event.end);
            }
          })
          $events = $events;        
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
        // pointer: true,
        // duration:{days: 4},
        // highlightedDates: ['2023-06-01']
    };

    var ec;
    onMount(async()=>{
      console.log(ec);
    });

    onDestroy(async()=>{
      console.log($events);
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
        event.color="green";
        event.backgroundColor="green";
      }
      else if(now >= startTime && now <= endTime){
        console.log("Ongoing");
        event.status="Ongoing";
        event.color="#dcdc00";
        event.backgroundColor="#dcdc00";
      }
      else if(now < startTime){
        console.log("Upcoming");
        event.status="Upcoming";
        event.color="#0037FC";
        event.backgroundColor="#0037FC";
      }
    }
</script>

<Calendar bind:this={ec} {plugins} {options} />