"use client";

import React, {
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";

// Define a default context with empty functions and values
export const State = createContext(null);

export default function StateContext({ children }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [width] = useState(641);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const componentRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      const newItem = {
        id: uuidv4(),
        description,
        quantity,
        price,
        amount: quantity * price,
      };
      setDescription("");
      setQuantity(0);
      setPrice(0);
      setAmount(0);
      setList([...list, newItem]);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    setAmount(quantity * price);
  }, [price, quantity]);

  const calculateTotal = () => {
    const allItems = list.map((item) => item.amount);
    setTotal(Number(collect(allItems).sum()));
  };

  useEffect(() => {
    calculateTotal();
  }, [list]);

  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    if (!editingRow) return;

    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
    setShowModal(false);
  };

  const context = {
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    bankName,
    setBankName,
    bankAccount,
    setBankAccount,
    website,
    setWebsite,
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    description,
    setDescription,
    quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    setAmount,
    list,
    setList,
    total,
    setTotal,
    width,
    componentRef,
    handlePrint,
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
    handleSubmit,
    editRow,
    deleteRow,
    showLogoutModal,
    setShowLogoutModal,
  };

  return React.createElement(State.Provider, { value: context }, children);
}
