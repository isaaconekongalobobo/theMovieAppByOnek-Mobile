import { StatusBar } from 'expo-status-bar';

import './global.css';
import LoginPage from 'components/loginPage';

export default function App() {
  return (
    <>
    <LoginPage />
      <StatusBar style="auto" />
    </>
  );
}
