import { useAliasStore } from "../store/aliasStore";
import { ALIAS_PACKS } from "../config/aliasPacks";
import "../styles/AliasSettings.css";

export function AliasSettings() {
  const { activePackId, setPackById, activePack } = useAliasStore();

  return (
    <div className="alias-settings-container">
      <h2>Terminology Style</h2>
      <p className="alias-settings-description">
        Choose language that matches your background.
      </p>

      <div className="alias-select-wrapper">
        <select
          value={activePackId}
          onChange={(e) => setPackById(e.target.value)}
          className="alias-select"
        >
          {ALIAS_PACKS.map((pack) => (
            <option key={pack.id} value={pack.id}>
              {pack.label}
            </option>
          ))}
        </select>
      </div>

      <p className="alias-pack-description">{activePack.description}</p>

      {/* Preview table so user knows what changes */}
      <table className="alias-settings-table">
        <thead>
          <tr>
            <th>Scientific Term</th>
            <th>Your Label</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(activePack.aliases).map(([term, alias]) => (
            <tr key={term}>
              <td className="default-term">{term}</td>
              <td className="alias-term-value">{alias}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
