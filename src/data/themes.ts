import { Theme } from "../types";

const lightTheme: Theme = {
    name: 'light',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#ecf0f1',
    text: '#2c3e50',
};

const darkTheme: Theme = {
    name: 'dark',
    primary: '#2c3e50',
    secondary: '#27ae60',
    accent: '#e74c3c',
    background: '#34495e',
    text: '#ecf0f1',
};

export default [lightTheme, darkTheme];