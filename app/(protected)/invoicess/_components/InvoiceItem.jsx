"use client";

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

export default function InvoiceItem({ items, currency, onAdd, onRemove, onChange }) {
  return (
    <div className="space-y-4 mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Item</TableHead>
            <TableHead className="w-[70px]">Qty</TableHead>
            <TableHead className="w-[130px]">Rate</TableHead>
            <TableHead className="text-center w-[50px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              currency={currency}
              onRemove={onRemove}
              onChange={onChange}
            />
          ))}
        </TableBody>
      </Table>
      <Button type="button" onClick={onAdd} className="font-semibold">
        Add Item
      </Button>
    </div>
  );
}

function ItemRow({ item, currency, onRemove, onChange }) {
  return (
    <TableRow>
      <TableCell className="w-full">
        <EditableField
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
          }}
          onChange={onChange}
        />
        <EditableField
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id,
          }}
          onChange={onChange}
        />
      </TableCell>
      <TableCell className="min-w-[70px]">
        <EditableField
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }}
          onChange={onChange}
        />
      </TableCell>
      <TableCell className="min-w-[130px]">
        <EditableField
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "text-end",
            value: item.price,
            id: item.id,
          }}
          onChange={onChange}
        />
      </TableCell>
      <TableCell className="text-center min-w-[50px]">
        <BiTrash
          onClick={() => onRemove(item.id)}
          className="w-[33px] h-[33px] p-[7.5px] rounded bg-destructive text-white cursor-pointer hover:opacity-80"
        />
      </TableCell>
    </TableRow>
  );
}