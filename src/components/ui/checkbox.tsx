import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const handleClick = () => {
      console.log("🔴 Checkbox clicked, current checked:", checked);
      const newChecked = !checked;
      console.log("🔴 Setting checked to:", newChecked);
      onCheckedChange?.(newChecked);
    };

    return (
      <div className="relative" onClick={handleClick}>
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 rounded border border-slate-300 dark:border-slate-600 flex items-center justify-center transition-colors cursor-pointer",
            checked
              ? "bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500"
              : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700",
            className
          )}
        >
          {checked && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
