import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../styles/colors';

export interface Theme {
    background: string;
    componentBackground: string,
    text: string;
    surface: string;
    border: string;
    primary: string
}

interface ThemeContextType {
    theme: Theme;
    themeMode: 'light' | 'dark' | 'system';
    systemTheme: 'light' | 'dark';
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: Colors.themes.light,
    themeMode: 'system',
    systemTheme: 'light',
    setThemeMode: () => {}, 
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const systemTheme = useColorScheme() || 'light';
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

    const currentTheme = themeMode === 'system' ? Colors.themes[systemTheme] : Colors.themes[themeMode];

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, themeMode, systemTheme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
