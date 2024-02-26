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
    await initializeCounter();
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
const customersCollection = database.collection("customers");
const ordersCollection = database.collection("orders");

export async function getCustomers() {
  try {
    const data = await customersCollection.find().toArray();
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
    await customersCollection.insertOne({ name: name });
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
    const result = await customersCollection.updateOne(filter, update, {
      upsert: true,
    });

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

    const result = await customersCollection.deleteOne(filter);
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

async function initializeCounter() {
  await ordersCollection.insertOne({ _id: "orderNo", sequenceValue: 0 });
}

async function getNextOrderNo() {
  const counter = await ordersCollection.findOneAndUpdate(
    { _id: "orderNo" },
    { $inc: { sequenceValue: 1 } },
    { returnDocument: "after" }
  );
  return counter.value.sequenceValue;
}

export async function insertOrder(orderData) {
  const orderNo = await getNextOrderNo(database);
  try {
    await ordersCollection.insertOne({ ...orderData, orderNo });
    console.log("Inserted new customer:", orderData);
    return 1;
  } catch (error) {
    console.error("Error adding new customer to MongoDB:", error);
    throw error;
  }
}

export async function getOrders() {
  try {
    const orders = await ordersCollection.find().toArray();
    console.log("Fetched orders:", orders);
    return orders;
  } catch (error) {
    console.error("Error fetching customers");
    throw error;
  }
}

export async function updateOrder({ orderNo, values }) {
  try {
    const order = new ObjectId(orderNo);
    const filter = { _id: orderNo };

    const update = { $set: { [order]: values } };
    const result = await ordersCollection.updateOne(filter, update, {
      upsert: true,
    });

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

export async function deleteOrder({ orderNo }) {
  try {
    const order = new ObjectId(orderNo);
    const filter = { _id: order };
    const result = await ordersCollection.deleteOne(filter);
    if (result.modifiedCount === 0) {
      console.log(`No order matched the filter: ${filter}`);
    } else {
      console.log("Order deleted successfully.");
      return 1;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
