// React para JSX y useState para manejar estado local (memoria dentro del componente)
import React, { useState } from 'react';

// View: contenedor; StyleSheet: estilos; Alert: alerta nativa (Android/iOS)
import { View, StyleSheet, Alert } from 'react-native';

// Nuestros componentes reutilizables (hechos por mi)
import Text from '../components/Text';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

// Traemos “tokens” de espaciado desde el tema
import { spacing } from '../components/theme/spacing';

// Es la pantalla principal que se muestra dentro de App.js
export default function HomeScreen() {
    
    // name guarda lo que el usuario escribe; setName lo actualiza y re-renderiza la UI
    const [name, setName] = useState('');
    
    // loading prende/apaga el “spinner” en el botón y evita toques repetidos
    const [loading, setLoading] = useState(false);

    // Handler para saludar. Si no hay nombre, saluda a "Mundo".
    const handleGreet = () => {
        Alert.alert('Hola 👋', `¡Hola ${name || 'Mundo'}!`);
    };

    // Simulamos un “enviar/guardar”: prendemos loading, esperamos 1s y avisamos
    const fakeSubmit = async () => {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        Alert.alert('Listo', 'Acción simulada completa.');
    };

    // Lo que se pinta en pantalla
    return (
        // View principal con padding consistente desde el tema
        <View style={styles.wrap}>
            
            {/* Título grande usando nuestra variante tipográfica */}
            <Text variant="h1" style={styles.title}>¡Practica 1!</Text>

            <Card style={{ marginTop: spacing.lg }}>
                <Text variant="h3" style={{ marginBottom: spacing.md }}>
                    Componentes Reutilizables
                </Text>

                {/* Input controlado: value lee del estado; onChangeText lo actualiza */}
                <Input
                    label="Tu nombre"
                    placeholder="Escribe aquí"
                    value={name}
                    onChangeText={setName}
                    helper="Ejemplo de Input con helper"
                    style={{ marginBottom: spacing.md }}
                />

                {/* Botón primario: el título se adapta si hay nombre o no */}
                <Button
                    title={name ? `Saludar a ${name}` : 'Saludar'}
                    onPress={handleGreet}
                    style={{ marginBottom: spacing.md }}
                />

                {/* Botón secundario: misma base, otro color/estilo desde el tema */}
                <Button
                    title="Botón Secundario"
                    variant="secondary"
                    onPress={() => { }}
                    style={{ marginBottom: spacing.md }}
                />

                {/* Botón con estado de carga: muestra spinner mientras "trabaja" */}  
                <Button
                    title="Acción con loading"
                    loading={loading}                       // cuando true, aparece ActivityIndicator
                    onPress={fakeSubmit}                    // simula enviar y luego alerta “Listo”
                    style={{ marginBottom: spacing.md }}
                />

                {/* Botón tipo enlace: sin fondo/borde, usa color 'primary' para el texto */}
                <Button title="Enlace" variant="link" onPress={() => { }} />
            </Card>

            {/* Otra Card, pero esta vez "tocable" porque recibe onPress */}
            <Card style={{ marginTop: spacing.lg }} onPress={() => Alert.alert('Card', 'Card presionada')}>
                <Text>Esta Card es presionable gracias a la prop <Text style={{ fontWeight: '700' }}>onPress</Text>.</Text>
            </Card>
        </View>
    );
}

// Estilos locales de la pantalla (usando tokens de spacing del tema)
const styles = StyleSheet.create({
    wrap: { padding: spacing.xl },
    title: { marginTop: spacing.lg },
});
