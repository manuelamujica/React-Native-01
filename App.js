//Importamos react para poder escribir JSX en JS
import React from 'react';

// Componentes nativos
// - SafeAreaView: evita que el contenido quede bajo el notch o barra de estado
// - ScrollView: permite hacer scroll si el contenido crece
// - StatusBar: controla el estilo/colores de la barra superior del sistema
// - StyleSheet: forma recomendada de definir estilos en React Native
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native';

// Importamos nuestra pantalla principal (la “vista” que se verá primero)
import HomeScreen from './screens/HomeScreen';

// Traemos colores desde el “tema” para no hardcodear hex en cada archivo
import { colors } from './components/theme/colors';

// Componente raíz de la app. Es lo que registra Expo para arrancar la UI.
export default function App() {
  return (
    // SafeAreaView envuelve todo para respetar las áreas seguras del dispositivo
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
                {/* Pintamos nuestra pantalla principal */}
        <HomeScreen /> 
      </ScrollView>
    </SafeAreaView>
  );
}

// Definimos estilos con StyleSheet.create
const styles = StyleSheet.create({
    // flex:1 = ocupa toda la altura. backgroundColor desde el tema
  safe: { flex: 1, backgroundColor: colors.bg },
    // Un pequeño espacio al final del scroll para que nada quede “pegado”
  container: { paddingBottom: 32 },
});
