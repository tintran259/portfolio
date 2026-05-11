import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d0d0d",
          borderRadius: "38px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 100,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          T
        </span>
        <span
          style={{
            position: "absolute",
            bottom: 28,
            right: 34,
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: "#FF3B3B",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
