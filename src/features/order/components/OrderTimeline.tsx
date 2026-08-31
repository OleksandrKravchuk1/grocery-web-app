"use client";

import { CheckIcon, ClockIcon, FlameIcon, PackageCheckIcon, TruckIcon } from "lucide-react";
import { DELIVERY_STEPS } from "../types/delivery";
import { getActiveStepIndex, getStatusConfig } from "../utils/orderStatus";

interface OrderTimelineProps {
  status: string;
}

const STEP_ICONS = [
  ClockIcon,       // Pending
  FlameIcon,       // Processing
  TruckIcon,       // Shipped
  PackageCheckIcon // Delivered
];

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = getActiveStepIndex(status);
  const isCancelled = status.toLowerCase() === "cancelled";
  const config = getStatusConfig(status);

  if (isCancelled) {
    return (
      <div className="rounded-xl border border-red-200/70 bg-red-50/50 p-4 dark:border-red-900/50 dark:bg-red-950/20">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400 font-bold text-sm">
            ✕
          </div>
          <div>
            <p className="font-semibold text-sm text-red-900 dark:text-red-300">
              Order Cancelled
            </p>
            <p className="text-xs text-red-700 dark:text-red-400">
              This order was cancelled and is no longer being processed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40">
      {/* Active step banner with pulse */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {config.pulse && (
            <span className="relative flex h-2.5 w-2.5">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.dotColor} opacity-75`} />
              <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${config.dotColor}`} />
            </span>
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Order Status
          </span>
        </div>
        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
          {config.description}
        </p>
      </div>

      {/* Steps progress track */}
      <div className="relative flex items-center justify-between">
        {/* Background connector track */}
        <div className="absolute left-4 right-4 top-4 -translate-y-1/2 h-0.5 bg-zinc-200 dark:bg-zinc-800 z-0" />

        {/* Active colored fill line */}
        <div
          className="absolute left-4 top-4 -translate-y-1/2 h-0.5 bg-emerald-500 transition-all duration-700 ease-out z-0"
          style={{
            width: `${Math.max(0, Math.min(100, (currentIndex / (DELIVERY_STEPS.length - 1)) * 100))}%`,
          }}
        />

        {DELIVERY_STEPS.map((step, index) => {
          const isPast = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;
          const StepIcon = STEP_ICONS[index] || ClockIcon;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center group cursor-default"
            >
              {/* Step Circle Indicator */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${isPast
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                    : isCurrent
                      ? "border-emerald-500 bg-white text-emerald-600 dark:bg-zinc-950 dark:text-emerald-400 ring-4 ring-emerald-500/20 shadow-md scale-110"
                      : "border-zinc-300 bg-zinc-100 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500"
                  }`}
              >
                {isPast ? (
                  <CheckIcon className="h-4 w-4 stroke-3" />
                ) : (
                  <StepIcon className="h-4 w-4" />
                )}
              </div>

              {/* Step Label */}
              <div className="mt-2 text-center">
                <p
                  className={`text-xs font-medium transition-colors ${isCurrent
                      ? "font-bold text-zinc-900 dark:text-zinc-50"
                      : isPast
                        ? "text-zinc-700 dark:text-zinc-300"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
