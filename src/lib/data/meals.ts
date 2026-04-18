// src/lib/data/meals.ts

export type MealSlot = 'breakfast' | 'lunch' | 'dinner'

export type BreakfastCategoryId = 'cereals' | 'eggs' | 'bread' | 'fruits' | 'bev-breakfast'
export type MainMealCategoryId = 'starches' | 'proteins' | 'veg-salads' | 'fruits-main' | 'beverages' | 'desserts'
export type MealCategoryId = BreakfastCategoryId | MainMealCategoryId

export interface MealCategory {
  id: MealCategoryId
  label: string
  emoji: string
}

export interface FoodItem {
  id: string
  name: string
  emoji: string
  categoryId: MealCategoryId
  priceUsd: number
}

// ── Breakfast categories ──────────────────────────────────────────

export const breakfastCategories: MealCategory[] = [
  { id: 'cereals',       label: 'Cereals & Porridge', emoji: '🥣' },
  { id: 'eggs',          label: 'Eggs',               emoji: '🍳' },
  { id: 'bread',         label: 'Bread & Baked',      emoji: '🍞' },
  { id: 'fruits',        label: 'Fruits',             emoji: '🍎' },
  { id: 'bev-breakfast', label: 'Beverages',          emoji: '☕' },
]

// ── Lunch / Dinner categories (shared) ───────────────────────────

export const mainMealCategories: MealCategory[] = [
  { id: 'starches',    label: 'Starches',             emoji: '🍚' },
  { id: 'proteins',    label: 'Proteins',             emoji: '🥩' },
  { id: 'veg-salads',  label: 'Vegetables & Salads',  emoji: '🥦' },
  { id: 'fruits-main', label: 'Fruits',               emoji: '🍎' },
  { id: 'beverages',   label: 'Beverages',            emoji: '🥤' },
  { id: 'desserts',    label: 'Desserts',             emoji: '🍮' },
]

export function getCategoriesForSlot(slot: MealSlot): MealCategory[] {
  return slot === 'breakfast' ? breakfastCategories : mainMealCategories
}

// ── Food items ────────────────────────────────────────────────────

export const foodItems: FoodItem[] = [
  // ── Cereals & Porridge (breakfast) ──────────────────────────────
  { id: 'b-sadza-porridge',  name: 'Sadza Porridge',        emoji: '🥣', categoryId: 'cereals', priceUsd: 0  },
  { id: 'b-oats',            name: 'Jungle Oats',           emoji: '🌾', categoryId: 'cereals', priceUsd: 2  },
  { id: 'b-muesli',          name: 'Muesli with Milk',      emoji: '🥣', categoryId: 'cereals', priceUsd: 3  },
  { id: 'b-cornflakes',      name: 'Cornflakes',            emoji: '🌽', categoryId: 'cereals', priceUsd: 2  },
  { id: 'b-pap',             name: 'Soft Pap',              emoji: '🍚', categoryId: 'cereals', priceUsd: 1  },

  // ── Eggs (breakfast) ────────────────────────────────────────────
  { id: 'b-scrambled',       name: 'Scrambled Eggs',        emoji: '🍳', categoryId: 'eggs', priceUsd: 3  },
  { id: 'b-fried-egg',       name: 'Fried Egg',             emoji: '🍳', categoryId: 'eggs', priceUsd: 3  },
  { id: 'b-boiled-egg',      name: 'Boiled Egg',            emoji: '🥚', categoryId: 'eggs', priceUsd: 2  },
  { id: 'b-omelette',        name: 'Veggie Omelette',       emoji: '🍳', categoryId: 'eggs', priceUsd: 5  },
  { id: 'b-egg-tomato',      name: 'Egg & Tomato',          emoji: '🍅', categoryId: 'eggs', priceUsd: 4  },

  // ── Bread & Baked (breakfast) ────────────────────────────────────
  { id: 'b-toast',           name: 'Toast & Butter',        emoji: '🍞', categoryId: 'bread', priceUsd: 2  },
  { id: 'b-bread-roll',      name: 'Fresh Bread Roll',      emoji: '🥖', categoryId: 'bread', priceUsd: 2  },
  { id: 'b-scone',           name: 'Scone with Jam',        emoji: '🧁', categoryId: 'bread', priceUsd: 4  },
  { id: 'b-pancakes',        name: 'Pancakes / Flapjacks',  emoji: '🥞', categoryId: 'bread', priceUsd: 5  },
  { id: 'b-vetkoek',         name: 'Vetkoek',               emoji: '🍩', categoryId: 'bread', priceUsd: 3  },

  // ── Fruits — Breakfast ───────────────────────────────────────────
  { id: 'b-banana',          name: 'Banana',                emoji: '🍌', categoryId: 'fruits', priceUsd: 1  },
  { id: 'b-mango',           name: 'Mango',                 emoji: '🥭', categoryId: 'fruits', priceUsd: 2  },
  { id: 'b-pawpaw',          name: 'Pawpaw / Papaya',       emoji: '🍈', categoryId: 'fruits', priceUsd: 2  },
  { id: 'b-watermelon',      name: 'Watermelon',            emoji: '🍉', categoryId: 'fruits', priceUsd: 2  },
  { id: 'b-guava',           name: 'Guava',                 emoji: '🍏', categoryId: 'fruits', priceUsd: 1  },
  { id: 'b-fruit-salad',     name: 'Fresh Fruit Salad',     emoji: '🍓', categoryId: 'fruits', priceUsd: 4  },
  { id: 'b-msawu',           name: 'Msawu (wild loquat)',   emoji: '🍊', categoryId: 'fruits', priceUsd: 2  },

  // ── Beverages — Breakfast ────────────────────────────────────────
  { id: 'b-water',           name: 'Water',                 emoji: '💧', categoryId: 'bev-breakfast', priceUsd: 0  },
  { id: 'b-tea',             name: 'Tea with Milk',         emoji: '☕', categoryId: 'bev-breakfast', priceUsd: 1  },
  { id: 'b-rooibos',         name: 'Rooibos Tea',           emoji: '🍵', categoryId: 'bev-breakfast', priceUsd: 1  },
  { id: 'b-coffee',          name: 'Coffee',                emoji: '☕', categoryId: 'bev-breakfast', priceUsd: 2  },
  { id: 'b-oj',              name: 'Fresh Orange Juice',    emoji: '🍊', categoryId: 'bev-breakfast', priceUsd: 3  },
  { id: 'b-maheu',           name: 'Maheu',                 emoji: '🥛', categoryId: 'bev-breakfast', priceUsd: 2  },

  // ── Starches (lunch & dinner) ────────────────────────────────────
  { id: 'm-sadza',           name: 'Sadza',                 emoji: '🍚', categoryId: 'starches', priceUsd: 2  },
  { id: 'm-rice',            name: 'Steamed Rice',          emoji: '🍚', categoryId: 'starches', priceUsd: 3  },
  { id: 'm-pasta',           name: 'Pasta',                 emoji: '🍝', categoryId: 'starches', priceUsd: 3  },
  { id: 'm-potatoes',        name: 'Boiled Potatoes',       emoji: '🥔', categoryId: 'starches', priceUsd: 3  },
  { id: 'm-sweet-potato',    name: 'Roasted Sweet Potato',  emoji: '🍠', categoryId: 'starches', priceUsd: 3  },
  { id: 'm-bread-roll',      name: 'Bread Roll',            emoji: '🥖', categoryId: 'starches', priceUsd: 2  },
  { id: 'm-pap',             name: 'Soft Pap',              emoji: '🥣', categoryId: 'starches', priceUsd: 2  },

  // ── Proteins (lunch & dinner) ─────────────────────────────────────
  { id: 'm-chicken',         name: 'Grilled Chicken',       emoji: '🍗', categoryId: 'proteins', priceUsd: 8  },
  { id: 'm-beef-stew',       name: 'Beef Stew',             emoji: '🥘', categoryId: 'proteins', priceUsd: 10 },
  { id: 'm-nyama',           name: 'Nyama (Game Meat)',     emoji: '🦌', categoryId: 'proteins', priceUsd: 15 },
  { id: 'm-bream',           name: 'Grilled Bream / Tilapia', emoji: '🐟', categoryId: 'proteins', priceUsd: 10 },
  { id: 'm-boerewors',       name: 'Boerewors Sausage',     emoji: '🌭', categoryId: 'proteins', priceUsd: 8  },
  { id: 'm-beans',           name: 'Beans & Lentils',       emoji: '🫘', categoryId: 'proteins', priceUsd: 5  },
  { id: 'm-pork-ribs',       name: 'Pork Ribs',             emoji: '🥩', categoryId: 'proteins', priceUsd: 12 },
  { id: 'm-muriwo-nyama',    name: 'Muriwo ne Nyama',       emoji: '🍖', categoryId: 'proteins', priceUsd: 9  },
  { id: 'm-eggs-main',       name: 'Eggs (vegetarian)',     emoji: '🥚', categoryId: 'proteins', priceUsd: 4  },

  // ── Vegetables & Salads (lunch & dinner) ─────────────────────────
  { id: 'm-muriwo',          name: 'Muriwo (Rape Greens)',  emoji: '🥬', categoryId: 'veg-salads', priceUsd: 2  },
  { id: 'm-butternut',       name: 'Roasted Butternut',     emoji: '🎃', categoryId: 'veg-salads', priceUsd: 3  },
  { id: 'm-green-salad',     name: 'Green Salad',           emoji: '🥗', categoryId: 'veg-salads', priceUsd: 3  },
  { id: 'm-coleslaw',        name: 'Coleslaw',              emoji: '🥙', categoryId: 'veg-salads', priceUsd: 2  },
  { id: 'm-tomato-salad',    name: 'Tomato & Onion Salad',  emoji: '🍅', categoryId: 'veg-salads', priceUsd: 2  },
  { id: 'm-pumpkin',         name: 'Pumpkin (traditional)', emoji: '🎃', categoryId: 'veg-salads', priceUsd: 3  },
  { id: 'm-roasted-veg',     name: 'Roasted Mixed Veg',     emoji: '🥦', categoryId: 'veg-salads', priceUsd: 4  },
  { id: 'm-cucumber',        name: 'Cucumber & Tomato',     emoji: '🥒', categoryId: 'veg-salads', priceUsd: 2  },

  // ── Fruits — Lunch & Dinner ───────────────────────────────────────
  { id: 'm-banana',          name: 'Banana',                emoji: '🍌', categoryId: 'fruits-main', priceUsd: 1  },
  { id: 'm-mango-side',      name: 'Mango',                 emoji: '🥭', categoryId: 'fruits-main', priceUsd: 2  },
  { id: 'm-pawpaw-side',     name: 'Pawpaw / Papaya',       emoji: '🍈', categoryId: 'fruits-main', priceUsd: 2  },
  { id: 'm-watermelon-side', name: 'Watermelon',            emoji: '🍉', categoryId: 'fruits-main', priceUsd: 2  },
  { id: 'm-fruit-slice',     name: 'Fresh Fruit Slice',     emoji: '🍓', categoryId: 'fruits-main', priceUsd: 3  },
  { id: 'm-msawu-side',      name: 'Msawu (wild loquat)',   emoji: '🍊', categoryId: 'fruits-main', priceUsd: 2  },

  // ── Beverages (lunch & dinner) ────────────────────────────────────
  { id: 'm-water',           name: 'Water',                 emoji: '💧', categoryId: 'beverages', priceUsd: 0  },
  { id: 'm-mazoe',           name: 'Mazoe Orange Crush',    emoji: '🍊', categoryId: 'beverages', priceUsd: 2  },
  { id: 'm-juice',           name: 'Fresh Fruit Juice',     emoji: '🥤', categoryId: 'beverages', priceUsd: 3  },
  { id: 'm-soft-drink',      name: 'Soft Drink',            emoji: '🥃', categoryId: 'beverages', priceUsd: 2  },
  { id: 'm-beer',            name: 'Local Beer (Zambezi)',   emoji: '🍺', categoryId: 'beverages', priceUsd: 4  },
  { id: 'm-chibuku',         name: 'Chibuku',               emoji: '🪣', categoryId: 'beverages', priceUsd: 3  },
  { id: 'm-wine',            name: 'Wine (glass)',          emoji: '🍷', categoryId: 'beverages', priceUsd: 6  },

  // ── Desserts (lunch & dinner) ─────────────────────────────────────
  { id: 'm-fruit-salad',     name: 'Fresh Fruit Salad',     emoji: '🍓', categoryId: 'desserts', priceUsd: 4  },
  { id: 'm-malva',           name: 'Malva Pudding',         emoji: '🍮', categoryId: 'desserts', priceUsd: 5  },
  { id: 'm-ice-cream',       name: 'Ice Cream',             emoji: '🍨', categoryId: 'desserts', priceUsd: 4  },
  { id: 'm-choc-cake',       name: 'Chocolate Cake',        emoji: '🎂', categoryId: 'desserts', priceUsd: 5  },
  { id: 'm-magwinya',        name: 'Magwinya (Fat Cakes)',   emoji: '🍩', categoryId: 'desserts', priceUsd: 3  },
  { id: 'm-yoghurt',         name: 'Yoghurt',               emoji: '🥛', categoryId: 'desserts', priceUsd: 2  },
]

export function getFoodItemById(id: string): FoodItem | undefined {
  return foodItems.find((f) => f.id === id)
}

export function getItemsByCategoryId(categoryId: MealCategoryId): FoodItem[] {
  return foodItems.filter((f) => f.categoryId === categoryId)
}
