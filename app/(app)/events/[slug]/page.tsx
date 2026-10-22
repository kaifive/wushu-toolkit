import { notFound, redirect } from "next/navigation";
import { getEvent } from "@/lib/events/registry";

/** An event has no overview page: open its first view. */
export default async function EventIndex({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event?.views[0]) notFound();
  redirect(`/events/${event.slug}/${event.views[0]}`);
}
