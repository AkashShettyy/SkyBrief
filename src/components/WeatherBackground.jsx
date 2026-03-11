import { useEffect, useRef } from "react";

function WeatherBackground({ theme }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    function createParticles() {
      particlesRef.current = [];
      const count = getParticleCount(theme);

      for (let i = 0; i < count; i++) {
        particlesRef.current.push(createParticle(theme, canvas));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p, i) => {
        updateParticle(p, theme, canvas);
        drawParticle(ctx, p, theme);
      });
      animationRef.current = requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.6,
      }}
    />
  );
}

function getParticleCount(theme) {
  switch (theme) {
    case "rain":
    case "storm":
      return 120;
    case "snow":
      return 80;
    case "clouds":
      return 12;
    case "clear":
      return 60;
    default:
      return 50;
  }
}

function createParticle(theme, canvas) {
  const base = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    opacity: Math.random() * 0.8 + 0.2,
  };

  switch (theme) {
    case "rain":
    case "storm":
      return {
        ...base,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 8 + 6,
        width: Math.random() * 1.5 + 0.5,
        angle: 0.3,
      };

    case "snow":
      return {
        ...base,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.3,
        drift: Math.random() * 0.5 - 0.25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
      };

    case "clouds":
      return {
        ...base,
        width: Math.random() * 180 + 80,
        height: Math.random() * 50 + 25,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.12 + 0.04,
      };

    default:
      // stars
      return {
        ...base,
        radius: Math.random() * 1.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.05,
      };
  }
}

function updateParticle(p, theme, canvas) {
  switch (theme) {
    case "rain":
    case "storm":
      p.y += p.speed;
      p.x += p.angle;
      if (p.y > canvas.height) {
        p.y = -p.length;
        p.x = Math.random() * canvas.width;
      }
      break;

    case "snow":
      p.wobble += p.wobbleSpeed;
      p.y += p.speed;
      p.x += Math.sin(p.wobble) * p.drift;
      if (p.y > canvas.height) {
        p.y = -p.radius;
        p.x = Math.random() * canvas.width;
      }
      break;

    case "clouds":
      p.x += p.speed;
      if (p.x > canvas.width + p.width) {
        p.x = -p.width;
        p.y = Math.random() * canvas.height * 0.6;
      }
      break;

    default:
      // stars twinkle in place
      p.twinkleOffset += p.twinkleSpeed;
      p.opacity = 0.3 + Math.sin(p.twinkleOffset) * 0.4;
      break;
  }
}

function drawParticle(ctx, p, theme) {
  ctx.save();

  switch (theme) {
    case "rain":
      ctx.strokeStyle = `rgba(147, 210, 255, ${p.opacity})`;
      ctx.lineWidth = p.width;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(
        p.x + Math.cos(Math.PI / 2 + p.angle) * p.length,
        p.y + p.length,
      );
      ctx.stroke();
      break;

    case "storm":
      ctx.strokeStyle = `rgba(120, 180, 255, ${p.opacity * 0.7})`;
      ctx.lineWidth = p.width;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(
        p.x + Math.cos(Math.PI / 2 + p.angle) * p.length,
        p.y + p.length,
      );
      ctx.stroke();
      break;

    case "snow":
      ctx.fillStyle = `rgba(220, 240, 255, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      // add a subtle glow
      ctx.shadowColor = "rgba(200, 230, 255, 0.8)";
      ctx.shadowBlur = 4;
      ctx.fill();
      break;

    case "clouds":
      const gradient = ctx.createRadialGradient(
        p.x + p.width / 2,
        p.y + p.height / 2,
        0,
        p.x + p.width / 2,
        p.y + p.height / 2,
        p.width / 1.5,
      );
      gradient.addColorStop(0, `rgba(180, 200, 220, ${p.opacity})`);
      gradient.addColorStop(1, `rgba(180, 200, 220, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(
        p.x + p.width / 2,
        p.y + p.height / 2,
        p.width / 2,
        p.height / 2,
        0,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      break;

    default:
      // stars
      ctx.fillStyle = `rgba(200, 230, 255, ${p.opacity})`;
      ctx.shadowColor = "rgba(150, 210, 255, 0.8)";
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      break;
  }

  ctx.restore();
}

export default WeatherBackground;
