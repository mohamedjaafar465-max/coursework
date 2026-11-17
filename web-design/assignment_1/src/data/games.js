/**
 * PixelHub game catalogue data.
 *
 * - Cover images are official Steam library capsules served from Steam's public
 *   CDN (cdn.cloudflare.steamstatic.com). Every URL below was verified to
 *   return HTTP 200 image/jpeg.
 * - All prices are SAMPLE prices in RMB (¥) for layout demonstration only.
 *   They are not official prices and the "discounts" are not real offers —
 *   the page shows a disclaimer next to the prices.
 */

import { ref } from 'vue'

/** Shared search term so the hero search bar can drive the catalogue. */
export const searchTerm = ref('')

/** Active category filter shared between the nav/pills and the catalogue. */
export const activeCategory = ref('All')

/** Format a number as RMB, e.g. 199 -> "¥199.00" */
export function formatPrice(value) {
  return `¥${Number(value).toFixed(2)}`
}

/** Percentage discount between original and current price, e.g. -50%. */
export function discountPercent(game) {
  if (!game.originalPrice) return 0
  return Math.round((1 - game.price / game.originalPrice) * 100)
}

/**
 * Full catalogue (18 games). Each entry:
 * id, title, genre, description, price (sample ¥), originalPrice (optional, sample ¥),
 * cover (verified working image URL), rating (0-5, sample).
 */
export const games = [
  {
    id: 'gta-v',
    title: 'Grand Theft Auto V',
    genre: 'Action',
    description:
      'Explore Los Santos and Blaine County across three criminals in the genre-defining open world of heists, chaos and satire.',
    price: 99,
    originalPrice: 199,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900.jpg',
    rating: 4.8,
  },
  {
    id: 'rdr2',
    title: 'Red Dead Redemption 2',
    genre: 'Adventure',
    description:
      'Live the life of outlaw Arthur Morgan in a stunningly detailed Wild West epic about loyalty, freedom and the death of an era.',
    price: 139,
    originalPrice: 279,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/library_600x900.jpg',
    rating: 4.9,
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    genre: 'RPG',
    description:
      'Become a cyber-enhanced mercenary chasing a one-of-a-kind implant in the dazzling, dangerous open world of Night City.',
    price: 149,
    originalPrice: 298,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg',
    rating: 4.5,
  },
  {
    id: 'elden-ring',
    title: 'ELDEN RING',
    genre: 'RPG',
    description:
      'FromSoftware’s vast fantasy action-RPG — carve your path through the Lands Between and claim the title of Elden Lord.',
    price: 179,
    originalPrice: 298,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_600x900.jpg',
    rating: 4.9,
  },
  {
    id: 'ea-fc-25',
    title: 'EA SPORTS FC 25',
    genre: 'Sports',
    description:
      'The world’s game, powered by Frostbite — authentic club football with Ultimate Team, Career Mode and 19,000+ players.',
    price: 89,
    originalPrice: 298,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900.jpg',
    rating: 4.0,
  },
  {
    id: 'forza-horizon-5',
    title: 'Forza Horizon 5',
    genre: 'Racing',
    description:
      'Open-world racing set in the vibrant landscapes of Mexico — hundreds of cars, wild weather and endless festival fun.',
    price: 124,
    originalPrice: 248,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/library_600x900.jpg',
    rating: 4.7,
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'God of War Ragnarök',
    genre: 'Action',
    description:
      'Kratos and Atreus journey through the Nine Realms as the end of days approaches in this cinematic action epic.',
    price: 239,
    originalPrice: 398,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2322010/library_600x900.jpg',
    rating: 4.8,
  },
  {
    id: 'hogwarts-legacy',
    title: 'Hogwarts Legacy',
    genre: 'Adventure',
    description:
      'An open-world action RPG set in the 1800s wizarding world — learn spells, tame beasts and shape your own magical legacy.',
    price: 149,
    originalPrice: 298,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900.jpg',
    rating: 4.4,
  },
  {
    id: 'witcher-3',
    title: 'The Witcher 3: Wild Hunt',
    genre: 'RPG',
    description:
      'Geralt of Rivia hunts the child of prophecy in the benchmark open-world RPG, packed with unforgettable quests.',
    price: 38,
    originalPrice: 127,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/library_600x900.jpg',
    rating: 5.0,
  },
  {
    id: 'terraria',
    title: 'Terraria',
    genre: 'Adventure',
    description:
      'Dig, fight, explore and build in a procedurally generated 2D sandbox world with thousands of items and bosses.',
    price: 36,
    originalPrice: 72,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/library_600x900.jpg',
    rating: 4.8,
  },
  {
    id: 'resident-evil-4',
    title: 'Resident Evil 4',
    genre: 'Action',
    description:
      'The 2023 remake of the survival-horror classic — rescue the president’s daughter from a sinister Spanish cult.',
    price: 208,
    originalPrice: 348,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/library_600x900.jpg',
    rating: 4.7,
  },
  {
    id: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    genre: 'Action',
    description:
      'A landmark Chinese action RPG inspired by Journey to the West — wield the staff of the Destined One against mythic foes.',
    price: 268,
    originalPrice: 268,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900.jpg',
    rating: 4.6,
  },
  {
    id: 'baldurs-gate-3',
    title: "Baldur's Gate 3",
    genre: 'RPG',
    description:
      'Gather your party in the award-winning D&D epic — deep choices, turn-based tactics and a living reactive world.',
    price: 238,
    originalPrice: 298,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/library_600x900.jpg',
    rating: 4.9,
  },
  {
    id: 'sekiro',
    title: 'Sekiro: Shadows Die Twice',
    genre: 'Action',
    description:
      'Take revenge in late-1500s Sengoku Japan as a shinobi with a grappling hook and unbreakable swordplay.',
    price: 134,
    originalPrice: 268,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/814380/library_600x900.jpg',
    rating: 4.7,
  },
  {
    id: 'spider-man-remastered',
    title: "Marvel's Spider-Man Remastered",
    genre: 'Action',
    description:
      'Swing across Manhattan as Peter Parker in the definitive web-slinging superhero adventure, remastered for PC.',
    price: 316,
    originalPrice: 526,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/library_600x900.jpg',
    rating: 4.6,
  },
  {
    id: 'horizon-zero-dawn',
    title: 'Horizon Zero Dawn Complete Edition',
    genre: 'Adventure',
    description:
      'Hunt towering machine creatures in a lush post-apocalyptic open world as hunter Aloy unravels an ancient mystery.',
    price: 139,
    originalPrice: 279,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/library_600x900.jpg',
    rating: 4.6,
  },
  {
    id: 'cities-skylines-2',
    title: 'Cities: Skylines II',
    genre: 'Strategy',
    description:
      'Build and manage the city of your dreams in the deepest city-builder ever — economy, traffic, weather and more.',
    price: 152,
    originalPrice: 218,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/949230/library_600x900.jpg',
    rating: 4.0,
  },
  {
    id: 'it-takes-two',
    title: 'It Takes Two',
    genre: 'Adventure',
    description:
      'The co-op adventure where Cody and May — turned into dolls — must cooperate through wildly inventive gameplay.',
    price: 99,
    originalPrice: 198,
    cover: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1426210/library_600x900.jpg',
    rating: 4.8,
  },
]

/** Filter pills for the catalogue. */
export const categoryOptions = ['All', 'Action', 'Adventure', 'RPG', 'Racing', 'Sports', 'Strategy']

/** Featured row for "Trending Games". */
export const trendingGames = [games.find((g) => g.id === 'elden-ring'), games.find((g) => g.id === 'black-myth-wukong'), games.find((g) => g.id === 'gta-v'), games.find((g) => g.id === 'rdr2')]

/** Featured row for "Most Played". */
export const mostPlayedGames = [games.find((g) => g.id === 'witcher-3'), games.find((g) => g.id === 'cyberpunk-2077'), games.find((g) => g.id === 'forza-horizon-5'), games.find((g) => g.id === 'spider-man-remastered'), games.find((g) => g.id === 'god-of-war-ragnarok'), games.find((g) => g.id === 'resident-evil-4')]

/** "Top Categories" cards — a representative cover per category. */
export const topCategories = [
  { id: 1, name: 'Action', game: games.find((g) => g.id === 'god-of-war-ragnarok') },
  { id: 2, name: 'Adventure', game: games.find((g) => g.id === 'rdr2') },
  { id: 3, name: 'RPG', game: games.find((g) => g.id === 'elden-ring') },
  { id: 4, name: 'Racing', game: games.find((g) => g.id === 'forza-horizon-5') },
  { id: 5, name: 'Sports', game: games.find((g) => g.id === 'ea-fc-25') },
]

/** Hero background photo (verified reachable). */
export const heroImage =
  'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=900&q=80'
