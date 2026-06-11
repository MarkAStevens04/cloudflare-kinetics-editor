// Persistent store for theme information! 
// Tutorial phase, light/dark (to be implemented), etc.

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types for our store
type ThemeStoreState = { 
    tutorialPhase: number, // 0 = Popup open, 1 = popup closed & hint, 2 = completely closed.
    setTutorialPhase: (phase: number) => void,
}


// Our actual store
const useThemeStore = create<ThemeStoreState>()(
    persist(
        (set) => ({
            // Initial state
            tutorialPhase: 0,
            setTutorialPhase: (phase: number) => set({ tutorialPhase: phase }),
        }),
        {
            name: 'theme-storage',
        }
    )
)

export default useThemeStore;

