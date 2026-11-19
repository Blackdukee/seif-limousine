import { useEffect, useId, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { WhatsAppIcon } from "@/components/seif/Icons";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  AIRPORT_BASE_STARTING_PRICE,
  AIRPORT_DESTINATIONS,
  AIRPORT_FEATURED_VEHICLE,
  formatEgp,
  type AirportDestinationId,
} from "@/data/airportPricing";
import heroImage1600 from "@/assets/xpander-cross-hero-1600.webp";
import heroImage960 from "@/assets/xpander-cross-hero-960.webp";

type FieldErrors = Partial<Record<"destination" | "customDestination" | "date" | "time", string>>;

/** Local YYYY-MM-DD / HH:MM helpers (client-only; never used during SSR render output). */
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function localDateStr(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function localTimeStr(d: Date) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Vehicle showcase + booking panel for the Cairo Airport service page only.
 * Rendered below the page H1; does not render any heading level 1.
 */
export function AirportBookingShowcase({ lang }: { lang: "en" | "ar" }) {
  const { t } = useTranslation();
  const uid = useId();
  const ids = {
    destination: `${uid}-destination`,
    custom: `${uid}-custom`,
    date: `${uid}-date`,
    time: `${uid}-time`,
    price: `${uid}-price`,
  };

  const [destination, setDestination] = useState<AirportDestinationId | "">("");
  const [customDestination, setCustomDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  // "Today" is only known on the client — set after mount to avoid SSR/hydration mismatches.
  const [today, setToday] = useState<string | undefined>(undefined);
  const [nowTime, setNowTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setToday(localDateStr(now));
      setNowTime(localTimeStr(now));
    };
    tick();
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const selected = AIRPORT_DESTINATIONS.find((d) => d.id === destination);
  const isOther = destination === "other";
  const price: number | null = selected ? selected.startingPrice : AIRPORT_BASE_STARTING_PRICE;
  const destinationLabel = isOther
    ? customDestination.trim()
    : destination
      ? t(`airportBooking.destinations.${destination}`)
      : "";

  const clearError = (key: keyof FieldErrors) =>
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    const now = new Date();
    const todayStr = localDateStr(now);
    if (!destination) next.destination = t("airportBooking.errors.destination");
    if (isOther && !customDestination.trim())
      next.customDestination = t("airportBooking.errors.customDestination");
    if (!date) next.date = t("airportBooking.errors.date");
    else if (date < todayStr) next.date = t("airportBooking.errors.datePast");
    if (!time) next.time = t("airportBooking.errors.time");
    else if (date === todayStr && time <= localTimeStr(now))
      next.time = t("airportBooking.errors.timePast");
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    const firstInvalid = (["destination", "customDestination", "date", "time"] as const).find(
      (k) => next[k],
    );
    if (firstInvalid) {
      const focusId = {
        destination: ids.destination,
        customDestination: ids.custom,
        date: ids.date,
        time: ids.time,
      }[firstInvalid];
      document.getElementById(focusId)?.focus();
      return;
    }

    const priceLine =
      price !== null
        ? `${t("airportBooking.message.price")}: ${t("airportBooking.startingFrom")} ${t("airportBooking.priceAmount", { amount: formatEgp(price) })}`
        : `${t("airportBooking.message.price")}: ${t("airportBooking.message.priceQuote")}`;

    const message = [
      t("airportBooking.message.greeting"),
      `${t("airportBooking.message.service")}: ${t("airportBooking.message.serviceValue")}`,
      `${t("airportBooking.message.vehicle")}: ${AIRPORT_FEATURED_VEHICLE.name}`,
      `${t("airportBooking.message.destination")}: ${destinationLabel}`,
      `${t("airportBooking.message.date")}: ${date}`,
      `${t("airportBooking.message.time")}: ${time}`,
      priceLine,
    ].join("\n");

    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  const errId = (key: keyof FieldErrors) => `${uid}-${key}-error`;

  return (
    <div className="seif-apb" data-lang={lang}>
      <style dangerouslySetInnerHTML={{ __html: AIRPORT_BOOKING_CSS }} />

      {/* ── Vehicle showcase ── */}
      <section className="seif-apb-vehicle" aria-labelledby={`${uid}-vehicle-name`}>
        <div className="seif-apb-image-wrap">
          <img
            src={heroImage1600}
            srcSet={`${heroImage960} 960w, ${heroImage1600} 1600w`}
            sizes="(max-width: 1000px) 100vw, 1000px"
            width={1600}
            height={900}
            alt={t("airportBooking.vehicleAlt")}
            fetchPriority="high"
            decoding="async"
            className="seif-apb-image"
          />
        </div>
        <div className="seif-apb-vehicle-meta">
          <h2 id={`${uid}-vehicle-name`} className="seif-apb-vehicle-name" dir="ltr">
            {AIRPORT_FEATURED_VEHICLE.name}
          </h2>
          <ul className="seif-apb-badges">
            <li className="seif-apb-badge">
              {t("airportBooking.seatsBadge", { count: AIRPORT_FEATURED_VEHICLE.seats })}
            </li>
            <li className="seif-apb-badge seif-apb-badge--gold">
              {t("airportBooking.mostWantedBadge")}
            </li>
          </ul>
        </div>
      </section>

      {/* ── Booking panel ── */}
      <section className="seif-apb-panel" aria-labelledby={`${uid}-panel-heading`}>
        <h2 id={`${uid}-panel-heading`} className="seif-apb-panel-heading">
          {t("airportBooking.panelHeading")}
        </h2>

        <form noValidate onSubmit={handleSubmit} className="seif-apb-form">
          <div className="seif-apb-field">
            <label htmlFor={ids.destination} className="seif-apb-label">
              {t("airportBooking.destinationLabel")}
            </label>
            <div className="seif-apb-select-wrap">
              <select
                id={ids.destination}
                className="seif-apb-control seif-apb-select"
                value={destination}
                required
                aria-invalid={!!errors.destination}
                aria-describedby={errors.destination ? errId("destination") : ids.price}
                onChange={(e) => {
                  setDestination(e.target.value as AirportDestinationId | "");
                  clearError("destination");
                  clearError("customDestination");
                }}
              >
                <option value="" disabled>
                  {t("airportBooking.destinationPlaceholder")}
                </option>
                {AIRPORT_DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {t(`airportBooking.destinations.${d.id}`)}
                  </option>
                ))}
              </select>
              <svg
                className="seif-apb-chevron"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            {errors.destination && (
              <p id={errId("destination")} className="seif-apb-error" role="alert">
                {errors.destination}
              </p>
            )}
          </div>

          {isOther && (
            <div className="seif-apb-field">
              <label htmlFor={ids.custom} className="seif-apb-label">
                {t("airportBooking.customDestinationLabel")}
              </label>
              <input
                id={ids.custom}
                type="text"
                className="seif-apb-control"
                value={customDestination}
                autoComplete="street-address"
                placeholder={t("airportBooking.customDestinationPlaceholder")}
                aria-invalid={!!errors.customDestination}
                aria-describedby={errors.customDestination ? errId("customDestination") : undefined}
                onChange={(e) => {
                  setCustomDestination(e.target.value);
                  clearError("customDestination");
                }}
              />
              {errors.customDestination && (
                <p id={errId("customDestination")} className="seif-apb-error" role="alert">
                  {errors.customDestination}
                </p>
              )}
            </div>
          )}

          <div className="seif-apb-row">
            <div className="seif-apb-field">
              <label htmlFor={ids.date} className="seif-apb-label">
                {t("airportBooking.dateLabel")}
              </label>
              <input
                id={ids.date}
                type="date"
                className="seif-apb-control"
                value={date}
                min={today}
                required
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? errId("date") : undefined}
                onChange={(e) => {
                  setDate(e.target.value);
                  clearError("date");
                  clearError("time");
                }}
              />
              {errors.date && (
                <p id={errId("date")} className="seif-apb-error" role="alert">
                  {errors.date}
                </p>
              )}
            </div>
            <div className="seif-apb-field">
              <label htmlFor={ids.time} className="seif-apb-label">
                {t("airportBooking.timeLabel")}
              </label>
              <input
                id={ids.time}
                type="time"
                className="seif-apb-control"
                value={time}
                min={date && date === today ? nowTime : undefined}
                required
                aria-invalid={!!errors.time}
                aria-describedby={errors.time ? errId("time") : undefined}
                onChange={(e) => {
                  setTime(e.target.value);
                  clearError("time");
                }}
              />
              {errors.time && (
                <p id={errId("time")} className="seif-apb-error" role="alert">
                  {errors.time}
                </p>
              )}
            </div>
          </div>

          <div id={ids.price} className="seif-apb-price" aria-live="polite" aria-atomic="true">
            {price !== null ? (
              <>
                <span className="seif-apb-price-caption">{t("airportBooking.startingFrom")}</span>
                <span className="seif-apb-price-value" data-testid="airport-price">
                  {t("airportBooking.priceAmount", { amount: formatEgp(price) })}
                </span>
                <span className="seif-apb-price-note">{t("airportBooking.priceNote")}</span>
              </>
            ) : (
              <>
                <span className="seif-apb-price-value" data-testid="airport-price">
                  {t("airportBooking.requestQuote")}
                </span>
                <span className="seif-apb-price-note">{t("airportBooking.quoteNote")}</span>
              </>
            )}
          </div>

          <button type="submit" className="seif-apb-submit">
            <WhatsAppIcon size={22} />
            <span>{t("airportBooking.submit")}</span>
          </button>
        </form>
      </section>
    </div>
  );
}

const AIRPORT_BOOKING_CSS = `
.seif-apb { display: flex; flex-direction: column; align-items: center; gap: 56px; margin: 8px 0 88px; }

.seif-apb-vehicle { width: 100%; max-width: 1000px; display: flex; flex-direction: column; align-items: center; }
.seif-apb-image-wrap { width: 100%; }
.seif-apb-image {
  display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: contain;
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, #000 16%, #000 80%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, #000 16%, #000 80%, transparent 100%);
  mask-composite: intersect;
}
.seif-apb-vehicle-meta { display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: 4px; text-align: center; }
.seif-apb-vehicle-name {
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #fff;
  font-size: clamp(24px, 3.2vw, 34px); line-height: 1.2; letter-spacing: -0.01em; margin: 0;
}
.seif-apb-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; list-style: none; margin: 0; padding: 0; }
.seif-apb-badge {
  display: inline-flex; align-items: center; height: 36px; padding: 0 16px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.18); color: #fff; font-size: 14px; font-weight: 600;
}
.seif-apb-badge--gold { border-color: var(--seif-gold-border-h); color: var(--seif-gold-light); }

.seif-apb-panel {
  width: 100%; max-width: 760px; background: var(--seif-surface);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px;
}
.seif-apb-panel-heading {
  font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; color: #fff;
  font-size: clamp(26px, 3.4vw, 36px); line-height: 1.2; text-align: center; margin: 0 0 32px;
}
.seif-apb-form { display: flex; flex-direction: column; gap: 24px; }
.seif-apb-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.seif-apb-field { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.seif-apb-label { color: #fff; font-size: 17px; font-weight: 600; }
.seif-apb-control {
  width: 100%; min-width: 0; height: 60px; padding: 0 18px; border-radius: 10px;
  background: var(--seif-black); color: #fff; font-size: 18px; font-family: inherit;
  border: 1px solid rgba(255,255,255,0.16); color-scheme: dark; outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease; -webkit-appearance: none; appearance: none;
}
.seif-apb-control::placeholder { color: var(--seif-white-35); }
.seif-apb-control:hover { border-color: rgba(255,255,255,0.3); }
.seif-apb-control:focus-visible { border-color: var(--seif-gold); box-shadow: 0 0 0 3px rgba(201,168,76,0.25); }
.seif-apb-control[aria-invalid="true"] { border-color: #f87171; }
.seif-apb-control::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.8; }
.seif-apb-select-wrap { position: relative; }
.seif-apb-select { padding-inline-end: 48px; cursor: pointer; }
.seif-apb-select:invalid, .seif-apb-select option[value=""] { color: var(--seif-white-60); }
.seif-apb-select option { color: #fff; background: var(--seif-surface); }
.seif-apb-chevron { position: absolute; inset-inline-end: 18px; top: 50%; transform: translateY(-50%); color: var(--seif-gold); pointer-events: none; }
.seif-apb-error { color: #fca5a5; font-size: 15px; margin: 0; }

.seif-apb-price {
  display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center;
  padding: 22px 16px; border-radius: 12px; border: 1px solid var(--seif-gold-border);
}
.seif-apb-price-caption { color: var(--seif-white-80); font-size: 16px; font-weight: 500; }
.seif-apb-price-value {
  color: var(--seif-gold); font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800;
  font-size: clamp(30px, 4.4vw, 40px); line-height: 1.15;
}
.seif-apb-price-note { color: var(--seif-white-60); font-size: 14px; margin-top: 4px; }

.seif-apb-submit {
  display: inline-flex; align-items: center; justify-content: center; gap: 12px; width: 100%;
  min-height: 64px; padding: 0 24px; border: none; border-radius: 10px; cursor: pointer;
  background: var(--seif-gold); color: var(--seif-black); font-family: inherit;
  font-size: 18px; font-weight: 800; transition: background-color 0.15s ease, transform 0.15s ease;
}
.seif-apb-submit:hover { background: var(--seif-gold-light); }
.seif-apb-submit:active { transform: translateY(1px); }
.seif-apb-submit:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }

[dir="rtl"] .seif-apb-panel-heading, [dir="rtl"] .seif-apb-vehicle-name { text-align: center; }
[dir="rtl"] .seif-apb-label, [dir="rtl"] .seif-apb-error { text-align: right; }
[dir="rtl"] .seif-apb-control { text-align: right; }

@media (max-width: 640px) {
  .seif-apb { gap: 36px; margin-bottom: 64px; }
  .seif-apb-image {
    -webkit-mask-image:
      linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%),
      linear-gradient(to bottom, transparent 0%, #000 12%, #000 84%, transparent 100%);
    mask-image:
      linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%),
      linear-gradient(to bottom, transparent 0%, #000 12%, #000 84%, transparent 100%);
  }
  .seif-apb-panel { padding: 28px 18px; border-radius: 14px; }
  .seif-apb-panel-heading { margin-bottom: 24px; }
  .seif-apb-row { grid-template-columns: 1fr; }
  .seif-apb-submit { font-size: 17px; gap: 10px; padding: 0 16px; }
}
`;
