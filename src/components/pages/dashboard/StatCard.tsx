import { cn } from "@/libs/cn";
import { Icon } from "@iconify/react";

interface StatCardProps {
  icon: string;
  title: string;
  count: number;
  className: string;
}

export const DashboardStatCard = ({
  icon,
  title,
  count,
  className,
}: StatCardProps) => {
  return (
      <div className={cn("flex items-center gap-4 p-4 rounded-2xl border border-blue-4", className)}>
        <div className="grid place-content-center rounded-full size-12 bg-light-blue-3">
          <Icon
            icon={icon}
            className="size-6 text-text-secondary"
          />
        </div>
        <div className="grid gap-1">
          <h1 className="text-sm text-text-secondary">{title}</h1>
          <p className="text-2xl text-text-primary">{count}</p>
        </div>
      </div>
  );
};
