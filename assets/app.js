// ===== Data: micro-lecciones (M2-S10) =====
const LESSONS = [
  {
    tag: "M2-S10 · Concepto",
    title: "Proceso ≠ Procedimiento ≠ Capacidad",
    text: "Capacidad es lo que sabes hacer. Proceso transforma entradas en salidas para un cliente. Procedimiento describe cómo se ejecuta un paso.",
    example: [
      "Capacidad: Soporte al cliente",
      "Proceso: Gestionar incidencias",
      "Procedimiento: Criterios para clasificar severidad"
    ],
    check: "Escribe 1 ejemplo real de tu organización para cada uno."
  },
  {
    tag: "M2-S10 · Mapa",
    title: "L0/L1/L2: granularidad correcta",
    text: "L0 = macroprocesos. L1 = catálogo de procesos. L2 = variante operativa (candidato a rediseño).",
    example: [
      "L0: Operaciones",
      "L1: Gestión de incidencias",
      "L2: Triage por canal (portal vs teléfono)"
    ],
    check: "Convierte un L0 en 3 L1 y elige un L2."
  },
  {
    tag: "M2-S10 · Selección",
    title: "Elegir candidato: Impacto / Esfuerzo / Riesgo",
    text: "Evita elegir por intuición. Usa señales: volumen, retrabajo, SLA, PII, dependencia TI.",
    example: [
      "Impacto: 6000 tickets/mes",
      "Esfuerzo: integra ITSM+KB",
      "Riesgo: PII media + auditoría"
    ],
    check: "Puntúa 1–5 y justifica con un dato."
  },
  {
    tag: "M2-S10 · Contrato mínimo",
    title: "SIPOC antes de AS-IS/TO-BE",
    text: "SIPOC fija límites del sistema: proveedores, entradas, proceso, salidas, clientes. Si no lo defines, el rediseño se desborda.",
    example: [
      "Suppliers: Usuarios, Monitoring",
      "Inputs: Ticket + contexto",
      "Outputs: Resolución / escalado",
      "Customers: Usuario + Service Owner"
    ],
    check: "Completa 1 SIPOC con 4–6 pasos."
  }
];

// ===== Helpers =====
function $(sel, root=document){ return root.querySelector(sel); }
function el(tag, cls){ const n=document.createElement(tag); if(cls) n.className=cls; return n; }

function renderFeed(){
  const wrap = $("#feedWrap");
  LESSONS.forEach((L, idx) => {
    const snap = el("section","cardSnap");
    const card = el("article","lessonCard");

    const main = el("div","lessonMain");
    const side = el("aside","lessonSide");

    const top = el("div","titleRow");
    const badge = el("span","badge");
    badge.textContent = L.tag;

    const markerBtn = el("button","btn");
    markerBtn.type="button";
    markerBtn.textContent = "Marcar";
    markerBtn.onclick = () => toggleMark(idx, markerBtn);

    top.appendChild(badge);
    top.appendChild(markerBtn);

    const h2 = el("h2"); h2.textContent = L.title;
    const p = el("p"); p.textContent = L.text;

    const call = el("div","callout");
    const cb = el("b"); cb.textContent = "Micro-entregable (30–60s)";
    const cs = el("span"); cs.textContent = L.check;
    call.appendChild(cb); call.appendChild(cs);

    main.appendChild(top);
    main.appendChild(h2);
    main.appendChild(p);
    main.appendChild(call);

    // Side blocks
    const ex = el("div","sideBlock");
    const exH = el("h4"); exH.textContent = "Ejemplo";
    const ul = el("ul");
    L.example.forEach(t => { const li=el("li"); li.textContent=t; ul.appendChild(li); });
    ex.appendChild(exH); ex.appendChild(ul);

    const act = el("div","sideBlock");
    const actH = el("h4"); actH.textContent = "Acciones rápidas";
    const actions = el("div","actions");
    actions.appendChild(pill("Tomar nota", "N"));
    actions.appendChild(pill("Comparar", "C"));
    actions.appendChild(pill("Ir al Lab", "→", "lab.html"));
    act.appendChild(actH); act.appendChild(actions);

    side.appendChild(ex);
    side.appendChild(act);

    card.appendChild(main);
    card.appendChild(side);
    snap.appendChild(card);
    wrap.appendChild(snap);
  });

  // Restore marks
  const marks = JSON.parse(localStorage.getItem("marks")||"{}");
  Object.keys(marks).forEach(k=>{
    if(marks[k]===true){
      // nothing else needed; button reflects on click
    }
  });
}

function pill(label, key, href){
  const a = el(href ? "a" : "span", "pill");
  a.innerHTML = `<strong>${key}</strong> <span>${label}</span>`;
  if(href){ a.href = href; }
  return a;
}

function toggleMark(idx, btn){
  const marks = JSON.parse(localStorage.getItem("marks")||"{}");
  marks[idx] = !marks[idx];
  localStorage.setItem("marks", JSON.stringify(marks));
  btn.textContent = marks[idx] ? "Marcado" : "Marcar";
  btn.classList.toggle("primary", !!marks[idx]);
}

// ===== Pista (stories-like but not stories) =====
function setupPista(){
  const wrap = $("#pistaWrap");
  if(!wrap) return;

  const steps = [
    { t:"Ejemplo completo: ITSM Triage", b:"Objetivo: reducir rebotes sin perder trazabilidad.", q:"¿Cuál es el cliente del proceso?"},
    { t:"L0/L1/L2", b:"L1: Gestión de incidencias. L2: triage por severidad y canal.", q:"Escribe 1 L2 alternativo."},
    { t:"Dolores AS-IS", b:"Misrouting, esperas, KB desactualizada, logs con PII.", q:"Marca 2 dolores medibles."},
    { t:"Selección", b:"Impacto alto si hay volumen y retrabajo. Riesgo medio si PII controlable.", q:"Puntúa Impacto/Esfuerzo/Riesgo 1–5."},
    { t:"SIPOC", b:"Cierra límites: suppliers/inputs/outputs/customers.", q:"Completa 4–6 pasos del proceso."}
  ];

  steps.forEach((s,i)=>{
    const sec = el("section","pista");
    const card = el("div","pistaCard");
    card.innerHTML = `
      <div class="badge">Pista ${i+1}/${steps.length}</div>
      <h2 style="margin:10px 0 6px 0">${s.t}</h2>
      <p style="margin:0;color:var(--muted);line-height:1.45">${s.b}</p>
      <hr class="sep"/>
      <b style="display:block;font-size:13px">Check</b>
      <p style="margin:6px 0 10px 0;color:var(--muted)">${s.q}</p>
      <textarea placeholder="Escribe aquí..."></textarea>
      <div class="footerHint">Tip: respuestas breves, pero con al menos 1 dato o condición.</div>
    `;
    sec.appendChild(card);
    wrap.appendChild(sec);
  });

  const prog = $("#prog");
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const idx = [...wrap.children].indexOf(e.target);
        const pct = ((idx+1)/wrap.children.length)*100;
        prog.style.width = pct.toFixed(0)+"%";
      }
    });
  }, { root: wrap, threshold: .6 });

  [...wrap.children].forEach(ch=>io.observe(ch));
}

function exportLabToMarkdown(){
  const out = $("#mdOut");
  const inv = $("#inv").value.trim();
  const pr = $("#prio").value.trim();
  const sip = $("#sipoc").value.trim();

  const md = [
    "# M2-S10 · Entregable rápido",
    "## Inventario (L1)",
    inv ? inv : "_(vacío)_",
    "## Priorización (Impacto/Esfuerzo/Riesgo)",
    pr ? pr : "_(vacío)_",
    "## SIPOC",
    sip ? sip : "_(vacío)_",
  ].join("\n\n");

  out.value = md;
}

function downloadText(filename, text){
  const blob = new Blob([text], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener("DOMContentLoaded", ()=>{
  if($("#feedWrap")) renderFeed();
  setupPista();

  const exp = $("#btnExport");
  if(exp){
    exp.addEventListener("click", exportLabToMarkdown);
  }
  const dl = $("#btnDownload");
  if(dl){
    dl.addEventListener("click", ()=>{
      const text = $("#mdOut").value || "";
      downloadText("m2-s10_entregable.md", text);
    });
  }
});
