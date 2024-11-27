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
    <div
      className={`border border-blue-4 rounded-2xl grid gap-y-[26px] p-6 flex-1 ${className}`}
    >
      <div className="bg-light-blue-3 rounded-full flex justify-center items-center p-3 size-12">
        <Icon icon={icon} className="size-6" />
      </div>
      <div className="grid gap-y-1">
        <p className="text-sm text-text-secondary leading-[23.8px]">{title}</p>
        <h2 className="text-2xl text-text-primary leading-[31.2px]">{count}</h2>
      </div>
    </div>
  );
};
