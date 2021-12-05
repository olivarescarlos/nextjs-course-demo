import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG",
    address: "address",
    description: "first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG",
    address: "address",
    description: "Second meetup",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG",
    address: "address",
    description: "third meetup",
  },
];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="list of meetups"></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
}
/* export async function getServerSideProps(context) {
  //fetch data from an API
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
} */

export async function getStaticProps(context) {
  //fetch data from an API

  const url =
    "mongodb+srv://admin:admin@cluster0.litlg.mongodb.net/meetups?retryWrites=true&w=majority";
  const client = await MongoClient.connect(url);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  console.log(meetups);
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 30,
  };
}

export default HomePage;
