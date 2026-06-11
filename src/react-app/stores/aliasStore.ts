// Zustand store that tracks which alias pack is active and
// exposes a getTerm() helper for the rest of the UI.

import { create } from 'zustand';
import aliasPacks, { type AliasPack } from '../config/aliasPacks';

type AliasState = {
  activePack: AliasPack;
  setActivePack: (packId: string) => void;
  getTerm: (key: string) => string;
};

const useAliasStore = create<AliasState>((set, get) => ({
  activePack: aliasPacks[0],

  setActivePack: (packId: string) => {
    const pack = aliasPacks.find((p) => p.id === packId);
    if (pack) {
      set({ activePack: pack });
    }
  },

  getTerm: (key: string) => {
    return get().activePack.aliases[key] ?? key;
  },
}));

export default useAliasStore;
