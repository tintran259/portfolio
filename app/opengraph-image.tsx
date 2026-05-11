import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tin Tran — Software Engineer";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,59,59,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -100,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,59,59,0.08) 0%, transparent 70%)",
          }}
        />

        {/* top: avatar placeholder + availability badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* logo mark */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span style={{ color: "#fff", fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em" }}>
              T
            </span>
            <span
              style={{
                position: "absolute",
                bottom: 7,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#FF3B3B",
              }}
            />
          </div>

          {/* available badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              background: "rgba(255,59,59,0.1)",
              border: "1px solid rgba(255,59,59,0.25)",
              borderRadius: 9999,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#FF3B3B",
              }}
            />
            <span style={{ color: "#FF3B3B", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em" }}>
              Available for opportunities
            </span>
          </div>
        </div>

        {/* center: name + title + desc */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
            <span style={{ color: "#ffffff", fontSize: 80, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
              Tin
            </span>
            <span style={{ color: "#FF3B3B", fontSize: 80, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>
              Tran
            </span>
          </div>

          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 26, fontWeight: 400, letterSpacing: "-0.01em" }}>
            Software Engineer
          </span>

          <span
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: 640,
              marginTop: 4,
            }}
          >
            3+ years building large-scale e-commerce platforms &amp; CMS-driven storefronts
            with React, Next.js, and TypeScript.
          </span>
        </div>

        {/* bottom: tech pills + contact */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* tech pills */}
          <div style={{ display: "flex", gap: 10 }}>
            {["React.js", "Next.js", "TypeScript", "React Native", "Docker"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "7px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 9999,
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* contact */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, letterSpacing: "0.02em" }}>
              tintran2591999@gmail.com
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>
              Ho Chi Minh City, Vietnam
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
