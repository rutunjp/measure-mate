"use server";
import { MongoClient, ObjectId } from "mongodb";
import { pantSchema, shirtSchema } from "@/components/measurementForm";
import { z, ZodError } from "zod";
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log("Closed MongoDB connection");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}
const database = client.db("customers");
const collection = database.collection("customers");

export async function getCustomers() {
  try {
    const data = await collection.find().toArray();
    const customers = data.map((customer) => ({
      ...customer,
      _id: customer._id.toString(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching customers from MongoDB:", error);
    throw error;
  }
}

export async function addCustomer({ name }) {
  try {
    await collection.insertOne({ name: name });
    console.log("Inserted new customer:", name);
  } catch (error) {
    console.error("Error adding new customer to MongoDB:", error);
    throw error;
  }
}

export async function updateCustomer(props) {
  try {
    const customerId = new ObjectId(props.customerid);
    const filter = { _id: customerId };

    const garment = props.garment;

    const update = { $set: { [garment]: props.garmentMeasurement } };

    const result = await collection.updateOne(filter, update);

    if (result.modifiedCount === 0) {
      console.log(`No document matched the filter: ${filter}`);
    } else {
      console.log(`Customer updated successfully. Shirt: ${props?.shirt}`);
    }
  } catch (error) {
    console.error("Error updating customer:", error);
  }
}
