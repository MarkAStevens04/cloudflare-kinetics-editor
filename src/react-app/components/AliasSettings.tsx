// Settings panel rendered inside the Banner's Dialog.
// Lets the user pick from preset alias packs.

import aliasPacks from '../config/aliasPacks';
import useAliasStore from '../stores/aliasStore';

export default function AliasSettings() {
  const activePack = useAliasStore((s) => s.activePack);
  const setActivePack = useAliasStore((s) => s.setActivePack);

  return (
    <div className="alias-settings">
      <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 600 }}>
        Terminology Pack
      </h3>
      <p style={{ margin: '0 0 16px 0', fontSize: 12, opacity: 0.7 }}>
        Choose a preset to rename buttons and labels across the app.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {aliasPacks.map((pack) => (
          <button
            key={pack.id}
            onClick={() => setActivePack(pack.id)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border:
                activePack.id === pack.id
                  ? '2px solid #747bff'
                  : '2px solid var(--border-color, rgba(0,0,0,0.1))',
              background:
                activePack.id === pack.id
                  ? 'rgba(116, 123, 255, 0.1)'
                  : 'transparent',
              cursor: 'pointer',
              textAlign: 'left' as const,
              color: 'var(--text-color, inherit)',
              transition: 'border-color 0.2s, background 0.2s',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 13 }}>{pack.label}</div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>
              {pack.description}
            </div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.5,
                marginTop: 6,
                fontFamily: 'monospace',
              }}
            >
              {Object.entries(pack.aliases)
                .map(([k, v]) => `${k} → ${v}`)
                .join(' · ')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
