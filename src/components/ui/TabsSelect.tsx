import { useEffect, useState } from "react";
import { Tab } from "../../types/engagement";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

interface TabsSelectProps {
  tabs: Tab[];
  name: string;
  register?: UseFormRegister<any>;
  watch?: UseFormWatch<any>;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * Custom tab select component
 * Has support to be controlled by react-hook-form or manually with value and onChange
 * 
 * @param props - The component props 
 * @returns - The TabsSelect JSX element
 */
const TabsSelect = ({
  tabs,
  name,
  register,
  watch,
  label,
  value,
  onChange,
}: TabsSelectProps) => {
  const isControlledByHookForm = !!register && !!watch;

  // Initialize activeTab state
  const initialTab = isControlledByHookForm ? watch(name) : value;
  const [activeTab, setActiveTab] = useState<string>(initialTab || tabs[0]?.id || "");

  // Register and watch the input if controlled by hook form
  const { onChange: registerOnChange, ...registerRest } = register?.(name) || {};
  const formValue = isControlledByHookForm ? watch(name) : value;

  // Keep local state in sync with form value or external value
  useEffect(() => {
    if (formValue && formValue !== activeTab) {
      setActiveTab(formValue);
    }
  }, [formValue]);

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, tabId: string) => {
    e.preventDefault();
    setActiveTab(tabId);
    // Trigger form onChange if controlled by Hook Form
    if (isControlledByHookForm) {
      registerOnChange?.({
        target: {
          name,
          value: tabId
        }
      });
    }

    // Call custom onChange if provided
    onChange?.(tabId);
  };

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, tabId: string) => {
    const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(tabs[currentTabIndex].id);
      if (isControlledByHookForm) {
        registerOnChange?.({
          target: {
            name,
            value: tabs[currentTabIndex].id
          }
        });
      }
      onChange?.(tabs[currentTabIndex].id);
    }
    if(e.key === "ArrowRight"){
      e.preventDefault();
      const nextTabIndex = (currentTabIndex + 1) % tabs.length;
      setActiveTab(tabs[nextTabIndex].id);
      if (isControlledByHookForm) {
        registerOnChange?.({
          target: {
            name,
            value: tabs[nextTabIndex].id
          }
        });
      }
      onChange?.(tabs[nextTabIndex].id);
    }
    if(e.key === "ArrowLeft"){
      e.preventDefault();
      const nextTabIndex = (currentTabIndex + - 1) % tabs.length;
      setActiveTab(tabs[nextTabIndex].id);
      if (isControlledByHookForm) {
        registerOnChange?.({
          target: {
            name,
            value: tabs[nextTabIndex].id
          }
        });
      }
      onChange?.(tabs[nextTabIndex].id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="tabsSelectContainer"
    >
      {/* Hidden input field for use with React Hook Form */}
      {isControlledByHookForm && (
        <input
          type="hidden"
          aria-label={label}
          {...registerRest}
        />
      )}

      {tabs.map((tab) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          role="tab"
          aria-selected={activeTab === tab.id}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={(e) => handleTabClick(e, tab.id)}
          onKeyDown={(e) => handleKeyDown(e, tab.id)}
          className={`tabButton ${activeTab === tab.id ? "activeTab" : "inactiveTab"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabsSelect