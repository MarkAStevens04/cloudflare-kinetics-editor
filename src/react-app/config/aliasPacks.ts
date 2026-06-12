// Preset alias packs let users re-label the core biology terms
// (molecule, enzyme/protein, reaction, simulation) to match
// whatever domain they're most comfortable with.

export type AliasPack = {
  id: string;
  label: string;
  description: string;
  aliases: Record<string, string>;
};

const aliasPacks: AliasPack[] = [
  {
    id: 'biochemistry',
    label: 'Biochemistry (default)',
    description: 'Standard biochemistry terminology',
    aliases: {
      molecule: 'Molecule',
      protein: 'Enzyme',
      reaction: 'Reaction',
      simulation: 'Simulation',
    },
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    description: 'General chemistry terminology',
    aliases: {
      molecule: 'Reagent',
      protein: 'Catalyst',
      reaction: 'Reaction',
      simulation: 'Simulation',
    },
  },
  {
    id: 'physics',
    label: 'Physics',
    description: 'Physics-inspired terminology',
    aliases: {
      molecule: 'Particle',
      protein: 'Field',
      reaction: 'Interaction',
      simulation: 'Simulation',
    },
  },
  {
    id: 'generic',
    label: 'Generic',
    description: 'Simple, domain-neutral labels',
    aliases: {
      molecule: 'Species A',
      protein: 'Species B',
      reaction: 'Process',
      simulation: 'Run',
    },
  },
];

export default aliasPacks;
