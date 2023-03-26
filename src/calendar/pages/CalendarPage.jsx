
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';
import { CalenderEvent, CalenderModal, FabAddNew, FabDelete, Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';



export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal, closeDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');


  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style
    }

  }

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event })
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent( event )
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event)
  }

  useEffect(() => {
    startLoadingEvents()
  }, []);


  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 85px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalenderEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalenderModal />
      <FabAddNew />
      <FabDelete /> 

    </>
  )
}
