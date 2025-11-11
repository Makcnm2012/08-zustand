import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] || "all";

  const title = `Notes filtered by "${filter}"`;
  const description = `Browse all notes filtered by category or tag: "${filter}". Keep your ideas organized with NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-gamma-henna.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://08-zustand-gamma-henna.vercel.app/images/notes-filter.png",
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${filter}`,
        },
      ],
    },
  };
}

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const categoryId = slug?.[0];
  const isAll = categoryId === "all";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, isAll ? undefined : categoryId],
    queryFn: () => fetchNotes("", 1, isAll ? undefined : categoryId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        key={categoryId || "all"}
        tag={isAll ? undefined : categoryId}
      />
    </HydrationBoundary>
  );
}
