import { useWindowDimensions, Platform } from 'react-native';
import { useMemo } from 'react';

// Minimum dokunma hedefi (Apple: 44pt, Material: 48dp)
export const MIN_TOUCH = 48;

// Breakpoints (genişlik)
export const BP_SM = 360;
export const BP_MD = 414;
export const BP_LG = 768;

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const isNarrow = width < BP_MD;
    const isWide = width >= BP_LG;
    // Ölçekleme: 360px referans, küçük ekranlarda biraz küçült
    const scale = Math.min(1.2, Math.max(0.85, width / 400));
    const spacing = isNarrow ? 16 : 24;
    const cardPadding = isNarrow ? 16 : 24;
    const fontSize = {
      xs: Math.round(11 * scale),
      sm: Math.round(13 * scale),
      base: Math.round(15 * scale),
      lg: Math.round(17 * scale),
      xl: Math.round(20 * scale),
      xxl: Math.round(24 * scale),
    };
    return {
      width,
      height,
      isNarrow,
      isWide,
      scale,
      spacing,
      cardPadding,
      fontSize,
      minTouch: MIN_TOUCH,
    };
  }, [width, height]);
}
