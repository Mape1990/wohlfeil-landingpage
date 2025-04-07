"use client";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setShowCookie(true);

    const style = document.createElement("style");
    style.innerHTML = `
      :root {
        --chat--color-primary: #22c55e !important;
        --chat--color-primary-shade-50: #16a34a !important;
        --chat--color-primary-shade-100: #15803d !important;
        --chat--color-secondary: #2563eb !important;
        --chat--color-white: #ffffff !important;
        --chat--color-dark: #0f172a !important;
        --chat--border-radius: 1rem !important;
        --chat--toggle--size: 60px !important;
        --chat--toggle--background: var(--chat--color-primary) !important;
        --chat--toggle--hover--background: var(--chat--color-primary-shade-50) !important;
        --chat--toggle--active--background: var(--chat--color-primary-shade-100) !important;
        --chat--header--background: var(--chat--color-primary) !important;
        --chat--header--color: var(--chat--color-white) !important;
        --chat--message--user--background: var(--chat--color-secondary) !important;
        --chat--message--user--color: var(--chat--color-white) !important;
        --chat--message--bot--background: var(--chat--color-white) !important;
        --chat--message--bot--color: var(--chat--color-dark) !important;
      }
    `;
    document.head.appendChild(style);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      const userLang = navigator.language?.substring(0, 2) || 'de';
      createChat({
        webhookUrl: 'https://startai.app.n8n.cloud/webhook/3ffa4abc-4c9b-4b0c-a657-63c85f0c9b29/chat',
        mode: 'window',
        defaultLanguage: userLang,
        showWelcomeScreen: false,
        initialMessages: [
          '👋 Hallo und herzlich willkommen beim Wohlfeil Klima-Chat!',
          'Möchtest du eine neue Klimaanlage oder Infos zur Wartung?'
        ],
        i18n: {
          de: {
            title: 'Wohlfeil Klima-Chat',
            subtitle: 'Dein persönlicher Berater für Klimaanlagen',
            getStarted: 'Neu starten',
            inputPlaceholder: 'Stelle deine Frage ...',
            footer: '© 2025 Wohlfeil Klima'
          }
        }
      });
    `;
    document.body.appendChild(script);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookie(false);
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-green-100 via-white to-white flex flex-col items-center justify-center p-6 text-center">
        <img src="/Wohlfeil_Logo.avif" alt="Wohlfeil Logo" className="w-64 mb-10 drop-shadow" />
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Kompetenz in Klimatechnik –</h1>
        <h2 className="text-2xl text-blue-800 mb-6">Beratung, Einbau & Wartung aus einer Hand!</h2>
        <p className="text-lg text-gray-700 mb-10 max-w-xl">
          Kühle, wohltemperierte Räume, bessere Luft – mit unseren individuellen Klimatechnik-Lösungen.
        </p>
        <img
          src="/Kev+Klima.webp"
          alt="Techniker bei der Klimamontage"
          className="w-64 md:w-80 h-auto rounded shadow-md"
        />
      </main>

      {showCookie && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 px-6 py-4 shadow-xl rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 z-50 transition-all animate-fade-in">
          <p className="text-sm text-gray-700 text-center md:text-left">
            Diese Website verwendet Cookies.{" "}
            <a href="/datenschutz" className="text-blue-600 underline hover:text-blue-800">Mehr erfahren</a>
          </p>
          <div className="flex gap-2">
            <button onClick={() => setShowCookie(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition">
              Ablehnen
            </button>
            <button onClick={handleAcceptCookies} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition">
              OK, verstanden
            </button>
          </div>
        </div>
      )}
    </>
  );
}