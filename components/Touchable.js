// Importamos React para poder escribir JSX (etiquetas tipo <Algo /> en JS)
import React from 'react';

// Traemos de React Native:
// - TouchableOpacity: un “área tocable” que baja la opacidad cuando se presiona
// - StyleSheet: forma recomendada de definir estilos (mejor perf y validación)
import { TouchableOpacity, StyleSheet } from 'react-native';


// Componente principal (función). Lo exportamos como "default" para importarlo fácil.
export default function Touchable({
    // "children": lo que va adentro del componente (texto, íconos, vistas...)
    children,

    // "style": estilos opcionales que te pasen desde afuera
    style,

    // "disabled": si está true, el toque se deshabilita y cambiamos el estilo (menos opacidad)
    disabled,

    // "hitSlop": aumenta el área en la que se puede tocar sin cambiar el tamaño visual
    // Le damos un valor por defecto (10 px en cada lado)
    hitSlop = { top: 10, bottom: 10, left: 10, right: 10 },

    // "activeOpacity": cuánta opacidad aplica al presionar (0 = transparente, 1 = sin cambio).
    // Por defecto 0.7 para ver un feedback visual claro.
    activeOpacity = 0.7,

    // "...props": captura el resto de props (onPress, onLongPress, testID, etc.)
    ...props
}) {
    
    // Render: lo que se va a dibujar en pantalla
    return (
        <TouchableOpacity
            // Ampliamos el área táctil sin cambiar el tamaño visible
            hitSlop={hitSlop}

            // Opacidad cuando se presiona
            activeOpacity={activeOpacity}

            // Si disabled es true, no responde a toques
            disabled={disabled}

            // style acepta arrays: combinamos el estilo que venga de afuera
            // con un estilo "disabled" condicional si está desactivado.
            // Nota: "disabled && styles.disabled" devuelve styles.disabled SOLO si disabled === true.
            style={[style, disabled && styles.disabled]}

            // Pasamos todas las otras props que nos hayan mandado (onPress, etc.)
            {...props}
        >
            {/* Todo lo que envuelvas dentro de <Touchable> ... </Touchable> */}
            {children}
        </TouchableOpacity>
    );
}

// Definimos estilos con StyleSheet (mejor perf y hints)
const styles = StyleSheet.create({
    // Estilo que se aplica cuando está deshabilitado (se ve más “apagado”)
    disabled: {
        opacity: 0.5,
    },
});
