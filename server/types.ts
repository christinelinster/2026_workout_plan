export type TagTone = 'green' | 'purple' | 'amber' | 'slate' | 'coral';

export type Tag = { text: string; tone: TagTone };

export type Exercise = {
  num: string;
  name: string;
  detail: string;
  alt?: string;
  why?: string;
  tags?: Tag[];
};

export type PrimerStep = {
  num: string;
  name: string;
  detail: string;
};

export type PrimerMenuItem = {
  name: string;
  dose: string;
  cue: string;
};

export type Primer = {
  recommendedLabel: string;
  steps: PrimerStep[];
  menuLabel: string;
  menuItems: PrimerMenuItem[];
};

export type Section = {
  label?: string;
  station?: string;
  rest?: string;
  info?: string;
  primer?: Primer;
  exercises?: Exercise[];
};

export type Day = {
  id: string;
  eyebrow: string;
  title: string;
  sub: string;
  meta: { label: string; value: string }[];
  sections: Section[];
};

export type HomeExercise = {
  num: number;
  name: string;
  detail: string;
};

export type HomeBlock = {
  num: number;
  title: string;
  time: string;
  exercises: HomeExercise[];
};

export type HomeRoutine = {
  eyebrow: string;
  title: string;
  sub: string;
  infoBars: string[];
  blocks: HomeBlock[];
};

export type PhaseTab = {
  id: string;
  label: string;
  kind: 'phase';
  phaseBar?: string;
  dayTabs: { id: string; label: string }[];
  days: Day[];
};

export type HomeTab = {
  id: string;
  label: string;
  kind: 'home';
  home: HomeRoutine;
};

export type Tab = PhaseTab | HomeTab;

export type Program = {
  title: string;
  sub: string;
  tabs: Tab[];
};
