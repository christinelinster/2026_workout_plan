import { useState } from 'react';
import type { Primer } from '../../../server/types';

type PrimerAccordionProps = {
  primer: Primer;
};

export default function PrimerAccordion({ primer }: PrimerAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="primer-wrap">
      <div className="primer-header" onClick={() => setOpen((prev) => !prev)}>
        <div className="primer-header-left">
          <div className="primer-icon">&#9889;</div>
          <div>
            <div className="primer-title">Athletic primer</div>
            <div className="primer-subtitle">Fixed recommendation shown &nbsp;·&nbsp; tap to see full menu</div>
          </div>
        </div>
        <div className={open ? 'primer-chevron open' : 'primer-chevron'}>&#9660;</div>
      </div>
      <div className="primer-fixed">
        <div className="primer-fixed-label">{primer.recommendedLabel}</div>
        {primer.steps.map((step) => (
          <div className="primer-step" key={step.num}>
            <div className="primer-step-num">{step.num}</div>
            <div>
              <div className="primer-step-name">{step.name}</div>
              <div className="primer-step-detail">{step.detail}</div>
            </div>
          </div>
        ))}
      </div>
      {open && (
        <div className="primer-menu open">
          <div className="primer-menu-label">{primer.menuLabel}</div>
          {primer.menuItems.map((item) => (
            <div className="menu-item" key={item.name}>
              <div className="menu-item-name">{item.name}</div>
              <div className="menu-item-dose">{item.dose}</div>
              <div className="menu-item-cue">{item.cue}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
