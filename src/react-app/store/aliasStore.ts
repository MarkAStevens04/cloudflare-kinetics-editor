import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ALIAS_PACKS, DEFAULT_PACK_ID, type AliasPack } from "../config/aliasPacks";

type AliasStore = {
  activePackId: string;
  activePack: AliasPack;
  setPackById: (id: string) => void;
  getTerm: (term: string) => string;
};

export const useAliasStore = create<AliasStore>()(
  persist(
    (set, get) => ({
      activePackId: DEFAULT_PACK_ID,
      activePack: ALIAS_PACKS.find((p) => p.id === DEFAULT_PACK_ID)!,

      setPackById: (id: string) => {
        const pack = ALIAS_PACKS.find((p) => p.id === id);
        if (!pack) return;
        set({ activePackId: id, activePack: pack });
      },

      getTerm: (term: string) => {
        const { activePack } = get();
        // Fallback to original term if alias not defined in pack
        return activePack.aliases[term] ?? term;
      },
    }),
    {
      name: "biobuilder-alias-pack", // localStorage key
    }
  )
);
