# 🔍 MARDIFY

**Buscador de Cuentas en Servidores de Minecraft**

Mardify es una aplicación web moderna que permite buscar cuentas de Minecraft registradas en servidores específicos. Interfaz intuitiva, búsqueda rápida y resultados detallados con banners de servidores.

## ✨ Características

- 🔎 **Búsqueda Rápida**: Busca cuentas de Minecraft en tiempo real
- 🖼️ **Banners de Servidor**: Visualiza automáticamente el banner del servidor
- 📱 **Diseño Responsivo**: Funciona perfectamente en desktop, tablet y móvil
- 🌙 **Tema Oscuro**: Interfaz cómoda para los ojos
- ⚡ **Rendimiento Optimizado**: Construido con React y Vite
- 🔗 **Integración Hypixel**: Enlaces directos al perfil en Hypixel

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 16 o superior
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📖 Uso

1. **Buscar Usuario**: Escribe el nombre de usuario de Minecraft en el buscador
2. **Ver Resultados**: Se mostrarán todas las cuentas encontradas en la base de datos
3. **Información del Servidor**: Cada resultado incluye:
   - Nombre del usuario
   - Nombre del servidor
   - IP del servidor
   - Banner del servidor (si está disponible)
   - Fecha de entrada
   - Último visto
4. **Perfil Hypixel**: Haz clic en "Ver perfil en Hypixel" para más información

## 🏗️ Estructura del Proyecto

```
src/
├── App.jsx              # Componente principal
├── App.css              # Estilos principales
├── main.jsx             # Punto de entrada
└── components/
    ├── SearchBar.jsx    # Componente de búsqueda
    ├── ResultsList.jsx  # Lista de resultados
    ├── ResultCard.jsx   # Tarjeta individual
    └── LoadingSpinner.jsx  # Indicador de carga
```

## 🔌 API Integration

La aplicación se conecta a:
- **Base de Datos de Mardify**: `https://basededatosmardify.onrender.com/search/api/user/{usuario}`
- **Banners de Servidor**: `http://status.mclive.eu/{serverName}/{serverIP}/25565/banner.png`

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
npm run dev

# Compilación para producción
npm run build

# Vista previa de compilación
npm run preview

# Linting
npm run lint
```

## 💾 Compilación para Producción

```bash
npm run build
```

Esto generará una carpeta `dist/` lista para deployar.

---

**Mardify © 2026** - Construido con ❤️ para la comunidad de Minecraft
