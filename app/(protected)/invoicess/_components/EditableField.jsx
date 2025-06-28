"use client";

import { Input } from "@/components/ui/input";

export default function EditableField({ cellData, onChange }) {
  const {
    leading,
    type,
    placeholder,
    min,
    name,
    id,
    value,
    step,
    precision,
    textAlign,
  } = cellData;

  const handleChange = (e) => {
    onChange(id, name, e.target.value);
  };

  return (
    <div className="flex items-center gap-2 my-1">
      {leading && (
        <span className="text-sm font-semibold border border-secondary rounded-full w-5 h-5 flex items-center justify-center">
          {leading}
        </span>
      )}
      <Input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        min={min}
        step={step}
        value={value}
        onChange={handleChange}
        className={textAlign}
        required
      />
    </div>
  );
}
