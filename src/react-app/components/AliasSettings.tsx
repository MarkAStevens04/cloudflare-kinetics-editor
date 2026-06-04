import { useAliases } from "../context/AliasContext";
import { ALIAS_KEYS, DEFAULT_ALIASES } from "../config/wordAliases";
import "../styles/AliasSettings.css";

export function AliasSettings() {
  const { aliases, updateAlias, resetAliases } = useAliases();

  return (
    <div className="alias-settings-container">
      <h2>Word Aliases</h2>
      <p className="alias-settings-description">
        Rename biological terms to words that make more sense to you.
      </p>

      <table className="alias-settings-table">
        <thead>
          <tr>
            <th>Default Term</th>
            <th>Your Alias</th>
          </tr>
        </thead>
        <tbody>
          {ALIAS_KEYS.map((key) => (
            <tr key={key}>
              {/* Show the original scientific term */}
              <td className="default-term">{DEFAULT_ALIASES[key]}</td>

              {/* Editable alias input */}
              <td>
                <input
                  type="text"
                  className="alias-input"
                  value={aliases[key]}
                  onChange={(e) => updateAlias(key, e.target.value)}
                  placeholder={DEFAULT_ALIASES[key]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="reset-aliases-button" onClick={resetAliases}>
        Reset to Defaults
      </button>
    </div>
  );
}
