# Venezolario - Juego de Adivinanza de Jerga Venezolana

Un divertido juego web para aprender jerga venezolana.

## 🎯 Características

- **Juego Principal de Adivinanza**: Adivina jerga venezolana basada en pistas en español estándar
- **Sistema de Pistas Inteligente**: Proporciona pistas de múltiples niveles incluyendo primeras letras, pronunciación, oraciones de ejemplo
- **Sistema de Diccionario**: Navega y aprende todo el vocabulario con búsqueda y filtrado por categorías
- **Colección de Cartas**: Desbloquea hermosas cartas culturales para aprender sobre el trasfondo cultural detrás de las palabras
- **Estadísticas de Progreso**: Rastrea el progreso de aprendizaje y logros de colección

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 15 + React + TypeScript
- **Estilos**: Tailwind CSS
- **Almacenamiento de Datos**: Archivos CSV (versión MVP)
- **Animaciones**: Animaciones CSS + Framer Motion

## 📁 Estructura del Proyecto

```
src/
├── app/                 # Next.js App Router
│   ├── game/           # Página del juego
│   ├── dictionary/     # Página del diccionario
│   ├── cards/          # Página de colección de cartas
│   └── api/            # Rutas de API
├── components/         # Componentes reutilizables
│   ├── game/          # Componentes relacionados al juego
│   ├── dictionary/    # Componentes relacionados al diccionario
│   └── cards/         # Componentes relacionados a las cartas
├── data/              # Archivos de datos CSV
├── lib/               # Funciones utilitarias
└── types/             # Definiciones de tipos TypeScript
```

## 🛠️ Instalación y Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

3. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador

## 🎮 Cómo Jugar

1. **Iniciar Juego**: Entra a la interfaz de adivinanza de palabras
2. **Leer Pistas**: Ver vocabulario en español estándar y significados
3. **Ingresar Respuesta**: Adivina la jerga venezolana correspondiente
4. **Usar Pistas**: Usa las funciones de pista si necesitas ayuda
5. **Coleccionar Cartas**: Desbloquea cartas culturales correspondientes después de respuestas correctas
6. **Navegar Diccionario**: Ve todo el vocabulario aprendido
7. **Logros de Colección**: Revisa el progreso de colección en la página de cartas

## 📊 Gestión de Datos

La versión actual usa archivos CSV para almacenamiento de datos:
- `src/data/words.csv`: Datos de vocabulario
- `src/data/cards.csv`: Datos de cartas

Cada entrada de palabra incluye:
- Español estándar y jerga venezolana
- Pronunciación, significado, oraciones de ejemplo
- Descripción del trasfondo cultural
- Nivel de dificultad y categoría

## 🎨 Estilo de Diseño

- Usa los colores de la bandera venezolana (naranja, amarillo, rojo) como esquema de color principal
- Incorpora elementos culturales latinoamericanos y efectos de animación
- Diseño responsivo, compatible con móvil y escritorio

## 🚧 Planes Futuros

- [ ] Sistema de usuarios y guardado de progreso
- [ ] Más vocabulario y contenido de cartas
- [ ] Funcionalidad de reproducción de voz
- [ ] Modo de batalla multijugador
- [ ] Sistema de logros y tabla de clasificación

## 📝 Licencia

Este proyecto es solo para propósitos de aprendizaje e investigación. 