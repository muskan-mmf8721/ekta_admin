import { Machine } from "@/lib/machines-data";

function GaugeSVG({
  hoursUsed,
  hoursAllowed,
}: {
  hoursUsed: number;
  hoursAllowed: number;
}) {
  const pct = Math.min(Math.max(hoursUsed / hoursAllowed, 0), 0.9999);

  // ── geometry ──────────────────────────────────────────────────
  const cx = 115;       // centre x
  const cy = 118;       // centre y  (sits near bottom of viewBox)
  const r  = 93;        // radius
  const trackW = 20;    // stroke width

  // Semicircle going CCW (sweep=0) from 9-o'clock → 12 → 3-o'clock
  const sx = cx - r;   // (22, 118)  left endpoint
  const ex = cx + r;   // (208, 118) right endpoint
  const arcD = `M ${sx} ${cy} A ${r} ${r} 0 0 0 ${ex} ${cy}`;

  // Total arc length (half-circumference)
  const totalLen = Math.PI * r; // ≈ 292.2

  // ── needle ────────────────────────────────────────────────────
  // angle sweeps from π (left, 0%) → 0 (right, 100%)
  const angleRad = Math.PI * (1 - pct);
  const needleLen = r - 20;   // slightly inside the track
  const nX = cx + needleLen * Math.cos(angleRad);
  const nY = cy - needleLen * Math.sin(angleRad); // minus: SVG y goes down

  // ── colour ────────────────────────────────────────────────────
  const color =
    pct >= 0.9 ? "#ef4444" : pct >= 0.7 ? "#f59e0b" : "#10b981";

  return (
    // viewBox leaves ample room: 230 wide × 130 tall
    // arc top is at cy-r = 25, bottom of rounded caps at cy+trackW/2 ≈ 128
    <svg viewBox="0 0 230 130" className="w-full" aria-hidden>
      {/* Gray track — full semicircle */}
      <path
        d={arcD}
        stroke="#e5e7eb"
        strokeWidth={trackW}
        fill="none"
        strokeLinecap="round"
      />

      {/* Colored fill — same path, clipped by dasharray */}
      <path
        d={arcD}
        stroke={color}
        strokeWidth={trackW}
        fill="none"
        strokeLinecap="round"
        pathLength={totalLen}
        strokeDasharray={`${pct * totalLen} 9999`}
      />

      {/* Needle */}
      <line
        x1={cx}
        y1={cy}
        x2={+nX.toFixed(2)}
        y2={+nY.toFixed(2)}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* Pivot dot */}
      <circle cx={cx} cy={cy} r={5} fill={color} />
    </svg>
  );
}

export function HoursGauge({ machine }: { machine: Machine }) {
  const remaining = machine.hoursAllowed - machine.hoursUsed;

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-5 flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-bold text-foreground">Hours Gauge</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Total vs Allowed</p>
      </div>

      {/* SVG gauge — negative margin pulls text label up into the open base */}
      <div className="-mb-3">
        <GaugeSVG
          hoursUsed={machine.hoursUsed}
          hoursAllowed={machine.hoursAllowed}
        />
      </div>

      {/* Centre label */}
      <div className="flex flex-col items-center">
        <div className="flex items-baseline gap-0.5">
          <span className="text-4xl font-extrabold text-foreground leading-none">
            {machine.hoursUsed}
          </span>
          <span className="text-sm text-muted-foreground">
            /{machine.hoursAllowed}h
          </span>
        </div>
        <span className="text-xs text-muted-foreground mt-0.5">
          Hours Consumed
        </span>
      </div>

      {/* Breakdown rows */}
      <div className="border-t border-border/50 pt-3 flex flex-col gap-2">
        {[
          { label: "Daily Maintenance", value: `${machine.dailyMaintH}h`, red: false },
          { label: "Preventive",        value: `${machine.preventiveH}h`, red: false },
          { label: "Breakdown",         value: `${machine.breakdownH}h`,  red: true  },
        ].map((row) => (
          <div key={row.label} className="flex justify-between text-xs">
            <span className="text-muted-foreground">{row.label}</span>
            <span className={row.red ? "font-semibold text-red-500" : "font-medium text-foreground"}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
