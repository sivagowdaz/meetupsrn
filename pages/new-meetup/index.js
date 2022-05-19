// our-domain.com/new-meetup
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

function NewMeetupPage(meetup_data) {
  const router = useRouter();

  const addMeetupHandler = async(entered_meetup_data) => {
    let res = await fetch('/api/new-meetup', {
      method:'POST',
      body: JSON.stringify(entered_meetup_data),
      headers: {
        'Content-Type':'application/json'
      }
    })
    let data = await res.json();
    console.log("the data issis", data)
    router.push('/')
  } 
  return (
    <NewMeetupForm onAddMeetup={addMeetupHandler}/>
  );
}

export default NewMeetupPage;
