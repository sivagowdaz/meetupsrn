import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb';
import Head from 'next/head'
import { Fragment } from 'react/cjs/react.production.min';

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>meetup home</title>
        <meta name='description' content='this is the amazing meetup website created using next js'/>
      </Head>
      <MeetupList meetups={ props.meetups }/>
    </Fragment>
  )
}

export async function getStaticProps() {
  const client = await MongoClient.connect('mongodb+srv://shivaprasad:asdfghj123@taskmanager.wzqqo.mongodb.net/Meetups?retryWrites=true&w=majority')
  const db = client.db();
  const meetupCollection = db.collection('meetups')
  const meetups = await meetupCollection.find().toArray();
  console.log("the meetups are", meetups)
  client.close();
  return ({
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1000
  });
}
// export async function getServerSideProps(context) {
//   const res = context.res;
//   const req = context.req
//   return {
//     props: {
//       meetups: DUMMY_DATA
//     }
//   }
// }

export default HomePage;