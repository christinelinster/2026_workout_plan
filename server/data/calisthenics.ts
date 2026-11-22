import type { CalisthenicsTab, Exercise, Section } from '../types';

const trainingDays = [
  { id: 'training-push', label: 'Day 1 · Upper Push' },
  { id: 'training-lateral', label: 'Day 2 · Lower Lateral' },
  { id: 'training-pull', label: 'Day 3 · Upper Pull' },
  { id: 'training-vertical', label: 'Day 4 · Lower Vertical' },
  { id: 'training-athletic', label: 'Optional · Volleyball Athletic Day' },
];

const lowerWarmup: Section = {
  label: 'Warm-up',
  station: 'Turf / open floor near a wall',
  duration: '6-8 min',
  exercises: [
    { num: '1', name: "World’s greatest stretch + dynamic runner’s lunge", detail: '1 × 4 reps/side', cue: 'Rotate through the upper back, then gently drive the hips forward in the lunge.' },
    { num: '2', name: '90/90 switches with active external rotation', detail: '1 × 5 reps/side', cue: 'Switch sides slowly and sit tall over the front shin for a breath.' },
    { num: '3', name: 'Supported hip-flexor march and lateral knee raise', detail: '1 × 6 reps/side', cue: 'Lift the knee straight ahead, reset, then lift out and up.', progression: [
      ['Bodyweight march and lateral knee raise', '1 × 6 reps/side', 'Add resistance to the forward march after 6 steady reps per side without leaning.', 'https://www.youtube.com/watch?v=InCaYXDhjpc'],
      ['Resisted forward march', '1 × 6 reps/side', 'Use a light band or a secure foot-loaded kettlebell. Increase only after 6 clean reps per side with the same range.', 'https://www.cbhscorporatehealth.com.au/docs/librariesprovider2/events-and-resources/1907_health-hub_resistance-band_a6-fold-print-v3.pdf'],
    ] },
    { num: '4', name: 'Wall tibialis raise', detail: '1 × 15-20 reps', cue: 'Keep heels down and lift the toes.', progression: [
      ['Wall tibialis raise', '1 × 15-20 reps', 'After 20 clean reps, move your feet slightly farther from the wall and reset to 15 reps.', 'https://www.trainfulldepth.com/library/tibialis-raise'],
    ] },
  ],
};

const bentKneeCalf: Exercise = {
  num: '3', name: 'Bent-knee single-leg calf raise', detail: '3 × 8-12 reps/side',
  cue: 'Use seated loading or a supported standing bend. Start right and match its clean range and reps on the left.',
  progression: [
    ['Assisted bent-knee calf raise', '3 × 8-12 reps/side', 'Reduce assistance after 3 × 12 per side at a consistent heel height.', 'https://hawkesphysiotherapy.co.uk/exercise/single-leg-calf-raises-with-bent-knee-on-a-step/'],
    ['Unassisted bent-knee calf raise', '3 × 8-12 reps/side', 'Add light load after 3 × 12 per side at a consistent heel height.', 'https://hawkesphysiotherapy.co.uk/exercise/single-leg-calf-raises-with-bent-knee-on-a-step/'],
    ['Loaded bent-knee calf raise', '3 × 8-12 reps/side', 'At 3 × 12 per side with steady height, add a little load and reset to 8 reps.', 'https://hawkesphysiotherapy.co.uk/exercise/single-leg-calf-raises-with-bent-knee-on-a-step/'],
  ],
  alt: 'Optional hold: 2 × 20-30 seconds per side at mid-range in place of a calf-raise set block if you prefer isometrics that day.',
};

const straightKneeCalf: Exercise = {
  num: '2', name: 'Straight-knee single-leg calf raise', detail: '2 × 6-10 reps/side',
  cue: 'Use a hand for balance, rise to a consistent height and lower slowly. Start right and track heel height as well as reps.',
  progression: [
    ['Two legs up, one leg down', '2 × 6-10 reps/side', 'Advance at 2 × 10 per side with a slow, controlled lowering.', 'https://www.southtees.nhs.uk/resources/eccentric-calf-exercises/'],
    ['Assisted single-leg calf raise', '2 × 6-10 reps/side', 'Advance at 2 × 10 per side with consistent heel height and minimal assistance.', 'https://us.physitrack.com/home-exercise-video/dynamic-single-leg-calf-raise-standing'],
    ['Unassisted single-leg calf raise', '2 × 6-10 reps/side', 'Add light load at 2 × 10 per side without losing heel height.', 'https://us.physitrack.com/home-exercise-video/dynamic-single-leg-calf-raise-standing'],
    ['Loaded single-leg calf raise', '2 × 6-10 reps/side', 'At 2 × 10 per side with steady height, add a little load and reset to 6 reps.', 'https://us.physitrack.com/home-exercise-video/dynamic-single-leg-calf-raise-standing'],
  ],
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
  progression: [
    ['Both heels supported', '3 × 8-15 sec', 'Advance at 3 × 15 sec with straight arms and hips off the floor.', 'https://gmb.io/l-sit/#:~:text=Both%20Feet%20on%20the%20Ground'],
    ['One heel supported', '3 × 5-15 sec/side', 'Advance at 3 × 15 sec per side with level hips.', 'https://gmb.io/l-sit/#:~:text=Bringing%20One%20Foot%20off%20the%20Ground'],
    ['Tuck L-sit, both feet up', '3 × 5-15 sec', 'Advance at 3 × 15 sec with straight arms and no foot contact.', 'https://gmb.io/l-sit/#:~:text=Tuck%20Position'],
    ['One-leg L-sit, other knee tucked', '3 × 5-15 sec/side', 'Advance at 3 × 15 sec per side with the extended leg straight.', 'https://gmb.io/l-sit/#:~:text=Single%20Leg%20Extension'],
    ['Full L-sit on parallettes', '3 × 5-15 sec', 'For the floor version, advance at 3 × 15 sec with both legs straight and steady.', 'https://gmb.io/l-sit/#:~:text=Full%20L-Sit'],
    ['Floor L-sit', '3 × 5-15 sec', 'Build to 3 × 15 sec with both feet clear and knees straight.', 'https://thenx.com/blogs/news/how-to-l-sit-on-the-floor-2018'],
  ],
};

const compression: Exercise = {
  num: '2', name: 'Seated single-leg pike lift', detail: '2 × 6-10 reps/side',
  cue: 'Sit on the floor, legs straight and hands beside the thighs. Lift one heel without leaning back. Pause briefly.',
  progression: [
    ['Single-leg pike lift', '2 × 6-10 reps/side', 'Advance at 2 × 10 per side without leaning back.', 'https://vimeo.com/509296195'],
    ['Two-leg pike lift', '2 × 5-10 reps', 'At 2 × 10 without leaning back, move your hands a little closer to your knees and reset to 5 reps.', 'https://www.trainfulldepth.com/library/pike-compression'],
  ],
};

const conditioning: Section = {
  label: 'Optional conditioning finisher',
  station: 'Cardio area · Stationary bike',
  duration: '8 min',
  exercises: [
    {
      num: '1', name: 'Stationary bike intervals', detail: '1 × 8 min',
      cue: 'Ride easy for 1 minute. Do 6 rounds of 20 seconds hard (about 7-8 out of 10) and 40 seconds easy. Finish with 1 minute easy.',
      progression: [
        ['One upper-day finisher', '1 × 8 min per week', 'Add a second finisher if you are recovering for volleyball and your next workout.', 'https://ie.physitrack.com/home-exercise-video/stationary-cycling---intervals'],
        ['Two upper-day finishers', '1 × 8 min after each upper workout', 'Keep both while recovery stays steady. Return to one when volleyball load rises.', 'https://ie.physitrack.com/home-exercise-video/stationary-cycling---intervals'],
      ],
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
          { num: '1', name: 'Planche lean (toes down)', detail: '3 × 5-8 sec', cue: 'Start in a high plank with your toes on the floor. Keep elbows straight, push the floor away and shift your shoulders just a little past your wrists. Keep both feet down for the whole hold.', progression: [
            ['High plank', '3 × 15-30 sec', 'Advance at 3 × 30 sec with straight arms and steady hips.', 'https://www.youtube.com/watch?v=e5xlpFCLojE'],
            ['Planche lean, toes down', '3 × 5-15 sec', 'At 3 × 15 sec, lean a little farther and reset to 5-8 seconds. Try the assisted tuck once you can hold the deeper lean for 3 × 15 sec.', 'https://gmb.io/planche/#:~:text=Straddle%20Planche%20Lean'],
            ['Feet-assisted tuck planche', '3 × 5-15 sec', 'Advance at 3 × 15 sec with straight arms, hips up and light foot support.', 'https://chrisheria.com/blogs/news/2-1'],
            ['Tuck planche', '3 × 5-15 sec', 'Advance at 3 × 15 sec with steady hips and both feet floating.', 'https://gmb.io/planche/#:~:text=Floating%20Crane'],
            ['Advanced tuck planche', '3 × 5-15 sec', 'Advance at 3 × 15 sec with a flatter back and hips near shoulder height.', 'https://gmb.io/planche/#:~:text=Tuck%20Push%20Back%20to%20Open%20Tuck%20Planche'],
            ['Straddle planche', '3 × 5-15 sec', 'Advance at 3 × 15 sec with straight arms and legs.', 'https://gmb.io/planche/#:~:text=Tuck%20Push%20Back%20to%20Straddle%20Planche'],
            ['Full planche', '3 × 5-15 sec', 'Build to 3 × 15 sec with a steady straight body.', 'https://calisthenics.com/exercise/planche/'],
          ] },
        ] },
        { label: 'Push strength + shoulders', station: 'Mat + dumbbell area', rest: '90-120 s',
          info: 'Standalone sets. Finish each exercise before moving to the next. Rest 45-60 seconds between lateral-raise sets.', exercises: [
          { num: '1', name: 'Push-up', detail: '3 × 6-10 reps', cue: 'Keep ribs and hips in one line and use a consistent depth. Pick a variation that leaves about 1-2 clean reps in reserve.', progression: [
            ['High incline push-up', '3 × 6-10 reps', 'Lower the support after 3 × 10 clean reps.', 'https://www.trainfulldepth.com/library/incline-push-up'],
            ['Low incline push-up', '3 × 6-10 reps', 'Try floor reps after 3 × 10 clean reps.', 'https://www.trainfulldepth.com/library/incline-push-up'],
            ['Floor push-up', '3 × 6-10 reps', 'Try a slight forward lean after 3 × 10 clean reps.', 'https://www.youtube.com/watch?v=e5xlpFCLojE'],
            ['Pseudo-planche push-up', '3 × 6-10 reps', 'At 3 × 10 with a steady lean, lean a little farther and reset to 6 reps.', 'https://www.trainfulldepth.com/library/pseudo-planche-push-up'],
          ] },
          { num: '2', name: 'Pike push-up', detail: '3 × 5-8 reps', cue: 'Keep hips high and lower your head slightly ahead of your hands between the arms.', progression: [
            ['Hands-elevated pike hold', '2 × 10-20 sec', 'Advance at 2 × 20 sec with hips high.', 'https://www.trainfulldepth.com/library/incline-pike-push-up'],
            ['Hands-elevated pike push-up', '3 × 5-8 reps', 'Advance at 3 × 8 clean reps.', 'https://www.trainfulldepth.com/library/incline-pike-push-up'],
            ['Floor pike push-up', '3 × 5-8 reps', 'Elevate the feet after 3 × 8 clean reps.', 'https://www.devinpkelley.co/action-instruction/pike-pushup-tutorial'],
            ['Feet-elevated pike push-up', '3 × 5-8 reps', 'At 3 × 8 clean reps, build control at slightly greater depth if comfortable.', 'https://www.youtube.com/watch?v=whTTE5e0fNo'],
          ] },
          { num: '3', name: 'Dumbbell lateral raise', detail: '2 × 12-15 reps', cue: 'Raise the arms slightly forward of your sides.', progression: [
            ['Dumbbell lateral raise', '2 × 12-15 reps', 'At 2 × 15 with 1-2 clean reps in reserve, add a little weight and reset to 12 reps.', 'https://www.erikakehrwaldfitness.com/exercise-library/dumbbell-lateral-raise'],
          ] },
        ] },
        { label: 'Core · L-sit practice', station: 'Mat + dumbbell area', rest: '45-60 s',
          info: 'Superset · 2 rounds. Do an easy L-sit hold, then a hollow-body hold on the same mat. Rest after both.', exercises: [
          { ...lSit, detail: '2 × 8-12 sec', cue: 'Use your Day 3 rung for two easy technique sets. The progression below shows your Day 3 targets.' },
          { num: '2', name: 'Hollow-body hold', detail: '2 × 15-25 sec', cue: 'Keep your low back against the floor as you breathe.', progression: [
            ['Dead bug', '2 × 6-10 reps/side', 'Advance at 2 × 10 per side with your low back against the floor.', 'https://prepmobility.app/exercises/dead-bug/'],
            ['Tucked hollow hold', '2 × 15-25 sec', 'Advance at 2 × 25 sec with steady breathing and your low back down.', 'https://coreboundfit.com/technique/hollow-hold/'],
            ['One-leg hollow hold', '2 × 15-25 sec/side', 'Advance at 2 × 25 sec per side with your low back down.', 'https://www.notbroken.io/videos/hollow-body-hold/'],
            ['Full hollow hold, both legs long', '2 × 15-25 sec', 'At 2 × 25 sec, reach the arms overhead if you can keep your low back down.', 'https://gmb.io/hollow-body/'],
          ] },
        ] },
        conditioning,
      ],
    },
    {
      id: trainingDays[1].id, eyebrow: 'Day 2', title: 'Lower lateral · Control + calves',
      sub: 'Loaded unilateral work and bent-knee calf strength. Swap for Volleyball Athletic Day when you want court-focused training.',
      meta: [{ label: 'Workout', value: '40-50 min' }],
      sections: [
        lowerWarmup,
        { label: 'Single-leg strength', station: 'Dumbbells + low box', rest: '90-120 s after both sides',
          info: 'Standalone sets. Finish each exercise before moving on. Use the same box to sit for bent-knee calf raises.', exercises: [
          { num: '1', name: 'Reverse lunge', detail: '3 × 6-10 reps/side', cue: 'Start right and drive through the front foot.', progression: [
            ['Loaded reverse lunge', '3 × 6-10 reps/side', 'At 3 × 10 per side with steady balance, add a little load and reset to 6 reps.', 'https://na.physitrack.com/home-exercise-video/lunge-reverse---with-dumbbells'],
          ], alt: 'Optional swap: hack squat, 3 × 8-10 reps. Keep the step-ups for unilateral work.' },
          { num: '2', name: 'Dumbbell step-up', detail: '2 × 8-10 reps/side', cue: 'Use a low, stable box. Keep your whole lead foot planted, use minimal push from the trailing foot and lower under control.', progression: [
            ['Bodyweight step-up', '2 × 8-10 reps/side', 'Add light dumbbells after 2 × 10 per side without pushing off the trailing foot.', 'https://www.acefitness.org/resources/everyone/exercise-library/28/step-up/'],
            ['Dumbbell step-up', '2 × 8-10 reps/side', 'At 2 × 10 per side with a controlled lowering, add a little load and reset to 8 reps.', 'https://na.physitrack.com/home-exercise-video/step-up'],
          ] },
          bentKneeCalf,
        ] },
        { label: 'Core · Side plank', station: 'Mat beside the dumbbell area', rest: '45-60 s after both sides', exercises: [
          { num: '1', name: 'Side plank', detail: '2 × 20-30 sec/side', cue: 'Stack your hips and keep breathing.', progression: [
            ['Side plank from knees', '2 × 20-30 sec/side', 'Advance at 2 × 30 sec per side with hips stacked.', 'https://us.physitrack.com/home-exercise-video/side-plank%2C-bent-knee'],
            ['Straight-leg side plank', '2 × 20-30 sec/side', 'Advance at 2 × 30 sec per side with level hips.', 'https://www.acefitness.org/resources/pros/expert-articles/5313/side-plank-alternatives-5-exercises-to-try/'],
            ['Side plank with top-leg lift', '2 × 20-30 sec/side', 'Build to 2 × 30 sec per side without rotating.', 'https://us.physitrack.com/home-exercise-video/side-plank-with-hip-abduction'],
          ] },
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
          info: 'Standalone sets. Use one rig for the bar work. If you use the pulldown and seated row swaps, finish both in the cable area.', exercises: [
          { num: '1', name: 'Pull-up', detail: '3 × 4-8 reps', cue: 'Start at the rung that gives you controlled reps without swinging.', progression: [
            ['Active hang + Australian bar row', '2 × 15-25 sec hang + 2 × 8-12 rows', 'Advance at 2 × 25 sec and 2 × 12 controlled rows.', 'https://www.youtube.com/watch?v=syS4M1G-rII'],
            ['Foot-assisted pull-up', '3 × 4-8 reps', 'Advance at 3 × 8 full-range reps with light foot assistance.', 'https://www.youtube.com/watch?v=B7H0OixV4Gs'],
            ['Band- or machine-assisted pull-up', '3 × 4-8 reps', 'Reduce assistance at 3 × 8 with a controlled lowering. Start singles once you can do one clean unassisted rep.', 'https://www.youtube.com/watch?v=q0wGtLi0-K8'],
            ['Strict pull-up singles', '3-5 × 1 rep', 'Use assistance for extra volume. Start doubles when all 5 singles are clean and you can do 2 clean reps in a row.', 'https://www.youtube.com/watch?v=HRV5YKKaeVw'],
            ['Strict pull-up sets', '3 × 2-8 reps', 'Add reps as you can repeat them without swinging. Build to 3 × 8.', 'https://www.youtube.com/watch?v=HRV5YKKaeVw'],
          ], alt: 'Lat pulldown swap: 3 × 8-10 when a pull-up bar is unavailable.' },
          { num: '2', name: 'Negative pull-up', detail: '2 × 2-3 reps', cue: 'Step up until your chin is above the bar, remove foot support and lower for 3-5 seconds. Step back onto the box to reset.', alt: 'Use this alongside assisted reps. Keep one foot on the box if needed to control the descent. Drop negatives when you are practising strict singles or using the pulldown swap.' },
          { num: '3', name: 'Australian pull-up (inverted bar row)', detail: '2 × 8-12 reps', cue: 'Pull your chest toward a low fixed bar.', alt: 'Equipment swap: single-arm seated cable row, 2 × 8-12 reps per side.', progression: [
            ['Bent-knee inverted row', '2 × 8-12 reps', 'Advance at 2 × 12 with your torso steady.', 'https://vimeo.com/758463706'],
            ['Straight-leg inverted row', '2 × 8-12 reps', 'Elevate the feet after 2 × 12 controlled reps.', 'https://notbroken.io/videos/tech-inverted-row/index.html'],
            ['Feet-elevated inverted row', '2 × 8-12 reps', 'Build to 2 × 12 without dropping your hips.', 'https://www.youtube.com/watch?v=7GYfJuoEsbQ'],
          ] },
        ] },
        { label: 'Shoulder blades + rear delts', station: 'Incline bench + light dumbbells', rest: '45-60 s', exercises: [
          { num: '1', name: 'Chest-supported Y raise', detail: '2 × 8-12 reps', cue: 'Start unloaded. With thumbs up, reach your arms into a Y and lower slowly. Keep your chest supported.', alt: 'Forearm wall slide: 2 × 8-12 reps if the overhead Y is uncomfortable.' },
          { num: '2', name: 'Chest-supported reverse fly', detail: '2 × 12-15 reps', cue: 'Keep a soft bend in the elbows and lift your arms out to the sides. Lower slowly with your chest on the bench.' },
        ] },
        conditioning,
      ],
    },
    {
      id: trainingDays[3].id, eyebrow: 'Day 4', title: 'Lower vertical · Posterior chain',
      sub: 'Glute, hamstring and calf strength. Use Volleyball Athletic Day for jump practice.',
      meta: [{ label: 'Workout', value: '45-60 min' }],
      sections: [
        lowerWarmup,
        { label: 'Glute strength', station: 'Hip thrust machine / Smith machine', rest: '90-120 s', exercises: [
          { num: '1', name: 'Hip thrust', detail: '3 × 6-10 reps', warmup: '2 × 5 reps', cue: 'Use your usual machine, Smith machine or barbell. Pause at the top.', progression: [
            ['Hip thrust', '3 × 6-10 reps', 'At 3 × 10 with about 2 reps in reserve, add load and reset to 6 reps.', 'https://bretcontreras.com/hipthrust/'],
          ] },
        ] },
        { label: 'Single-leg strength', station: 'Dumbbells + rack for support', rest: '90-120 s after both sides',
          info: 'Standalone sets. Use the same support for the hinge and calf raise.', exercises: [
          { num: '1', name: 'Single-leg Romanian deadlift', detail: '3 × 6-10 reps/side', cue: 'Start right. Hold a rack for balance and a dumbbell for load. Hinge with a soft knee and keep hips square.', progression: [
            ['Kickstand RDL', '3 × 6-10 reps/side', 'Advance at 3 × 10 per side with hips square and light pressure on the back foot.', 'https://www.youtube.com/watch?v=WOal21Uk6CU'],
            ['Supported single-leg RDL', '3 × 6-10 reps/side', 'At 3 × 10 per side with hips square and good balance, add a little load and reset to 6 reps.', 'https://vimeo.com/703009907'],
          ], alt: 'Two-leg dumbbell RDL swap: 3 × 6-10 reps.' },
          straightKneeCalf,
        ] },
        { label: 'Hamstring accessory', station: 'Seated leg curl machine', rest: '60-90 s', exercises: [
          { num: '1', name: 'Seated leg curl', detail: '2 × 10-15 reps', cue: 'Lower slowly.', progression: [
            ['Seated leg curl', '2 × 10-15 reps', 'At 2 × 15 with a controlled lowering, add a little weight and reset to 10 reps.', 'https://www.youtube.com/watch?v=6aFuzQMYE00'],
          ], alt: 'Alternative: sliding hamstring curl, 2 × 6-10 reps.' },
        ] },
        { label: 'Core · Anti-rotation', station: 'Cable area or band anchor by the mat', rest: '45-60 s after both sides', exercises: [
          { num: '1', name: 'Pallof press', detail: '2 × 8-12 reps/side', cue: 'Stand sideways to a cable or band. Press straight ahead and hold 2 seconds without letting your shoulders or hips turn.', progression: [
            ['Pallof press', '2 × 8-12 reps/side', 'At 2 × 12 per side with a steady torso, add a little resistance and reset to 8 reps.', 'https://us.physitrack.com/home-exercise-video/pallof-press-with-exercise-band'],
          ] },
        ] },
      ],
    },
    {
      id: trainingDays[4].id, eyebrow: 'Optional day', title: 'Volleyball athletic day',
      sub: 'Swap for Day 2. Use the biggest gap between hard volleyball sessions and count court jumps toward your weekly load.',
      meta: [{ label: 'Workout', value: '60 min' }],
      sections: [
        { label: 'Warm-up', station: 'Cardio area + open floor', duration: '10 min', exercises: [
          { num: '1', name: 'Easy bike or row', detail: '1 × 5 min', cue: 'Keep the pace conversational. Choose the machine that feels comfortable.' },
          { num: '2', name: 'Reverse lunge with rotation', detail: '2 × 4 reps/side', cue: 'Step back and rotate your upper body toward the front leg.' },
          { num: '3', name: 'A-skips', detail: '2 × 8 reps/side', cue: 'Keep these relaxed. Rotate in B-skips or C-skips if you like. On the no-jump version, use A-marches instead.' },
        ] },
        { label: 'Plyometrics · Build in stages', station: 'Open floor + stable low box + floor tape', duration: '20 min', rest: '90-120 s between sets',
          info: 'Stage 1: pogos + box jumps (16 landings). Stage 2: add skater hops (22 landings). Stage 3: add one set to box jumps or skater hops (25 or 28 landings). Finish all sets of each drill before moving on. Advance after at least two sessions at the current stage with controlled landings and no increase in next-morning Achilles pain or stiffness. Increase one thing at a time. If symptoms rise, go back a stage. Before your physio clears added jumping, or after a jump-heavy court week, use lateral step-and-stick (2 × 5 per side, pause on the outside foot) and move any unused jump time to easy cardio.', exercises: [
          { num: '1', name: 'Low two-foot pogo jumps', demo: 'https://au.physitrack.com/home-exercise-video/pogo-jumps-on-the-spot', detail: '2 × 5 reps', cue: 'Bounce lightly through the ankles and keep the jumps low. Every landing counts as one rep.' },
          { num: '2', name: 'Low box jump', detail: '2 × 3 reps', cue: 'Jump onto a stable box, land on both feet, step down and reset.', progression: [
            ['Stages 1 and 2 · Low box jump', '2 × 3 reps', 'Once you meet the block’s Stage 3 criteria, choose one jump exercise to add a set to.', 'https://brownbears.com/showcase/embed.aspx?Archive=108&autoplay=false'],
            ['Stage 3 option · Low box jump', '3 × 3 reps', 'Keep the same height and hold skater hops at one set.', 'https://brownbears.com/showcase/embed.aspx?Archive=108&autoplay=false'],
          ] },
          { num: '3', name: 'Skater hop-and-stick', detail: '1 × 3 reps/side', cue: 'Start at Stage 2. Hop sideways onto the opposite foot, hold the landing briefly and reset.', progression: [
            ['Stage 2 · Short skater hop-and-stick', '1 × 3 reps/side', 'Once you meet the block’s Stage 3 criteria, choose one jump exercise to add a set to.', 'https://uk.physitrack.com/home-exercise-video/lateral-hop-and-stick'],
            ['Stage 3 option · Short skater hop-and-stick', '2 × 3 reps/side', 'Keep the same distance and hold box jumps at two sets.', 'https://uk.physitrack.com/home-exercise-video/lateral-hop-and-stick'],
            ['Later swap · Two-foot lateral line hops', '1 × 3 reps/direction', 'After Stage 3 is consistently tolerated, use floor tape to practise the plate-hop direction change. Replace skater hops for the session.', 'https://brownbears.com/showcase/embed.aspx?Archive=114&autoplay=false'],
            ['Later swap · Same-leg lateral line hops', '1 × 3 reps/side', 'After two-foot line hops are consistently tolerated, use one foot for takeoff and landing. Keep the hop low and replace skater hops for the session.', 'https://us.physitrack.com/home-exercise-video/single-leg-medio-lateral-hops'],
          ], alt: 'Save raised-platform hops, jumping lunges and depth jumps for later. If you progress to a raised target, use a low, stable platform that cannot shift.' },
        ] },
        { label: 'Athletic strength', station: 'Dumbbells + low box + kettlebell or landmine', duration: '15 min', rest: '90 s',
          info: 'Complete each exercise before moving on. Once tolerated, do one power option first and finish every set with crisp reps.', exercises: [
          { num: '1', name: 'Goblet squat', demo: 'https://www.notbroken.io/videos/goblet-squat-kettlebell/', detail: '3 × 6 reps', cue: 'Use this as your two-leg strength lift. Keep the weight close to your chest and lower under control.', alt: 'When ready for power work, swap for kettlebell swings or a landmine squat to press, 3 × 6 reps.' },
          { num: '2', name: 'Cossack squat', demo: 'https://www.catalystathletics.com/exercise/584/Cossack-Squat/', detail: '2 × 6 reps/side', cue: 'Use this for lateral control. Shift onto one leg and sit back only as far as you can control. Start with bodyweight.' },
          { num: '3', name: 'Dumbbell step-up', detail: '2 × 6-8 reps/side', cue: 'Push through the lead foot and lower under control. Aim to finish with about two clean reps in reserve.', progression: [
            ['Dumbbell step-up', '2 × 6-8 reps/side', 'Keep this as your default strength option. Build to 2 × 8 per side with a controlled descent.', 'https://na.physitrack.com/home-exercise-video/step-up'],
            ['Optional swap · Step-up to knee drive', '2 × 6-8 reps/side', 'Use bodyweight and drive the free knee up while the lead foot stays planted. Swap this in when you want to practise balance and coordination.', 'https://www.youtube.com/watch?v=7T4_faGQhpM'],
          ] },
        ] },
        { label: 'Core circuit', station: 'Mat + stable bench + cable or band', duration: '10 min', rest: '45-60 s after each round',
          info: 'Do two rounds in order. For a second weekly session, use this circuit in place of the Day 4 core block.', exercises: [
          { num: '1', name: 'Front plank', detail: '2 × 20-40 sec', cue: 'Keep ribs and hips in line and breathe through the hold.' },
          { num: '2', name: 'Short-lever Copenhagen plank', detail: '2 × 10-20 sec/side', cue: 'Put your top knee on a stable bench and lift your hips. Keep the bottom foot down for assistance if needed.', alt: 'Regular side plank: 2 × 20-30 seconds per side.' },
          { num: '3', name: 'Pallof press', detail: '2 × 8-10 reps/side', cue: 'Press straight ahead and pause without letting your torso turn.' },
        ] },
        { label: 'Easy conditioning', station: 'Cardio area', duration: '5 min', exercises: [
          { num: '1', name: 'Easy rowing or cycling', detail: '1 × 5 min', cue: 'Use a comfortable pace you could hold while talking. Extend this block if you used the no-jump option.' },
        ] },
      ],
    },
  ],
};
