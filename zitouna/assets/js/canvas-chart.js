/**
 * Histogramme de production — Canvas 2D
 */
(function () {
  const canvas = document.getElementById("production-chart");
  if (!canvas) return;

  const data = [
    { label: "20/21", value: 95 },
    { label: "21/22", value: 120 },
    { label: "22/23", value: 145 },
    { label: "23/24", value: 160 },
    { label: "24/25", value: 172 },
    { label: "25/26", value: 180 }
  ];

  function draw() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 300 * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = "300px";

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = 300;
    const padding = { top: 30, right: 20, bottom: 40, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;
    const maxVal = 200;
    const barW = chartW / data.length * 0.6;
    const gap = chartW / data.length;

    ctx.clearRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = "#5F5B50";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, h - padding.bottom);
    ctx.lineTo(w - padding.right, h - padding.bottom);
    ctx.stroke();

    // Bars
    data.forEach((d, i) => {
      const barH = (d.value / maxVal) * chartH;
      const x = padding.left + i * gap + (gap - barW) / 2;
      const y = h - padding.bottom - barH;

      ctx.fillStyle = i === data.length - 1 ? "#C9A227" : "#3E5A1E";
      ctx.fillRect(x, y, barW, barH);

      // Label
      ctx.fillStyle = "#2B2A24";
      ctx.font = "12px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(d.label, x + barW / 2, h - padding.bottom + 18);
      ctx.fillText(d.value + " t", x + barW / 2, y - 6);
    });
  }

  draw();
  window.addEventListener("resize", draw);
})();
