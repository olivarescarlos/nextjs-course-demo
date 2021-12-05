import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>Add</title>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        image={props.meetupData.image}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const url =
    "mongodb+srv://admin:admin@cluster0.litlg.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(url);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const url =
    "mongodb+srv://admin:admin@cluster0.litlg.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(url);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}
export default MeetupDetails;
