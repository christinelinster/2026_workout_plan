import type { HomeRoutine as HomeRoutineData } from '../../../server/types';

type HomeRoutineProps = {
  routine: HomeRoutineData;
};

export default function HomeRoutine({ routine }: HomeRoutineProps) {
  return (
    <div>
      <div className="day-header">
        <div className="day-eyebrow">{routine.eyebrow}</div>
        <div className="day-title">{routine.title}</div>
        <div className="day-sub">{routine.sub}</div>
      </div>
      {routine.infoBars.map((info, i) => (
        <div className="info-bar" key={i}>
          {info}
        </div>
      ))}
      {routine.blocks.map((block) => (
        <div className="home-block" key={block.num}>
          <div className="home-block-header">
            <div className="home-block-num">{block.num}</div>
            <div className="home-block-title">{block.title}</div>
            <div className="home-block-time">{block.time}</div>
          </div>
          {block.exercises.map((ex) => (
            <div className="home-ex" key={ex.num}>
              <div className="home-ex-num">{ex.num}</div>
              <div>
                <div className="home-ex-name">{ex.name}</div>
                <div className="home-ex-detail">{ex.detail}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
