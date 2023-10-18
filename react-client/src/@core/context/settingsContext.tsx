// ** React Imports
import { createContext, useState, ReactNode, useEffect } from 'react';

// ** MUI Imports
import { Direction } from '@mui/material';

// ** ThemeConfig Import
import themeConfig from 'src/configs/themeConfig';

// ** Types Import
import { Skin, Mode, AppBar, Footer, ThemeColor, ContentWidth, VerticalNavToggle } from 'src/@core/layouts/types';

export type Settings = {
  skin: Skin;
  mode: Mode;
  appBar?: AppBar;
  footer?: Footer;
  navHidden?: boolean; // navigation menu
  appBarBlur: boolean;
  direction?: Direction;
  navCollapsed: boolean;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
  layout?: 'vertical' | 'horizontal';
  lastLayout?: 'vertical' | 'horizontal';
  verticalNavToggleType: VerticalNavToggle;
  toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

export type PageSpecificSettings = {
  skin?: Skin;
  mode?: Mode;
  appBar?: AppBar;
  footer?: Footer;
  navHidden?: boolean; // navigation menu
  appBarBlur?: boolean;
  direction?: Direction;
  navCollapsed?: boolean;
  themeColor?: ThemeColor;
  contentWidth?: ContentWidth;
  layout?: 'vertical' | 'horizontal';
  lastLayout?: 'vertical' | 'horizontal';
  verticalNavToggleType?: VerticalNavToggle;
  toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};
export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  skin: themeConfig.skin,
  footer: themeConfig.footer,
  layout: themeConfig.layout,
  lastLayout: themeConfig.layout,
  navHidden: themeConfig.navHidden,
  appBarBlur: themeConfig.appBarBlur,
  navCollapsed: themeConfig.navCollapsed,
  contentWidth: themeConfig.contentWidth,
  toastPosition: themeConfig.toastPosition,
  verticalNavToggleType: themeConfig.verticalNavToggleType,
  appBar: themeConfig.layout === 'horizontal' && themeConfig.appBar === 'hidden' ? 'fixed' : themeConfig.appBar
};

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
});

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  useEffect(() => {
    if (settings.layout === 'horizontal' && settings.mode === 'semi-dark') {
      saveSettings({ ...settings, mode: 'light' });
    }
    if (settings.layout === 'horizontal' && settings.appBar === 'hidden') {
      saveSettings({ ...settings, appBar: 'fixed' });
    }
  }, []);

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
  };

  return <SettingsContext.Provider value={{ settings, saveSettings }}>{children}</SettingsContext.Provider>;
};

export const SettingsConsumer = SettingsContext.Consumer;
