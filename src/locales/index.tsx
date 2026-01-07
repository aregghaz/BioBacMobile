import * as RNLocalize from 'react-native-localize';
import useLocalStore from '@/zustland/localStore';

export type AppLanguage = 'EN' | 'RU';

const RESOURCES: Record<AppLanguage, Record<string, any>> = {
  EN: require('./en.json'),
  RU: require('./ru.json'),
};

function pickLanguage(value?: string | null): AppLanguage {
  const v = (value ?? '').toUpperCase();
  if (v === 'RU' || v === 'EN') {
    return v;
  }

  const device = RNLocalize.getLocales()?.[0]?.languageCode?.toLowerCase();
  return device === 'ru' ? 'RU' : 'EN';
}

export function getLanguage(): AppLanguage {
  const stored = useLocalStore.getState().language;
  const picked = pickLanguage(stored);
  return picked;
}

export function setLanguage(language: AppLanguage) {
  useLocalStore.getState().setLanguage(language);
}

function byPath(obj: any, path: string) {
  return path
    .split('.')
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj as any);
}

export function t(
  key: string,
  vars?: Record<string, string | number | boolean | null | undefined>,
): string {
  const lang = getLanguage();
  const text =
    byPath(RESOURCES[lang], key) ??
    byPath(RESOURCES.EN, key) ??
    key;

  if (typeof text !== 'string') {
    return key;
  }
  if (!vars) {
    return text;
  }

  return text.replace(/\{\{(\w+)\}\}/g, (_, k: string) => String(vars[k] ?? ''));
}
