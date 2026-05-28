import { AvailabilityTrend } from "./components/Available-trend";
import { UHeader } from "./components/u-header";

export default function UtilityLayout() {
  return (
    <div className="flex flex-col gap-6 pb-8">
      <UHeader />
      <div>
        <AvailabilityTrend />
      </div>
    </div>
  );
}
