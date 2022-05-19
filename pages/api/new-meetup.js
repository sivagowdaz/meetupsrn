import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method == 'POST') {
        console.log(req.body)
        const client = await MongoClient.connect('mongodb+srv://shivaprasad:asdfghj123@taskmanager.wzqqo.mongodb.net/Meetups?retryWrites=true&w=majority')
        const db = client.db();
        const meetupCollection = db.collection('meetups')
        const result = await meetupCollection.insertOne(req.body)
        console.log(result)
        client.close()
        return res.status(200).json({status:"success"})
    } else {
        return res.status(500).json({status: "failure"})
    }
}


export default handler;