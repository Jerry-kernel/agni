// ─── Animal Master Data ────────────────────────────────────────────────────────
// Single source of truth for all animal reference data used across the app.
// When API is ready, replace these with API calls in useAnimalMaster hook.

export const SPECIES_MASTER = [
  { id: "dog",     label: "Dog",     emoji: "🐕", active: true  },
  { id: "cat",     label: "Cat",     emoji: "🐈", active: true  },
  { id: "bird",    label: "Bird",    emoji: "🦜", active: true  },
  { id: "rabbit",  label: "Rabbit",  emoji: "🐇", active: true  },
  { id: "hamster", label: "Hamster", emoji: "🐹", active: true  },
  { id: "reptile", label: "Reptile", emoji: "🦎", active: true  },
  { id: "fish",    label: "Fish",    emoji: "🐟", active: true  },
  { id: "other",   label: "Other",   emoji: "🐾", active: true  },
];

export const BREEDS_MASTER = {
  dog: [
    "Labrador Retriever", "German Shepherd", "Golden Retriever",
    "Beagle", "Poodle", "Bulldog", "Rottweiler", "Doberman",
    "Siberian Husky", "Shih Tzu", "Pomeranian", "Dachshund",
    "Great Dane", "Indian Pariah", "Cocker Spaniel", "Border Collie",
    "Boxer", "Maltese", "Chihuahua", "Mixed / Other",
  ],
  cat: [
    "Persian", "Siamese", "Maine Coon", "British Shorthair",
    "Ragdoll", "Bengal", "Scottish Fold", "Abyssinian",
    "Russian Blue", "Sphynx", "Burmese", "Indian Domestic",
    "Turkish Angora", "Mixed / Other",
  ],
  bird: [
    "African Grey", "Budgerigar (Budgie)", "Cockatiel", "Cockatoo",
    "Macaw", "Lovebird", "Indian Ringneck", "Sun Conure",
    "Eclectus", "Amazon Parrot", "Finch", "Canary",
    "Myna", "Mixed / Other",
  ],
  rabbit: [
    "Holland Lop", "Netherland Dwarf", "Mini Rex", "Flemish Giant",
    "Dutch", "Angora", "Lionhead", "Rex",
    "New Zealand White", "Mixed / Other",
  ],
  hamster: [
    "Syrian (Golden)", "Dwarf Campbell", "Dwarf Winter White",
    "Roborovski", "Chinese", "Mixed / Other",
  ],
  reptile: [
    "Bearded Dragon", "Leopard Gecko", "Ball Python", "Corn Snake",
    "Blue-Tongued Skink", "Chameleon", "Red-Eared Slider (Turtle)",
    "Tortoise", "Iguana", "Monitor Lizard", "Mixed / Other",
  ],
  fish: [
    "Goldfish", "Betta", "Guppy", "Koi", "Oscar",
    "Cichlid", "Angelfish", "Discus", "Clownfish",
    "Arowana", "Mixed / Other",
  ],
  other: ["Mixed / Other"],
};

export const COAT_COLORS_MASTER = [
  "Black", "White", "Brown", "Golden", "Cream",
  "Grey", "Silver", "Red", "Orange", "Tan",
  "Fawn", "Chocolate", "Brindle", "Merle",
  "Tricolor", "Black & White", "Black & Tan",
  "Brown & White", "Cream & Brown", "Spotted",
  "Tabby", "Calico", "Tortoiseshell", "Solid", "Other",
];

export const BLOOD_GROUPS_MASTER = {
  dog:     ["DEA 1.1+", "DEA 1.1−", "DEA 3", "DEA 4", "DEA 5", "DEA 7", "Unknown"],
  cat:     ["Type A", "Type B", "Type AB", "Unknown"],
  rabbit:  ["Unknown"],
  bird:    ["Unknown"],
  hamster: ["Unknown"],
  reptile: ["Unknown"],
  fish:    ["Unknown"],
  other:   ["Unknown"],
};

export const MARKINGS_MASTER = [
  "None", "White Blaze", "White Chest", "White Paws", "White Tip",
  "Black Mask", "Saddle Patch", "Merle Pattern", "Tuxedo",
  "Spotted", "Brindle Stripes", "Dapple", "Other",
];

export const SIZE_CATEGORIES = ["Toy", "Small", "Medium", "Large", "Giant"];

export const TEMPERAMENT_OPTIONS = [
  "Calm", "Friendly", "Playful", "Shy", "Aggressive",
  "Anxious", "Independent", "Affectionate", "Alert", "Timid",
];
