"use client";

import { useState } from "react";

const AVATAR_SRC = "/profile-avatar.jpg";

export default function Avatar({
  name,
  size = "lg",
  showRing = true,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  showRing?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  return (
    <div className={`avatar avatar-${size}${showRing ? " avatar-ring" : ""}`}>
      {!failed ? (
        // Plain <img> avoids next/image build-time file requirement;
        // OK for a single profile pic, with explicit width/height to prevent CLS.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={AVATAR_SRC}
          alt={`${name} portrait`}
          width={400}
          height={400}
          onError={() => setFailed(true)}
          loading="eager"
          decoding="async"
        />
      ) : (
        <span className="avatar-initials" aria-label={`${name} avatar`}>
          {initials}
        </span>
      )}
    </div>
  );
}
