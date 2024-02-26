"use client";
import { createContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { clothUsage, garments } from "@/config/garments";
import { TrashIcon } from "lucide-react";
import { fabrics } from "@/config/fabrics";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function OrderList({ setCart, cart }) {
  const [total, setTotal] = useState(0);
  const [garment, setGarment] = useState();
  const [itemToAdd, setItemToAdd] = useState({});

  const handleClick = (garment, index) => () => {
    const newItem = { garment: garment, key: index };
    setCart([...cart, newItem]);
  };

  function findItemInCart(itemToAdd) {
    console.log(
      "FIND",
      cart,
      cart.filter((item) => {
        return item.key === itemToAdd.key;
      })
    );
  }
  useEffect(() => {
    console.log("cart in ordeir", cart, itemToAdd);
    findItemInCart(itemToAdd);
    console.log(itemToAdd);
  }, [itemToAdd]);

  const handleDelete = (i) => {
    const updatedCart = cart.filter((_, index) => index !== i);
    console.log("after delete", updatedCart);
    setCart(updatedCart);
  };

  return (
    <>
      <h2 className="font-semibold text-2xl ">Total: {total}</h2>
      <div className="flex gap-1 flex-row">
        {garments.map((garment, index) => (
          <Button
            variant="outline"
            key={garment}
            onClick={handleClick(garment, index)}
          >
            Add {garment}
          </Button>
        ))}
      </div>
      {cart?.map((val, i) => (
        <div className="flex flex-col" key={i}>
          <GarmentBox
            itemToAdd={itemToAdd}
            setItemToAdd={setItemToAdd}
            key={i}
            index={i}
            item={val}
            cart={cart}
            setCart={setCart}
          />
          <Button onClick={() => handleDelete(i)} variant="destructive">
            <TrashIcon className="mr-2 h-4 w-4" /> Delete item
          </Button>
        </div>
      ))}
    </>
  );
}

export function GarmentBox({ setItemToAdd, itemToAdd, item, index, key }) {
  const [fabric, setFabric] = useState(item.fabric || "");
  const [rate, setRate] = useState(item.rate || 0);
  const [description, setDescription] = useState(item.description || "");

  const topFabrics = fabrics.top;
  const bottomFabrics = fabrics.bottom;

  const garmentPrice =
    fabric && item
      ? rate * clothUsage[item.garment.toLowerCase()]
      : "Select Fabric";

  const handleFabricChange = (value) => {
    setFabric(Object.keys(value).toString());
    setRate(Object.values(value).toString());
  };
  const handleChange = (field, value) => {
    switch (field) {
      case "fabric":
        setFabric(value);
        break;
      case "rate":
        setRate(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleChange(index, "fabric", fabric);
    handleChange(index, "rate", rate);
    handleChange(index, "description", description);
  }, [fabric, rate, description]);

  useEffect(() => {
    addItem();
  }, [rate, description]);

  const addItem = () => {
    if (fabric || rate) {
      setItemToAdd({
        key: index,
        garment: item,
        fabric: fabric,
        price: garmentPrice,
        description: description,
      });
    }
  };

  return (
    <>
      <div className="rounded-lg border p-2 flex-col flex gap-2">
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-lg">{item.garment}</h2>
          <h2 className="font-semibold text-lg">{garmentPrice}</h2>
        </div>
        <Select onValueChange={handleFabricChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fabric" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Top Fabrics</SelectLabel>
              {topFabrics.map((fabric, i) => (
                <SelectItem key={i} value={fabric}>
                  {Object.keys(fabric)[0]} -{" "}
                  <span className="text-gray-500">
                    {Object.values(fabric)[0]}
                  </span>
                </SelectItem>
              ))}
              <SelectSeparator />
              <SelectLabel>Bottom Fabrics</SelectLabel>
              {bottomFabrics?.map((fabric, i) => (
                <SelectItem key={i} value={fabric}>
                  {Object.keys(fabric)[0]} -{" "}
                  <span className="text-gray-500">
                    {Object.values(fabric)[0]}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Textarea
          className="resize-none"
          value={description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Type your message here."
        />
      </div>
    </>
  );
}
