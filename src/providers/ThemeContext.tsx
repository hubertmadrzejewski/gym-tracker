import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Theme {
    primary: string;
    text: string;
    background: string;
}

const themes: { light: Theme; dark: Theme } = {
    light: {
        primary: '#6200ee',
        text: '#000000',
        background: '#ffffff',
    },
    dark: {
        primary: '#292929',
        text: '#ffffff',
        background: '#333333',
    },
};

interface ThemeContextType {
    theme: Theme;
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: themes.light, 
    setThemeMode: () => {}, 
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const systemTheme = useColorScheme();
    const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');

    useEffect(() => {
        const loadThemeMode = async () => {
            const savedThemeMode = await AsyncStorage.getItem('themeMode');
            if (savedThemeMode) {
                setThemeMode(savedThemeMode as 'light' | 'dark' | 'system');
            }
        };
        loadThemeMode();
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('themeMode', themeMode);
    }, [themeMode]);

    const currentTheme = themeMode === 'system' ? themes[systemTheme || 'light'] : themes[themeMode];

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
