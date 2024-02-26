import {
  garments,
  topGarments,
  bottomGarments,
  clothUsage,
} from "@/config/garments";
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
import {
  useState,
  useEffect,
  useInsertionEffect,
  useContext,
  createContext,
} from "react";
import { Textarea } from "@/components/ui/textarea";
export default function GarmentBox({ garment, itemToAdd, cartSetter }) {
  const [fabric, setFabric] = useState("");
  const [rate, setRate] = useState(0);
  const [description, setDescription] = useState("");
  const cart = useContext(CartContext);

  const topFabrics = fabrics.top;
  const bottomFabrics = fabrics.bottom;

  const handleFabricChange = (value) => {
    setFabric(Object.keys(value).toString());
    setRate(Object.values(value).toString());
  };
  const garmentUsage =
    fabric && garment ? rate * clothUsage[garment.toLowerCase()] : "";

  useEffect(() => {
    addItem();
    console.log("itemToAdd", itemToAdd);
  }, [description, fabric]);

  const addItem = () => {
    if (fabric && rate) {
      itemToAdd = [
        {
          ...itemToAdd,
          fabric: fabric,
          price: rate,
          description: description,
        },
      ];
    }
  };

  return (
    <>
      <div className="rounded-lg border p-2  flex-col flex gap-2">
        <div className="flex flex-row justify-between">
          <h2 className="font-semibold text-lg">{garment}</h2>
          <h2 className="font-semibold text-lg">{garmentUsage}</h2>
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
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Type your message here."
        />
      </div> 
      </>
  );
}
