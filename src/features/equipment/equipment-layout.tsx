import { EHeader } from "./component/e-header";
import { MachineCards } from "./component/Machine-cards";
import { MachineList } from "./component/MachineList";
import { ChartsSection } from "./component/ChartsSection";

export default function EquipmentLayout() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <EHeader />
      <MachineCards />
      <ChartsSection />
      <MachineList />
    </div>
  );
}

