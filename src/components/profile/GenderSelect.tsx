import { cn } from "@/lib/utils";
import { Gender } from "@/types/profile";

const genderOptions = Object.values(Gender);

interface GenderSelectProps {
  field: any;
}

export function GenderSelect({ field }: GenderSelectProps) {
  return (
    <div className="space-y-2 pt-2">
      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block">
        Gender
      </span>
      <div className="flex gap-2">
        {genderOptions.map((item) => {
          const selected = field.state.value === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => field.handleChange(item)}
              className={cn(
                "flex-1 py-2.5 rounded-xl border font-semibold transition-all duration-200 text-sm active:scale-98 cursor-pointer",
                selected
                  ? "border-green-600 bg-green-50/50 text-green-700 dark:border-green-500 dark:bg-green-950/20 dark:text-green-400 shadow-sm"
                  : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
      {field.state.meta.errors.length > 0 && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          {field.state.meta.errors[0]?.toString()}
        </p>
      )}
    </div>
  );
}
