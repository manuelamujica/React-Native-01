// React para JSX
import React from 'react';
// View: contenedor; TextInput: campo de texto nativo; StyleSheet: declarar estilos
import { View, TextInput, StyleSheet } from 'react-native';
// Nuestro Text tipográfico con variantes (h1, body, caption…)
import Text from './Text';
// Tokens del tema (colores y espaciados coherentes en toda la app)
import { colors } from './theme/colors';
import { spacing } from './theme/spacing';

// Componente Input reutilizable
export default function Input({
    label,   // (opcional) texto pequeño arriba del campo ("Email", "Nombre")
    helper,  // (opcional) ayuda/descr. debajo del campo (se muestra si NO hay error)
    error,   // (opcional) mensaje de error; si existe, desplaza al helper
    style,   // (opcional) estilos extra para el contenedor (View externo)
    ...props // resto de props van directo al TextInput (value, onChangeText, placeholder, etc.)
}) {
    return (
        // Contenedor del input completo (label + campo + helper/error)
        <View style={style}>
            {/* Label arriba (solo si viene) */}
            {label ? <Text variant="caption" style={styles.label}>{label}</Text> : null}

            {/* Campo de texto.
        - placeholderTextColor: color del placeholder desde el tema
        - style: array que combina estilo base + borde rojo si hay error
         - {...props}: pasa value, onChangeText, keyboardType, secureTextEntry, etc. */}
            <TextInput
                placeholderTextColor={colors.textMuted}
                style={[styles.input, error && styles.errorBorder]}
                {...props}
            />

            {/* Pie del campo:
        - Si hay error, muéstralo en rojo
        - Si NO hay error pero hay helper, muéstralo en gris
         - Si no hay ninguno, no renderiza nada */}
            {error
                ? <Text variant="caption" style={styles.error}>{error}</Text>
                : helper
                    ? <Text variant="caption" style={styles.helper}>{helper}</Text>
                    : null}
        </View>
    );
}

// Estilos base del componente
const styles = StyleSheet.create({
    // Espacio debajo del label
    label: { marginBottom: 6 },

    // Caja del input: altura, padding horizontal, borde y fondo
    input: {
        height: 46,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: '#FFF',
    },

    // Texto de ayuda (gris)
    helper: { marginTop: 6, color: colors.textMuted },

    // Texto de error (rojo y un poco más marcado)
    error: { marginTop: 6, color: colors.danger, fontWeight: '600' },

    // Borde rojo cuando hay error
    errorBorder: { borderColor: colors.danger },
});
