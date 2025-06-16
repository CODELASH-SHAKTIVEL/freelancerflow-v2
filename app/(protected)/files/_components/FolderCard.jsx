"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Folder } from "lucide-react";

export default function FolderCard({ folder }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/files/${folder.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer hover:shadow-md transition"
    >
      <CardContent className="p-4 flex items-center space-x-3">
        <Folder className="text-yellow-500 w-6 h-6" />
        <span className="truncate">{folder.name}</span>
      </CardContent>
    </Card>
  );
}
