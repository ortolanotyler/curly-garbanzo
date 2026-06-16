import { useEffect, useRef, RefObject } from 'react';

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Accessibility wiring shared by the site's modal dialogs:
 * - moves focus into the panel on open and restores it to the opener on close
 * - traps Tab within the panel
 * - closes on Escape
 *
 * Pair with role="dialog" aria-modal="true" + an accessible name on the panel,
 * and give the panel tabIndex={-1}. For nested dialogs, pass `active=false` on
 * the lower dialog while a child dialog is open so Escape only closes the top one.
 */
export function useDialogA11y(
  active: boolean,
  onClose: () => void,
  panelRef: RefObject<HTMLElement>,
) {
  // Read onClose from a ref so an unstable inline handler doesn't retrigger the
  // effect (and re-grab focus) on every parent render — only `active` should.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!active) return;
    const panel = panelRef.current;
    const previouslyFocused = (typeof document !== 'undefined'
      ? document.activeElement
      : null) as HTMLElement | null;

    const focusables = (): HTMLElement[] =>
      panel
        ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
            (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement,
          )
        : [];

    // Move focus into the dialog.
    (panel || undefined)?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key === 'Tab' && panel) {
        const f = focusables();
        if (f.length === 0) {
          e.preventDefault();
          panel.focus({ preventScroll: true });
          return;
        }
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('keydown', onKeyDown, true);
      // Restore focus to whatever opened the dialog.
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [active, panelRef]);
}
