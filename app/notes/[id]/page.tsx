import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NoteDetailsClient } from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = note.title || "Untitled Note";
  const description =
    note.content?.slice(0, 120) ||
    "View the details of this note and explore its content.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-gamma-henna.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://08-zustand-gamma-henna.vercel.app/images/note-details.png",
          width: 1200,
          height: 630,
          alt: `Note details: ${title}`,
        },
      ],
    },
  };
}
export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
