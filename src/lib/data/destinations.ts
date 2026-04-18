// src/lib/data/destinations.ts
// Static destination data — replace image URLs with Vercel Blob assets before production

export type DestinationCategory = 'wildlife' | 'heritage' | 'adventure' | 'nature' | 'water'

export interface Destination {
  slug: string
  name: string
  tagline: string
  region: string
  province: string
  categories: DestinationCategory[]
  image: string
  imageAlt: string
  description: string
  highlights: string[]
  bestTime: string
  duration: string       // recommended stay
  difficulty: 'easy' | 'moderate' | 'challenging'
  priceRange: '$' | '$$' | '$$$'
  fromPriceUsd: number   // starting price per person in USD
  coordinates: [number, number]  // [lat, lng]
  tags: string[]
  featured: boolean
}

export const destinations: Destination[] = [
  {
    slug: 'victoria-falls',
    name: 'Victoria Falls',
    tagline: 'The Smoke That Thunders',
    region: 'Victoria Falls',
    province: 'Matabeleland North',
    categories: ['adventure', 'nature', 'water'],
    image: '/vicfalls.jpg',
    imageAlt: 'Victoria Falls waterfall viewed from the Zimbabwe side, with mist rising',
    description:
      'One of the Seven Natural Wonders of the World and a UNESCO World Heritage Site. Over a mile wide and 108 metres high, Victoria Falls is roughly twice the height of Niagara Falls. The Kololo people named it Mosi-oa-Tunya — "The Smoke That Thunders."',
    highlights: [
      "Devil's Pool swimming on the edge of the falls",
      'White-water rafting on the Zambezi',
      'Sunset cruises and wildlife game drives',
      'Bungee jumping from the Victoria Falls Bridge',
      'Helicopter "Flight of Angels" over the falls',
    ],
    bestTime: 'Feb–May for peak flow · Jun–Oct for clear views & activities',
    duration: '2–4 days',
    difficulty: 'easy',
    priceRange: '$$$',
    fromPriceUsd: 85,
    coordinates: [-17.9243, 25.8567],
    tags: ['UNESCO', 'Waterfall', 'Adventure', 'Rafting', 'Wildlife'],
    featured: true,
  },
  {
    slug: 'hwange-national-park',
    name: 'Hwange National Park',
    tagline: "Africa's Greatest Elephant Sanctuary",
    region: 'Hwange',
    province: 'Matabeleland North',
    categories: ['wildlife'],
    image: '/hwange%20national%20park.jpg',
    imageAlt: 'Elephants drinking at a waterhole in Hwange National Park',
    description:
      "Zimbabwe's largest national park at 14,600 km², established in 1928. Home to the world's largest elephant population alongside lions, leopards, wild dogs, cheetah, and nearly 500 bird species. The dry season reveals dramatic wildlife congregations around artificial waterholes.",
    highlights: [
      'World-record elephant herds at seasonal waterholes',
      'Endangered African wild dog sightings',
      'Night game drives by spotlight',
      'Walking safaris with armed guides',
      '480+ recorded bird species',
    ],
    bestTime: 'Jun–Oct (dry season) for wildlife concentration',
    duration: '3–5 days',
    difficulty: 'easy',
    priceRange: '$$',
    fromPriceUsd: 65,
    coordinates: [-19.0000, 26.4833],
    tags: ['Big Five', 'Safari', 'Elephants', 'Birds', 'Wild Dogs'],
    featured: true,
  },
  {
    slug: 'great-zimbabwe',
    name: 'Great Zimbabwe Ruins',
    tagline: 'Kingdom of Stone',
    region: 'Masvingo',
    province: 'Masvingo Province',
    categories: ['heritage'],
    image: '/great%20zimbabwe.jpg',
    imageAlt: 'The conical tower inside the Great Enclosure at Great Zimbabwe ruins',
    description:
      'A UNESCO World Heritage Site built between the 11th and 15th centuries by the Shona civilisation. The largest single ancient structure in sub-Saharan Africa, with the Great Enclosure\'s walls reaching 11 metres high. At its peak the city housed over 10,000 inhabitants and traded with China and Southeast Asia.',
    highlights: [
      'The Great Enclosure — most impressive stone structure south of the Sahara',
      'The Hill Complex offering panoramic views',
      'On-site museum with gold artefacts and soapstone birds',
      'Guided cultural tours explaining Shona history',
      '30 km from Masvingo town',
    ],
    bestTime: 'Apr–Oct (dry, cooler season)',
    duration: '1–2 days',
    difficulty: 'easy',
    priceRange: '$',
    fromPriceUsd: 15,
    coordinates: [-20.2744, 30.9333],
    tags: ['UNESCO', 'History', 'Archaeology', 'Culture', 'Shona'],
    featured: true,
  },
  {
    slug: 'lake-kariba',
    name: 'Lake Kariba',
    tagline: 'The Inland Sea',
    region: 'Kariba',
    province: 'Mashonaland West',
    categories: ['water', 'wildlife', 'nature'],
    image: '/kariba.jpg',
    imageAlt: 'Dead trees rising from Lake Kariba at sunset with dramatic orange sky',
    description:
      'Created between 1955–1959, Lake Kariba stretches 220 km along the Zimbabwe–Zambia border and was once the world\'s largest man-made reservoir. Famous for tigerfish, spectacular sunsets, houseboat living, and abundant wildlife along its shores including elephants, buffalo, and African fish eagles.',
    highlights: [
      'Houseboat holidays with sundowner cruises',
      'Tigerfish angling — world-famous sport fishing',
      'Matusadona National Park game drives',
      'Birdwatching: African fish eagle, yellow-billed stork',
      'Iconic drowned forest photography at sunset',
    ],
    bestTime: 'Apr–Oct for fishing & wildlife; Nov–Mar for birdwatching',
    duration: '2–5 days',
    difficulty: 'easy',
    priceRange: '$$',
    fromPriceUsd: 45,
    coordinates: [-16.5167, 28.8000],
    tags: ['Fishing', 'Houseboat', 'Sunset', 'Wildlife', 'Birdwatching'],
    featured: true,
  },
  {
    slug: 'matobo-hills',
    name: 'Matobo Hills',
    tagline: 'Ancient Spirits, Balancing Rocks',
    region: 'Bulawayo',
    province: 'Matabeleland South',
    categories: ['heritage', 'wildlife', 'nature'],
    image: '/matobo.jpg',
    imageAlt: 'Sunrise over the dramatic balancing granite boulders of Matobo Hills',
    description:
      'A UNESCO World Heritage Site 35 km south of Bulawayo, formed over 2 billion years ago. Features iconic balancing granite boulders, the world\'s densest leopard population, highest concentration of breeding black eagles, and 700 San rock art sites with paintings dating back 13,000 years.',
    highlights: [
      'White rhino tracking on foot',
      "Cecil Rhodes' grave at World's View",
      '700+ San rock art sites',
      'World\'s highest density of breeding black eagles',
      'Scenic walks among ancient granite kopjes',
    ],
    bestTime: 'May–Oct for rhino tracking and walking',
    duration: '2–3 days',
    difficulty: 'moderate',
    priceRange: '$$',
    fromPriceUsd: 35,
    coordinates: [-20.5500, 28.4833],
    tags: ['UNESCO', 'Rock Art', 'Rhino', 'Leopard', 'Hiking'],
    featured: false,
  },
  {
    slug: 'eastern-highlands',
    name: 'Eastern Highlands',
    tagline: 'Mountains, Tea & Misty Waterfalls',
    region: 'Nyanga / Chimanimani / Vumba',
    province: 'Manicaland',
    categories: ['nature', 'adventure'],
    image: '/eastern%20highlands.jpg',
    imageAlt: 'Rolling green mountains and valleys of Nyanga National Park in the Eastern Highlands',
    description:
      'A 300 km mountainous spine running along Zimbabwe\'s eastern border with Mozambique. Home to Mount Nyangani (Zimbabwe\'s highest peak at 2,592 m), Mutarazi Falls (762 m — Zimbabwe\'s highest waterfall), fragrant tea plantations, apple orchards, and the cool mist of the Vumba Botanical Gardens.',
    highlights: [
      'Mutarazi Falls — Zimbabwe\'s highest waterfall',
      'Mount Nyangani summit hike (2,592 m)',
      'World\'s View at Nyanga — panoramic Zimbabwe-Mozambique views',
      'Turaco Trail multi-day mountain hike',
      'Aberfoyle Tea Estate tours',
    ],
    bestTime: 'Apr–Sep (cooler, drier — best for hiking)',
    duration: '3–5 days',
    difficulty: 'moderate',
    priceRange: '$$',
    fromPriceUsd: 30,
    coordinates: [-18.2167, 32.7500],
    tags: ['Hiking', 'Mountains', 'Tea', 'Waterfalls', 'Nature'],
    featured: false,
  },
  {
    slug: 'mana-pools',
    name: 'Mana Pools',
    tagline: 'Walk with Elephants on the Zambezi',
    region: 'Mana Pools',
    province: 'Mashonaland West',
    categories: ['wildlife', 'adventure', 'nature'],
    image: '/mana%20pools.jpg',
    imageAlt: 'The Zambezi River at Mana Pools with lush floodplain vegetation',
    description:
      'A UNESCO World Heritage Site along the Zambezi River, named after four seasonal pools ("mana" means four in Shona). One of Africa\'s last truly wild places where walking and canoe safaris are the primary activities. Contains Zimbabwe\'s largest hippo and crocodile populations alongside elephant, lion, and 380 bird species.',
    highlights: [
      'Unmissable walking safaris — no fences, pure wilderness',
      'Canoe safaris along the Zambezi River',
      'Standing elephants — unique behaviour of Mana\'s elephants feeding on albida pods',
      "Africa's best wild dog viewing",
      'Incredible stargazing away from all light pollution',
    ],
    bestTime: 'May–Oct (dry season) — park closes Nov–Apr',
    duration: '3–5 days',
    difficulty: 'challenging',
    priceRange: '$$$',
    fromPriceUsd: 120,
    coordinates: [-15.9167, 29.3833],
    tags: ['Walking Safari', 'Canoe', 'UNESCO', 'Elephants', 'Wild Dogs'],
    featured: true,
  },
  {
    slug: 'gonarezhou',
    name: 'Gonarezhou',
    tagline: 'Place of Elephants',
    region: 'Chiredzi',
    province: 'Masvingo Province',
    categories: ['wildlife', 'nature', 'adventure'],
    image: '/gonarezhou.jpg',
    imageAlt: 'Buffalo herd at a river bend in Gonarezhou National Park',
    description:
      'Zimbabwe\'s second-largest national park (5,053 km²) in the remote southeast. Its name means "Place of Elephants" in Shona — home to 11,500+ elephants. Features the dramatic 180-metre Chilojo Cliffs along the Runde River and forms part of the Great Limpopo Transfrontier Park spanning Zimbabwe, Mozambique, and South Africa.',
    highlights: [
      'Dramatic Chilojo Cliffs rising from the Runde River',
      '11,500+ elephants — highest density in Africa',
      'Remote, uncrowded wilderness experience',
      'Part of the vast Great Limpopo Transfrontier Park',
      '450+ bird species including the Pel\'s fishing owl',
    ],
    bestTime: 'Jun–Oct for wildlife and road access',
    duration: '3–4 days',
    difficulty: 'moderate',
    priceRange: '$$',
    fromPriceUsd: 55,
    coordinates: [-21.5000, 31.7667],
    tags: ['Elephants', 'Remote', 'Cliffs', 'Transfrontier', 'Birds'],
    featured: false,
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

export function getFeaturedDestinations(): Destination[] {
  return destinations.filter((d) => d.featured)
}

export function getDestinationsByCategory(category: DestinationCategory): Destination[] {
  return destinations.filter((d) => d.categories.includes(category))
}
