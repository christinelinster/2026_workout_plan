import { useEffect, useState } from 'react';
import type { Program, Tab } from '../../server/types';
import { fetchProgram } from './api';
import TabNav from './components/TabNav';
import DayNav from './components/DayNav';
import DayPanel from './components/DayPanel';
import HomeRoutine from './components/HomeRoutine';

export default function App() {
  const [program, setProgram] = useState<Program | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTabId, setActiveTabId] = useState('p1');
  const [activeDays, setActiveDays] = useState<Record<string, string>>({});

  const load = () => {
    setError(null);
    setProgram(null);
    fetchProgram()
      .then(setProgram)
      .catch((err: Error) => setError(err.message));
  };

  useEffect(() => {
    load();
  }, []);

  if (error) {
    return (
      <div className="content-area">
        <div className="page-header">
          <div className="page-title">Lean &amp; Strong - Upper / Lower</div>
        </div>
        <div className="info-bar">{error}</div>
        <button type="button" className="main-tab" onClick={load}>
          Retry
        </button>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="content-area">
        <div className="info-bar">Loading…</div>
      </div>
    );
  }

  const activeTab: Tab = program.tabs.find((t) => t.id === activeTabId) ?? program.tabs[0];

  const renderContent = () => {
    if (activeTab.kind === 'home') {
      return <HomeRoutine routine={activeTab.home} />;
    }

    const activeDayId = activeDays[activeTab.id] ?? activeTab.dayTabs[0].id;
    const day = activeTab.days.find((d) => d.id === activeDayId) ?? activeTab.days[0];

    const handleDaySelect = (id: string) => {
      setActiveDays((prev) => ({ ...prev, [activeTab.id]: id }));
    };

    return (
      <div>
        {activeTab.phaseBar && <div className="phase-bar">{activeTab.phaseBar}</div>}
        <DayNav dayTabs={activeTab.dayTabs} activeDayId={activeDayId} onSelect={handleDaySelect} />
        {day && <DayPanel day={day} />}
      </div>
    );
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">{program.title}</div>
      </div>
      <TabNav tabs={program.tabs} activeTabId={activeTab.id} onSelect={setActiveTabId} />
      <div className="content-area">{renderContent()}</div>
    </div>
  );
}
