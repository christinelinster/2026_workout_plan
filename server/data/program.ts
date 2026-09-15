import type { Day, Exercise, PhaseTab, Program } from '../types';

const upperA: Day = {
  id: "p1d0", eyebrow: "Monday | Upper Push", title: "Upper • Push",
  sub: "Cardio → dumbbells and bench → mat core finisher.",
  meta: [
    { label: "Session cap", value: "60 min" },
    { label: "Strength + warm-up", value: "30 min" },
    { label: "Core / cardio / buffer", value: "5 / 20 / 5 min" },
  ],
  sections: [
    {
      label: "Cardio",
      station: "Cardio area",
      duration: "20 min",
      info: "20 minutes at a conversational pace, including an easy start and finish. Choose 15 minutes on an easier day. Start flat; use low incline only if comfortable during and the next day.",
      exercises: [
        { num: "1", name: "Treadmill walking", detail: "1 × 20 min", alt: "Alternative: low-incline treadmill (comfortable, no limp) or rowing (hip/back comfortable), 1 × 20 min" },
      ],
    },
    {
      label: "Strength Block A",
      station: "Dumbbells + adjustable bench",
      rest: "2-3 min",
      info: "Complete each exercise before moving on. Use the same bench: flat for chest presses, upright for shoulder presses, inclined for rows. Warm-up sets get gradually heavier without fatigue; add a short ramp-up set if needed before heavy work.",
      exercises: [
        { num: "A", name: "Dumbbell bench press", detail: "3 × 6-10 reps", alt: "Alternative: neutral-grip dumbbell bench press, 3 × 6-10 reps", warmup: "2 × 5-8 reps", cue: "Keep feet planted and wrists over elbows. Lower with control." },
        { num: "D", name: "Seated dumbbell shoulder press", detail: "2 × 8-10 reps", alt: "Alternative: neutral-grip dumbbell shoulder press, 2 × 8-10 reps", warmup: "1 × 8 reps", cue: "Use the backrest and keep ribs down. Press through a comfortable overhead range without leaning back." },
        { num: "B", name: "Chest-supported dumbbell row", detail: "2 × 8-12 reps", alt: "Alternative: bench-supported one-arm dumbbell row, 2 × 8-12 reps/side", warmup: "1 × 10 reps", cue: "Keep your chest on the inclined bench; pull without lifting your torso." },
      ],
    },
    {
      label: "Core",
      station: "Grass / mat area",
      rest: "45 s",
      info: "Superset · 2 rounds: dead bug → side plank on both sides. Rest after each pair.",
      exercises: [
        { num: "C1", name: "Dead bug", detail: "2 × 6 reps/side", alt: undefined, cue: "Shorten the reach if your back arches or your hip grips." },
        { num: "C2", name: "Side plank from knees", detail: "2 × 15-25 sec/side", alt: "Alternative: wall side plank, 2 × 15-25 sec/side", cue: "Keep knees bent and lift hips without holding your breath." },
      ],
    },
  ],
};

const lowerA: Day = {
  id: "p1d1", eyebrow: "Wednesday | Lower Quads", title: "Lower • Quads",
  sub: "Easy cardio → leg machines → supported free-weight strength.",
  meta: [
    { label: "Session cap", value: "60 min" },
    { label: "Warm-up / strength", value: "10 / 43 min" },
    { label: "Buffer", value: "7 min" },
  ],
  sections: [
    {
      label: "Cardio",
      station: "Cardio area",
      duration: "5 min",
      info: "Easy treadmill walk, then move to the leg machines.",
      exercises: [
        { num: "1", name: "Treadmill walking", detail: "1 × 5 min", alt: undefined },
      ],
    },
    {
      label: "Strength Block A",
      station: "Leg machine area",
      rest: "60 s - 3 min",
      info: "Straight sets: complete each exercise before moving on. Rest 2-3 min for hack squats and 60 s - 1 min 30 s for accessories, after both sides where applicable.",
      exercises: [
        { num: "A", name: "Hack squat", detail: "3 × 8-10 reps", alt: "Alternative: leg press, 3 × 8-10 reps", warmup: "2 × 5-8 reps", cue: "Keep heels down and pressure even. Use a depth without hip pinching; choose leg press if you shift away from the right leg." },
        { num: "C", name: "Seated hamstring curl (Single-leg)", detail: "2 × 10-12 reps/side", alt: "Alternative: seated leg curl (both legs), 2 × 10-12 reps", cue: "Keep hips against the pad. Start on the right and match controlled reps on the left." },
        { num: "D", name: "Leg extension (Single-leg)", detail: "2 × 10-12 reps/side", alt: "Alternative: bilateral leg extension, 2 × 10-12 reps", cue: "Start right and match controlled reps on the left. Keep hips against the pad and lower smoothly." },
      ],
    },
    {
      label: "Strength Block B",
      station: "Dumbbells + bench + sturdy support",
      rest: "1 min 30 s - 2 min",
      info: "Use a low bench for the rear foot and hand support for balance. Rest after both sides for split squats. Calf raises stay on flat ground; stop when heel height drops. Use both legs for the calf warm-up.",
      exercises: [
        { num: "B", name: "Supported Bulgarian split squat", detail: "3 × 8-10 reps/side", alt: "Alternative: supported low step-up, 3 × 8-10 reps/side", warmup: "1 × 5 reps/side", cue: "Use a low rear-foot support and keep pressure through the front foot. Keep the rear foot on the floor if elevation restricts your hip. For step-ups, use a low stable platform and avoid pushing off the trailing leg." },
        { num: "E", name: "Supported calf raise (Single-leg)", detail: "3 × 5 reps/side", alt: "Alternative: assisted calf raise (Single-leg), 3 × 5 reps/side", warmup: "1 × 5 reps", cue: "Start with bodyweight on flat ground and hand support for balance. Use your 3 × 5 baseline; stop or assist before heel height drops. Lower slowly and match controlled reps on the left." },
      ],
    },
  ],
};

const upperB: Day = {
  id: "p1d2", eyebrow: "Friday | Upper Pull", title: "Upper • Pull",
  sub: "Cardio → cable strength and core → grass / mat superset.",
  meta: [
    { label: "Session cap", value: "60 min" },
    { label: "Cardio / strength + warm-up", value: "20 / 30 min" },
    { label: "Core / buffer", value: "5 / 5 min" },
  ],
  sections: [
    {
      label: "Cardio",
      station: "Cardio area",
      duration: "20 min",
      info: "20 minutes at a conversational pace, including an easy start and finish. Choose 15 minutes on an easier day. Start flat; use low incline only if comfortable during and the next day.",
      exercises: [
        { num: "1", name: "Treadmill walking", detail: "1 × 20 min", alt: "Alternative: low-incline treadmill (comfortable, no limp) or rowing (hip/back comfortable), 1 × 20 min" },
      ],
    },
    {
      label: "Strength Block A",
      station: "Cable area",
      rest: "30 s - 3 min",
      info: "Straight sets: complete each exercise before moving on. Rest 2-3 min for rows and pulldowns, 60 s for face pulls and 30-45 s for Pallof presses. Warm-up sets should prepare you without fatigue.",
      exercises: [
        { num: "A", name: "Neutral-grip lat pulldown", detail: "3 × 6-10 reps", alt: "Alternative: close-grip cable pulldown, 3 × 6-10 reps", warmup: "2 × 5-8 reps", cue: "Keep your torso steady and pull the handles toward your upper chest." },
        { num: "B", name: "Seated cable row", detail: "2 × 8-12 reps", alt: "Alternative: standing cable row, 2 × 8-12 reps", warmup: "1 × 10 reps", cue: "Keep your torso still; pull toward the lower ribs without rocking." },
        { num: "D", name: "Face pull", detail: "2 × 12-15 reps", alt: "Alternative: cable reverse fly, 2 × 12-15 reps", cue: "Set the rope near eye level. Pull toward your face without leaning back or shrugging; keep the load controlled." },
        { num: "C1", name: "Pallof press", detail: "2 × 8 reps/side", alt: undefined, cue: "Press forward at chest height without twisting." },
      ],
    },
    {
      label: "Strength Block B",
      station: "Grass / mat area",
      rest: "1 min 30 s",
      info: "Superset · 2 rounds: incline push-up → bird-dog on both sides. Rest after each pair.",
      exercises: [
        { num: "C", name: "Incline push-up", detail: "2 × 6-12 reps", alt: "Alternative: kneeling push-up, 2 × 6-12 reps", cue: "Use a sturdy raised surface and keep your body in one line." },
        { num: "C2", name: "Bird-dog", detail: "2 × 5 reps/side", alt: undefined, cue: "Keep hips level; use a short reach if your lower back tightens." },
      ],
    },
  ],
};

const lowerB: Day = {
  id: "p1d3", eyebrow: "Saturday | Lower Hamstrings & Glutes", title: "Lower • Hamstrings & Glutes",
  sub: "Easy cardio → hip thrust, curl and abduction machines → dumbbells and bench.",
  meta: [
    { label: "Session cap", value: "60 min" },
    { label: "Warm-up / strength", value: "10 / 43 min" },
    { label: "Buffer", value: "7 min" },
  ],
  sections: [
    {
      label: "Cardio",
      station: "Cardio area",
      duration: "5 min",
      info: "Easy treadmill walk, then move to the lower-body machines.",
      exercises: [
        { num: "1", name: "Treadmill walking", detail: "1 × 5 min", alt: undefined },
      ],
    },
    {
      label: "Strength Block A",
      station: "Lower-body machine area",
      rest: "1 min 30 s - 3 min",
      info: "Straight sets: complete each exercise before moving on. Rest 2-3 min for hip thrusts, 1 min 30 s after both sides for curls and 60 s for abduction. If substituting back extensions for RDLs, complete them in this area before moving to calves.",
      exercises: [
        { num: "A", name: "Hip thrust machine", detail: "3 × 8-12 reps", alt: "Alternative: Smith machine hip thrust, 3 × 8-12 reps", warmup: "2 × 5-8 reps", cue: "Keep ribs down and finish by extending your hips without arching your back." },
        { num: "C", name: "Seated hamstring curl (Single-leg)", detail: "3 × 10-12 reps/side", alt: "Alternative: seated leg curl (both legs), 3 × 10-12 reps", cue: "Keep hips against the pad and avoid pulling at the outside of the knee." },
        { num: "E", name: "Hip abductor machine", detail: "2 × 12-15 reps", alt: "Alternative: seated band hip abduction, 2 × 12-15 reps", cue: "Keep your pelvis still and avoid bouncing the weight." },
      ],
    },
    {
      label: "Strength Block B",
      station: "Dumbbells + bench",
      rest: "1 min 30 s - 3 min",
      info: "Rest 2-3 min for RDLs and 1 min 30 s after both sides for calves. Keep dumbbells near the bench for RDLs and seated calf raises; rest after both sides for calves. Keep the forefoot on the floor for calves.",
      exercises: [
        { num: "B", name: "Dumbbell Romanian deadlift", detail: "3 × 8-10 reps", alt: "Alternative: 45-degree back extension, 3 × 10-12 reps", warmup: "2 × 5-8 reps", cue: "Push hips back with soft knees. Stop before your back rounds or hip pinches. For back extensions, hinge at the hips and finish in line with your legs without arching backward." },
        { num: "D", name: "Seated calf raise (Single-leg)", detail: "3 × 10-12 reps/side", alt: "Alternative: seated dumbbell calf raise (both legs), 3 × 10-12 reps", warmup: "1 × 8 reps", cue: "Keep the forefoot on the floor; start unweighted and lower slowly." },
      ],
    },
  ],
};

const baseDays = [upperA, lowerA, upperB, lowerB];
const dayLabels = ['Mon - Push', 'Wed - Quads', 'Fri - Pull', 'Sat - Hamstrings & Glutes'];

// Keep the main lifts comparable across phases; change selected rep ranges and skills explicitly.
const progressionExercises: Record<string, Partial<Exercise>> = {
  'p1d0:A': {
    detail: '3 × 5-8 reps',
    alt: 'Alternative: neutral-grip dumbbell bench press, 3 × 5-8 reps',
  },
  'p1d0:C1': {
    cue: 'Extend the leg farther than in Phase 1 while keeping your back and pelvis still. Shorten the reach if your hip grips.',
  },
  'p1d0:C2': {
    name: 'Side plank', detail: '2 × 20-30 sec/side',
    alt: 'Alternative: side plank from knees, 2 × 20-30 sec/side',
    cue: 'Progress to straight legs only when both Phase 1 sets reach 25 seconds without sagging. Otherwise retain the knee version.',
  },
  'p1d1:A': {
    detail: '3 × 6-8 reps', alt: 'Alternative: leg press, 3 × 6-8 reps',
  },
  'p1d1:B': {
    detail: '3 × 6-8 reps/side',
    alt: 'Alternative: supported low step-up, 3 × 8-10 reps/side',
    cue: 'Pause for 1 second at the bottom without relaxing or forcing depth. Establish control at the Phase 1 load before increasing weight. Retain the rear foot on the floor if elevation restricts your hip.',
  },
  'p1d1:E': {
    detail: '3 × 5-8 reps/side', alt: 'Alternative: assisted calf raise (Single-leg), 3 × 5-8 reps/side',
    cue: 'Keep hand support. Build from 3 × 5 toward 3 × 8 with consistent heel height and slow lowering. After two successful sessions with no next-day symptoms, add a small load and return to 5 reps. Do not add load and reps together.',
  },
  'p1d2:A': {
    detail: '3 × 5-8 reps', alt: 'Alternative: close-grip cable pulldown, 3 × 5-8 reps',
  },
  'p1d2:C1': {
    cue: 'Hold each press at full reach for 3 seconds without twisting. Keep the Phase 1 load initially; increase it only after both sets stay controlled.',
  },
  'p1d2:C': {
    name: 'Push-up', detail: '2 × 6-10 reps',
    alt: 'Alternative: incline push-up, 2 × 6-12 reps',
    cue: 'Move to the floor after two sessions of 2 × 12 clean incline reps. If needed, lower the hand support gradually instead. Keep your whole body in one line.',
  },
  'p1d2:C2': {
    cue: 'Hold each reach for 5 seconds without tilting your pelvis or arching your back. Keep the Phase 1 reach if the longer hold changes your form.',
  },
  'p1d3:A': {
    detail: '3 × 6-10 reps', alt: 'Alternative: Smith machine hip thrust, 3 × 6-10 reps',
    cue: 'Pause for 2 seconds at the top without arching your back. Establish the pause before adding weight; keep the ribs down.',
  },
  'p1d3:B': {
    detail: '3 × 6-8 reps', alt: 'Alternative: 45-degree back extension, 3 × 10-12 reps',
    cue: 'Use the same controlled hip hinge with a heavier strength range. Increase load only after all sets meet the target; do not chase extra depth. For back extensions, hinge at the hips and stop in line with the legs.',
  },
};

function makePhase(id: 'p1' | 'p2'): PhaseTab {
  const progressed = id === 'p2';
  return {
    id,
    label: progressed ? 'Phase 2 - Progression' : 'Phase 1 - Strength Base',
    kind: 'phase',
    phaseBar: progressed
      ? 'Four-week progression cycle. Week 1: establish the new rep ranges and variations with 2 reps in reserve. Weeks 2-3: build reps, then load, leaving 1-2 reps in reserve. Week 4: recovery week - reduce 3 sets to 2 and 2 sets to 1, use 10-15% less load and leave 4 reps in reserve. For bodyweight work, use an easier variation if needed. Then repeat the cycle.'
      : 'Weeks 1-4: strength base for an experienced lifter. Week 1: establish challenging loads with 2 good reps in reserve. Weeks 2-3: build reps before load. Week 4: review performance and recovery. Enter Phase 2 when the current movements are controlled and tolerated; retain individual Phase 1 variations when needed.',
    dayTabs: dayLabels.map((label, i) => ({ id: `${id}d${i}`, label })),
    days: baseDays.map((day, i) => ({
      ...day, id: `${id}d${i}`,
      sections: [{
        label: 'Session notes',
        info: i % 2 === 0
          ? 'Push/pull emphasis with a little overlap. Main lift: 3 working sets; supporting upper-body exercises: 2. This keeps strength work challenging with moderate upper-body volume. Allow the full rest; session times are estimates.'
          : 'Start unilateral work on the right and match controlled reps on the left. Log load, reps and assistance, plus calf heel height. Mild side-to-side tightness does not require forcing equal depth. Progress with stable control and no new pain or next-day limp. Allow full rests between working sets.',
      }, ...day.sections.map((section) => ({
        ...section,
        info: progressed && i === 1 && section.label === 'Strength Block B'
          ? 'Use the same dumbbells, low bench and sturdy support for split squats and calf raises. Rest 1 min 30 s - 2 min after both sides. Warm up calves with both legs; keep all calf work on flat ground.'
          : progressed && i === 2 && section.label === 'Strength Block B'
          ? 'Superset · 2 rounds: push-up → bird-dog on both sides. Rest after each pair. During recovery week, do 1 round.'
          : progressed && section.label === 'Core'
            ? 'Superset · 2 rounds: dead bug → side plank on both sides. Rest after each pair. During recovery week, do 1 round.'
            : section.info,
        exercises: section.exercises?.map((exercise) => ({
          ...exercise,
          ...(progressed ? progressionExercises[`${day.id}:${exercise.num}`] : {}),
        })),
      }))],
    })),
  };
}

export const program: Program = {
  title: 'Lean & Strong - Upper / Lower',
  sub: 'Mon / Wed / Fri / Sat · 60-minute gym cap after dynamic stretching · Daily home routine',
  tabs: [
    makePhase('p1'),
    {
      id: 'home', label: 'Daily Home', kind: 'home',
      home: {
        eyebrow: 'Every day | Gentle movement, not another workout',
        title: 'Daily home routine',
        sub: '~12 minutes · One gentle round · Mat, chair and wall · Up to 2-3 times daily',
        infoBars: [
          'Use these as comfortable movement breaks. One full round daily is enough to start; repeat up to 2-3 times if it leaves you feeling better, not fatigued. You can repeat just the desk and shoulder blocks between longer rounds. Use no weights or bands.',
          'Every 30-60 minutes, change position and stand or walk briefly. Support your feet and forearms, keep the screen near eye level and avoid a low seat that crowds your hips. You do not need to hold one rigid upright posture all day.',
          'Keep stretches mild. Do not push through front-of-hip pinching or force the right hip to match the left. 90/90s and the lunge stretch are optional if uncomfortable. Persistent pain or worsening restriction deserves a physiotherapy review.',
        ],
        blocks: [
          {
            num: 1, title: 'Neck & upper back', time: '~2 min',
            exercises: [
              { num: 1, name: 'Seated chin tuck', detail: '1 × 5 reps', cue: 'Gently glide your head backward while looking level. Hold 3 seconds; avoid tipping your chin down or forcing the movement.' },
              { num: 2, name: 'Seated thoracic extension', detail: '1 × 5 reps', cue: 'Use a stable chair with a back below your shoulder blades. Gently extend your upper back over it with arms crossed; keep your neck comfortable and avoid arching the lower back.' },
            ],
          },
          {
            num: 2, title: 'Hip mobility', time: '~3 min',
            exercises: [
              { num: 3, name: 'Half-kneeling hip-flexor stretch', detail: '1 × 30 sec/side', cue: 'Pad the back knee. Gently tuck the pelvis and squeeze the rear glute, then shift slightly forward without arching your back. A mild front-of-thigh stretch is enough. Use a standing split stance if kneeling is uncomfortable.' },
              { num: 4, name: '90/90 hip switches', detail: '1 × 4 reps/side', cue: 'Support yourself with hands behind you and use cushions as needed. Switch within your available range; do not force either knee down. Skip if the front of the hip pinches.' },
              { num: 5, name: "World's greatest stretch", detail: '1 × 2 reps/side', cue: 'Keep the back knee on padding and support your hand on a block or sturdy chair. Use a shallow lunge and gently turn your chest. No need to reach an elbow to the floor; skip if this pinches.' },
            ],
          },
          {
            num: 3, title: 'Spine & trunk', time: '~2 min',
            exercises: [
              { num: 6, name: 'Cat-cow', detail: '1 × 6 reps', cue: 'Move slowly through a comfortable range and breathe naturally.' },
              { num: 7, name: 'Bird dog', detail: '1 × 4 reps/side', cue: 'Keep hips level. Reach without arching your lower back, pause briefly and return. Keep this easier than gym core work.' },
            ],
          },
          {
            num: 4, title: 'Hip control', time: '~2 min',
            exercises: [
              { num: 8, name: 'Clamshell', detail: '1 × 6 reps/side', cue: 'Lie on your side with knees bent and feet together. Open the top knee without rolling your pelvis back. No band; stop well before fatigue.' },
              { num: 9, name: 'Side-lying glute raise', detail: '1 × 6 reps/side', cue: 'Keep the top leg straight and pelvis stacked. Lift a little without turning toes upward. Start right and match reps on the left.' },
            ],
          },
          {
            num: 5, title: 'Chest & shoulders', time: '~3 min',
            exercises: [
              { num: 10, name: 'Doorway chest stretch', detail: '1 × 30 sec/side', cue: 'Place one forearm against the frame slightly below shoulder height. Turn away gently until you feel a mild chest stretch; avoid pressure at the front of the shoulder.' },
              { num: 11, name: 'Wall slides', detail: '1 × 6 reps', cue: 'Slide your arms upward within a comfortable range. Keep ribs relaxed; do not force your back or wrists against the wall.' },
              { num: 12, name: 'Standing Y, T, W', detail: '1 × 3 reps', cue: 'Each rep: gently reach into Y, T, then W. Use no weights, keep shoulders relaxed and avoid arching your back. Skip this move on a repeat round if shoulders feel tired.' },
            ],
          },
        ],
      },
    },
    makePhase('p2'),
  ],
};
