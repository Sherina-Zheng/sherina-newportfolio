'use client'
import { useEffect, useState } from 'react'

// Live NYC weather (Open-Meteo, no key needed), shown like a station service-status chip.
const URL = 'https://api.open-meteo.com/v1/forecast?latitude=40.74&longitude=-73.94&current=weather_code,temperature_2m,is_day&temperature_unit=fahrenheit&timezone=America%2FNew_York'

function describe(code, isDay) {
  if (code === 0 || code === 1) return isDay ? { kind: 'sun', label: 'Sunny' } : { kind: 'moon', label: 'Clear' }
  if (code === 2 || code === 3) return { kind: 'cloud', label: code === 2 ? 'Partly cloudy' : 'Cloudy' }
  if (code === 45 || code === 48) return { kind: 'cloud', label: 'Foggy' }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { kind: 'rain', label: code <= 57 ? 'Drizzle' : 'Rainy' }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return { kind: 'snow', label: 'Snowy' }
  if (code >= 95) return { kind: 'storm', label: 'Thunderstorms' }
  return { kind: 'cloud', label: 'Cloudy' }
}

const COLORS = { sun: '#FCCC0A', moon: '#A7A9AC', cloud: '#A7A9AC', rain: '#0039A6', snow: '#6CBEE8', storm: '#B933AD' }

function Icon({ kind }) {
  const s = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (kind === 'sun') return <svg {...s}><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>
  if (kind === 'moon') return <svg {...s}><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
  if (kind === 'rain') return <svg {...s}><path d="M7 14a5 5 0 1 1 9.6-2H17a3.5 3.5 0 0 1 0 7H7" /><path d="M9 20l-1 2M13 20l-1 2" /></svg>
  if (kind === 'snow') return <svg {...s}><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" /></svg>
  if (kind === 'storm') return <svg {...s}><path d="M7 15a5 5 0 1 1 9.6-2H17a3.5 3.5 0 0 1 .5 6.97" /><path d="M12 14l-2 4h4l-2 4" /></svg>
  return <svg {...s}><path d="M7 19a5 5 0 1 1 1.2-9.85A6 6 0 0 1 19.5 11 4 4 0 0 1 18 19z" /></svg>
}

// one request per page load, shared by every chip on the page
let request
const load = () => (request ??= fetch(URL).then(r => r.json()))

export default function Weather({ className = '' }) {
  const [w, setW] = useState(null)
  useEffect(() => {
    let alive = true
    load().then(d => {
      if (!alive || !d?.current) return
      setW({ ...describe(d.current.weather_code, d.current.is_day), temp: Math.round(d.current.temperature_2m) })
    }).catch(() => {})
    return () => { alive = false }
  }, [])
  if (!w) return null // hide quietly if the forecast can't load

  const dark = w.kind === 'sun' || w.kind === 'snow' || w.kind === 'moon' || w.kind === 'cloud'
  return (
    <span className={`weather ${className}`} role="status" aria-label={`New York weather: ${w.label}, ${w.temp} degrees Fahrenheit`}>
      <span className="weather-icon" style={{ background: COLORS[w.kind], color: dark ? '#0F0F0F' : '#fff' }}><Icon kind={w.kind} /></span>
      <span className="weather-text">{w.label} in NYC · {w.temp}°F</span>
      <style>{`
        .weather { display:inline-flex; align-items:center; gap:10px; color:#fff; font: 800 14px var(--sans); letter-spacing:.01em; white-space:nowrap; }
        .weather-icon { width:26px; height:26px; border-radius:50%; display:grid; place-items:center; flex:none; }
      `}</style>
    </span>
  )
}
