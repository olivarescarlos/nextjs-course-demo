import { MongoClient } from "mongodb";
// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  console.log("new-meetup");
  if (req.method === "POST") {
    console.log("IF statement");
    const data = req.body;
    const url =
      "mongodb+srv://admin:admin@cluster0.litlg.mongodb.net/meetups?retryWrites=true&w=majority";
    console.log("connecting to: " + url);
    const client = await MongoClient.connect(url);
    console.log("Connected");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log("result", result);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}
export default handler;
