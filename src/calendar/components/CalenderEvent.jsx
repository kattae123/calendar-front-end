
export const CalenderEvent = ({ event }) => {

    const { title, user } = event;


  return (
    <>
        <strong>{ title }</strong>
        <span> - { user.name }</span>
    </>
  )
}
