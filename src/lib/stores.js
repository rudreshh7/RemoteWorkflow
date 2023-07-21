import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const viewStore = writable(browser ? JSON.parse(localStorage.getItem("viewStore") || JSON.stringify("Month")) : "");
viewStore.subscribe((val) => browser && (localStorage.viewStore = JSON.stringify(val)));
export const viewStores = writable(browser ? JSON.parse(localStorage.getItem("viewStores") || JSON.stringify("All")) : "");
viewStores.subscribe((val) => browser && (localStorage.viewStores = JSON.stringify(val)));

export const showNav = writable(false);
export const sh = writable(false);

export const showProfile= writable(false)

// var eventList = [
//     {
//       title: "Breakfast",
//       desc: "",
//       time: 360,
//       duration: 60,
//       endTime: 420,
//       color: "t-bg-blue-50 hover:t-bg-blue-100",
//       titleColor: "t-text-blue-700",
//       descColor: "t-text-blue-500 group-hover:t-text-blue-700",
//       place: 25
//     },
//     {
//       title: "Flight to Paris",
//       desc: "John F. Kennedy International Airport",
//       time: 450,
//       duration: 105,
//       endTime: 555,
//       color: "t-bg-pink-50 hover:t-bg-pink-100",
//       titleColor: "t-text-pink-700",
//       descColor: "t-text-pink-500 group-hover:t-text-pink-700",
//       place: 31
//     },
//     {
//       title: "SightSeeing",
//       desc: "Eiffel Tower",
//       time: 660,
//       duration: 90,
//       endTime: 750,
//       color: "t-bg-indigo-50 hover:t-bg-indigo-100",
//       titleColor: "t-text-indigo-700",
//       descColor: "t-text-indigo-500 group-hover:t-text-indigo-700",
//       place: 45
//     },
//   ];

var eventList = [
    {
      id:"1",
      start: new Date("2023-06-05T02:15:00.000Z"),
      end: new Date("2023-06-05T04:30:00.000Z"),
      title:"UI/UX Design Conference Meeting",
      host: "Meghan Smith",
      sorted: "Upcoming",
      status:"Upcoming",
      color:"#0037FC",
      backgroundColor:"#0037FC",
      editable: false,
    },
    {
      id:"2",
      start: new Date("2023-06-05T02:15:00.000Z"),
      end: new Date("2023-06-05T04:30:00.000Z"),
      title:"UI/UX Design Conference Meeting",
      host: "Meghan Smith",
      sorted: "Ongoing",
      status:"Ongoing",
      color:"#dcdc00",
      backgroundColor:"#dcdc00",
      editable: false,
    },
    {
      id:"3",
      start: new Date("2023-06-05T02:15:00.000Z"),
      end: new Date("2023-06-05T04:30:00.000Z"),
      title:"UI/UX Design Conference Meeting",
      host: "Meghan Smith",
      sorted: "Ongoing",
      status:"Ongoing",
      color:"#dcdc00",
      backgroundColor:"#dcdc00",
      editable: false,
    },
    {
      id:"4",
      start: new Date("2023-06-05T02:15:00.000Z"),
      end: new Date("2023-06-05T04:30:00.000Z"),
      title:"UI/UX Design Conference Meeting",
      host: "Meghan Smith",
      sorted: "Ongoing",
      status:"Ongoing",
      color:"#dcdc00",
      backgroundColor:"#dcdc00",
      editable: false,
    },
    {
      id:"5",
      start: new Date("2023-06-13T02:15:00.000Z"),
      end: new Date("2023-06-13T04:30:00.000Z"),
      title:"UI/UX Design Conference Meeting",
      host: "Meghan Smith",
      sorted: "Ongoing",
      status:"Ongoing",
      color:"#dcdc00",
      backgroundColor:"#dcdc00",
      editable: false,
    }
];

export const events = writable(browser ? JSON.parse(localStorage.getItem("events") || JSON.stringify(eventList)) : eventList);
events.subscribe((val) => browser && (localStorage.events = JSON.stringify(val)));

// var eventList = [
//     {
//       id:"1",
//       start: new Date("2023-06-05T02:15:00.000Z"),
//       end: new Date("2023-06-05T04:30:00.000Z"),
//       title:"UI/UX Design Conference Meeting",
//       host: "Meghan Smith",
//       sorted: "Upcoming",
//       status:"Upcoming",
//       color:"#0037FC",
//       backgroundColor:"#0037FC",
//       editable: false,
//     },
//     {
//       id:"2",
//       start: new Date("2023-06-05T02:15:00.000Z"),
//       end: new Date("2023-06-05T04:30:00.000Z"),
//       title:"UI/UX Design Conference Meeting",
//       host: "Meghan Smith",
//       sorted: "Ongoing",
//       status:"Ongoing",
//       color:"#dcdc00",
//       backgroundColor:"#dcdc00",
//       editable: false,
//     },
//     {
//       id:"3",
//       start: new Date("2023-06-05T02:15:00.000Z"),
//       end: new Date("2023-06-05T04:30:00.000Z"),
//       title:"UI/UX Design Conference Meeting",
//       host: "Meghan Smith",
//       sorted: "Ongoing",
//       status:"Ongoing",
//       color:"#dcdc00",
//       backgroundColor:"#dcdc00",
//       editable: false,
//     },
//     {
//       id:"4",
//       start: new Date("2023-06-05T02:15:00.000Z"),
//       end: new Date("2023-06-05T04:30:00.000Z"),
//       title:"UI/UX Design Conference Meeting",
//       host: "Meghan Smith",
//       sorted: "Ongoing",
//       status:"Ongoing",
//       color:"#dcdc00",
//       backgroundColor:"#dcdc00",
//       editable: false,
//     },
//     {
//       id:"5",
//       start: new Date("2023-06-13T02:15:00.000Z"),
//       end: new Date("2023-06-13T04:30:00.000Z"),
//       title:"UI/UX Design Conference Meeting",
//       host: "Meghan Smith",
//       sorted: "Ongoing",
//       status:"Ongoing",
//       color:"#dcdc00",
//       backgroundColor:"#dcdc00",
//       editable: false,
//     }
// ];

// export const event = writable(browser ? JSON.parse(localStorage.getItem("events") || JSON.stringify(eventList)) : eventList);
// events.subscribe((val) => browser && (localStorage.events = JSON.stringify(val)));

export const board = writable(browser ? JSON.parse(localStorage.getItem("board") || JSON.stringify("Dashboard")) : "");
board.subscribe((val) => browser && (localStorage.board = JSON.stringify(val)));

export const space = writable(browser ? JSON.parse(localStorage.getItem("space") || JSON.stringify("")) : "");
space.subscribe((val) => browser && (localStorage.space = JSON.stringify(val)));
export const spaceName = writable(browser ? JSON.parse(localStorage.getItem("spaceName") || JSON.stringify("")) : "");
spaceName.subscribe((val) => browser && (localStorage.spaceName = JSON.stringify(val)));

export const mselected = writable();
