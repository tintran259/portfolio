import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d0d0d",
          borderRadius: "7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 19,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: 1,
          }}
        >
          T
        </span>
        {/* red dot */}
        <span
          style={{
            position: "absolute",
            bottom: 5,
            right: 6,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#FF3B3B",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
