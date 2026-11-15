import type { CalisthenicsTab, Exercise, Section } from '../types';

const trainingDays = [
  { id: 'training-push', label: 'Day 1 · Upper Push' },
  { id: 'training-lateral', label: 'Day 2 · Lower Lateral' },
  { id: 'training-pull', label: 'Day 3 · Upper Pull' },
  { id: 'training-vertical', label: 'Day 4 · Lower Vertical' },
];

const lowerWarmup: Section = {
  label: 'Warm-up',
  station: 'Turf / open floor near a wall',
  duration: '6-8 min',
  exercises: [
    { num: '1', name: "World’s greatest stretch + dynamic runner’s lunge", detail: '1 × 4 reps/side', cue: 'Rotate through the upper back, then gently drive the hips forward in the lunge.' },
    { num: '2', name: '90/90 switches with active external rotation', detail: '1 × 5 reps/side', cue: 'Switch sides slowly and sit tall over the front shin for a breath.' },
    { num: '3', name: 'Supported hip-flexor march and lateral knee raise', detail: '1 × 6 reps/side', cue: 'Lift the knee straight ahead, reset, then lift out and up. Use bodyweight first, then a light band or a secure foot-loaded kettlebell for the forward march.' },
    { num: '4', name: 'Wall tibialis raise', detail: '1 × 15-20 reps', cue: 'Keep heels down and lift the toes. Move the feet slightly farther from the wall to progress.' },
  ],
};

const lateralPower: Section = {
  label: 'Lateral power',
  station: 'Turf / open floor near a wall',
  rest: '60-90 s',
  exercises: [
    { num: '1', name: 'Side-to-side jump progression', detail: '2 × 4 reps/side', cue: 'Pick one rung. Land quietly and reset between reps. Match your right and left landing control before increasing distance.', alt: 'Progression: lateral step-and-stick → low two-foot side-to-side jumps → short skater bound to a single-leg stick → repeated bounds. In a jump-heavy volleyball week, use the step-and-stick.' },
  ],
};

const verticalPower: Section = {
  label: 'Vertical power',
  station: 'Turf / open floor near a wall',
  rest: '60-90 s',
  exercises: [
    { num: '1', name: 'Single-leg hop progression', detail: '2 × 3-5 reps/side', cue: 'Progress from snap-down and stick to low two-foot pogos, then single-leg hop and stick. Use 2 × 5 total reps for the two-foot drills. Add single-leg hops when heel raises are consistent on both sides and two-foot landings are even.', alt: 'Pick one. Low box jump: 2 × 3 reps, land on two feet and step down. On a jump-heavy court week, use fast step-ups with knee drive, 2 × 4 reps per side. Keep the working foot on the box and drive the other knee up.' },
  ],
};

const bentKneeCalf = {
  num: '3', name: 'Bent-knee single-leg calf raise', detail: '3 × 8-12 reps/side',
  cue: 'Use seated loading or a supported standing bend. Start right and match its clean range and reps on the left.',
  alt: 'Progression: bodyweight or assisted → full-height reps → small load increase. Optional hold: 2 × 20-30 seconds per side at mid-range in place of a calf-raise set block if you prefer isometrics that day.',
};

const straightKneeCalf = {
  num: '2', name: 'Straight-knee single-leg calf raise', detail: '2 × 6-10 reps/side',
  cue: 'Use a hand for balance, rise to a consistent height and lower slowly. Start right and track heel height as well as reps.',
  alt: 'Progression: two legs up and one down → assisted single-leg raise → unassisted → lightly loaded.',
};

const pushWarmup: Section = {
  label: 'Warm-up', station: 'Mat area', duration: '5 min',
  exercises: [
    { num: '1', name: 'Wrist rocks', detail: '1 × 8-10 reps', cue: 'Shift pressure from fingertips to palms and back.' },
    { num: '2', name: 'Scapular push-up', detail: '1 × 8-10 reps', cue: 'Keep elbows straight and push the floor away.' },
    { num: '3', name: 'Arm circles', detail: '1 × 8-10 reps', cue: 'Gradually widen the circles. Change direction halfway through.' },
  ],
};

const pullWarmup: Section = {
  label: 'Warm-up', station: 'Mat + parallettes or blocks', duration: '3 min',
  exercises: [
    { num: '1', name: 'Wrist rocks', detail: '1 × 8-10 reps' },
    { num: '2', name: 'Arm circles', detail: '1 × 8-10 reps' },
  ],
};

const pullBarWarmup: Section = {
  label: 'Pull-up warm-up', station: 'Pull-up rig + low bar', duration: '2 min',
  exercises: [
    { num: '1', name: 'Dead hang', detail: '1 × 15-25 sec', cue: 'Use a box for foot support as needed.' },
    { num: '2', name: 'Scapular pull-up', detail: '1 × 5-8 reps', cue: 'Move the shoulders down with straight elbows.' },
  ],
};

const lSit: Exercise = {
  num: '1', name: 'L-sit hold', detail: '3 × 8-15 sec',
  cue: 'Start on stable parallettes or blocks. Lock the elbows, press down to lift your hips, and keep your shoulders down.',
  alt: 'Progression: both heels supported → one heel supported (train both sides) → tuck hold with both feet up → one-leg L-sit (both sides) → full L-sit on parallettes → full floor L-sit. Move up after 3 × 15 seconds with straight arms and steady hips. Start the next rung with 5-8-second holds.',
};

const compression: Exercise = {
  num: '2', name: 'Seated single-leg pike lift', detail: '2 × 6-10 reps/side',
  cue: 'Sit on the floor, legs straight and hands beside the thighs. Lift one heel without leaning back. Pause briefly.',
  alt: 'Progression: one leg → both legs, starting at 2 × 5 reps. Walk hands toward the knees to increase difficulty.',
};

const conditioning: Section = {
  label: 'Optional conditioning finisher',
  station: 'Cardio area · Stationary bike',
  duration: '8 min',
  exercises: [
    {
      num: '1', name: 'Stationary bike intervals', detail: '1 × 8 min',
      cue: 'Ride easy for 1 minute. Do 6 rounds of 20 seconds hard (about 7-8 out of 10) and 40 seconds easy. Finish with 1 minute easy.',
      alt: 'Start with one finisher per week after either upper workout. Add the second upper-day finisher if you feel recovered for volleyball and your next workout.',
    },
  ],
};

export const routine: CalisthenicsTab = {
  id: 'calisthenics',
  label: 'Calisthenics and Conditioning',
  kind: 'calisthenics',
  dayTabs: trainingDays,
  days: [
    {
      id: trainingDays[0].id, eyebrow: 'Day 1', title: 'Upper push · Planche + pike',
      sub: 'Planche practice, bodyweight pressing and shoulder accessories.',
      meta: [{ label: 'Workout', value: '40-50 min' }],
      sections: [
        pushWarmup,
        { label: 'Planche skill', station: 'Mat area', rest: '60-90 s', exercises: [
          { num: '1', name: 'Planche lean (toes down)', detail: '3 × 5-8 sec', cue: 'Start in a high plank with your toes on the floor. Keep elbows straight, push the floor away and shift your shoulders just a little past your wrists. Keep both feet down for the whole hold.', alt: 'If a high plank is still challenging, practise 3 × 15-30 seconds of high plank first. Once all three leans reach 8 seconds with steady form, build toward 3 × 15 seconds at the same lean. Then lean a little farther and return to 5-8-second holds. Later progressions: feet-assisted tuck → tuck → advanced tuck → straddle → full planche.' },
        ] },
        { label: 'Push strength + shoulders', station: 'Mat + dumbbell area', rest: '90-120 s',
          info: 'Standalone sets. Finish each exercise before moving to the next. Rest 45-60 seconds between lateral-raise sets.', exercises: [
          { num: '1', name: 'Push-up', detail: '3 × 6-10 reps', cue: 'Keep ribs and hips in one line and use a consistent depth. Pick a variation that leaves about 1-2 clean reps in reserve.', alt: 'Progression: high incline → low incline → floor → pseudo-planche push-up. Advance after 3 × 10 clean reps. For pseudo-planche reps, retain a slight forward lean throughout.' },
          { num: '2', name: 'Pike push-up', detail: '3 × 5-8 reps', cue: 'Keep hips high and lower your head slightly ahead of your hands between the arms.', alt: 'Progression: elevated pike hold with hands on a bench → hands-elevated pike push-up → floor pike push-up → feet-elevated pike push-up. Start holds at 2 × 10-20 sec. Build the hold to 2 × 20 sec and each push-up rung to 3 × 8 clean reps.' },
          { num: '3', name: 'Dumbbell lateral raise', detail: '2 × 12-15 reps', cue: 'Raise the arms slightly forward of your sides. Add a little weight when both sets reach 15 with roughly 1-2 reps in reserve.' },
        ] },
        { label: 'Core · L-sit practice', station: 'Mat + dumbbell area', rest: '45-60 s',
          info: 'Superset · 2 rounds. Do an easy L-sit hold, then a hollow-body hold on the same mat. Rest after both.', exercises: [
          { ...lSit, detail: '2 × 8-12 sec', cue: 'Use your Day 3 rung for two easy technique sets.' },
          { num: '2', name: 'Hollow-body hold', detail: '2 × 15-25 sec', cue: 'Keep your low back against the floor as you breathe.', alt: 'Progression: dead bug → tucked hollow → one leg long → both legs long. Move up after two steady 25-second holds.' },
        ] },
        conditioning,
      ],
    },
    {
      id: trainingDays[1].id, eyebrow: 'Day 2', title: 'Lower lateral · Control + calves',
      sub: 'Lateral landings, loaded unilateral work and bent-knee calf strength.',
      meta: [{ label: 'Workout', value: '40-50 min' }],
      sections: [
        lowerWarmup, lateralPower,
        { label: 'Single-leg strength', station: 'Dumbbells + low box', rest: '90-120 s after both sides',
          info: 'Standalone sets. Finish each exercise before moving on. Use the same box to sit for bent-knee calf raises.', exercises: [
          { num: '1', name: 'Reverse lunge', detail: '3 × 6-10 reps/side', cue: 'Start right. Drive through the front foot. Build to 3 × 10 per side before increasing dumbbell load.', alt: 'Optional swap: hack squat, 3 × 8-10 reps. Keep the step-ups for unilateral work.' },
          { num: '2', name: 'Dumbbell step-up', detail: '2 × 8-10 reps/side', cue: 'Use a low, stable box. Keep your whole lead foot planted, use minimal push from the trailing foot and lower under control.', alt: 'Progression: bodyweight → light dumbbells → small load increases. Add weight once you can control both sets of 10 on each side.' },
          bentKneeCalf,
        ] },
        { label: 'Core · Side plank', station: 'Mat beside the dumbbell area', rest: '45-60 s after both sides', exercises: [
          { num: '1', name: 'Side plank', detail: '2 × 20-30 sec/side', cue: 'Stack your hips and keep breathing. Move up once you hold 30 seconds on both sets per side.', alt: 'Progression: knees bent → straight legs → top-leg lift.' },
        ] },
      ],
    },
    {
      id: trainingDays[2].id, eyebrow: 'Day 3', title: 'Upper pull · Pull-up + L-sit',
      sub: 'L-sit holds, bodyweight pulling and upper-back accessories.',
      meta: [{ label: 'Workout', value: '40-50 min' }],
      sections: [
        pullWarmup,
        { label: 'Core · L-sit skill', station: 'Mat + parallettes or blocks', rest: '60-90 s',
          info: 'Standalone sets. Finish your L-sit hold sets, then do seated leg lifts at the same mat.', exercises: [lSit, compression] },
        pullBarWarmup,
        { label: 'Pull-up progression', station: 'Pull-up rig + low bar', rest: '90-120 s',
          info: 'Standalone sets. Use one rig for the bar work. If you use the pulldown and seated row swaps, finish those and face pulls together in the cable area.', exercises: [
          { num: '1', name: 'Pull-up', detail: '3 × 4-8 reps', cue: 'Use enough assistance to get full-range reps with about 1-2 clean reps in reserve. Use less assistance after 3 × 8 controlled reps.', alt: 'Progression: active hang + Australian bar row → foot-assisted pull-up → assisted reps with controlled negatives → strict singles → strict sets. Once you have a clean strict rep, do 3-5 singles and use assistance for extra full-range reps as needed. Use your usual lat pulldown for 3 × 8-10 when a pull-up bar is unavailable.' },
          { num: '2', name: 'Negative pull-up', detail: '2 × 2-3 reps', cue: 'Step up until your chin is above the bar, remove foot support and lower for 3-5 seconds. Step back onto the box to reset.', alt: 'Use this alongside assisted reps. Keep one foot on the box if needed to control the descent. Drop negatives when you are practising strict singles or using the pulldown swap.' },
          { num: '3', name: 'Australian pull-up (inverted bar row)', detail: '2 × 8-12 reps', cue: 'Pull your chest toward a low fixed bar. Progress from bent knees to straight legs to feet elevated.', alt: 'Equipment swap: single-arm seated cable row, 2 × 8-12 reps per side.' },
        ] },
        { label: 'Upper-back accessory', station: 'Cable area or band at the pull-up rig', rest: '45-60 s', exercises: [
          { num: '1', name: 'Face pull', detail: '2 × 12-15 reps', cue: 'Use a rope or band and pull toward your eyebrows.', alt: 'Alternative: dumbbell reverse fly, 2 × 12-15 reps.' },
        ] },
        conditioning,
      ],
    },
    {
      id: trainingDays[3].id, eyebrow: 'Day 4', title: 'Lower vertical · Hops + posterior chain',
      sub: 'Low-volume vertical power, then glute, hamstring and calf strength.',
      meta: [{ label: 'Workout', value: '45-60 min' }],
      sections: [
        lowerWarmup, verticalPower,
        { label: 'Glute strength', station: 'Hip thrust machine / Smith machine', rest: '90-120 s', exercises: [
          { num: '1', name: 'Hip thrust', detail: '3 × 6-10 reps', warmup: '2 × 5 reps', cue: 'Use your usual machine, Smith machine or barbell. Pause at the top. Add load after 3 × 10 with about 2 reps in reserve.' },
        ] },
        { label: 'Single-leg strength', station: 'Dumbbells + rack for support', rest: '90-120 s after both sides',
          info: 'Standalone sets. Use the same support for the hinge and calf raise.', exercises: [
          { num: '1', name: 'Single-leg Romanian deadlift', detail: '3 × 6-10 reps/side', cue: 'Start right. Hold a rack for balance and a dumbbell for load. Hinge with a soft knee and keep hips square.', alt: 'Progression: kickstand → supported single-leg → more load. Use a bilateral dumbbell RDL for 3 × 6-10 when you want a heavier hinge.' },
          straightKneeCalf,
        ] },
        { label: 'Hamstring accessory', station: 'Seated leg curl machine', rest: '60-90 s', exercises: [
          { num: '1', name: 'Seated leg curl', detail: '2 × 10-15 reps', cue: 'Lower slowly and add a small amount of weight once both sets reach 15.', alt: 'Alternative: sliding hamstring curl, 2 × 6-10 reps.' },
        ] },
        { label: 'Core · Anti-rotation', station: 'Cable area or band anchor by the mat', rest: '45-60 s after both sides', exercises: [
          { num: '1', name: 'Pallof press', detail: '2 × 8-12 reps/side', cue: 'Stand sideways to a cable or band. Press straight ahead and hold 2 seconds without letting your shoulders or hips turn.', alt: 'Add a little resistance once both sets reach 12 per side with a steady torso.' },
        ] },
      ],
    },
  ],
};
