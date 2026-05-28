import { NotificationChannels } from "./components/NotificationChannels";
import { ThresholdRulesTable } from "./components/ThresholdRulesTable";
import { EscalationRules } from "./components/EscalationRules";
import { NewRuleModal } from "./components/NewRuleModal";

export function AlertConfigPage() {
  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Alert Configuration
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configure threshold rules and notification channels
          </p>
        </div>
        <NewRuleModal />
      </div>

      {/* ── Notification Channels ── */}
      <NotificationChannels />

      {/* ── Threshold Rules ── */}
      <ThresholdRulesTable />

      {/* ── Escalation Rules ── */}
      <EscalationRules />
    </div>
  );
}
