# LegalCheck

Herramienta web de orientación jurídica inicial. Guía a una persona con un problema legal, mediante un cuestionario breve por categoría, hacia un informe que organiza su situación: qué información es relevante, qué documentación debería reunir, cuáles serían sus próximos pasos y un nivel orientativo de prioridad.

**LegalCheck brinda orientación jurídica inicial y no reemplaza el asesoramiento de un profesional matriculado.**

🔗 **Demo en vivo:** https://legalcheck-eta.vercel.app

## Qué problema resuelve

Una persona que enfrenta un problema jurídico muchas veces no sabe con precisión qué tipo de problema tiene, qué información es relevante, qué documentación debería reunir, ni si su situación puede requerir atención prioritaria. Eso genera consultas desordenadas y pérdida de tiempo, tanto para la persona como para el profesional que la atiende. LegalCheck no reemplaza esa consulta: la prepara.

## Alcance del MVP

- 8 categorías: Alquiler/vivienda, Trabajo, Familia, Consorcio, Salud, Automotor, Sucesiones y Otro.
- Cuestionario progresivo de 5 preguntas por categoría (1 descriptiva + 4 comunes), con barra de progreso y botón "Volver" que conserva las respuestas ya ingresadas.
- Motor de reglas determinista (sin IA generativa) que calcula un nivel orientativo de prioridad y arma el informe.
- Informe de "Orientación inicial": situación identificada, información relevante, checklist de documentación sugerida, próximos pasos, prioridad y recomendación profesional.
- Impresión del informe desde el navegador.
- Cero solicitud de datos personales.

Lo que **no** implementa a propósito (y por qué) está en el registro de decisiones del proyecto: sin backend, sin base de datos, sin API jurídica externa, sin IA generativa para el resultado, sin librería de generación de PDF.

## Arquitectura general

Aplicación 100% frontend, sin backend, sin base de datos y sin llamadas de red. Es una decisión deliberada: al no haber que guardar nada entre usuarios, tampoco hay datos sensibles que proteger, porque directamente no se piden.

```
React → Context/useReducer → cuestionario → motor de reglas → informe
```

La separación entre **datos** (`data/categories.js`), **lógica** (`engine/rulesEngine.js`) y **presentación** (`screens/`, `components/`) es intencional: permite probar el motor de reglas de forma aislada, sin renderizar ninguna pantalla, y garantiza que el mismo conjunto de respuestas siempre produce el mismo informe.

## Tecnologías utilizadas

| Tecnología | Por qué |
|---|---|
| React 19 | El flujo tiene varias pantallas con estado compartido y componentes reutilizables (tarjetas, preguntas, checklist). |
| Vite | Estándar actual para levantar y compilar un proyecto React liviano, sin backend. |
| JavaScript (sin TypeScript) | El alcance del MVP no justifica la capa adicional de tipado. |
| CSS plano con variables (`src/index.css`) | La superficie de estilos (5 pantallas) no justifica sumar Tailwind ni una librería de UI. |
| React Context + `useReducer` | Estado global explícito, sin librerías externas de manejo de estado. |
| `window.print()` + `@media print` | Cubre la impresión/descarga del informe sin sumar una librería de PDF. |

Dependencias de producción: únicamente `react` y `react-dom`. Dependencias de desarrollo: `vite`, `@vitejs/plugin-react`, `oxlint` (lint) y los tipos de React para el editor. Ninguna dependencia de routing, estado externo, PDF o IA.

## Estructura de carpetas

```
src/
  data/
    categories.js       → configuración de las 8 categorías (preguntas, checklist, pasos, recomendación, disclaimer)
  engine/
    rulesEngine.js       → motor de reglas: puntaje, prioridad, checklist y pasos condicionales (sin imports de React)
  state/
    AppContext.jsx        → estado global (Context + useReducer) y hooks (useAppState, useAppDispatch, useCategoriaActual)
  screens/
    Home.jsx, CategorySelection.jsx, Questionnaire.jsx, Processing.jsx, Result.jsx
  components/
    CategoryCard, ProgressBar, QuestionSingleSelect, QuestionYesNo, QuestionScale, QuestionFreeText,
    BackButton, ChecklistDocumentacion, ListaProximosPasos, PriorityBadge, DisclaimerBanner, PrimaryButton
  App.jsx                 → orquesta las pantallas según el estado
  index.css                → sistema de diseño (variables, componentes, responsive, impresión)
scripts/
  test-engine.mjs          → script de regresión del motor de reglas (sin dependencias externas)
```

## Estado global

`src/state/AppContext.jsx` define un único `reducer` con acciones explícitas para cada transición del flujo:

`COMENZAR` · `ELEGIR_CATEGORIA` · `RESPONDER` · `SIGUIENTE` · `VOLVER` · `PROCESAMIENTO_LISTO` · `NUEVA_CONSULTA`

El estado guarda: la pantalla actual, la categoría elegida, el paso del cuestionario, las respuestas dadas y el informe generado. `ELEGIR_CATEGORIA` reinicia las respuestas: si se cambia de categoría, las respuestas de la categoría anterior no se conservan (corresponden a un cuestionario distinto). `VOLVER` retrocede una pregunta sin borrar lo ya respondido; desde la primera pregunta, vuelve a la selección de categoría.

## Modelo de datos de las categorías

Cada categoría en `data/categories.js` define: `preguntaDescriptiva` (opción única, o texto libre en "Otro"), `preguntasComunes` (las mismas 4 en las 8 categorías: intimación, conflicto activo, urgencia, documentación), `checklistBase`, `pasosBase`, `infoRelevante`, `recomendacion`, `disclaimerEspecifico` y, cuando corresponde, `reglaEspecial` (Familia y Salud).

## Motor de reglas

`engine/rulesEngine.js` calcula un puntaje de 0 a 6 a partir de 4 señales, iguales en las 8 categorías:

| Señal | Puntos |
|---|---|
| Intimación / notificación formal | Sí = 2 · No = 0 |
| Conflicto activo | Sí = 1 · No = 0 |
| Urgencia percibida | Alta = 2 · Media = 1 · Baja = 0 |
| Documentación disponible | No = 1 · Sí = 0 |

**Umbrales:** 0–1 → 🟢 Baja · 2–3 → 🟡 Media · 4–6 → 🔴 Alta.

**Reglas especiales** (excepciones documentadas, no lógica oculta):
- **Familia + violencia familiar o situación de riesgo:** se ignora el puntaje y se asigna directamente Prioridad Alta.
- **Salud + posible mala praxis:** se suma 1 punto adicional al puntaje antes de aplicar los umbrales.

El motor no realiza una evaluación jurídica definitiva. Nunca afirma que una conducta es legal o ilegal, que la persona tiene un derecho concreto, ni garantiza un resultado. Su función es organizar la información ingresada, sugerir documentación, señalar posibles áreas de atención y recomendar una consulta profesional cuando corresponde. El nivel de prioridad se muestra siempre como "Nivel orientativo de prioridad", acompañado del texto "Este nivel es orientativo y no constituye una evaluación jurídica."

Checklist y próximos pasos usan reglas condicionales comunes a las 8 categorías: el ítem/paso de notificación se agrega solo si hubo intimación, y el paso final cambia según la prioridad calculada ("a la brevedad" en Alta, "cuando puedas" en Media/Baja).

## Flujo completo de usuario

1. Ingresar a LegalCheck (Home).
2. Presionar "Comenzar".
3. Elegir una de las 8 categorías.
4. Responder las 5 preguntas (barra de progreso "Paso X de 5"; "Volver" disponible en todo momento).
5. Usar "Volver" si necesita corregir una respuesta anterior — no se pierde lo ya respondido.
6. Ver la pantalla breve de procesamiento ("Analizando tu situación...").
7. Recibir el informe de "Orientación inicial".
8. Revisar prioridad, documentación sugerida y próximos pasos.
9. Imprimir el informe si lo necesita (botón "Imprimir informe").
10. Iniciar una nueva consulta ("Realizar otra consulta"), que vuelve a Home y limpia por completo el estado.

LegalCheck no reemplaza el asesoramiento profesional ni emite una conclusión jurídica definitiva: esto se aclara en Home, en cada informe (disclaimer general + específico de la categoría) y en el texto que acompaña al nivel de prioridad.

## Sistema de impresión

`window.print()` sobre la pantalla de resultado, con estilos `@media print` en `src/index.css`: ocultan la navegación y los botones de acción (clase `no-print`), evitan que un elemento del informe se corte entre páginas (`break-inside: avoid`) y dejan visible el nombre "LegalCheck" y todo el contenido del informe.

## Validaciones

El botón "Siguiente"/"Finalizar" queda deshabilitado hasta responder la pregunta actual (opción elegida, o texto no vacío en el caso de "Otro"). No hay otras validaciones porque no se piden datos de formato libre además de esa excepción.

## Estrategia de pruebas

- **`scripts/test-engine.mjs`:** script de Node sin dependencias externas que recalcula a mano los 3 casos de demostración, las 2 reglas especiales y la estructura de las 8 categorías, comparando contra el resultado real del motor.
- **Recorrido end-to-end (Playwright):** usado de forma transitoria durante el desarrollo para verificar el checklist funcional completo, las 8 categorías, las reglas especiales, la navegación "Volver", las validaciones, la impresión y el responsive (desktop/tablet/mobile). No quedó como dependencia del proyecto (no figura en `package.json`); los scripts que lo usan viven fuera de esta carpeta.
- **Build de producción (`npm run build`) y lint (`npm run lint`):** verificados antes de cada cierre de etapa.

## Limitaciones conocidas

- El motor de reglas es deliberadamente simple: no pretende sustituir un análisis jurídico profesional ni abarcar toda la complejidad de situaciones reales.
- La prioridad representa señales generales de atención (intimación, conflicto activo, urgencia percibida, documentación disponible), no una evaluación jurídica.
- Cada categoría tiene una cantidad acotada de preguntas (5), por diseño del MVP.
- No se guarda historial de consultas: no hay backend ni persistencia.
- No se realizó una auditoría automática de accesibilidad con una herramienta dedicada (por ejemplo, axe); se aplicaron prácticas básicas (roles ARIA en las preguntas, `aria-live` en el procesamiento) pero no se corrió un auditor.

## Decisiones tomadas vs. implementadas vs. probadas vs. pendientes

- **Decisiones tomadas:** todas las de esta sección de arquitectura y tecnología están documentadas, con motivo, en `registro-decisiones-LegalCheck.md` (fuera de este repositorio, en la documentación del proyecto).
- **Funcionalidades implementadas:** todo lo descripto en "Alcance del MVP" está construido y en este repositorio.
- **Pruebas efectivamente realizadas:** las descriptas en "Estrategia de pruebas", con resultado aprobado en cada corrida (detalle en la documentación de control de calidad del proyecto).
- **Repositorio remoto y deploy:** completados el 30/08/2026. Código publicado en `https://github.com/consultasandreoligalati3-cmyk/legalcheck` (público) y desplegado en `https://legalcheck-eta.vercel.app` (importado directamente desde GitHub, sin configuración adicional). Detalle del proceso y de los problemas reales encontrados al hacerlo: "Etapa 10" en el registro de decisiones del proyecto.

## Scripts disponibles

```
npm install       # instala dependencias
npm run dev       # entorno de desarrollo
npm run build     # build de producción (carpeta dist/)
npm run preview   # sirve el build de producción localmente
npm run lint      # oxlint
node scripts/test-engine.mjs   # regresión del motor de reglas
```
