import { Fragment } from "react/cjs/react.production.min"
import { MongoClient, ObjectId } from 'mongodb';

const MeetupDetail = (props) => {
  console.log(props.meetup)
  return <Fragment>
    <img src={props.meetup.image} width='400px' height='400px'></img>
    <p>{props.meetup.title}</p>
    <p>{props.meetup.address}</p>
    <p>{props.meetup.description}</p>
  </Fragment>
}
export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://shivaprasad:asdfghj123@taskmanager.wzqqo.mongodb.net/Meetups?retryWrites=true&w=majority')
  const db = client.db();
  const meetupCollection = db.collection('meetups')
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({params:{meetupId:meetup._id.toString()}})),
  }
}

export async function getStaticProps(context) {
  const { meetupId } = context.params

  const client = await MongoClient.connect('mongodb+srv://shivaprasad:asdfghj123@taskmanager.wzqqo.mongodb.net/Meetups?retryWrites=true&w=majority')
  const db = client.db();
  const meetupCollection = db.collection('meetups')

  const meetup = await meetupCollection.findOne({ _id: ObjectId(meetupId) });
  console.log("meetup id",meetupId)
  console.log("the fetched data is", meetup)
  var newmeetup = { ...meetup, _id: meetup._id.toString() }
  console.log("djf",newmeetup)
  return {
    props: {
      meetup: newmeetup
    }
  }
}

export default MeetupDetail;