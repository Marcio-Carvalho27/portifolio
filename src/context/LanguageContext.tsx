"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import en from "@/src/messages/en.json";
import pt from "@/src/messages/pt.json";

type Locale = "en" | "pt";

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const messages = {
  en,
  pt,
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  toggleLocale: () => {},
  t: (key) => key,
});

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;

    if (saved) {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = () => {
    const next = locale === "en" ? "pt" : "en";

    setLocale(next);

    localStorage.setItem("locale", next);
  };

  const t = (key: string): string => {
    return (
      messages[locale][
        key as keyof typeof messages.en
      ] ?? key
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        toggleLocale,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () =>
  useContext(LanguageContext);