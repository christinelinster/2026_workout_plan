import type { CalisthenicsTab, Day, Section } from '../types';

const injuryNotes: Section = {
  label: 'Injury-aware notes',
  info: 'Prior right Achilles rupture: follow your clinician-approved loading limits; keep calf raises on flat ground, use assistance before heel height falls, and avoid impact or forceful ankle stretching until cleared. Possible knee meniscus injury: avoid painful deep flexion and twisting under load; stop and seek assessment for catching, locking, swelling or giving way. Groin/adductor symptoms: avoid painful compression, wide stances and aggressive straddle stretching; recurrent pain during walking warrants physiotherapy assessment before increasing lower-body loading. Reduce or skip provoking work for new pain, a limp or a next-day flare. Do not force right and left ranges to match.',
};

const sessionNotes: Section = {
  label: 'Session notes',
  info: 'First 6-8 weeks: use this four-day hybrid split instead of adding it on top of the gym phases. Mon Upper A / Wed Lower A / Fri Upper B / Sat Lower B; adjust for recovery. Spend the first 2-3 weeks learning easy variations with 2-3 good reps in reserve. Practise skills while fresh and stop holds before form breaks. Build to the top of the rep or hold range with clean form and no symptom flare before adding a little load, reducing assistance or advancing one variation. Log reps, assistance, hold time and next-day symptoms. The 35-45 min workout includes warm-up and mobility; cardio is extra. Allow full rests; if time runs short, omit the final accessory rather than rush. Advanced skills are long-term goals, not a 12-week deadline.',
};

const cardio: Section = {
  label: 'Optional cardio', station: 'Cardio area', duration: '15-20 min',
  info: 'After strength and mobility only, if comfortable during and the next day. Keep a conversational pace with an easy start and finish. Choose 15 minutes on an easier day or skip if symptoms increase. Use flat treadmill walking without a limp, or rowing if hips and back tolerate it. A stationary bike is another option only if comfortable for your knee and groin. Avoid running, jumping and steep incline for now.',
  exercises: [{ num: '1', name: 'Symptom-tolerated easy cardio', detail: '1 × 15-20 min' }],
};

const upperWarmup: Section = {
  label: 'Warm-up', station: 'Wall / mat area', duration: '5 min',
  info: 'Move gently without fatigue. Add an easy rehearsal set before each new strength movement; take extra preparation time if needed.',
  exercises: [
    { num: '1', name: 'Wrist rocks', detail: '1 × 8-10 reps', cue: 'Use light pressure and a comfortable wrist angle; do not force extension.' },
    { num: '2', name: 'Wall slides', detail: '2 × 8 reps', cue: 'Keep ribs relaxed and reach through a comfortable overhead range.' },
    { num: '3', name: 'Scapular push-up', detail: '1 × 8 reps', cue: 'Use a wall or incline. Keep elbows straight and move the shoulder blades without sagging.' },
  ],
};

const lowerWarmup: Section = {
  label: 'Warm-up', station: 'Cardio / mat area', duration: '6-7 min',
  info: 'Start with 3 minutes of easy flat walking without a limp, then the drills below. Use a comfortable stationary bike instead only if knee and groin tolerate it. Skip any provoking drill. Add gradually heavier ramp-up sets before the main lift, without fatigue.',
  exercises: [
    { num: '1', name: 'Supported hip hinge', detail: '1 × 8 reps', cue: 'Use hand support and a small, comfortable range.' },
    { num: '2', name: 'Gentle knee-to-wall ankle mobility', detail: '1 × 8 reps/side', cue: 'Only within your approved Achilles range. Keep the heel down; skip if the right tendon pulls or hurts.' },
    { num: '3', name: 'Supported hip rotations', detail: '1 × 5 reps/side', cue: 'Use a small range without groin pinching or knee twisting.' },
  ],
};

const upperA: Day = {
  id: 'cald0', eyebrow: 'Monday | Upper A', title: 'Upper A - Handstand + pushing',
  sub: 'Wrist and shoulder preparation → handstand skill → pushing and rows → mobility → optional cardio.',
  meta: [
    { label: 'Workout', value: '35-45 min' },
    { label: 'Warm-up / skill / strength / mobility', value: '5 / 5-7 / 22-28 / 3-5 min' },
    { label: 'Optional cardio', value: '15-20 min' },
  ],
  sections: [
    sessionNotes, injuryNotes, upperWarmup,
    {
      label: 'Handstand skill', station: 'Stable box / wall', duration: '5-7 min', rest: '45-60 s',
      info: 'Use an elevated pike hold first. Only try wall work when you can enter and exit under control without hopping or landing hard on the right Achilles. Avoid kick-ups; stay with supported pike work if a safe exit is uncertain.',
      exercises: [{ num: 'A', name: 'Elevated pike hold or wall handstand', detail: '3 × 15-30 sec', cue: 'Push tall through the shoulders and breathe. Use a sturdy surface and stop before alignment fades.' }],
    },
    {
      label: 'Strength', station: 'Mat / stable bar / bench', rest: '90-120 s',
      info: 'Complete each exercise before the next. Take up to 2-3 min when needed for clean repetitions. Use secure equipment for rows and push-ups.',
      exercises: [
        { num: 'B', name: 'Pike push-up', detail: '3 × 6-10 reps', warmup: '1 × 5 reps', cue: 'Lower under control through a comfortable shoulder range.', alt: 'Alternative: hands-elevated pike push-up, 3 × 6-10 reps' },
        { num: 'C', name: 'Push-up progression', detail: '3 × 6-12 reps', cue: 'Keep your body in one line. Begin at an incline that leaves 2-3 good reps in reserve.', alt: 'Progression: high incline → lower incline → floor push-up. Later blocks may alternate with dumbbell bench press.' },
        { num: 'D', name: 'Inverted row or chest-supported row', detail: '3 × 8-12 reps', cue: 'Pull without shrugging or arching. Bend knees or raise the bar to reduce difficulty.' },
        { num: 'E', name: 'Hollow-body hold', detail: '2 × 20-30 sec', cue: 'Keep the lower back comfortable; tuck knees or use a dead bug if the hip grips.', alt: 'Alternative: dead bug, 2 × 8 reps/side' },
      ],
    },
    {
      label: 'Mobility', station: 'Wall / mat area', duration: '3-5 min',
      info: 'Finish with gentle shoulder and wrist movement. Keep any stretch mild; no forced end range.',
      exercises: [
        { num: '1', name: 'Relaxed shoulder reach', detail: '1 × 30 sec/side', cue: 'Support your hand on a wall; ease back only as far as comfortable.' },
        { num: '2', name: 'Gentle wrist circles', detail: '1 × 8 reps/side', cue: 'Move slowly through a comfortable range.' },
      ],
    },
    cardio,
    { label: 'Skill progression', info: 'Handstand: elevated pike hold → wall-facing handstand → wall balance drills → freestanding handstand. First milestone: a controlled 30-second wall-facing hold with good shoulder alignment and a safe exit. Do not advance if wrists, shoulders or Achilles are irritated.' },
  ],
};

const lowerA: Day = {
  id: 'cald1', eyebrow: 'Wednesday | Lower A', title: 'Lower A - Quads + unilateral stability',
  sub: 'Easy warm-up → quad strength → supported single-leg control and calves → core and mobility → optional cardio.',
  meta: [
    { label: 'Workout', value: '35-45 min' },
    { label: 'Warm-up / strength / mobility', value: '6-7 / 26-33 / 3-5 min' },
    { label: 'Optional cardio', value: '15-20 min' },
  ],
  sections: [
    sessionNotes, injuryNotes, lowerWarmup,
    {
      label: 'Strength Block A', station: 'Leg machine area', rest: '2-3 min main lift / 60-90 s curl',
      exercises: [
        { num: 'A', name: 'Hack squat or leg press', detail: '3 × 6-10 reps', warmup: '2 × 5-8 reps', cue: 'Keep pressure even. Use a comfortable depth without knee pain or hip pinching; no forced deep flexion.' },
        { num: 'B', name: 'Single-leg hamstring curl', detail: '2 × 10-12 reps/side', cue: 'Start right and match controlled reps on the left. Keep hips on the pad; stop for knee catching or pain.', alt: 'Alternative: bilateral seated hamstring curl, 2 × 10-12 reps' },
      ],
    },
    {
      label: 'Strength Block B', station: 'Dumbbells / sturdy support / mat', rest: '60-90 s after both sides',
      info: 'Use hand support for unilateral work. Start right and match controlled reps on the left without forcing equal depth.',
      exercises: [
        { num: 'C', name: 'Supported split squat or low step-up', detail: '2 × 8-10 reps/side', warmup: '1 × 5 reps/side', cue: 'Use a short comfortable range with the rear foot on the floor. For step-ups, use a low stable platform and avoid pushing off the trailing foot.' },
        { num: 'D', name: 'Supported straight-knee calf raise', detail: '3 × 5-8 reps/side', warmup: '1 × 5 reps', cue: 'Begin at your existing 3 × 5 baseline on flat ground. Use both legs to warm up; assist before heel height drops. Lower slowly; add reps only when tolerated.' },
        { num: 'E', name: 'Dead bug', detail: '2 × 8 reps/side', cue: 'Shorten the reach if your back arches or groin grips.', alt: 'Alternative: Pallof press, 2 × 8 reps/side' },
      ],
    },
    {
      label: 'Mobility', station: 'Mat area', duration: '3-5 min',
      info: 'Gentle hip and ankle mobility only. No aggressive adductor stretch or forced ankle dorsiflexion.',
      exercises: [
        { num: '1', name: 'Supported hip rotations', detail: '1 × 5 reps/side', cue: 'Stay in a symptom-free range without twisting the knee.' },
        { num: '2', name: 'Gentle ankle pumps', detail: '1 × 10 ankle pumps/side', cue: 'Move slowly without forcing the right Achilles.' },
      ],
    },
    cardio,
  ],
};

const upperB: Day = {
  id: 'cald2', eyebrow: 'Friday | Upper B', title: 'Upper B - Pull-ups + L-sit + planche preparation',
  sub: 'Wrist and shoulder preparation → L-sit and gentle straight-arm skill → pulling strength → mobility → optional cardio.',
  meta: [
    { label: 'Workout', value: '35-45 min' },
    { label: 'Warm-up / skill / strength / mobility', value: '5 / 6-8 / 21-27 / 3-5 min' },
    { label: 'Optional cardio', value: '15-20 min' },
  ],
  sections: [
    sessionNotes, injuryNotes, upperWarmup,
    {
      label: 'L-sit + planche skill', station: 'Parallettes / mat', rest: '45-60 s', duration: '6-8 min',
      info: 'Use stable parallettes and feet-supported variations as needed. Keep planche work low intensity; there is no need to attempt tuck planche yet.',
      exercises: [
        { num: 'A', name: 'Tuck L-sit on parallettes', detail: '3 × 10-20 sec', cue: 'Push shoulders down and keep breathing. Begin with feet-supported holds; stop for groin or hip-flexor pain.' },
        { num: 'B', name: 'Planche lean or straight-arm support', detail: '3 × 10-15 sec', cue: 'Push the floor away with straight arms. Use only a small lean and stop for wrist, elbow or shoulder pain.' },
      ],
    },
    {
      label: 'Strength Block A', station: 'Pull-up / cable area', rest: '2-3 min pull-ups / 60-90 s accessories',
      exercises: [
        { num: 'C', name: 'Assisted or strict pull-up', detail: '3 × 4-8 reps', warmup: '1 × 5 reps', cue: 'Use a machine or foot assistance for smooth reps. Step onto and off a stable platform; do not jump down.', alt: 'Alternative: neutral-grip lat pulldown, 3 × 6-10 reps' },
        { num: 'D', name: 'Seated cable row', detail: '2 × 8-12 reps', cue: 'Keep the torso steady and pull toward the lower ribs.' },
        { num: 'E', name: 'Face pull', detail: '2 × 12-15 reps', cue: 'Use a light load near eye level without shrugging or leaning back.' },
      ],
    },
    {
      label: 'Compression', station: 'Mat area', rest: '45-60 s',
      exercises: [{ num: 'F', name: 'Seated pike compression lifts', detail: '2 × 8-10 reps', cue: 'Bend knees or lift one leg at a time. Shorten the range or skip if groin or hip flexors hurt.', alt: 'Alternative: dead bug, 2 × 8 reps/side' }],
    },
    {
      label: 'Mobility', station: 'Mat area', duration: '3-5 min',
      info: 'Use gentle wrist and lat movement without hanging into a painful shoulder range.',
      exercises: [
        { num: '1', name: 'Gentle wrist circles', detail: '1 × 8 reps/side', cue: 'Relax your hands and move slowly.' },
        { num: '2', name: 'Supported lat reach', detail: '1 × 30 sec/side', cue: 'Rest hands on a sturdy raised surface; soften knees and sit back without hip pinching.' },
      ],
    },
    cardio,
    { label: 'Skill progression', info: 'L-sit: support hold → tuck L-sit → one-leg extended L-sit → full L-sit. First milestone: a controlled 15-20-second tuck hold. Pull-up: assisted active hang → assisted pull-up → strict pull-up → weighted pull-up. First milestone: 3-5 strict reps through a comfortable range. Planche: scapular push-up → straight-arm support → planche lean → assisted tuck planche → tuck planche. First milestone: a controlled 15-20-second lean without wrist pain. Build the upper end of the current range consistently without a symptom flare before advancing; never force painful compression.' },
  ],
};

const lowerB: Day = {
  id: 'cald3', eyebrow: 'Saturday | Lower B', title: 'Lower B - Glutes + posterior chain',
  sub: 'Easy warm-up → hip thrust and curls → hinge and bent-knee calves → gentle hip mobility → optional cardio.',
  meta: [
    { label: 'Workout', value: '35-45 min' },
    { label: 'Warm-up / strength / mobility', value: '6-7 / 26-33 / 3-5 min' },
    { label: 'Optional cardio', value: '15-20 min' },
  ],
  sections: [
    sessionNotes, injuryNotes, lowerWarmup,
    {
      label: 'Strength Block A', station: 'Lower-body machine area', rest: '2-3 min thrust / 60-90 s accessories',
      exercises: [
        { num: 'A', name: 'Hip thrust', detail: '3 × 8-12 reps', warmup: '2 × 5-8 reps', cue: 'Use a machine or stable bench setup. Keep ribs down and finish without arching the lower back.' },
        { num: 'B', name: 'Single-leg hamstring curl', detail: '2 × 10-12 reps/side', cue: 'Start right, match controlled reps on the left and keep hips against the pad.', alt: 'Alternative: bilateral seated hamstring curl, 2 × 10-12 reps' },
        { num: 'C', name: 'Hip abductor machine', detail: '2 × 12-15 reps', cue: 'Use a modest symptom-free range with no bouncing. Reduce or omit if groin symptoms occur.' },
      ],
    },
    {
      label: 'Strength Block B', station: 'Dumbbells + bench', rest: '2-3 min RDL / 60-90 s calves',
      exercises: [
        { num: 'D', name: 'Dumbbell Romanian deadlift', detail: '3 × 8-10 reps', warmup: '1 × 5-8 reps', cue: 'Hinge with soft knees and keep weights close. Stop before back rounding or hip pinching.', alt: 'Alternative: controlled glute bridge, 3 × 10-12 reps' },
        { num: 'E', name: 'Seated bent-knee calf raise', detail: '3 × 10-12 reps/side', warmup: '1 × 8 reps', cue: 'Keep forefeet on flat ground. Start unweighted, use assistance if needed and lower slowly within your approved Achilles range.' },
      ],
    },
    {
      label: 'Mobility', station: 'Mat area', duration: '3-5 min',
      info: 'Keep hip work gentle. Use hand support; do not force a pelvic alignment or push either knee toward the floor.',
      exercises: [{ num: '1', name: 'Supported 90/90 hip rotations', detail: '2 × 5 reps/side', cue: 'Use cushions or a smaller range. Skip for knee pain or groin pinching; use comfortable supported standing hip rotations instead.' }],
    },
    cardio,
  ],
};

export const calisthenics: CalisthenicsTab = {
  id: 'calisthenics', label: 'Calisthenics', kind: 'calisthenics',
  phaseBar: 'Hybrid calisthenics + performance · Four days/week · First 6-8 weeks · 35-45 min including warm-up and mobility, plus optional 15-20 min cardio. Choose this routine or a gym phase for the week; do not stack both programs.',
  dayTabs: [
    { id: upperA.id, label: 'Mon - Upper A' },
    { id: lowerA.id, label: 'Wed - Lower A' },
    { id: upperB.id, label: 'Fri - Upper B' },
    { id: lowerB.id, label: 'Sat - Lower B' },
  ],
  days: [upperA, lowerA, upperB, lowerB],
};
