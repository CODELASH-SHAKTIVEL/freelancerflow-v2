import React, { useContext, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast, Toaster } from "sonner";
import DeleteModal from "./DeleteModal";
import { State } from "@/context/stateContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TableForm() {
  const context = useContext(State);
  const [deleteId, setDeleteId] = useState(null);

  if (!context) {
    return <div>Context not found</div>;
  }

  const {
    description,
    setDescription,
    quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    list,
    total,
    isEditing,
    showModal,
    setShowModal,
    handleSubmit,
    editRow,
  } = context;

  function handleDeleteClick(id) {
    setDeleteId(id);
    setShowModal(true);
  }

  return (
    <>
      <Toaster position="top-right" theme="light" />

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Item description"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="1"
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              min={0}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="0.00"
              required
            />
          </div>
        </div>
        <Button type="submit">
          {isEditing ? "Finish Editing" : "Add Table Item"}
        </Button>
      </form>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center" colSpan={2}>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No items added yet.
                </TableCell>
              </TableRow>
            ) : (
              list.map(({ id, description, quantity, price, amount }) => (
                <TableRow key={id}>
                  <TableCell>{description}</TableCell>
                  <TableCell className="text-right">{quantity}</TableCell>
                  <TableCell className="text-right">{price.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold">{amount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => editRow(id)}
                      aria-label="Edit item"
                    >
                      <Pencil size={18} className="text-green-600" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(id)}
                      aria-label="Delete item"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end mt-4">
        <h2 className="text-900 text-3xl font-bold">
          Total: {total.toLocaleString()}
        </h2>
      </div>

      {showModal && deleteId && <DeleteModal id={deleteId} />}
    </>
  );
}
