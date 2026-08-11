type DayNavProps = {
  dayTabs: { id: string; label: string }[];
  activeDayId: string;
  onSelect: (id: string) => void;
};

export default function DayNav({ dayTabs, activeDayId, onSelect }: DayNavProps) {
  return (
    <div className="day-nav">
      {dayTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={tab.id === activeDayId ? 'day-tab active' : 'day-tab'}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
