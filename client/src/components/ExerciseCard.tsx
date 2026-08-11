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
          <div className="ex-name">{exercise.name}</div>
          <div className="ex-detail">{exercise.detail}</div>
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
          {exercise.why && <div className="ex-why">{exercise.why}</div>}
          {exercise.tags && exercise.tags.length > 0 && (
            <div className="tag-row">
              {exercise.tags.map((tag) => (
                <span key={tag.text} className={`tag tag-${tag.tone}`}>
                  {tag.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
