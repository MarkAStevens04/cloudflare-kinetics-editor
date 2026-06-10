export type AliasPack = {
  id: string;
  label: string;           // shown in dropdown
  description: string;     // shown as subtitle
  aliases: Record<string, string>;  // term → display label
};

export const ALIAS_PACKS: AliasPack[] = [
  {
    id: "biologist",
    label: "Biologist (Default)",
    description: "Original scientific terminology",
    aliases: {
      molecule: "molecule",
      enzyme: "enzyme",
      substrate: "substrate",
      protein: "protein",
      catalyst: "catalyst",
      reactant: "reactant",
      product: "product",
      rate: "rate",
    },
  },
  {
    id: "engineer",
    label: "Engineer",
    description: "Think of biology like building machines",
    aliases: {
      molecule: "part",
      enzyme: "machine",
      substrate: "raw material",
      protein: "component",
      catalyst: "activator",
      reactant: "raw material",
      product: "output component",
      rate: "speed",
    },
  },
  {
    id: "chef",
    label: "Chef",
    description: "Think of biology like cooking",
    aliases: {
      molecule: "ingredient",
      enzyme: "catalyst",
      substrate: "base mix",
      protein: "nutrient",
      catalyst: "trigger",
      reactant: "base mix",
      product: "dish",
      rate: "speed",
    },
  },
  {
    id: "student",
    label: "Student",
    description: "Simple everyday language",
    aliases: {
      molecule: "building block",
      enzyme: "helper",
      substrate: "fuel",
      protein: "structure",
      catalyst: "starter",
      reactant: "fuel",
      product: "result",
      rate: "speed",
    },
  },
];

export const DEFAULT_PACK_ID = "biologist";
