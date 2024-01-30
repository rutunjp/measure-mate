"use server";
import { MongoClient } from "mongodb";

export async function getCustomers() {
  const uri =
    "mongodb+srv://rutunj:LQEikApGkgElD6rN@cluster0.m8hqwdk.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("measure-mate");
    const collection = database.collection("customers");
    const data = await collection.find().toArray();
    console.log("!!!!data", data[0].garments["shirt"]);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  } finally {
    await client.close();
  }
}
