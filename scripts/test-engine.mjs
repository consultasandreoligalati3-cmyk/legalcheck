import { categorias, obtenerCategoriaPorId } from '../src/data/categories.js'
import { generarInforme, calcularPuntaje, calcularPrioridad } from '../src/engine/rulesEngine.js'

function assertEqual(actual, expected, label) {
  const ok = actual === expected
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}: esperado=${expected} obtenido=${actual}`)
  if (!ok) process.exitCode = 1
}

console.log('--- Caso 1: Alquiler + intimación ---')
const c1 = obtenerCategoriaPorId('alquiler')
const r1 = { situacion: 'deuda', intimacion: 'si', activa: 'si', urgencia: 'media', documentacion: 'si' }
assertEqual(calcularPuntaje(c1, r1), 4, 'puntaje')
assertEqual(calcularPrioridad(c1, r1), 'alta', 'prioridad')
const informe1 = generarInforme(c1, r1)
console.log(JSON.stringify(informe1, null, 2))

console.log('\n--- Caso 2: Trabajo (despido) ---')
const c2 = obtenerCategoriaPorId('trabajo')
const r2 = { situacion: 'despido', intimacion: 'si', activa: 'si', urgencia: 'baja', documentacion: 'si' }
assertEqual(calcularPuntaje(c2, r2), 3, 'puntaje')
assertEqual(calcularPrioridad(c2, r2), 'media', 'prioridad')
const informe2 = generarInforme(c2, r2)
console.log(JSON.stringify(informe2, null, 2))

console.log('\n--- Caso 3: Consorcio (humedad) ---')
const c3 = obtenerCategoriaPorId('consorcio')
const r3 = { situacion: 'humedad', intimacion: 'no', activa: 'si', urgencia: 'media', documentacion: 'no' }
assertEqual(calcularPuntaje(c3, r3), 3, 'puntaje')
assertEqual(calcularPrioridad(c3, r3), 'media', 'prioridad')
const informe3 = generarInforme(c3, r3)
console.log(JSON.stringify(informe3, null, 2))

console.log('\n--- Regla especial: Familia + violencia ---')
const c4 = obtenerCategoriaPorId('familia')
const r4 = { situacion: 'violencia', intimacion: 'no', activa: 'no', urgencia: 'baja', documentacion: 'no' }
assertEqual(calcularPrioridad(c4, r4), 'alta', 'prioridad forzada por regla especial')
console.log(JSON.stringify(generarInforme(c4, r4), null, 2))

console.log('\n--- Regla especial: Salud + posible mala praxis ---')
const c5 = obtenerCategoriaPorId('salud')
const r5 = { situacion: 'malapraxis', intimacion: 'no', activa: 'si', urgencia: 'baja', documentacion: 'si' }
// puntaje base: 0 (intimacion) + 1 (activa) + 0 (urgencia baja) + 0 (documentacion si) = 1, +1 por regla especial = 2 -> media
assertEqual(calcularPuntaje(c5, r5), 2, 'puntaje con +1 de regla especial')
assertEqual(calcularPrioridad(c5, r5), 'media', 'prioridad')

console.log('\n--- Verificación estructural: las 8 categorías tienen 1 pregunta descriptiva + 4 comunes ---')
categorias.forEach((cat) => {
  const ok = cat.preguntaDescriptiva && cat.preguntasComunes.length === 4
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${cat.id}`)
  if (!ok) process.exitCode = 1
})

if (process.exitCode === 1) {
  console.log('\nRESULTADO: hay fallas, revisar arriba.')
} else {
  console.log('\nRESULTADO: todas las verificaciones del motor de reglas pasaron correctamente.')
}
