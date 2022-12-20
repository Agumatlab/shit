import './css/demo.css'

import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

if (document.querySelector('body').id=="body-demo"){

    // document.addEventListener('DOMContentLoaded', function() {
    // let calendarEl = document.getElementById('calendar');

    // let calendar = new Calendar(calendarEl, {
    //     plugins: [ dayGridPlugin ]
    //     // options here
    // });

    // calendar.render();
    // });

    const calendarEl = document.getElementById('calendar')
    const calendar = new Calendar(calendarEl, {
      plugins: [
        interactionPlugin,
        dayGridPlugin
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      droppable: true,
      editable: true,
      events: [
        { title: 'Meeting', start: new Date() }
      ]
    })
    
    calendar.render()
    

    // ----------
/*
document.addEventListener('DOMContentLoaded', function() {

        // --------------------------------------------
        var Calendar = FullCalendar.Calendar;
        var Draggable = FullCalendar.Draggable;
      
        var containerEl = document.getElementById('external-events');
        var calendarEl = document.getElementById('calendar');
        var checkbox = document.getElementById('drop-remove');
      
        // initialize the external events
        // -----------------------------------------------------------------
      
        new Draggable(containerEl, {
          itemSelector: '.fc-event',
          eventData: function(eventEl) {
            return {
              title: eventEl.innerText
            };
          }
        });
      
        // initialize the calendar
        // -----------------------------------------------------------------
      
        var calendar = new Calendar(calendarEl, {
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          editable: true,
          droppable: true, // this allows things to be dropped onto the calendar
          drop: function(info) {
            // is the "remove after drop" checkbox checked?
            if (checkbox.checked) {
              // if so, remove the element from the "Draggable Events" list
              info.draggedEl.parentNode.removeChild(info.draggedEl);
            }
          }
        });
      
        calendar.render();
    });
*/


    
}