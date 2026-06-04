import { animated, useTransition } from "@react-spring/web";
import useStore from "./store";
import { AliasSettings } from "./components/AliasSettings";
import "./styles/SettingsDrawer.css";

export default function SettingsDrawer() {
  const open = useStore((store) => store.settingsDrawerOpen);
  const setSettingsDrawerOpen = useStore((store) => store.setSettingsDrawerOpen);

  const transitions = useTransition(open ? [true] : [], {
    from: { x: 240, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 240, opacity: 0 },
    config: { tension: 220, friction: 24 },
  });

  const pointerEvents = open ? "auto" : "none";

  return transitions((style, item) =>
    item ? (
      <>
        {/* Closes when you click out of the drawer, but prevents moving around the screen. */}
        <animated.div
          className="settings-drawer-dimmer"
          onClick={() => setSettingsDrawerOpen(false)}
          style={{
            pointerEvents: pointerEvents,
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.1)",
            opacity: style.opacity,
          }}
        />

        <animated.div
          className="settings-drawer"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 400,
            height: "100vh",
            background: "white",
            borderLeft: "1px solid #ddd",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.12)",
            transform: style.x.to((x) => `translate3d(${x}px, 0, 0)`),
            opacity: style.opacity,
            overflowY: "auto",
          }}
        >
          <div className="settings-drawer-header">
            <h1>Settings</h1>
            <button
              className="settings-drawer-close-button"
              onClick={() => setSettingsDrawerOpen(false)}
              aria-label="Close settings"
            >
              ✕
            </button>
          </div>

          <AliasSettings />
        </animated.div>
      </>
    ) : null
  );
}
