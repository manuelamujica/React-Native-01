// React para JSX
import React from 'react';
// ActivityIndicator: spinner nativo; StyleSheet para estilos; View contenedor
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Nuestro envoltorio táctil con defaults (activeOpacity, hitSlop, disabled…)
import Touchable from './Touchable';
// Text reutilizable con variantes (h1, body, caption…)
import Text from './Text';
// Tokens de tema
import { colors } from './theme/colors';
import { spacing } from './theme/spacing';

// Componente Button: un botón reutilizable con variantes, tamaños y slots (left/right)
export default function Button({
    title = 'Button',            // texto del botón
    variant = 'primary',         // 'primary' | 'secondary' | 'outline' | 'link' | 'danger'
    size = 'md',                 // 'sm' | 'md' | 'lg'
    loading = false,             // si true, muestra spinner y desactiva el botón
    disabled,                    // deshabilita input táctil y baja opacidad
    onPress,                     // callback al tocar
    style,                       // estilos extra para el contenedor
    textStyle,                   // estilos extra para el texto
    left = null,                 // slot a la izquierda (icono/emoji/componente)
    right = null,                // slot a la derecha
}) {
    // Calcula estilos (contenedor + texto) según variant, size y disabled
    const { container, txt } = getStyles(variant, size, disabled);

    return (
        // Touchable: centraliza comportamiento táctil. Si está disabled o loading, no responde.
        <Touchable style={[container, style]} onPress={onPress} disabled={disabled || loading}>
            {/* Fila horizontal: [left] [contenido central] [right] */}
            <View style={styles.row}>
                {/* Slot izquierdo: si NO hay left, renderizamos un "espaciador" del mismo ancho
            para que el texto quede centrado aunque sólo exista right (o viceversa) */}
                {left ? <View style={styles.side}>{left}</View> : <View style={styles.side} />}

                {/* Contenido central: spinner si loading, si no el texto del botón */}
                {loading ? <ActivityIndicator /> : <Text style={[txt, textStyle]}>{title}</Text>}

                {/* Slot derecho: mismo truco de espaciador que en left */}
                {right ? <View style={styles.side}>{right}</View> : <View style={styles.side} />}
            </View>
        </Touchable>
    );
}

/**
 * Genera estilos dinámicos según:
 * - variant (colores/borde/fondo)
 * - size (padding)
 * - disabled (opacidad general)
 */
function getStyles(variant, size, disabled) {
    // Escala de paddings por tamaño; fallback a md si envían un size inválido
    const paddings = { sm: spacing.sm, md: spacing.md, lg: spacing.lg };
    const radius = 12;

    // Base común a todos los botones
    const base = {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: paddings[size] ?? spacing.md,
        paddingHorizontal: (paddings[size] ?? spacing.md) + 6, // un pelín más ancho que alto
        borderRadius: radius,
        borderWidth: 1,
    };

    // Mapa de variantes: definimos fondo, borde y color de texto
    const variants = {
        primary: { bg: colors.primary, border: colors.primary, text: '#FFF' },
        secondary: { bg: colors.secondary, border: colors.secondary, text: '#FFF' },
        outline: { bg: 'transparent', border: colors.border, text: colors.text },
        link: { bg: 'transparent', border: 'transparent', text: colors.primary },
        danger: { bg: colors.danger, border: colors.danger, text: '#FFF' },
    };

    // Si envían una variant no contemplada, caemos en primary
    const v = variants[variant] ?? variants.primary;

    return {
        // Estilo del contenedor final (array permite “componer”)
        container: [
            base,
            {
                backgroundColor: v.bg,
                borderColor: v.border,
                opacity: disabled ? 0.6 : 1, // feedback visual de deshabilitado
            },
            // Los link no deberían tener padding ni borde
            variant === 'link' && { paddingVertical: 0, paddingHorizontal: 0, borderWidth: 0 },
            // En outline queremos un fondo blanco (sobre el que se note el borde)
            variant === 'outline' && { backgroundColor: '#FFF' },
            // Sombra ligera (iOS via shadow* | Android via elevation)
            { shadowColor: colors.shadow, shadowOpacity: 0.2, shadowRadius: 6, elevation: 1 },
        ],
        // Estilo de texto (peso + color). En link marcamos más fuerte la tipografía
        txt: [
            { fontWeight: '600', color: v.text },
            variant === 'link' && { fontWeight: '700' },
        ],
    };
}

// Estilos “atómicos” usados en el layout interno
const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center' }, // fila horizontal
    side: { width: 18, alignItems: 'center' },            // ancho fijo para alinear texto centrado
});
