// Importamos React para poder escribir JSX (<Algo />)
import React from 'react';

// Renombramos el Text nativo de React Native como "RNText" para no chocar
// con nuestro propio componente "Text" (el que exportamos abajo).
// StyleSheet se usa para declarar estilos con pequeñas optimizaciones.
import { Text as RNText, StyleSheet } from 'react-native';

// Traemos los colores del tema (tokens compartidos en toda la app)
import { colors } from './theme/colors';

// Componente "Text" de la app:
// - variant: elige un estilo tipográfico predefinido (h1, h2, h3, body, caption)
// - style: permite agregar/override estilos desde el lugar donde lo uses
// - ...props: reenvía cualquier otra prop que acepte el Text nativo (numberOfLines, onPress, etc.)
export default function Text({ variant = 'body', style, ...props }) {
  return (
    // RNText es el Text nativo de React Native.
    // style={[styles[variant], style]}:
    //   - Toma el estilo base según la variante (por ej. styles.h1)
    //   - Aplica DEBAJO el estilo recibido por props para poder sobrescribir
    //     (lo último en el array gana). Si variant está mal escrita, styles[variant] es undefined
    //     y RN ignora ese item sin romper.
    <RNText style={[styles[variant], style]} {...props} />
  );
}

// Mapa de estilos para cada variante tipográfica.
// Usamos tokens de color del tema para mantener consistencia.
const styles = StyleSheet.create({
  h1:     { fontSize: 28, fontWeight: '700', color: colors.text },
  h2:     { fontSize: 22, fontWeight: '700', color: colors.text },
  h3:     { fontSize: 18, fontWeight: '600', color: colors.text },
  body:   { fontSize: 16,                  color: colors.text },
  caption:{ fontSize: 13,                  color: colors.textMuted },
});
