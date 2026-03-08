import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@kpss_completed_sets';

export type SetTier = 'normal' | 'zor' | 'cokZor';

export async function getCompletedSets(): Promise<Record<SetTier, string[]>> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return { normal: [], zor: [], cokZor: [] };
}

export async function markSetCompleted(tier: SetTier, year: number): Promise<void> {
  const data = await getCompletedSets();
  const id = String(year);
  if (!data[tier].includes(id)) {
    data[tier] = [...data[tier], id].sort();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

const SETS_PER_TIER = 7;

export function isTierUnlocked(tier: SetTier, completed: Record<SetTier, string[]>): boolean {
  if (tier === 'normal') return true;
  if (tier === 'zor') {
    return completed.normal.length >= SETS_PER_TIER;
  }
  if (tier === 'cokZor') {
    return completed.zor.length >= SETS_PER_TIER;
  }
  return false;
}

export function getTierLabel(tier: SetTier): string {
  return tier === 'normal' ? 'Standart' : tier === 'zor' ? 'Zor' : 'Çok Zor';
}
