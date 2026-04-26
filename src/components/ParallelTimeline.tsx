"use client";

import type { Education, Experience, Degree, Role } from "@/types";
import SectionHeader from "./SectionHeader";
import { useTagHover, useObservedTags } from "./SkillsContext";

const CURRENT_YEAR = new Date().getFullYear();

function endYearOf(end: number | string): number {
  return typeof end === "number" ? end : CURRENT_YEAR;
}

/**
 * Compute the row indices each role occupies (1-based, newest-first).
 * Roles are sorted by start year descending so the newest role gets row 1.
 */
function buildRoleRows(roles: Role[]): Map<string, number> {
  const sorted = [...roles].sort((a, b) => b.start - a.start);
  const map = new Map<string, number>();
  sorted.forEach((r, i) => {
    map.set(`${r.company}-${r.start}`, i + 1);
  });
  return map;
}

/**
 * For a given degree, find the row range covered by all roles whose time
 * window overlaps with the degree's window. Education card is sticky-centered
 * within this row span — so UNC stays visible while RDMC + Corp scroll past.
 */
/**
 * A role belongs to exactly ONE degree: the one whose active range contains
 * the role's start year. This avoids the case where a role straddling two
 * degrees (e.g. starting the year an older degree ended and a new one began)
 * gets double-counted, causing the two degree slots to overlap.
 *
 *   role.start in [degree.start, degree.end)  for completed degrees
 *   role.start >= degree.start                for current (ongoing) degrees
 */
function degreeRowSpan(
  d: Degree,
  roles: Role[],
  roleRows: Map<string, number>
): { row: string; matchedCount: number } {
  const dStart = d.start;
  const dEnd = d.current ? Infinity : endYearOf(d.end);
  const overlapping = roles.filter(
    (r) => r.start >= dStart && r.start < dEnd
  );
  if (overlapping.length === 0) {
    return { row: "auto", matchedCount: 0 };
  }
  const rowIndices = overlapping
    .map((r) => roleRows.get(`${r.company}-${r.start}`))
    .filter((x): x is number => typeof x === "number");
  const minRow = Math.min(...rowIndices);
  const maxRow = Math.max(...rowIndices);
  return {
    row: `${minRow} / ${maxRow + 1}`,
    matchedCount: overlapping.length,
  };
}

export default function ParallelTimeline({
  education,
  experience,
}: {
  education: Education;
  experience: Experience;
}) {
  const sortedRoles = [...experience.roles].sort((a, b) => b.start - a.start);
  const roleRows = buildRoleRows(sortedRoles);
  const totalRows = sortedRoles.length;

  return (
    <section
      className="section parallel"
      id="experience"
      style={
        {
          "--section-accent": "var(--aurora-violet)",
          "--section-accent-soft": "rgba(225, 29, 72, 0.20)",
        } as React.CSSProperties
      }
    >
      <SectionHeader
        number="02"
        label="education × experience"
        tag="what i did during college"
      />

      <p className="parallel-intro">
        I didn&apos;t treat college as a pause — I treated it as a runway.
        Education on the left stays in view while the roles I shipped during
        each degree scroll past on the right.
      </p>

      <div className="parallel-headers">
        <header className="parallel-head parallel-head-edu">
          <span className="parallel-head-kicker mono">studied</span>
          <span className="parallel-head-count mono">
            × {education.degrees.length}
          </span>
        </header>
        <header className="parallel-head parallel-head-exp">
          <span className="parallel-head-kicker mono">shipped</span>
          <span className="parallel-head-count mono">
            × {sortedRoles.length}
          </span>
        </header>
      </div>

      <div
        className="parallel-grid"
        style={{ "--rows": totalRows } as React.CSSProperties}
      >
        {education.degrees.map((d) => {
          const { row, matchedCount } = degreeRowSpan(d, sortedRoles, roleRows);
          if (matchedCount === 0) return null;
          return (
            <div
              key={`${d.school}-${d.start}`}
              className="edu-slot"
              style={{ gridRow: row }}
            >
              <DegreeNode d={d} />
            </div>
          );
        })}

        {sortedRoles.map((r) => {
          const row = roleRows.get(`${r.company}-${r.start}`);
          return (
            <RoleNode
              key={`${r.company}-${r.start}`}
              r={r}
              row={row ? `${row}` : "auto"}
            />
          );
        })}
      </div>
    </section>
  );
}

function DegreeNode({ d }: { d: Degree }) {
  return (
    <article className={`tl-node tl-node-edu${d.current ? " is-live" : ""}`}>
      <div className="tl-card card-glass">
        <div className="tl-meta">
          <span className="mono tl-dates">
            {d.start} — {d.end}
          </span>
          <span className="mono tl-kicker">{d.degree}</span>
        </div>
        <p className="tl-title">{d.field}</p>
        <p className="tl-sub">{d.school}</p>
        {d.current && (
          <span className="tl-status mono">
            <span className="tl-status-dot" aria-hidden /> in progress
          </span>
        )}
      </div>
    </article>
  );
}

function RoleNode({ r, row }: { r: Role; row: string }) {
  const hover = useTagHover(r.tags);
  const observeRef = useObservedTags(r.tags, `role:${r.company}-${r.start}`);
  return (
    <article
      ref={observeRef as React.RefObject<HTMLElement>}
      className={`tl-node tl-node-exp${r.current ? " is-live" : ""}`}
      style={{ gridRow: row }}
      onMouseEnter={hover.onMouseEnter}
      onMouseLeave={hover.onMouseLeave}
    >
      <div className="tl-card card-glass">
        <div className="tl-meta">
          <span className="mono tl-dates">
            {r.start} — {r.end}
          </span>
          <span className="mono tl-kicker">{r.company}</span>
        </div>
        <p className="tl-title">{r.title}</p>
        <p className="tl-sub">{r.location}</p>

        {r.bullets && r.bullets.length > 0 && (
          <ul className="tl-bullets">
            {r.bullets.slice(0, 3).map((b, i) => (
              <li key={i} className="tl-bullet">
                <span className="tl-bullet-marker mono" aria-hidden>
                  ▸
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}

        {r.tags && r.tags.length > 0 && (
          <div className="tl-tags">
            {r.tags.map((t) => (
              <span key={t} className="skill-tag mono">
                {t}
              </span>
            ))}
          </div>
        )}

        {r.current && (
          <span className="tl-status mono">
            <span className="tl-status-dot" aria-hidden /> currently here
          </span>
        )}
      </div>
    </article>
  );
}
