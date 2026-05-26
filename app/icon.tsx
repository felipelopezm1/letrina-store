import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<PixelLatrineIcon />, size);
}

function PixelLatrineIcon() {
  const rects = [
    [12, 8, 38, 6, "#e8dcc4"],
    [8, 14, 46, 6, "#e8dcc4"],
    [8, 20, 8, 34, "#e8dcc4"],
    [46, 20, 8, 34, "#e8dcc4"],
    [12, 46, 38, 8, "#e8dcc4"],
    [16, 34, 8, 12, "#e8dcc4"],
    [24, 20, 22, 6, "#e8dcc4"],
    [32, 26, 14, 6, "#e8dcc4"],
    [24, 54, 14, 6, "#ff5a1f"],
    [40, 54, 8, 6, "#7a6f5c"],
    [24, 28, 16, 18, "#14110d"],
    [28, 34, 8, 8, "#1f1a14"],
    [40, 34, 4, 4, "#e8dcc4"],
    [50, 50, 6, 4, "#7a6f5c"],
    [6, 50, 6, 4, "#7a6f5c"],
  ];

  return (
    <div
      style={{
        background: "#14110d",
        display: "flex",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      {rects.map(([x, y, width, height, fill], index) => (
        <div
          key={index}
          style={{
            background: fill as string,
            height: height as number,
            left: x as number,
            position: "absolute",
            top: y as number,
            width: width as number,
          }}
        />
      ))}
    </div>
  );
}
