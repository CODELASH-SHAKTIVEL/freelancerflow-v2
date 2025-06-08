import React, { useContext } from "react";
import { State } from "@/context/stateContext";


export default function Table() {
  const context = useContext(State);

  if (!context) {
    return null;
  }

  const { list, total } = context ;

  return (
    <>
      <table width="100%" className="mb-10">
        <thead>
          <tr className="p-1">
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(
          ({ id, description, quantity, price, amount }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr className="h-10">
                  <td>{description}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                  <td>{amount}</td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>

      <div>
        <h2 className="flex items-end justify-end text-white-800 text-4xl font-bold">
          Total : {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}