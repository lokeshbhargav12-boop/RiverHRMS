"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { useState } from "react";

type Module = {
  title: string;
  icon: LucideIcon;
  summary: string;
  bullets: string[];
};

export function ModuleExplorer({ modules }: { modules: Module[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = modules[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div className="module-explorer">
      <div className="module-tabs" role="tablist" aria-label="RIVER HRMS product modules">
        {modules.map((module, index) => {
          const Icon = module.icon;
          const selected = activeIndex === index;
          return (
            <button
              className={selected ? "module-tab active" : "module-tab"}
              key={module.title}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveIndex(index)}
            >
              <Icon size={20} />
              <span>{module.title}</span>
            </button>
          );
        })}
      </div>
      <article className="module-detail">
        <div className="module-icon">
          <ActiveIcon size={34} />
        </div>
        <span>Module {String(activeIndex + 1).padStart(2, "0")}</span>
        <h3>{active.title}</h3>
        <p>{active.summary}</p>
        <ul>
          {active.bullets.map((bullet) => (
            <li key={bullet}>
              <Check size={16} />
              {bullet}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
