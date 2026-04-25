export default function Ticker({ phrases }: { phrases: string[] }) {
  const items = [...phrases, ...phrases, ...phrases];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((phrase, i) => (
          <span
            key={i}
            className="mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 36px",
              fontSize: "12px",
              color: "var(--live)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "var(--live)",
                opacity: 0.6,
                flexShrink: 0,
              }}
            />
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}
