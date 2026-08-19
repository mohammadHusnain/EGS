// Mock/UI data — data-driven so no markup is duplicated per card.
// `image` imports the ACTUAL artwork cropped directly from the supplied
// screenshots (src/assets/games/*.png), upscaled with Lanczos resampling
// for a sharper render. These are the same images shown in the reference
// design — not stock/Shutterstock substitutes.
import superAce from '@/assets/games/card_super_ace.png'
import goldenEmpire from '@/assets/games/card_golden_empire.png'
import fortuneGems from '@/assets/games/card_fortune_gems.png'
import legendMermaid from '@/assets/games/card_legend_mermaid.png'
import beautyFishing from '@/assets/games/card_beauty_fishing.png'
import dailyFishing from '@/assets/games/card_daily_fishing.png'
import reactors from '@/assets/games/card_reactors.png'
import officeChristmas from '@/assets/games/card_office_christmas.png'
import neon888 from '@/assets/games/card_neon_888.png'
import qgSlot from '@/assets/games/card_qg.png'
import ftgSlot from '@/assets/games/card_ftg.png'
import jili from '@/assets/games/card_jili.png'
import bannerA from '@/assets/games/crop_banner_a.png'
import bannerB from '@/assets/games/crop_banner_b.png'

export { bannerA, bannerB }

export const hotGames = [
  { id: 'super-ace', title: 'Super Ace', category: 'hot', badge: '', gradient: 'from-rose-600 via-red-700 to-amber-600', image: superAce, fit: 'contain' },
  { id: 'golden-empire', title: 'Golden Empire', category: 'hot', badge: '2000X', gradient: 'from-amber-500 via-yellow-600 to-orange-700', image: goldenEmpire, fit: 'contain' },
  { id: 'fortune-gems', title: 'Fortune Gems', category: 'hot', badge: '375X', gradient: 'from-fuchsia-600 via-purple-700 to-indigo-800', image: fortuneGems, fit: 'contain' }
]

export const jackpotGames = [
  { id: 'legend-mermaid', title: 'Legend Of Mermaid', category: 'jackpot', badge: 'JACKPOT', gradient: 'from-blue-600 via-cyan-700 to-teal-800', image: legendMermaid, fit: 'contain' },
  { id: 'beauty-fishing', title: 'Beauty Fishing', category: 'jackpot', badge: 'JACKPOT', gradient: 'from-sky-500 via-blue-700 to-indigo-800', image: beautyFishing, fit: 'contain' },
  { id: 'daily-fishing', title: 'Daily Fishing', category: 'jackpot', badge: 'JACKPOT', gradient: 'from-indigo-600 via-blue-700 to-cyan-800', image: dailyFishing, fit: 'contain' }
]

export const slotGames = [
  { id: 'reactors', title: '3 Reactors', category: 'slots', badge: '', gradient: 'from-slate-600 via-blue-700 to-indigo-800', image: reactors, fit: 'contain' },
  { id: 'office-christmas', title: 'Office Christmas', category: 'slots', badge: '', gradient: 'from-red-600 via-rose-700 to-pink-800', image: officeChristmas, fit: 'contain' },
  { id: 'neon-888', title: '888 Deluxe', category: 'slots', badge: '', gradient: 'from-fuchsia-600 via-violet-700 to-purple-900', image: neon888, fit: 'contain' }
]

export const allGames = [...hotGames, ...jackpotGames, ...slotGames]

export const categoryNav = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'slots', label: 'Slots', icon: 'slots' },
  { id: 'live-casino', label: 'Live Casino', icon: 'live' },
  { id: 'hot', label: 'Hot', icon: 'fire' }
]

export const sidebarCategories = [
  { id: 'slots', label: 'Slots', icon: 'slots' },
  { id: 'live-casino', label: 'LiveCas...', icon: 'live' },
  { id: 'hot', label: 'Hot', icon: 'fire' },
  { id: 'play', label: 'Play Fo...', icon: 'controller' },
  { id: 'fish', label: 'Fish', icon: 'fish' },
  { id: 'pvp', label: 'PVP', icon: 'pvp' },
  { id: 'sports', label: 'Sports', icon: 'sports' },
  { id: 'cockfighting', label: 'Cock Fi...', icon: 'cock' }
]

export const providers = [
  { id: 'qg', title: 'QG Slot', name: 'QORA GAMES', badge: 'N', gradient: 'from-blue-700 via-indigo-800 to-violet-900', image: qgSlot, fit: 'contain' },
  { id: 'ftg', title: 'FTG Slot', name: 'FTG', badge: '', gradient: 'from-purple-700 via-fuchsia-800 to-pink-900', image: ftgSlot, fit: 'contain' },
  { id: 'jili', title: 'JILI', name: 'JILI GAMES', badge: '', gradient: 'from-indigo-700 via-blue-800 to-cyan-900', image: jili, fit: 'contain' }
]

export const bottomNavA = [
  { id: 'home', label: 'Home', icon: 'home', route: '/dashboard' },
  { id: 'games', label: 'Games', icon: 'controller', route: '/casino-lobby' },
  { id: 'promo', label: 'Promo', icon: 'gift', route: '/casino-lobby' },
  { id: 'me', label: 'Me', icon: 'user', route: '/casino-lobby' },
  { id: 'help', label: 'Help', icon: 'headset', route: '/casino-lobby' }
]

export const bottomNavB = [
  { id: 'home', label: 'Home', icon: 'home', route: '/dashboard' },
  { id: 'promo', label: 'Promo', icon: 'gift', route: '/game-providers' },
  { id: 'login', label: 'Login', icon: 'login', route: '/game-providers', emphasized: true },
  { id: 'help', label: 'Help', icon: 'headset', route: '/game-providers' },
  { id: 'me', label: 'Me', icon: 'user', route: '/game-providers' }
]

export const quickActions = [
  { id: 'withdrawal', label: 'Withdrawal', icon: 'withdraw' },
  { id: 'transfer', label: 'Transfer', icon: 'transfer' },
  { id: 'language', label: 'Language', icon: 'language' }
]
