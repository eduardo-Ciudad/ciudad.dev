"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navegacao } from "@/data/navegacao";
import { WHATSAPP_CONTACT_URL } from "@/data/whatsapp";
import { WhatsAppLink } from "@/components/WhatsAppLink";

type MenuGroup = "servicos" | "projetos" | "comoTrabalhamos";

const desktopOrder: Array<
  | { type: "group"; key: MenuGroup }
  | { type: "link"; index: number }
> = [
  { type: "group", key: "servicos" },
  { type: "group", key: "projetos" },
  { type: "group", key: "comoTrabalhamos" },
  { type: "link", index: 0 },
];

function isPathActive(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isGroupActive(pathname: string, group: MenuGroup) {
  if (group === "servicos") return pathname.startsWith("/servicos/");
  if (group === "projetos") {
    return pathname === "/projetos" || pathname.startsWith("/projetos/");
  }
  if (group === "comoTrabalhamos" && pathname === "/radar") return true;
  return pathname === "/garantia" || pathname === "/calculadora";
}

export function Navbar() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<MenuGroup | null>(null);
  const [mobileGroups, setMobileGroups] = useState<Record<MenuGroup, boolean>>({
    servicos: false,
    projetos: false,
    comoTrabalhamos: false,
  });
  const [scrolled, setScrolled] = useState(false);
  const floating = scrolled || mobileOpen;
  const navRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<MenuGroup, HTMLButtonElement | null>>({
    servicos: null,
    projetos: null,
    comoTrabalhamos: null,
  });
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDesktopGroup = (group: MenuGroup) => {
    clearCloseTimer();
    setDesktopOpen(group);
  };

  const scheduleDesktopClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setDesktopOpen(null), 120);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileGroups({
      servicos: false,
      projetos: false,
      comoTrabalhamos: false,
    });
  };

  useEffect(() => {
    let frame: number | null = null;

    const updateScrolled = () => {
      frame = null;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateScrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    const closeMenus = window.setTimeout(() => {
      setDesktopOpen(null);
      setMobileOpen(false);
      setMobileGroups({
        servicos: false,
        projetos: false,
        comoTrabalhamos: false,
      });
    }, 0);

    return () => window.clearTimeout(closeMenus);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setDesktopOpen(null);
        closeMobile();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (desktopOpen) {
        const trigger = triggerRefs.current[desktopOpen];
        setDesktopOpen(null);
        trigger?.focus();
      } else if (mobileOpen) {
        closeMobile();
        mobileButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      clearCloseTimer();
    };
  }, [desktopOpen, mobileOpen]);

  const renderActiveDot = (active: boolean) => (
    <span
      aria-hidden="true"
      className={`absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-opacity ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );

  const renderDesktopGroup = (groupKey: MenuGroup) => {
    const group = navegacao[groupKey];
    const isOpen = desktopOpen === groupKey;
    const active = isGroupActive(pathname, groupKey);
    const panelId = `desktop-${groupKey}-menu`;

    return (
      <div
        key={groupKey}
        className="relative"
        onMouseEnter={() => openDesktopGroup(groupKey)}
        onMouseLeave={scheduleDesktopClose}
      >
        <button
          ref={(element) => {
            triggerRefs.current[groupKey] = element;
          }}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => {
            clearCloseTimer();
            setDesktopOpen(isOpen ? null : groupKey);
          }}
          className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/[0.06] rounded-lg transition-all duration-200 ${
            active ? "text-primary" : floating ? "text-primary" : "text-muted"
          } ${active && floating ? "bg-primary/[0.06]" : ""}`}
        >
          {group.label}
          <ChevronDown
            aria-hidden="true"
            size={14}
            className={`transition-transform duration-200 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          {renderActiveDot(active)}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={panelId}
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.98,
                filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
              }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0.98,
                filter: shouldReduceMotion ? "blur(0px)" : "blur(4px)",
              }}
              transition={{
                duration: shouldReduceMotion ? 0.12 : 0.22,
                ease: [0.25, 0.9, 0.3, 1],
              }}
              style={{ width: 320 }}
              className="glass-strong absolute left-0 top-full mt-2 max-w-[calc(100vw-2rem)] origin-top-left rounded-[20px] p-1.5"
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleDesktopClose}
            >
              {group.items.map((item) => {
                const itemActive = isPathActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={itemActive ? "page" : undefined}
                    onClick={() => setDesktopOpen(null)}
                    className="flex items-baseline justify-between gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
                  >
                    <span className="font-heading text-[17px] font-semibold text-primary">
                      {item.title}
                    </span>
                    {"meta" in item && (
                      <span className="shrink-0 text-xs font-medium text-accent tabular-nums">
                        {item.meta}
                      </span>
                    )}
                  </Link>
                );
              })}

              {(groupKey === "servicos" || groupKey === "projetos") && (
                <>
                  <div className="my-1 h-px bg-divider" />
                  <Link
                    href={navegacao[groupKey].footer.href}
                    aria-current={
                      pathname === navegacao[groupKey].footer.href
                        ? "page"
                        : undefined
                    }
                    onClick={() => setDesktopOpen(null)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-accent hover:bg-surface"
                  >
                    {navegacao[groupKey].footer.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderDesktopLink = (index: number, mobile = false) => {
    const link = navegacao.links[index];
    const active = isPathActive(pathname, link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        aria-current={active ? "page" : undefined}
        onClick={mobile ? closeMobile : undefined}
        className={`relative px-4 py-2 text-sm font-medium hover:text-primary hover:bg-primary/[0.06] rounded-lg transition-all duration-200 ${
          active ? "text-primary" : floating ? "text-primary" : "text-muted"
        } ${active && floating ? "bg-primary/[0.06]" : ""}`}
      >
        {link.label}
        {renderActiveDot(active)}
      </Link>
    );
  };

  const renderMobileGroup = (groupKey: MenuGroup) => {
    const group = navegacao[groupKey];
    const isOpen = mobileGroups[groupKey];
    const panelId = `mobile-${groupKey}-menu`;

    return (
      <div key={groupKey}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() =>
            setMobileGroups((current) => ({
              ...current,
              [groupKey]: !current[groupKey],
            }))
          }
          className={`flex w-full items-center justify-between py-2 text-left text-sm font-medium transition-colors hover:text-primary ${
            floating ? "text-primary" : "text-muted"
          }`}
        >
          {group.label}
          <ChevronDown
            aria-hidden="true"
            size={16}
            className={`transition-transform duration-200 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
              className="overflow-hidden"
            >
              <div className="space-y-1 border-l border-divider py-1 pl-4">
                {group.items.map((item) => {
                  const itemActive = isPathActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={itemActive ? "page" : undefined}
                      onClick={closeMobile}
                      className={`flex items-baseline justify-between gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-card ${
                        itemActive ? "text-primary" : "text-muted"
                      }`}
                    >
                      <span className="text-sm font-medium">{item.title}</span>
                      {"meta" in item && (
                        <span className="shrink-0 text-xs font-medium text-accent tabular-nums">
                          {item.meta}
                        </span>
                      )}
                    </Link>
                  );
                })}
                {(groupKey === "servicos" || groupKey === "projetos") && (
                  <Link
                    href={navegacao[groupKey].footer.href}
                    aria-current={
                      pathname === navegacao[groupKey].footer.href
                        ? "page"
                        : undefined
                    }
                    onClick={closeMobile}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-card"
                  >
                    {navegacao[groupKey].footer.label}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 z-50 mx-auto flex items-center transition-[top,left,right,max-width,height,border-radius,background-color,box-shadow,backdrop-filter,opacity] duration-400 ease-[cubic-bezier(.25,.9,.3,1)] motion-reduce:transition-[background-color,box-shadow,backdrop-filter,opacity] motion-reduce:duration-150 ${
        floating
          ? "glass-nav top-3 left-2.5 right-2.5 h-[52px] max-w-6xl rounded-full md:left-3 md:right-3"
          : "top-0 h-16 max-w-none rounded-none bg-transparent"
      }`}
      aria-label="Navegação principal"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl md:text-[26px] font-heading font-bold text-primary"
          onClick={closeMobile}
        >
          Ciudad<span className="text-accent">Lab</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {desktopOrder.map((item) =>
            item.type === "group"
              ? renderDesktopGroup(item.key)
              : renderDesktopLink(item.index),
          )}
          <WhatsAppLink
            href={WHATSAPP_CONTACT_URL}
            location="navbar"
            className="ml-3 text-sm font-semibold bg-accent text-white px-6 py-2.5 rounded-full hover:brightness-110 transition-all duration-200"
          >
            {navegacao.cta}
          </WhatsAppLink>
        </div>

        <button
          ref={mobileButtonRef}
          type="button"
          className="md:hidden text-primary"
          onClick={() => setMobileOpen((current) => !current)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-menu"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{
              duration: shouldReduceMotion ? 0.12 : 0.22,
              ease: [0.25, 0.9, 0.3, 1],
            }}
            className="glass-strong absolute top-[calc(100%+0.5rem)] left-0 right-0 max-h-[calc(100dvh-5rem)] origin-top overflow-y-auto rounded-[20px] md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-2">
              {renderMobileGroup("servicos")}
              {renderMobileGroup("projetos")}
              {renderMobileGroup("comoTrabalhamos")}
              {renderDesktopLink(0, true)}
              <WhatsAppLink
                href={WHATSAPP_CONTACT_URL}
                location="navbar"
                className="text-sm font-semibold bg-accent text-white px-6 py-2.5 rounded-full hover:brightness-110 transition-all duration-200 text-center mt-1 w-full"
                onClick={closeMobile}
              >
                {navegacao.cta}
              </WhatsAppLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
