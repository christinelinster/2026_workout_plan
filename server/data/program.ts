import type { Program } from '../types';

export const program: Program = {
  title: 'Lean & Strong — Full Program',
  sub: 'Phase 1 · Daily Home Routine · Phase 2 Progression · Mon / Wed / Fri / Sat',
  tabs: [
    {
      id: 'p1',
      label: 'Phase 1 — Gym',
      kind: 'phase',
      dayTabs: [
        { id: 'p1d0', label: 'Day 1 — Pull & Glutes' },
        { id: 'p1d1', label: 'Day 2 — Metabolic Core' },
        { id: 'p1d2', label: 'Day 3 — Strength & Symmetry' },
        { id: 'p1d3', label: 'Day 4 — Flush & Reset' },
      ],
      days: [
        {
          id: 'p1d0',
          eyebrow: 'Phase 1 · Day 1 · Monday',
          title: 'Pull, glutes & decompression',
          sub: 'Lat pulldown standalone → hip thrust standalone → mat giant set. Three clean blocks, no cross-gym transitions.',
          meta: [
            { label: 'Duration', value: '~60 min' },
            { label: 'Lifting tempo', value: '4-1-1' },
            { label: 'Standalone rest', value: '60 s between sets' },
            { label: 'Giant set rest', value: '45 s after each round' },
          ],
          sections: [
            {
              label: 'Warm-up',
              exercises: [
                {
                  num: '1',
                  name: 'Incline treadmill walk',
                  detail: '10 min — 3.5 mph / 6% incline. Tall posture, no rail grip. Push through the right big toe at every push-off to begin activating the right glute chain.',
                },
              ],
            },
            {
              label: 'Athletic primer',
              info: 'Open floor near the treadmill or stretching area. Full recovery between sets — these are not cardio, they are neurological training.',
              primer: {
                recommendedLabel: 'Recommended — Day 1',
                steps: [
                  { num: '1', name: 'Pogo hops', detail: '3 × 20 contacts — Ankles only, minimal knee bend. Land as quietly as possible. Full rest between sets.' },
                  { num: '2', name: 'Box jump (onto box)', detail: '3 × 5 reps — Low box (12–18"). Full hip extension at the top. Step down, never jump down. Full reset before each rep.' },
                  { num: '3', name: 'Forward & backward hop', detail: '2 × 8 contacts per direction — Two-foot hop forward, stick 1 s, hop back, stick 1 s. Builds Achilles loading in the sagittal plane.' },
                ],
                menuLabel: 'Full primer menu — choose any 2–3',
                menuItems: [
                  { name: 'Pogo hops', dose: '3 × 20 contacts', cue: 'Ankles only, minimal knee bend, quiet landings.' },
                  { name: 'Skipping', dose: '3 × 30 s', cue: 'Relaxed, rhythmic. Good substitute on reactive days.' },
                  { name: 'Box jump (onto box)', dose: '3 × 5 reps', cue: 'Low box. Full hip extension at top. Step down every rep.' },
                  { name: 'Depth drop', dose: '3 × 5 reps', cue: 'Step off box, absorb landing with soft knees. No immediate jump yet.' },
                  { name: 'Depth drop → vertical jump', dose: '3 × 5 reps', cue: 'Step off, land, immediately jump straight up. Minimal ground contact time.' },
                  { name: 'Vertical jump', dose: '3 × 5 reps', cue: 'Standing. Full arm swing. Soft landing, absorb fully before next rep.' },
                  { name: 'Lateral hop + stick', dose: '3 × 5 per side', cue: 'Hop laterally, land single-leg, hold 2–3 s still. Right side first.' },
                  { name: 'Forward & backward hop', dose: '2 × 8 contacts/dir', cue: 'Two-foot. Hop forward, stick 1 s, hop back, stick 1 s.' },
                ],
              },
            },
            {
              label: 'Cardio block — choose one',
              exercises: [
                {
                  num: '2',
                  name: 'Sled push & pull',
                  detail: '6 rounds × 20 yards out (push) + 20 yards back (pull) — 60 s rest between rounds. Push with high handles, flip, pull back. Same sled, same lane throughout.',
                  alt: 'Alt A: Rowing machine — 8 × 1 min hard / 1 min easy. Reach fully forward at the catch to stretch the erectors.\nAlt B: Jump rope — 10 × 45 s active / 15 s rest. Soft knees, balls of feet.',
                },
              ],
            },
            {
              label: 'Strength block A — standalone',
              station: 'Station: Cable machine',
              rest: '4 working sets. 60 s rest between sets. Full attention — no superset here.',
              exercises: [
                {
                  num: 'A',
                  name: 'Wide-grip lat pulldown',
                  detail: '4 × 12–15 reps — Tempo 4-1-1. Depress the scapulae first, then pull. The long eccentric on the way up is what gradually elongates the hypertrophied erectors. Light-to-moderate load — this is structural work, not a strength competition.',
                  why: 'Consistent slow eccentrics over 8–12 weeks are the primary driver of reducing the erector-driven wide look. The stretch at the top of each rep matters more than the load.',
                  tags: [
                    { text: 'Erector elongation', tone: 'green' },
                    { text: 'Width reduction', tone: 'green' },
                  ],
                },
              ],
            },
            {
              label: 'Strength block B — standalone',
              station: 'Station: Hip thrust machine',
              rest: '4 working sets. 60 s rest between sets. Progressive overload — add load when all reps feel fully controlled.',
              exercises: [
                {
                  num: 'B',
                  name: 'Hip thrust (machine)',
                  detail: '4 × 12 reps — Full range, squeeze hard at the top with a posterior pelvic tilt, hold 1 s. Drive through both feet evenly — watch that the right side matches the left output. No spinal compression involved.',
                  why: 'Direct glute max loading through hip extension. The posterior pelvic tilt at the top directly counteracts anterior pelvic tilt and reduces the flared hip appearance. Safe progressive overload with zero erector bracing demand.',
                  tags: [
                    { text: 'APT correction', tone: 'green' },
                    { text: 'Glute max', tone: 'green' },
                  ],
                },
              ],
            },
            {
              label: 'Giant set — 3 rounds',
              station: 'Station: Mat area — floor only, no equipment moves',
              rest: 'C → D → E back-to-back with no rest between. Rest 45 s after all three. Repeat 3 rounds.',
              exercises: [
                {
                  num: 'C',
                  name: 'Dead bug',
                  detail: '3 × 10 reps per side — Lower back pinned flat the entire time. Move slowly. Stop the leg before 90° if the back lifts. No breath-holding.',
                  tags: [{ text: 'TVA + multifidus', tone: 'purple' }],
                },
                {
                  num: 'D',
                  name: 'Copenhagen plank',
                  detail: '3 × 20–30 s per side — Top foot on a low bench or step. Hold a side plank. Start with the bottom knee lightly touching the floor if needed. Build toward 45 s over weeks.',
                  why: 'High combined oblique and adductor activation with zero hip joint compression. Contributes to a leaner waist and inner-thigh silhouette over time.',
                  tags: [{ text: 'Oblique + adductor', tone: 'purple' }],
                },
                {
                  num: 'E',
                  name: 'Bird-dog',
                  detail: '3 × 10 reps per side — Opposite arm and leg extend simultaneously. 2 s pause at full extension, maximum length from fingertip to toe.',
                  tags: [{ text: 'Multifidus + TVA', tone: 'purple' }],
                },
              ],
            },
            {
              label: 'Finisher',
              exercises: [
                {
                  num: '3',
                  name: 'Dead hang',
                  detail: '4 × 30 s on / 30 s off — Pull-up bar. Shoulders fully passive and relaxed. One of the most consistent habits for reducing the erector-driven wide look over 8–12 weeks.',
                  tags: [{ text: 'Spinal decompression', tone: 'slate' }],
                },
              ],
            },
          ],
        },
        {
          id: 'p1d1',
          eyebrow: 'Phase 1 · Day 2 · Wednesday',
          title: 'Metabolic core & waist',
          sub: 'High-output cardio, seated row standalone, oblique circuit, TVA finisher. All circuit work stays at the cable and TRX station.',
          meta: [
            { label: 'Duration', value: '~55 min' },
            { label: 'Circuit rest', value: '60 s between rounds' },
            { label: 'Finisher rest', value: '45 s between rounds' },
          ],
          sections: [
            {
              label: 'Warm-up',
              exercises: [
                {
                  num: '1',
                  name: 'Brisk flat walk',
                  detail: '5 min — Easy pace, shoulders back, long stride. Arm swing engaged.',
                },
              ],
            },
            {
              label: 'Athletic primer',
              primer: {
                recommendedLabel: 'Recommended — Day 2',
                steps: [
                  { num: '1', name: 'Lateral hop + stick', detail: '3 × 5 per side — Hop laterally, land single-leg, hold still for 2–3 s. Right side first. No wobble before releasing.' },
                  { num: '2', name: 'Depth drop', detail: '3 × 5 reps — Step off a low box, land with soft knees and full absorption. Focus entirely on landing quality. Full reset between reps.' },
                ],
                menuLabel: 'Full primer menu — choose any 2–3',
                menuItems: [
                  { name: 'Pogo hops', dose: '3 × 20 contacts', cue: 'Ankles only, minimal knee bend, quiet landings.' },
                  { name: 'Skipping', dose: '3 × 30 s', cue: 'Relaxed, rhythmic. Good substitute on reactive days.' },
                  { name: 'Box jump (onto box)', dose: '3 × 5 reps', cue: 'Low box. Full hip extension at top. Step down every rep.' },
                  { name: 'Depth drop', dose: '3 × 5 reps', cue: 'Step off box, absorb landing with soft knees. No immediate jump yet.' },
                  { name: 'Depth drop → vertical jump', dose: '3 × 5 reps', cue: 'Step off, land, immediately jump straight up. Minimal ground contact time.' },
                  { name: 'Vertical jump', dose: '3 × 5 reps', cue: 'Standing. Full arm swing. Soft landing, absorb fully before next rep.' },
                  { name: 'Lateral hop + stick', dose: '3 × 5 per side', cue: 'Hop laterally, land single-leg, hold 2–3 s still. Right side first.' },
                  { name: 'Forward & backward hop', dose: '2 × 8 contacts/dir', cue: 'Two-foot. Hop forward, stick 1 s, hop back, stick 1 s.' },
                ],
              },
            },
            {
              label: 'Cardio block — choose one',
              exercises: [
                {
                  num: '2',
                  name: 'Assault / fan bike',
                  detail: '10 rounds × 30 s max effort / 30 s easy — Equal arm and leg drive. Right knee tracks over right toe.',
                  alt: 'Alt A: Jump rope — 10 × 45 s active / 15 s rest. Highest caloric burn per minute on this list.\nAlt B: Stairmaster — 12 min at level 8–10, no hands. Full step, heel drive.\nAlt C: Rowing machine — 8 × 45 s hard / 45 s easy at resistance 6–8.',
                },
              ],
            },
            {
              label: 'Metabolic circuit — 4 rounds',
              station: 'Station: Peck deck + Dumbbell rack + Reverse fly machine — all adjacent',
              rest: 'A → B → C → D back-to-back, minimal rest between exercises. 60 s full rest after each complete round.',
              exercises: [
                {
                  num: 'A',
                  name: 'Peck deck (machine)',
                  detail: '4 × 10 reps — Sit with back against the pad, grab handles, squeeze pecs together at the center. Control the stretch. Moderate load — strength maintenance, not hypertrophy focus.',
                  why: 'Targets the pecs with minimal triceps involvement. Creates the upper chest shelf that contributes to a balanced upper-body silhouette.',
                  tags: [{ text: 'Pecs', tone: 'green' }],
                },
                {
                  num: 'B',
                  name: 'Reverse fly (machine)',
                  detail: '4 × 10 reps — Sit facing the machine, grab handles from behind, squeeze rear delts together. Control the stretch, avoid swinging. Moderate load. Same machine as A — go directly to this after A.',
                  why: 'Adds rear delt density that balances the shoulders visually from behind and from the side. Complements the lateral raise for full shoulder development.',
                  tags: [
                    { text: 'Rear delt', tone: 'green' },
                    { text: 'Posture', tone: 'green' },
                  ],
                },
                {
                  num: 'C',
                  name: 'Dumbbell lateral raise',
                  detail: '4 × 10 reps — Stand with dumbbells at sides, raise arms out to the sides until parallel with the floor. Slight bend in elbows, control the descent. Moderate load — maintain shoulder strength without excessive bulk.',
                  why: 'Builds lateral deltoid density that creates shoulder roundness and visual V-taper. Directly counteracts the blocked, square upper-body look.',
                  tags: [{ text: 'Shoulder density', tone: 'green' }],
                },
              ],
            },
            {
              label: 'Waist finisher — 2–3 rounds, 45 s rest',
              station: 'Station: Cable machine — all exercises at same station',
              rest: 'A → B back-to-back, minimal rest between exercises. 45 s full rest after each complete round.',
              exercises: [
                {
                  num: 'A',
                  name: 'Pallof press',
                  detail: '2–3 × 10–12 reps per side — Cable at chest height. Press directly forward, hold 2 s, return slowly. Do not rotate. Stand or half-kneel.',
                  tags: [{ text: 'TVA anti-rotation', tone: 'purple' }],
                },
                {
                  num: 'B',
                  name: 'Tall-kneeling cable woodchop',
                  detail: '2–3 × 10 reps per side — Both knees on the floor, cable anchored high. Rotate through the trunk only. Slow and controlled on the return. Kneel on a mat at the cable base.',
                  why: 'Full oblique rotation with the hip joint completely neutralized. High oblique activation, zero joint provocation.',
                  tags: [{ text: 'Obliques', tone: 'purple' }],
                },
              ],
            },
            {
              label: 'Tendon care',
              exercises: [
                {
                  num: '4',
                  name: 'Eccentric heel drop',
                  detail: '3 × 15 reps per side — Step or plate edge. Rise on both feet, lower slowly on one over 4 s, heel below step level. Right side priority. Add load as it gets easier over weeks.',
                  why: 'Alfredson protocol. Most important on jump rope days. Drives Achilles tendon collagen synthesis and long-term resilience.',
                  tags: [{ text: 'Achilles remodeling', tone: 'amber' }],
                },
              ],
            },
          ],
        },
        {
          id: 'p1d2',
          eyebrow: 'Phase 1 · Day 3 · Friday',
          title: 'Unilateral strength & symmetry',
          sub: 'Dumbbell strength standalones, cable giant set, leg curl. Each block has its own station — no cross-gym transitions mid-set.',
          meta: [
            { label: 'Duration', value: '~65 min' },
            { label: 'Tempo (strength)', value: '3-1-1' },
            { label: 'Strength rest', value: '60–75 s between sets' },
          ],
          sections: [
            {
              label: 'Warm-up',
              exercises: [
                {
                  num: '1',
                  name: 'Incline treadmill walk',
                  detail: '10 min — 3.0 mph / 8% incline. Heel drive, glute engagement, no rail grip. Deliberate glute activation warm-up, not casual cardio.',
                },
              ],
            },
            {
              label: 'Athletic primer',
              primer: {
                recommendedLabel: 'Recommended — Day 3',
                steps: [
                  { num: '1', name: 'Depth drop → vertical jump', detail: '3 × 5 reps — Step off low box, land, immediately jump straight up. Minimal ground contact time. Full reset between reps.' },
                  { num: '2', name: 'Lateral hop + stick', detail: '3 × 5 per side — Small lateral hop, stick for 2–3 s completely still. Right side first. No wobble before releasing.' },
                ],
                menuLabel: 'Full primer menu — choose any 2–3',
                menuItems: [
                  { name: 'Pogo hops', dose: '3 × 20 contacts', cue: 'Ankles only, minimal knee bend, quiet landings.' },
                  { name: 'Skipping', dose: '3 × 30 s', cue: 'Relaxed, rhythmic. Good substitute on reactive days.' },
                  { name: 'Box jump (onto box)', dose: '3 × 5 reps', cue: 'Low box. Full hip extension at top. Step down every rep.' },
                  { name: 'Depth drop', dose: '3 × 5 reps', cue: 'Step off box, absorb landing with soft knees. No immediate jump yet.' },
                  { name: 'Depth drop → vertical jump', dose: '3 × 5 reps', cue: 'Step off, land, immediately jump straight up. Minimal ground contact time.' },
                  { name: 'Vertical jump', dose: '3 × 5 reps', cue: 'Standing. Full arm swing. Soft landing, absorb fully before next rep.' },
                  { name: 'Lateral hop + stick', dose: '3 × 5 per side', cue: 'Hop laterally, land single-leg, hold 2–3 s still. Right side first.' },
                  { name: 'Forward & backward hop', dose: '2 × 8 contacts/dir', cue: 'Two-foot. Hop forward, stick 1 s, hop back, stick 1 s.' },
                ],
              },
            },
            {
              label: 'Cardio block — choose one',
              exercises: [
                {
                  num: '2',
                  name: 'Stairmaster (no hands)',
                  detail: '12 min — Level 8–10. Full step, heel drive. Preferred Day 3 option — glute activation primes the strength work that follows.',
                  alt: 'Alt A: Assault bike — 10 × 40 s on / 20 s off.\nAlt B: Jump rope — 10 × 45 s active / 15 s rest.\nAlt C: Sled push & pull — 6 rounds × 20 yards each way, 60 s rest.',
                },
              ],
            },
            {
              label: 'Strength block A — standalone superset',
              station: 'Station: Dumbbell rack + bench beside it',
              rest: 'RFESS and single-leg RDL share the same bench and DBs. Do them back-to-back as a superset. 75 s rest between rounds. 4 rounds total.',
              exercises: [
                {
                  num: 'A',
                  name: 'Rear-foot elevated split squat (DB)',
                  detail: '4 × 8–10 reps per side — Tempo 3-1-1. Rear foot on the bench. Right side first. Slight forward torso lean, full depth without hip pinch. Start light — this is harder than it looks.',
                  why: 'Best standing exercise for anterior pelvic tilt. Stretches the rear hip flexor under load. Reaches muscular failure before any spinal compression occurs.',
                  tags: [
                    { text: 'APT correction', tone: 'green' },
                    { text: 'Unilateral strength', tone: 'green' },
                  ],
                },
                {
                  num: 'B',
                  name: 'Single-leg RDL (DB)',
                  detail: '4 × 8 reps per side — Tempo 3-1-1. Hips square, slight knee bend, DBs hang close to the leg. Right side first. Stop before the back rounds. Use the same DBs from RFESS.',
                  why: 'Trains the hamstring and glute in the hip hinge pattern needed for athletic movement. Critical for right-side posterior chain symmetry.',
                  tags: [
                    { text: 'Posterior chain', tone: 'green' },
                    { text: 'Hip symmetry', tone: 'green' },
                  ],
                },
              ],
            },
            {
              label: 'Strength block B — superset',
              station: 'Station: Cable machine + mat beside it',
              rest: 'Face-pull then RKC plank back-to-back. 60 s rest between rounds. 3 rounds.',
              exercises: [
                {
                  num: 'C',
                  name: 'Cable face-pull',
                  detail: '3 × 15–20 reps — Rope at eye level. Pull to forehead, elbows high and wide, hard external rotation at end range. Thumbs point back at the finish.',
                  why: 'Best exercise for reversing internally rotated shoulders from years of heavy pressing. Directly reduces the blocked, wide upper-body appearance.',
                  tags: [
                    { text: 'Shoulder retraction', tone: 'green' },
                    { text: 'Posture', tone: 'green' },
                  ],
                },
                {
                  num: 'D',
                  name: 'RKC plank',
                  detail: '3 × 25–30 s — Forearm plank: drag elbows toward feet, squeeze glutes and fists as hard as possible throughout. Far higher TVA activation than a standard plank.',
                  tags: [{ text: 'TVA', tone: 'purple' }],
                },
              ],
            },
            {
              label: 'Strength block C — standalone',
              station: 'Station: Leg curl machine',
              rest: '3 working sets. 60 s rest between sets.',
              exercises: [
                {
                  num: 'E',
                  name: 'Leg curl (single-leg preferred)',
                  detail: '3 × 10–12 reps per side — Controlled tempo, full range. Right side first. Single-leg is preferred for symmetry. If only bilateral is available, focus on matching effort side-to-side.',
                  why: 'Trains the hamstring through knee flexion, which the single-leg RDL doesn\'t cover. Directly supports the knee joint after the lateral meniscus tear.',
                  tags: [
                    { text: 'Hamstring', tone: 'green' },
                    { text: 'Knee support', tone: 'amber' },
                  ],
                },
              ],
            },
            {
              label: 'Finisher',
              exercises: [
                {
                  num: '3',
                  name: 'Dead hang',
                  detail: '4 × 30 s on / 30 s off — Fully passive shoulders. Spinal decompression after the loaded strength work.',
                  tags: [{ text: 'Spinal decompression', tone: 'slate' }],
                },
              ],
            },
          ],
        },
        {
          id: 'p1d3',
          eyebrow: 'Phase 1 · Day 4 · Saturday',
          title: 'Full-body flush & reset',
          sub: 'Fat oxidation, aerobic base, nervous system recovery. Entire flush circuit done in one spot. Band pull-aparts replace the squat hold for active recovery that directly serves the posture goal.',
          meta: [
            { label: 'Duration', value: '~50 min' },
            { label: 'Circuit rest', value: '60 s between rounds' },
            { label: 'Core finisher rest', value: '45 s between rounds' },
          ],
          sections: [
            {
              label: 'Warm-up',
              exercises: [
                {
                  num: '1',
                  name: 'Brisk walk + cat-cow',
                  detail: '5 min walk, then 2 min cat-cow (10 slow reps) on a nearby mat. Mobilizes the lumbar spine and begins the parasympathetic shift before the circuit.',
                },
              ],
            },
            {
              label: '"60-second" flush circuit — 4 rounds',
              station: 'Station: Sled lane OR assault bike + floor immediately beside it',
              rest: 'A → B → C back-to-back with no rest between exercises. 60 s full rest after all three. Everything stays in the same spot.',
              exercises: [
                {
                  num: 'A',
                  name: 'Sled push & pull',
                  detail: '4 × 60 s — Push 20 yards, flip handles, pull back. Continuous for the full 60 s. High effort throughout.',
                  alt: 'Alt: Assault bike — 60 s all-out. Or rowing machine — 60 s at high resistance.',
                },
                {
                  num: 'B',
                  name: 'Resistance band pull-apart',
                  detail: '4 × 60 s continuous reps — Light resistance band held at shoulder width. Arms straight, pull apart to full extension, return slowly. Can be done standing in the sled lane immediately after A. Aim for 40–50 controlled reps in the 60 s.',
                  why: 'Trains the rear deltoid, mid-trap, and rhomboids — the exact muscles that pull the shoulders back and reduce the wide, forward-rolled upper-body look. Direct carryover to the dead hang and face-pull goal. Zero equipment transition from the sled.',
                  tags: [
                    { text: 'Rear delt + mid-trap', tone: 'green' },
                    { text: 'Posture', tone: 'green' },
                    { text: 'Active recovery', tone: 'slate' },
                  ],
                },
                {
                  num: 'C',
                  name: 'Jump rope or pogo hops',
                  detail: '4 × 60 s — Jump rope if available beside the sled. Otherwise pogo hops in the sled lane. Maintains heart rate and reinforces the elastic Achilles stimulus.',
                  alt: 'Alt: Assault bike — 60 s moderate pace as the flush-down interval.',
                },
              ],
            },
            {
              label: 'Core finisher — 2–3 rounds, 45 s rest',
              exercises: [
                {
                  num: '2',
                  name: 'RKC plank',
                  detail: '2–3 × 30 s — Drag elbows toward feet, squeeze glutes and fists maximally. Same cue as Day 3.',
                  tags: [{ text: 'TVA', tone: 'purple' }],
                },
              ],
            },
            {
              label: 'Finisher & reset',
              exercises: [
                {
                  num: '3',
                  name: 'Dead hang',
                  detail: '3 × 30 s on / 30 s off — Fully passive. End-of-week spinal traction. Do not skip this.',
                  tags: [{ text: 'Spinal traction', tone: 'slate' }],
                },
                {
                  num: '4',
                  name: 'Static floor rest',
                  detail: '10 min — On your back, knees bent, feet flat. Completely passive. Parasympathetic nervous system recovery. Directly affects cortisol regulation and body composition over time. Do not skip this either.',
                  tags: [{ text: 'Parasympathetic recovery', tone: 'slate' }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'home',
      label: 'Daily Home',
      kind: 'home',
      home: {
        eyebrow: 'Every day — gym days and rest days',
        title: 'Daily home routine',
        sub: '~15 minutes. No equipment needed. These exercises compound into major results when done daily — and would waste gym time done there. Order matters: spinal mobility first, hip mobility second, activation third, balance last.',
        infoBars: [
          'If short on time, skip Block 3 before skipping Blocks 1 or 2. The mobility work is the highest-value daily habit for your specific profile. Best done in the morning or before bed.',
        ],
        blocks: [
          {
            num: 1,
            title: 'Spinal mobility & decompression',
            time: '~4 min',
            exercises: [
              { num: 1, name: 'Cat-cow', detail: '2 × 10 reps — Slow, full range. Exhale on the arch, inhale on the hollow. Sets the tone for the whole session.' },
              { num: 2, name: "Child's pose", detail: '2 × 45 s — Arms stretched forward, forehead down. Breathe into the lower back. Passive spinal traction.' },
              { num: 3, name: 'Wall slide (wall angel)', detail: '2 × 10 reps — Back flat against the wall, arms at 90°. Slowly raise arms overhead while keeping every part of the back and arms in contact with the wall throughout. One of the highest-value exercises in this entire program for the aesthetic goal — directly counteracts erector overdevelopment and forward shoulder posture.' },
            ],
          },
          {
            num: 2,
            title: 'Hip mobility',
            time: '~4 min',
            exercises: [
              { num: 4, name: '90/90 hip stretch', detail: '90 s per side — Passive hold, breathe slowly into the hip. Right side 15–20 s longer. Targets the hip capsule directly — the primary restriction driving the impingement symptoms.' },
              { num: 5, name: 'Supine figure-4 (piriformis stretch)', detail: '60 s per side — Ankle crossed over opposite knee, gently pull the thigh toward your chest. Right side priority. Breathe slowly.' },
            ],
          },
          {
            num: 3,
            title: 'Activation',
            time: '~4 min',
            exercises: [
              { num: 6, name: 'Superman hold', detail: '3 × 8 reps × 3 s hold — Face down, arms forward. Lift arms and legs simultaneously, squeeze glutes. Trains the posterior chain in extension — directly opposes the anterior pelvic tilt pattern.' },
              { num: 7, name: 'Side-lying hip abduction', detail: '2 × 15 reps per side — No band needed. Slow, pelvis stacked, 1 s pause at the top. Right side first. Add a light band if available.' },
              { num: 8, name: 'Stomach vacuum', detail: '3 × 20 s hold — Standing or seated. Exhale fully, draw navel in, hold without bracing the outer abs. Resting TVA tone is built through daily frequency — this is why it lives here and not at the gym.' },
            ],
          },
          {
            num: 4,
            title: 'Balance & posture',
            time: '~3 min',
            exercises: [
              { num: 9, name: 'Single-leg balance — right side focus', detail: '3 × 30 s per side — Progress weekly: Weeks 1–2 eyes open flat ground → Weeks 3–4 eyes closed → Weeks 5+ on a folded towel or cushion. Right side always first. Retrains the proprioceptive chain from the Achilles through the meniscus to the hip.' },
              { num: 10, name: 'Seated scapular depression', detail: '2 × 12 reps — Sit in a chair, arms straight, pull shoulders down away from ears, hold 2 s. Trains the lower trap daily. Small habit with outsized postural payoff over weeks.' },
            ],
          },
        ],
      },
    },
    {
      id: 'p2',
      label: 'Phase 2 — Progression',
      kind: 'phase',
      phaseBar: '',
      dayTabs: [
        { id: 'p2d0', label: 'Day 1 — Pull & Power' },
        { id: 'p2d1', label: 'Day 2 — Metabolic Power' },
        { id: 'p2d2', label: 'Day 3 — Strength & Reactive' },
        { id: 'p2d3', label: 'Day 4 — Athletic Flush' },
      ],
      days: [
        { id: 'p2d0', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p2d1', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p2d2', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
        { id: 'p2d3', eyebrow: '', title: '', sub: '', meta: [], sections: [] },
      ],
    },
  ],
};
