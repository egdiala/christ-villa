import React from "react";
// import emptyState from "@/assets/empty_state_illustration.svg"

interface EmptyStateProps {
  emptyStateText: string | null
}

export const EmptyState: React.FC<EmptyStateProps> = ({ emptyStateText = null }) => {
  return (
    <div className="h-full w-full flex items-center flex-col gap-5 py-20 justify-center">
      {/* <img src={emptyState} alt="empty_state_illustration" /> */}
      <div className="grid gap-1">
        <h4 className="font-bold text-grey-dark-1 text-2xl text-center">Nothing here</h4>
        <p className="text-sm text-grey-dark-2 text-center">
          {emptyStateText}
        </p>
      </div>
    </div>
  );
};