import React, {
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react'

type ThemeContextProps = {
	children: React.ReactNode
}

export enum ThemeEnum {
	LIGHT = 'light',
	DARK = 'dark',
}

const defaultContext = {
	theme: ThemeEnum.LIGHT,
	toggleThemeMode: () => {},
}

const currentTheme =
	localStorage.getItem('CURRENT_THEME') === ThemeEnum.DARK ? 'dark' : 'light'
document.body.classList.add(currentTheme)

export const ThemeContext = createContext(defaultContext)

const ThemeProvider = ({ children }: ThemeContextProps) => {
	const initialTheme = () =>
		(localStorage.getItem('CURRENT_THEME') as unknown as ThemeEnum) || ThemeEnum.LIGHT

	const [theme, setTheme] = useState<ThemeEnum>(initialTheme)
	
	const toggleThemeMode = () =>
		setTheme((prevTheme) =>
			prevTheme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT
		)

	useLayoutEffect(() => {
		localStorage.setItem('CURRENT_THEME', theme)
		document.body.classList.toggle('dark', theme === ThemeEnum.DARK)
		document.body.classList.toggle('light', theme === ThemeEnum.LIGHT)
	}, [theme])

	useEffect(() => {
		document.body.classList.add(theme === ThemeEnum.DARK ? 'dark' : 'light')
	}, [])

	const value = useMemo(() => ({ theme, toggleThemeMode }), [theme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
export { ThemeProvider, useTheme }
