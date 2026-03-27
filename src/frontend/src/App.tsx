import { useEffect, useRef, useState } from "react";

const QUESTIONS = [
  "Words of my roommates were not totally wrong and what I have seen last two days were proof. But can't we end the matter at the end of the day and say good night and sleep peacefully? Will you?",
  "Even after a harsh conversation, I still choose you and hope to come back and restart where we left. Will you do the same?",
  "Do I mean anything to you, that you won't leave me unnoticed?",
];

type FloatingHeart = { id: number; x: number; size: number };

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeClass, setFadeClass] = useState("question-fade-in");
  const [showFinal, setShowFinal] = useState(false);
  const [noHovered, setNoHovered] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const heartIdRef = useRef(0);

  useEffect(() => {
    if (!showFinal) return;
    const interval = setInterval(() => {
      const id = ++heartIdRef.current;
      const x = 10 + Math.random() * 80;
      const size = 18 + Math.random() * 24;
      setFloatingHearts((prev) => [...prev, { id, x, size }]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
      }, 2200);
    }, 400);
    return () => clearInterval(interval);
  }, [showFinal]);

  const handleYes = () => {
    if (isAnimating) return;
    if (currentQuestion === QUESTIONS.length - 1) {
      setShowFinal(true);
      return;
    }
    setIsAnimating(true);
    setFadeClass("question-fade-out");
    setTimeout(() => {
      setCurrentQuestion((prev) => prev + 1);
      setFadeClass("question-fade-in");
      setNoHovered(false);
      setIsAnimating(false);
    }, 420);
  };

  const gradientBg =
    "radial-gradient(ellipse at center, #f5dede 0%, #e8a0a4 38%, #a83a3e 100%)";

  if (showFinal) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: gradientBg }}
      >
        {floatingHearts.map((h) => (
          <span
            key={h.id}
            style={{
              position: "absolute",
              left: `${h.x}%`,
              bottom: "10%",
              fontSize: `${h.size}px`,
              animation: "floatHeart 2s ease-out forwards",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            ❤️
          </span>
        ))}
        <div
          className="final-reveal text-center px-8 max-w-2xl"
          data-ocid="final.panel"
        >
          <div
            style={{
              color: "#f7f1f1",
              textShadow:
                "0 2px 16px rgba(100,20,30,0.5), 0 1px 4px rgba(0,0,0,0.3)",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              lineHeight: 1.35,
              fontWeight: 600,
            }}
          >
            Thank you ❤️
          </div>
          <div
            style={{
              color: "#f7e0e2",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              fontWeight: 300,
              marginTop: "1rem",
              letterSpacing: "0.01em",
              textShadow: "0 1px 8px rgba(80,10,20,0.4)",
            }}
          >
            jyada nautanki na kario
          </div>
          <div style={{ marginTop: "2.5rem", fontSize: "2.5rem" }}>🌹</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: gradientBg }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(100,10,20,0.22) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="relative z-10"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr 1fr",
          minHeight: "100vh",
          padding: "2.5rem 2rem 4rem",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
        {/* Left image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "340px",
              aspectRatio: "3 / 4",
              borderRadius: "22px",
              border: "2.5px solid #C9B06B",
              boxShadow:
                "0 8px 40px rgba(120,30,40,0.35), 0 2px 12px rgba(0,0,0,0.2)",
              overflow: "hidden",
              background: "linear-gradient(135deg, #f5d5d8 0%, #d9848a 100%)",
            }}
          >
            <img
              src="/assets/uploads/whatsapp_image_2026-03-27_at_9.18.08_am_1-019d2d7e-bbde-72fa-8d51-309b116ed4fa-1.jpeg"
              alt="Two people sharing a romantic moment"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Center: question + buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "2.5rem",
            padding: "1rem 0.5rem",
          }}
        >
          {/* Progress dots */}
          <div style={{ display: "flex", gap: "10px" }}>
            {QUESTIONS.map((q, i) => (
              <div
                key={q.slice(0, 10)}
                style={{
                  width: i === currentQuestion ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "5px",
                  background:
                    i === currentQuestion
                      ? "rgba(247,241,241,0.95)"
                      : i < currentQuestion
                        ? "rgba(247,241,241,0.6)"
                        : "rgba(247,241,241,0.25)",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>

          {/* Question text */}
          <div
            key={currentQuestion}
            className={fadeClass}
            data-ocid="question.panel"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.35rem, 2.4vw, 2.2rem)",
              fontWeight: 500,
              lineHeight: 1.55,
              color: "#f7f1f1",
              textShadow:
                "0 2px 18px rgba(100,15,25,0.45), 0 1px 4px rgba(0,0,0,0.25)",
              maxWidth: "580px",
            }}
          >
            &ldquo;{QUESTIONS[currentQuestion]}&rdquo;
          </div>

          {/* Buttons */}
          <div
            data-ocid="question.section"
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              data-ocid="question.primary_button"
              onClick={handleYes}
              className="yes-heartbeat"
              style={{
                background: "linear-gradient(135deg, #c97b7e 0%, #b84a50 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "9999px",
                padding: noHovered ? "18px 56px" : "14px 44px",
                fontSize: noHovered ? "1.25rem" : "1.05rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.03em",
                cursor: "pointer",
                boxShadow: noHovered
                  ? "0 0 50px rgba(200,60,90,0.80), 0 6px 30px rgba(0,0,0,0.25)"
                  : "0 0 24px rgba(185,60,85,0.55), 0 4px 18px rgba(0,0,0,0.2)",
                transform: noHovered ? "scale(1.28)" : "scale(1)",
                transition:
                  "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), padding 0.35s ease, font-size 0.35s ease, box-shadow 0.35s ease",
                zIndex: 2,
                position: "relative",
              }}
            >
              YES ❤️
            </button>

            <button
              type="button"
              data-ocid="question.secondary_button"
              onMouseEnter={() => setNoHovered(true)}
              onMouseLeave={() => setNoHovered(false)}
              style={{
                background: "rgba(240,220,222,0.55)",
                color: "rgba(120,70,75,0.85)",
                border: "1.5px solid rgba(200,160,165,0.5)",
                borderRadius: "9999px",
                padding: "10px 24px",
                fontSize: "0.875rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                cursor: "pointer",
                backdropFilter: "blur(6px)",
                transform: noHovered
                  ? "scale(0.68) translateX(18px)"
                  : "scale(1) translateX(0)",
                opacity: noHovered ? 0.5 : 0.85,
                transition:
                  "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              NO 😅
            </button>
          </div>

          <div
            style={{
              width: "60px",
              height: "1px",
              background: "rgba(247,241,241,0.4)",
              borderRadius: "1px",
            }}
          />
        </div>

        {/* Right image */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "340px",
              aspectRatio: "3 / 4",
              borderRadius: "22px",
              border: "2.5px solid #C9B06B",
              boxShadow:
                "0 8px 40px rgba(120,30,40,0.35), 0 2px 12px rgba(0,0,0,0.2)",
              overflow: "hidden",
              background: "linear-gradient(135deg, #f5d5d8 0%, #d9848a 100%)",
            }}
          >
            <img
              src="/assets/uploads/whatsapp_image_2026-03-27_at_9.18.08_am-019d2d7e-bbe7-76aa-b6c9-40a299ed44a4-2.jpeg"
              alt="Two people in a warm, intimate moment"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0.6rem",
          fontSize: "0.7rem",
          color: "rgba(247,241,241,0.45)",
          fontFamily: "'Poppins', sans-serif",
          zIndex: 20,
        }}
      >
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          style={{
            color: "rgba(247,241,241,0.55)",
            textDecoration: "underline",
          }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
