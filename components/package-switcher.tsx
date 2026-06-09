"use client";

import { Check } from "lucide-react";
import { useState } from "react";

type Package = {
  name: string;
  audience: string;
  price: string;
  suffix: string;
  featured: boolean;
  features: string[];
};

export function PackageSwitcher({ packages }: { packages: Package[] }) {
  const [active, setActive] = useState(1);

  return (
    <div className="package-area">
      <div className="package-toggle" role="tablist" aria-label="Package selector">
        {packages.map((plan, index) => (
          <button
            key={plan.name}
            type="button"
            className={active === index ? "active" : ""}
            aria-selected={active === index}
            onClick={() => setActive(index)}
          >
            {plan.name}
          </button>
        ))}
      </div>
      <div className="pricing-grid">
        {packages.map((plan, index) => (
          <article className={`pricing-card ${plan.featured ? "featured" : ""} ${active === index ? "selected" : ""}`} key={plan.name}>
            {plan.featured && <span className="best-fit">Best fit</span>}
            <h3>{plan.name}</h3>
            <p>{plan.audience}</p>
            <div className="price-row">
              <strong>{plan.price}</strong>
              <span>{plan.suffix}</span>
            </div>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
