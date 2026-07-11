/* ============================================================
   Priyanka Singh — portfolio behaviour
   ============================================================ */

/* --- Contact form ---
   Works out of the box: opens a pre-filled email in your mail app.
   To receive messages straight to your inbox instead (no mail app
   needed), create a free key at https://web3forms.com and paste it
   below, replacing YOUR_WEB3FORMS_KEY. Nothing else to change.        */
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_KEY";
const CONTACT_EMAIL = "singhpriyanka0801@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  /* footer year */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- scroll reveal ---------- */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- active section in the index ---------- */
  const navLinks = Array.from(document.querySelectorAll(".rail-nav a"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id");
            navLinks.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- mobile index toggle ---------- */
  const toggle = document.getElementById("railToggle");
  const railNav = document.getElementById("railNav");
  if (toggle && railNav) {
    toggle.addEventListener("click", () => {
      const open = railNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    railNav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        railNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- contact form ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const sendBtn = document.getElementById("sendBtn");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = form.elements["name"].value.trim();
      const email = form.elements["email"].value.trim();
      const message = form.elements["message"].value.trim();

      if (!name || !email || !message) {
        setStatus("Please fill in every field.", "err");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("That email doesn't look right — mind checking it?", "err");
        return;
      }

      /* Preferred path: Web3Forms (inbox delivery, no mail app needed) */
      if (WEB3FORMS_KEY && WEB3FORMS_KEY !== "YOUR_WEB3FORMS_KEY") {
        sendBtn.disabled = true;
        setStatus("Sending…", "");
        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: WEB3FORMS_KEY,
              name,
              email,
              message,
              subject: `Portfolio message from ${name}`,
              from_name: "Portfolio site",
            }),
          });
          const data = await res.json();
          if (data.success) {
            setStatus("Thanks — your message is on its way.", "ok");
            form.reset();
          } else {
            setStatus("Something went wrong. Please email me directly at " + CONTACT_EMAIL + ".", "err");
          }
        } catch {
          setStatus("Network hiccup. Please email me directly at " + CONTACT_EMAIL + ".", "err");
        } finally {
          sendBtn.disabled = false;
        }
        return;
      }

      /* Fallback path: open a pre-filled email in the visitor's mail app */
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("Opening your email app…", "ok");
    });
  }

  function setStatus(msg, kind) {
    if (!status) return;
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  }
});
