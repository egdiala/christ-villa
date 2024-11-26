import { Button } from "@/components/core"

export const DashboardPage: React.FC = () => {
    return (
        <div className="px-4 md:px-8 pt-3 md:pt-5 pb-5 md:pb-10 view-page-container overflow-y-scroll">
            Dashboard
            <Button theme="ghost" disabled>Primary</Button>
        </div>
    )
}