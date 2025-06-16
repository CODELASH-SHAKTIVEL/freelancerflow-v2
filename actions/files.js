"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

/* ──────────────────────────────── */
/* 🔐 Get Current App User Helper   */
/* ──────────────────────────────── */
async function getCurrentAppUser() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) throw new Error("User not found");
  return user;
}

/* ──────────────────────────────── */
/* 📁 Create Folder                 */
/* ──────────────────────────────── */
export async function createFolder(name) {
  const user = await getCurrentAppUser();

  const slug = slugify(name, { lower: true });

  const exists = await db.folder.findUnique({ where: { slug } });
  if (exists) throw new Error("Folder already exists");

  const folder = await db.folder.create({
    data: {
      name,
      slug,
      userId: user.id,
    },
  });

  revalidatePath("/files");
  return folder;
}

/* ──────────────────────────────── */
/* 📁 Get All Folders               */
/* ──────────────────────────────── */
export async function getAllFolders() {
  const user = await getCurrentAppUser();

  return db.folder.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

/* ──────────────────────────────── */
/* 📁 Get Folder by Slug            */
/* ──────────────────────────────── */
export async function getFolderBySlug(slug) {
  const user = await getCurrentAppUser();

  return db.folder.findFirst({
    where: {
      slug,
      userId: user.id,
    },
    include: { files: true },
  });
}

/* ──────────────────────────────── */
/* 📄 Upload File to Folder         */
/* ──────────────────────────────── */
export async function uploadFileToFolder({ name, url, type, size, folderId }) {
  const user = await getCurrentAppUser();

  const folder = await db.folder.findUnique({
    where: { id: folderId },
  });

  if (!folder || folder.userId !== user.id) {
    throw new Error("Unauthorized or folder not found");
  }

  const file = await db.file.create({
    data: {
      name,
      url,
      type,
      size,
      folderId,
    },
  });

  revalidatePath(`/files/${folder.slug}`);
  return file;
}

/* ──────────────────────────────── */
/* 📄 Get Files in Folder           */
/* ──────────────────────────────── */
export async function getFilesByFolder(folderId) {
  const user = await getCurrentAppUser();

  const folder = await db.folder.findUnique({
    where: { id: folderId },
  });

  if (!folder || folder.userId !== user.id) {
    throw new Error("Unauthorized or folder not found");
  }

  return db.file.findMany({
    where: { folderId },
    orderBy: { createdAt: "desc" },
  });
}

/* ❌ Delete File */
export async function deleteFile(fileId) {
  const user = await getCurrentAppUser();
  const file = await db.file.findUnique({ where: { id: fileId } });
  if (!file) throw new Error("File not found");

  const folder = await db.folder.findUnique({ where: { id: file.folderId } });
  if (!folder || folder.userId !== user.id) throw new Error("Unauthorized");

  await db.file.delete({ where: { id: fileId } });
  revalidatePath(`/files/${folder.slug}`);
}

/* ✏️ Rename File */
export async function renameFile(fileId, newName) {
  const user = await getCurrentAppUser();
  const file = await db.file.findUnique({ where: { id: fileId } });
  if (!file) throw new Error("File not found");

  const folder = await db.folder.findUnique({ where: { id: file.folderId } });
  if (!folder || folder.userId !== user.id) throw new Error("Unauthorized");

  const updated = await db.file.update({
    where: { id: fileId },
    data: { name: newName },
  });

  revalidatePath(`/files/${folder.slug}`);
  return updated;
}