// Default biological terms and their display labels
export const DEFAULT_ALIASES: Record<string, string> = {
  substrate: "substrate",
  enzyme: "enzyme",
  "michaelis-constant": "Michaelis constant",
  inhibitor: "inhibitor",
  "reaction-rate": "reaction rate",
  product: "product",
  reactant: "reactant",
  kinetics: "kinetics",
  rate: "rate",
};

// Keys that can be aliased (used to build the Settings UI)
export const ALIAS_KEYS = Object.keys(DEFAULT_ALIASES);
