"use server";
import { MongoClient, ObjectId } from "mongodb";
import { pantSchema, shirtSchema } from "@/components/measurementForm";
import { z, ZodError } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const uri =
  "mongodb+srv://rutunj3:bdIWvHBPdZUFy0D5@cluster0.r8jddph.mongodb.net/";
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
const database = client.db("measure-mate");
const collection = database.collection("customers");

export async function getCustomers() {
  try {
    const data = await collection.find().toArray();
    const customers = data.map((customer) => ({
      ...customer,
      _id: customer._id.toString(),
    }));
    return customers;
  } catch (error) {
    console.error("Error fetching customers from MongoDB:", error);
    throw error;
  }
}

export async function addCustomer({ name }) {
  try {
    await collection.insertOne({ name: name });
    console.log("Inserted new customer:", name);

    return 1;
  } catch (error) {
    console.error("Error adding new customer to MongoDB:", error);
    throw error;
    return 0;
  }
}

export async function updateCustomer({ bodyPart, values, customerid }) {
  try {
    console.log("props", { bodyPart, values, customerid });
    const customerId = new ObjectId(customerid);
    const filter = { _id: customerId };

    const update = { $set: { [bodyPart]: values } };
    const result = await collection.updateOne(filter, update, { upsert: true });

    if (result.modifiedCount === 0) {
      console.log(`No document matched the filter: ${filter}`);
    } else {
      console.log(`Customer updated successfully. Shirt: ${values}`);
      return 1;
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    return 0;
  }
}

export async function deleteCustomer(customerid) {
  try {
    const customerId = new ObjectId(customerid);
    const filter = { _id: customerId };

    const result = await collection.deleteOne(filter);
    if (result.modifiedCount === 0) {
      console.log(`DETELEEL document matched the filter: ${filter}`);
    } else {
      console.log(`Customer deleted successfully.`);

      return 1;
    }
  } catch (error) {
    console.error("Error updating customer:", error);
  }
}
