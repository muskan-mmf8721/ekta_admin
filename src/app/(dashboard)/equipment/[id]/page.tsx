import { getMachine } from "@/lib/machines-data";
import { MachineDetailPage } from "@/features/equipment/component/machine-detail";
import { notFound } from "next/navigation";

export default async function MachinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const machine = getMachine(decodeURIComponent(id));

  if (!machine) notFound();

  return <MachineDetailPage machine={machine} />;
}
