import { ImageResponse } from "next/og";

export const alt = "Letrina Dumping Ground pixel-art latrine logo";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#14110d",
          color: "#e8dcc4",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 680 }}>
          <div
            style={{
              color: "#ff5a1f",
              fontFamily: "monospace",
              fontSize: 28,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            software debris / pay once / keep the id
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 86,
              fontWeight: 900,
              letterSpacing: "-0.07em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            Letrina Dumping Ground
          </div>
          <div style={{ color: "#7a6f5c", fontFamily: "monospace", fontSize: 30 }}>
            no accounts // one-time software drops // 5 downloads
          </div>
        </div>
        <PixelLatrine />
      </div>
    ),
    size,
  );
}

function PixelLatrine() {
  const cream = "#e8dcc4";
  const ink = "#14110d";
  const surface = "#1f1a14";
  const accent = "#ff5a1f";
  const muted = "#7a6f5c";
  const scale = 6;
  const rects = [
    [12, 8, 38, 6, cream],
    [8, 14, 46, 6, cream],
    [8, 20, 8, 34, cream],
    [46, 20, 8, 34, cream],
    [12, 46, 38, 8, cream],
    [16, 34, 8, 12, cream],
    [24, 20, 22, 6, cream],
    [32, 26, 14, 6, cream],
    [24, 54, 14, 6, accent],
    [40, 54, 8, 6, muted],
    [24, 28, 16, 18, ink],
    [28, 34, 8, 8, surface],
    [40, 34, 4, 4, cream],
    [50, 50, 6, 4, muted],
    [6, 50, 6, 4, muted],
  ];

  return (
    <div
      style={{
        background: surface,
        border: `6px solid ${cream}`,
        display: "flex",
        height: 420,
        position: "relative",
        width: 420,
      }}
    >
      {rects.map(([x, y, width, height, fill], index) => (
        <div
          key={index}
          style={{
            background: fill as string,
            height: (height as number) * scale,
            left: (x as number) * scale - 12,
            position: "absolute",
            top: (y as number) * scale - 12,
            width: (width as number) * scale,
          }}
        />
      ))}
    </div>
  );
}
