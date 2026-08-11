import type { Day } from '../../../server/types';
import MetaCard from './MetaCard';
import ExerciseCard from './ExerciseCard';
import PrimerAccordion from './PrimerAccordion';

type DayPanelProps = {
  day: Day;
};

export default function DayPanel({ day }: DayPanelProps) {
  return (
    <div>
      <div className="day-header">
        <div className="day-eyebrow">{day.eyebrow}</div>
        <div className="day-title">{day.title}</div>
        <div className="day-sub">{day.sub}</div>
      </div>
      <div className="meta-row">
        {day.meta.map((m) => (
          <MetaCard key={m.label} label={m.label} value={m.value} />
        ))}
      </div>
      {day.sections.map((section, i) => (
        <div key={i}>
          {section.label && <div className="section-label">{section.label}</div>}
          {section.station && <div className="station-badge">{section.station}</div>}
          {section.rest && <div className="rest-bar">{section.rest}</div>}
          {section.info && <div className="info-bar">{section.info}</div>}
          {section.primer && <PrimerAccordion primer={section.primer} />}
          {section.exercises?.map((exercise) => (
            <ExerciseCard key={exercise.num} exercise={exercise} />
          ))}
        </div>
      ))}
    </div>
  );
}
