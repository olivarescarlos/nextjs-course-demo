import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    console.log("Adding Meetup...");
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.replace("/");
  }
  return (
    <Fragment>
      <Head>
        <title>Add a new Meetup</title>
        <meta name="description" content="page to add meetups"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
    </Fragment>
  );
}

export default NewMeetupPage;
