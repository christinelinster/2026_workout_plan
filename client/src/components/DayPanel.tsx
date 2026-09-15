import type { Day } from '../../../server/types';
import MetaCard from './MetaCard';
import ExerciseCard from './ExerciseCard';

type DayPanelProps = {
  day: Day;
};

export default function DayPanel({ day }: DayPanelProps) {
  return (
    <div>
      <div className="day-header">
        <div className="day-title">{day.title}</div>
        <div className="day-sub">{day.sub}</div>
      </div>
      <div className="meta-row">
        {day.meta.map((meta) => <MetaCard key={meta.label} {...meta} />)}
      </div>
      {day.sections.filter((section) => section.exercises?.length || section.info || section.rest).map((section, i) => (
        <section className={section.exercises?.length ? 'workout-section' : 'workout-note'} key={i}>
          <div className="block-header">
            {section.label && <h2 className="section-label">{section.label}</h2>}
            {(section.rest || section.duration) && (
              <span className="block-timing" aria-label={`${section.rest ? 'Rest' : 'Duration'}: ${section.rest ?? section.duration}`}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <circle cx="12" cy="14" r="8" />
                  <path d="M12 10v4l2 2M9 2h6M12 2v4M18 6l2-2" />
                </svg>
                {section.rest ?? section.duration}
              </span>
            )}
          </div>
          <div className={section.exercises?.length ? 'workout-block' : undefined}>
            {section.station && <div className="station-badge">{section.station}</div>}
            {section.info && <p className={section.exercises?.length ? 'block-note' : 'info-bar'}>{section.info}</p>}
            {section.exercises?.map((exercise) => (
              <ExerciseCard key={exercise.num} exercise={exercise} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
