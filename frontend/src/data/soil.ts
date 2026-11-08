type NutrientType = 'Nitrogen' | 'Phosphorus' | 'Potassium'
type NutrientLevel = 'Low' | 'Medium' | 'High'

interface NutrientOption {
  level: NutrientLevel;
  color: string;
}

interface NutrientInput {
  label: NutrientType;
  options: NutrientOption[];
}

const NUTRIENT_OPTIONS: NutrientInput[] = [
  {
    label: 'Nitrogen',
    options: [
      { level: 'Low', color: 'bg-[#A15C1B]' },
      { level: 'Medium', color: 'bg-[#676F2B]' },
      { level: 'High', color: 'bg-[#2C6927]' }
    ]
  },
  {
    label: 'Phosphorus',
    options: [
      { level: 'Low', color: 'bg-[#B7C2C4]' },
      { level: 'Medium', color: 'bg-[#4d649a]' },
      { level: 'High', color: 'bg-[#161B43]' }
    ]
  },
  {
    label: 'Potassium',
    options: [
      { level: 'Low', color: 'bg-[#D5D3CA]' },
      { level: 'Medium', color: 'bg-[#CDB779]' },
      { level: 'High', color: 'bg-[#B45A1D]' }
    ]
  }
]

interface PhOption {
  label: string;
  value: number;
  color: string;
}

interface PhInput {
  kit: string;
  acronym: string;
  options: PhOption[];
}

const PH_OPTIONS: PhInput[] = [
  {
    kit: 'Bromothymol Blue',
    acronym: 'BTB',
    options: [
      { label: '6.0', value: 6.0, color: 'bg-[#9E842F]' },
      { label: '6.4', value: 6.4, color: 'bg-[#726D27]' },
      { label: '6.8', value: 6.8, color: 'bg-[#1F381A]' },
      { label: '7.2', value: 7.2, color: 'bg-[#253E22]' },
      { label: '>7.2', value: 7.3, color: 'bg-[#1D3355]' }
    ]
  },
  {
    kit: 'Chlorophenol Red',
    acronym: 'CPR',
    options: [
      { label: '5.0', value: 5.0, color: 'bg-[#B67E27]' },
      { label: '5.4', value: 5.4, color: 'bg-[#852716]' },
      { label: '5.8', value: 5.8, color: 'bg-[#6D2319]' },
      { label: '6.0', value: 6.0, color: 'bg-[#592332]' }
    ]
  },
  {
    kit: 'Bromocresol Green',
    acronym: 'BCG',
    options: [
      { label: '<4.0', value: 3.9, color: 'bg-[#BD882E]' },
      { label: '4.0', value: 4.0, color: 'bg-[#40643E]' },
      { label: '4.4', value: 4.4, color: 'bg-[#325145]' },
      { label: '4.8', value: 4.8, color: 'bg-[#25284E]' },
      { label: '5.2', value: 5.2, color: 'bg-[#182047]' }
    ]
  }
]

export type {
  NutrientType,
  NutrientLevel,
  NutrientOption,
  NutrientInput,
  PhOption,
  PhInput,
}

export {
  NUTRIENT_OPTIONS,
  PH_OPTIONS,
}
