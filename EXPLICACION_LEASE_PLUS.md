# 📊 Explicación Detallada: Plan BEL Lease-Plus

## 🎯 Concepto General

El **BEL Lease-Plus** es un plan híbrido que combina:
- **Leasing Financiero** (arrendamiento con opción de compra)
- **Crédito Alemán** (sistema de cuotas decrecientes)

## 💰 Estructura del Plan

### Distribución del Precio
Para un tractor de **$100,000** (ejemplo):

```
Precio Total: $100,000
├── Inicial (25%):        $25,000  ← Pago al inicio
├── Financiado (50%):     $50,000  ← Se paga en 36 cuotas
└── Valor Residual (25%): $25,000  ← Opción de compra al final
```

## 📐 Matemática del Crédito Alemán

### Características:
- **Amortización constante** cada mes
- **Intereses decrecientes** (se calculan sobre saldo pendiente)
- **Cuotas decrecientes** (amortización + intereses)

### Fórmulas:

#### 1. Amortización Mensual (Constante)
```
Amortización = Monto Financiado / Plazo
Amortización = $50,000 / 36 meses
Amortización = $1,388.89 por mes
```

#### 2. Intereses del Mes
```
Interés(mes) = Saldo Pendiente × Tasa Mensual
Tasa Mensual = 12% anual / 12 = 1% mensual = 0.01
```

#### 3. Cuota del Mes
```
Cuota(mes) = Amortización + Interés(mes)
```

## 📊 Ejemplo Detallado: BEL 50 ($14,970)

### Distribución Inicial:
```
Precio Base:      $14,970
Inicial (25%):    $3,742.50
Financiado (50%): $7,485.00
Valor Residual:   $3,742.50
```

### Cálculo de Cuotas:

**Amortización mensual:**
```
$7,485 / 36 = $208.50 por mes (constante)
```

**Primera Cuota (Mes 1):**
```
Saldo inicial: $7,485.00
Interés: $7,485 × 1% = $74.85
Cuota 1 = $208.50 + $74.85 = $283.35
```

**Cuota del Mes 18 (Mitad del plazo):**
```
Saldo: $7,485 - ($208.50 × 17) = $3,940.50
Interés: $3,940.50 × 1% = $39.41
Cuota 18 = $208.50 + $39.41 = $247.91
```

**Última Cuota (Mes 36):**
```
Saldo: $208.50 (última amortización)
Interés: $208.50 × 1% = $2.09
Cuota 36 = $208.50 + $2.09 = $210.59
```

### Cuota Promedio:
```
Cuota Promedio = (Primera Cuota + Última Cuota) / 2
Cuota Promedio = ($283.35 + $210.59) / 2 = $246.97
```

## 💡 Cálculo de Intereses Totales

### Fórmula Simplificada:
```
Total Intereses = (Monto Financiado × Tasa Mensual × (n + 1) × n) / 2

Donde:
- Monto Financiado = $7,485
- Tasa Mensual = 0.01 (1%)
- n = 36 meses

Total Intereses = ($7,485 × 0.01 × 37 × 36) / 2
Total Intereses = $4,989.66
```

**Nota:** En el código actual hay un error en esta fórmula (usa 37 × 36 cuando debería ser (36 + 1) × 36 / 2).

## 🔢 Resumen Financiero Completo

Para **BEL 50 ($14,970)**:

```
1. Inicial (25%):              $3,742.50
2. Primera cuota:              $283.35
3. Cuota promedio (36 meses):  $246.97
4. Última cuota:               $210.59
5. Total intereses:            $1,388.50 (aprox)
6. Valor residual (25%):       $3,742.50
───────────────────────────────────────
TOTAL A PAGAR:                 $19,101.00
```

### Desglose:
- Inicial: $3,742.50
- 36 cuotas (promedio $247): $8,892.00
- Intereses totales: $1,388.50
- Valor residual final: $3,742.50
- **Total: $17,765.50**

## ⚠️ Corrección Necesaria en el Código

### Problema Actual:
```javascript
const totalIntereses = (montoFinanciado * tasaMensual * 37 * 36) / 2;
```

### Fórmula Correcta:
```javascript
// Método 1: Suma de serie aritmética
const totalIntereses = (montoFinanciado * tasaMensual * (36 + 1)) / 2;

// Método 2: Cálculo exacto iterativo
let totalIntereses = 0;
let saldoPendiente = montoFinanciado;
for (let mes = 1; mes <= 36; mes++) {
  const interesMes = saldoPendiente * tasaMensual;
  totalIntereses += interesMes;
  saldoPendiente -= amortizacionMensual;
}
```

## 📋 Cronograma de Ejemplo (Primeros 6 meses)

| Mes | Saldo Inicial | Amortización | Interés | Cuota Total | Saldo Final |
|-----|--------------|--------------|---------|-------------|-------------|
| 1   | $7,485.00    | $208.50      | $74.85  | $283.35     | $7,276.50   |
| 2   | $7,276.50    | $208.50      | $72.77  | $281.27     | $7,068.00   |
| 3   | $7,068.00    | $208.50      | $70.68  | $279.18     | $6,859.50   |
| 4   | $6,859.50    | $208.50      | $68.60  | $277.10     | $6,651.00   |
| 5   | $6,651.00    | $208.50      | $66.51  | $275.01     | $6,442.50   |
| 6   | $6,442.50    | $208.50      | $64.43  | $272.93     | $6,234.00   |

## 🎯 Ventajas del Sistema de Cuotas Decrecientes

1. **Alivio progresivo:** Las cuotas bajan cada mes
2. **Menor carga futura:** Más fácil de pagar con el tiempo
3. **Menos intereses totales:** Comparado con cuotas fijas
4. **Flexibilidad:** Opción de compra al final

## 🔄 Opciones al Final del Plazo (Mes 36)

El cliente puede:
1. **Comprar** el tractor pagando el valor residual ($3,742.50)
2. **Renovar** el leasing por otro período
3. **Devolver** el tractor sin costo adicional

## 💡 Recomendación de Corrección

Actualizar la línea 426 en [`planesFinanciamiento.js`](tractores-bel/src/data/planesFinanciamiento.js:426):

```javascript
// ACTUAL (INCORRECTO):
const totalIntereses = (montoFinanciado * tasaMensual * 37 * 36) / 2;

// CORRECTO:
const totalIntereses = (montoFinanciado * tasaMensual * (36 + 1) * 36) / 2;
// O mejor aún:
const totalIntereses = montoFinanciado * tasaMensual * 18.5; // (36+1)/2 = 18.5
```

## 📊 Comparación con Otros Planes

| Plan | Inicial | Cuotas | Intereses | Total a Pagar |
|------|---------|--------|-----------|---------------|
| Lease-Plus | 25% | 36 decrecientes | Sí (12% anual) | Más alto |
| Plan EI-12 | 40% | 12 + 3 especiales | No | Medio |
| Plan EI-30 | 33.33% | 30 iguales | No | Medio |
| Fraccionada | 0% | 6 iguales | No | Más bajo |

## ✅ Conclusión

El plan Lease-Plus es ideal para:
- ✅ Clientes que quieren **inicial baja** (25%)
- ✅ Empresas que buscan **beneficios fiscales**
- ✅ Quienes prefieren **cuotas decrecientes**
- ✅ Necesitan **flexibilidad** al final del plazo

**Nota:** Requiere corrección en el cálculo de intereses totales para mayor precisión.

---

**Documento técnico preparado para Tractores BEL**  
**Fecha:** 2 de Noviembre, 2025