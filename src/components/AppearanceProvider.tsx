import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import sky from '@/assets/backgrounds/sky.png.asset.json';
import gold from '@/assets/backgrounds/gold.png.asset.json';
import crimson from '@/assets/backgrounds/crimson.png.asset.json';
import pearl from '@/assets/backgrounds/pearl.png.asset.json';
import morning from '@/assets/backgrounds/morning.png.asset.json';
import { BACKGROUND_INTERVAL_MS, MORNING_DURATION_MS, MORNING_STORAGE_KEY, nairobiDay, nextBackground, shouldShowMorning } from '@/lib/appearance';
import { Button } from '@/components/ui';
import { Pause, Play } from 'lucide-react';

const backgrounds = [
  { name: 'Sky', theme: 'sky', url: sky.url },
  { name: 'Golden', theme: 'gold', url: gold.url },
  { name: 'Crimson', theme: 'crimson', url: crimson.url },
  { name: 'Pearl', theme: 'pearl', url: pearl.url },
];
const AppearanceContext = createContext({ index: 0, paused: false, select: (_index: number) => {}, toggle: () => {} });

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showMorning, setShowMorning] = useState(false);
  const [morningReady, setMorningReady] = useState(false);
  useEffect(() => {
    const checkDay = () => {
      try {
        if (!shouldShowMorning(localStorage.getItem(MORNING_STORAGE_KEY))) return;
        localStorage.setItem(MORNING_STORAGE_KEY, nairobiDay());
      } catch { /* Device storage may be unavailable. */ }
      setMorningReady(false);
      setShowMorning(true);
    };
    checkDay();
    const onVisible = () => { if (document.visibilityState === 'visible') checkDay(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);
  useEffect(() => {
    if (!showMorning || !morningReady) return;
    const timer = window.setTimeout(() => setShowMorning(false), MORNING_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [showMorning, morningReady]);
  useEffect(() => {
    if (paused || showMorning) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') setIndex(value => nextBackground(value, backgrounds.length));
    }, BACKGROUND_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, showMorning, index]);
  useEffect(() => {
    document.documentElement.dataset.appearance = backgrounds[index].theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--brand').trim());
  }, [index]);
  return (
    <AppearanceContext.Provider value={{ index, paused, select: setIndex, toggle: () => setPaused(value => !value) }}>
      <div className="floral-backdrop" aria-hidden="true">
        {backgrounds.map((background, i) => <img key={background.theme} src={background.url} alt="" className={i === index ? 'floral-frame is-visible' : 'floral-frame'} />)}
      </div>
      <div className="app-experience" inert={showMorning}>{children}</div>
      {showMorning && <div className="morning-screen" role="status" aria-label="Good morning">
        <img src={morning.url} alt="Good Morning! Be a whisper of love, a spark of joy, and a calm of peace." onLoad={() => setMorningReady(true)} onError={() => setShowMorning(false)} />
      </div>}
    </AppearanceContext.Provider>
  );
}

export function AppearanceControls() {
  const { index, paused, select, toggle } = useContext(AppearanceContext);
  return <div className="appearance-controls" aria-label="Background theme">
    {backgrounds.map((background, i) => <Button key={background.theme} variant="ghost" className={`theme-swatch swatch-${background.theme} ${index === i ? 'is-selected' : ''}`} aria-label={`${background.name} background`} aria-pressed={index === i} title={`${background.name} background`} onClick={() => select(i)}><span /></Button>)}
    <Button variant="ghost" className="theme-pause" onClick={toggle} aria-label={paused ? 'Resume backgrounds' : 'Pause backgrounds'} title={paused ? 'Resume backgrounds' : 'Pause backgrounds'}>{paused ? <Play size={13} /> : <Pause size={13} />}</Button>
  </div>;
}