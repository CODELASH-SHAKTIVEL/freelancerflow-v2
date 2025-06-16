"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllFolders, createFolder } from "@/actions/files";

import FolderCard from "./_components/FolderCard";
import NewFolderDialog from "./_components/NewFolderDialog";

export default function FilesPage() {
  const [folders, setFolders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getAllFolders();
      setFolders(data);
    })();
  }, []);

  const handleCreateFolder = async (name) => {
    const newFolder = await createFolder(name);
    setFolders((prev) => [newFolder, ...prev]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Folders</h2>
        <NewFolderDialog onCreate={handleCreateFolder} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onClick={() => router.push(`/files/${folder.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}
