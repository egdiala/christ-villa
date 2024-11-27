import { Icon } from "@iconify/react";
import { RenderIf } from "../RenderIf";
import { useNavigate } from "react-router";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];
  /**
   * Optional boolean prop to render back button
   */
  showBack?: boolean;
}

/**
 * Breadcrumb component for app navigation
 */
export const Breadcrumb = ({ items, showBack = false }: BreadcrumbProps) => {
  const navigate = useNavigate();
  if (items.length === 0) {
    return null; // Return null when there are no items
  }

  // Determine the items to display based on the length of the items array
  let displayItems: BreadcrumbItem[];
  if (items.length >= 4) {
    displayItems = items.slice(-3); // Display the last two items
  } else {
    displayItems = items;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2">
      <RenderIf condition={showBack}>
          <button type="button" onClick={() => navigate(-1)}>
            <Icon icon="ph:arrow-left" className="text-grey-dark-1 size-6" />
          </button>
      </RenderIf>

      <ol className="flex flex-wrap items-center gap-1">
        {displayItems.map((item, index) => (
          <li
            key={item.label}
            className={`flex items-center gap-2 text-sm font-normal capitalize
              ${index === items.length - 1 ? "text-grey-dark-1" : "text-grey-dark-2"}
            `}
          >
            {item.link ? (
              <a href={item.link}>{item.label}</a>
            ) : (
              <span>{item.label}</span>
            )}
            {index !== displayItems.length - 1 && (
                <Icon icon="ph:caret-right" className="text-grey-dark-3 size-3" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};