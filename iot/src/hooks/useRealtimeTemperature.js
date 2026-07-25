import { useState, useEffect, useRef, useCallback } from 'react'

const WAREHOUSE_CONFIGS = [
  {
    id: 'kho1',
    name: 'KHO 1',
    description: 'Kho lạnh âm sâu',
    rangeMin: -22,
    rangeMax: -15,
    targetTemp: -18,
    variance: 0.4,
    type: 'cold',
  },
  {
    id: 'kho2',
    name: 'KHO 2',
    description: 'Kho đông lạnh',
    rangeMin: -42,
    rangeMax: -35,
    targetTemp: -40,
    variance: 0.5,
    type: 'cold',
  },
  {
    id: 'kho3',
    name: 'KHO 3',
    description: 'Kho mát thường',
    rangeMin: 2,
    rangeMax: 8,
    targetTemp: 5,
    variance: 0.3,
    type: 'warm',
  },
  {
    id: 'kho4',
    name: 'KHO 4',
    description: 'Kho bảo quản',
    rangeMin: 28,
    rangeMax: 36,
    targetTemp: 32,
    variance: 0.6,
    type: 'warm',
  },
]

function generateInitialTemperatures() {
  return WAREHOUSE_CONFIGS.map((config) => ({
    ...config,
    currentTemp: config.targetTemp + (Math.random() - 0.5) * config.variance * 2,
    isUpdating: false,
    lastUpdated: new Date(),
  }))
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function formatTemperature(temp) {
  return temp.toFixed(1)
}

function getTemperatureColorClass(temp, type) {
  if (type === 'cold') return 'cold'
  if (temp > 30) return 'hot'
  return 'warm'
}

export function useRealtimeTemperature() {
  const [warehouses, setWarehouses] = useState(generateInitialTemperatures)
  const [wsError, setWsError] = useState(null)
  const intervalRef = useRef(null)
  const timeoutRefs = useRef([])
  const wsRef = useRef(null)

  const simulateSensorReading = useCallback((current, config) => {
    const drift = (Math.random() - 0.5) * config.variance
    const meanReversionForce = (config.targetTemp - current) * 0.05
    const noise = (Math.random() - 0.5) * 0.1
    const newTemp = current + drift + meanReversionForce + noise
    return clamp(newTemp, config.rangeMin, config.rangeMax)
  }, [])

  const updateWarehouseTemperatures = useCallback(() => {
    setWarehouses((prev) =>
      prev.map((warehouse) => ({
        ...warehouse,
        currentTemp: simulateSensorReading(warehouse.currentTemp, warehouse),
        isUpdating: true,
        lastUpdated: new Date(),
      }))
    )

    const clearUpdateId = setTimeout(() => {
      setWarehouses((prev) =>
        prev.map((warehouse) => ({ ...warehouse, isUpdating: false }))
      )
    }, 450)

    timeoutRefs.current.push(clearUpdateId)
  }, [simulateSensorReading])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const ws = new WebSocket(`ws://localhost:3000?token=${token}`);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.error) {
            setWsError(data.error);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      };

      ws.onerror = (error) => {
        console.error(error);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };
    }

    intervalRef.current = setInterval(updateWarehouseTemperatures, 2500)

    return () => {
      clearInterval(intervalRef.current)
      timeoutRefs.current.forEach(clearTimeout)
      timeoutRefs.current = []
      if (wsRef.current) {
        wsRef.current.close();
      }
    }
  }, [updateWarehouseTemperatures])

  return {
    warehouses,
    formatTemperature,
    getTemperatureColorClass,
    wsError
  }
}
