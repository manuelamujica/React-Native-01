import React from 'react';
import { View, StyleSheet } from 'react-native';
import Touchable from './Touchable';           // nuestro wrapper táctil (opacidad, hitSlop, disabled…)
import { colors } from './theme/colors';       // tokens de color
import { spacing } from './theme/spacing';     // tokens de espaciado

// Componente Card
// - children: contenido interno (texto, imágenes, botones…)
// - onPress: si lo pasas, la Card se vuelve "tocable" (clickable)
// - style: estilos extra para personalizar esta Card en particular
// - padded: si true, agrega padding interno por defecto
export default function Card({ children, onPress, style, padded = true }) {
  // "content" es la vista visual de la Card (fondo, borde, sombra, padding opcional)
  const content = (
    <View
      // style acepta array: se combinan en orden; lo último puede sobreescribir lo anterior
      style={[styles.card, padded && styles.padded, style]}
    >
      {children}
    </View>
  );

  // Si viene onPress, envolvemos el contenido con Touchable y la Card completa se hace presionable
  if (onPress) return <Touchable onPress={onPress}>{content}</Touchable>;

  // Si no hay onPress, devolvemos solo el contenedor visual (no tocable)
  return content;
}

// Estilos base de la Card
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface, // "superficie": distinto del fondo general
    borderRadius: 14,                // esquinas redondeadas
    borderWidth: 1,
    borderColor: colors.border,      // borde sutil
    // Sombra (iOS) y elevación (Android)
    shadowColor: colors.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  padded: { padding: spacing.lg },   // padding interno "cómodo"
});
