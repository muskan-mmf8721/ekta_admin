import { getDG } from "@/lib/dg-data";
import { DGDetailPage } from "@/features/utility/dg-detail";
import { notFound } from "next/navigation";

export default async function DGPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dg = getDG(decodeURIComponent(id));

  if (!dg) notFound();

  return <DGDetailPage dg={dg} />;
}
