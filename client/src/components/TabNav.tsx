import type { Tab } from '../../../server/types';

type TabNavProps = {
  tabs: Tab[];
  activeTabId: string;
  onSelect: (id: string) => void;
};

export default function TabNav({ tabs, activeTabId, onSelect }: TabNavProps) {
  return (
    <nav className="main-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={tab.id === activeTabId ? 'main-tab active' : 'main-tab'}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
