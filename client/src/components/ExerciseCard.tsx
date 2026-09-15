import type { Exercise } from '../../../server/types';

type ExerciseCardProps = {
  exercise: Exercise;
};

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <div className="exercise">
      <div className="ex-row">
        <div className="ex-num">{exercise.num}</div>
        <div className="ex-body">
          <div className="exercise-line">
            <div className="ex-copy">
              <div className="ex-name">{exercise.name}</div>
              {exercise.cue && <div className="ex-cue">{exercise.cue}</div>}
              {exercise.alt && (
                <div className="ex-alt">
                  {exercise.alt.split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="ex-dose">
              {exercise.warmup && (
                <div className="ex-warmup"><span className="dose-label">Warm-up</span>{exercise.warmup}</div>
              )}
              <div className="ex-detail">
                {exercise.warmup && <span className="dose-label">Working</span>}{exercise.detail}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
