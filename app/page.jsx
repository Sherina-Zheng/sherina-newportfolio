'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ── useInView: fires once when element crosses threshold ── */
function useInView(ref, threshold = 0.35) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return inView
}

/* ── Portrait ── */
function ScrollPortrait({ ready }) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    function onScroll() {
      const scene = document.querySelector('.scene')
      if (!scene) return
      const h = scene.offsetHeight
      const s = window.scrollY
      const progress = Math.min(s / h, 1)
      setScale(1 + progress * 0.12)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="absolute inset-y-0 right-0 w-[52%] md:w-[46%] pointer-events-none select-none" style={{ zIndex: 1, overflow: 'hidden' }}>
      <Image src="/sherina.png" alt="Sherina Zheng" fill priority className="object-contain object-right-top"
        style={{
          mixBlendMode: 'multiply',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
          transform: `scale(${scale})`,
          transformOrigin: 'center top',
          transition: 'transform 0.1s linear',
        }} />
    </div>
  )
}

/* ── Weather ── */
const WMO_MAP = { sunny:[0,1], cloudy:[2,3], windy:[45,48,51,53,55], rainy:[56,57,61,63,65,66,67,80,81,82,95,96,99], snowy:[71,73,75,77,85,86] }
const WEATHER_META = { sunny:{label:'Sunny in NYC',color:'#FFCA28'}, cloudy:{label:'Cloudy in NYC',color:'#A29BFE'}, windy:{label:'Windy in NYC',color:'#A29BFE'}, rainy:{label:'Rainy in NYC',color:'#74B9FF'}, snowy:{label:'Snowy in NYC',color:'#A8E6CF'} }
function codeToState(code) { for (const [s,codes] of Object.entries(WMO_MAP)) if (codes.includes(code)) return s; return 'sunny' }
function useNYCWeather() {
  const [state,setState]=useState('sunny'); const [temp,setTemp]=useState(null)
  useEffect(()=>{ fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=weather_code,temperature_2m&temperature_unit=fahrenheit&timezone=America%2FNew_York').then(r=>r.json()).then(d=>{setState(codeToState(d.current.weather_code));setTemp(Math.round(d.current.temperature_2m))}).catch(()=>{}) },[])
  return {state,temp}
}
function WeatherArt({ weatherState }) {
  if (weatherState==='cloudy') return null
  if (weatherState==='sunny') return (
    <div className="absolute pointer-events-none select-none" style={{top:'-12%',left:'-10%',zIndex:0}}>
      <svg viewBox="0 0 600 600" width="600" height="600" style={{animation:'spinSlow 40s linear infinite',opacity:0.11}}>
        <circle cx="300" cy="300" r="90" fill="#FFCA28"/>
        {[...Array(18)].map((_,i)=>{const a=(i*20)*Math.PI/180;return<line key={i} x1={300+115*Math.cos(a)} y1={300+115*Math.sin(a)} x2={300+270*Math.cos(a)} y2={300+270*Math.sin(a)} stroke="#FFCA28" strokeWidth={i%3===0?5:2.5} strokeLinecap="round"/>})}
      </svg>
    </div>
  )
  if (weatherState==='rainy') return (
    <div className="absolute pointer-events-none select-none" style={{inset:0,zIndex:0,overflow:'hidden'}}>
      <svg width="100%" height="100%" viewBox="0 0 700 900" preserveAspectRatio="xMidYMid slice" style={{opacity:0.13}}>
        {[...Array(20)].map((_,i)=><line key={i} x1={i*38-60} y1="-40" x2={i*38+160} y2="940" stroke="#74B9FF" strokeWidth={i%3===0?2.5:1.5} strokeLinecap="round" style={{animation:`rainFall ${1.4+(i%4)*0.25}s linear infinite ${(i*0.17)%1.4}s`}}/>)}
      </svg>
    </div>
  )
  if (weatherState==='snowy') return (
    <div className="absolute pointer-events-none select-none" style={{inset:0,zIndex:0,overflow:'hidden'}}>
      {[...Array(14)].map((_,i)=>{const size=28+(i%3)*14;return(<div key={i} style={{position:'absolute',left:`${(i*7.1)%60}%`,top:`${(i*13.7)%90}%`,opacity:0.14,animation:`snowDrift ${5+(i%4)*1.5}s ease-in-out infinite ${i*0.6}s`}}><svg width={size} height={size} viewBox="0 0 40 40" style={{animation:`spinSlow ${10+i*3}s linear infinite`}}>{[0,45,90,135].map(deg=>{const r=deg*Math.PI/180;return<line key={deg} x1={20-18*Math.cos(r)} y1={20-18*Math.sin(r)} x2={20+18*Math.cos(r)} y2={20+18*Math.sin(r)} stroke="#A8E6CF" strokeWidth="2.5" strokeLinecap="round"/>})}<circle cx="20" cy="20" r="3" fill="#A8E6CF"/></svg></div>)})}
    </div>
  )
  return (
    <div className="absolute pointer-events-none select-none" style={{inset:0,zIndex:0}}>
      <svg viewBox="0 0 900 700" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{opacity:0.13}}>
        {[0.15,0.3,0.45,0.6,0.75].map((yF,i)=><path key={i} d={`M -80 ${yF*700} C 150 ${(yF-0.1)*700}, 300 ${(yF+0.1)*700}, 450 ${yF*700} C 600 ${(yF-0.1)*700}, 750 ${(yF+0.1)*700}, 980 ${yF*700}`} fill="none" stroke="#A29BFE" strokeWidth={4-i*0.5} strokeLinecap="round" style={{animation:`windSway ${2.2+i*0.4}s ease-in-out infinite ${i*0.35}s`}}/>)}
      </svg>
    </div>
  )
}
function WeatherPill({ weatherState, temp, ready }) {
  const meta = WEATHER_META[weatherState]||WEATHER_META.sunny
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'7px 14px',borderRadius:9999,border:`1px solid ${meta.color}55`,background:`${meta.color}18`,marginBottom:14,opacity:ready?1:0,transform:ready?'translateY(0)':'translateY(-6px)',transition:'opacity 0.35s ease, transform 0.35s ease, border-color 0.6s ease, background 0.6s ease'}}>
      <span style={{width:7,height:7,borderRadius:'50%',background:meta.color,animation:'pulse 2s infinite',flexShrink:0}}/>
      <span style={{fontFamily:'var(--font-inter)',fontSize:11,letterSpacing:'0.08em',color:meta.color}}>{meta.label}{temp!==null?` · ${temp}°F`:''}</span>
    </div>
  )
}

/* ── Name ── */
function HeroName({ ready }) {
  const words = ['Sherina','Zheng']
  return (
    <h1 style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(3.8rem,10.5vw,10.5rem)',lineHeight:1,letterSpacing:'-0.01em',color:'#0C0C0A'}}>
      {words.map((word,wi)=>(
        <span key={word} className="block overflow-hidden">
          <span style={{display:'inline-block',transform:ready?'translateY(0)':'translateY(112%)',transition:`transform 1s cubic-bezier(0.16,1,0.3,1) ${wi*130+100}ms`}}>
            {word}
          </span>
        </span>
      ))}
    </h1>
  )
}

/* ── Role rotator ── */
const roles = ['Product Designer','UI/UX Designer','Product Manager']
function RoleRotator() {
  const [idx,setIdx]=useState(0); const [fade,setFade]=useState(true)
  useEffect(()=>{const t=setInterval(()=>{setFade(false);setTimeout(()=>{setIdx(i=>(i+1)%roles.length);setFade(true)},300)},2800);return()=>clearInterval(t)},[])
  return <span style={{color:'#7A9E7E',transition:'opacity 0.3s',opacity:fade?1:0}}>{roles[idx]}</span>
}

/* ── Bento role card ── */
const bentoRoles = ['Product Designer','UI/UX Designer','Product Manager']
function RoleBentoCard() {
  const [active,setActive]=useState(0)
  useEffect(()=>{const t=setInterval(()=>setActive(i=>(i+1)%bentoRoles.length),1800);return()=>clearInterval(t)},[])
  return (
    <div style={{background:'#0C0C0A',borderRadius:20,padding:'1.5rem',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:0}}>
      <span style={{fontFamily:'var(--font-inter)',fontSize:10,letterSpacing:'0.2em',color:'rgba(184,212,188,0.5)',textTransform:'uppercase'}}>I am a</span>
      <div style={{display:'flex',flexDirection:'column',gap:4}}>
        {bentoRoles.map((role,i)=>(
          <div key={role} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',borderRadius:12,background:active===i?'rgba(122,158,126,0.2)':'transparent',border:active===i?'1px solid rgba(122,158,126,0.35)':'1px solid transparent',transition:'all 0.5s cubic-bezier(0.16,1,0.3,1)'}}>
            <span style={{width:6,height:6,borderRadius:'50%',flexShrink:0,background:active===i?'#7A9E7E':'rgba(122,158,126,0.2)',boxShadow:active===i?'0 0 8px #7A9E7E':'none',transition:'all 0.5s ease'}}/>
            <span style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(1rem,1.6vw,1.35rem)',color:active===i?'#E8E3D5':'rgba(232,227,213,0.25)',transition:'color 0.5s ease'}}>{role}</span>
          </div>
        ))}
      </div>
      <p style={{fontFamily:'var(--font-inter)',fontSize:11,color:'rgba(232,227,213,0.25)',lineHeight:1.5}}>NYC-based · FinTech · Data → Design</p>
    </div>
  )
}

const projects = [
  { num:'01', title:'Salon Connect',     tags:['UX Design','FinTech','Mobile'] },
  { num:'02', title:'FinFlow Dashboard', tags:['Data Analytics','Dashboard','B2B'] },
  { num:'03', title:'Bloom Mobile',      tags:['Mobile','iOS','Interaction Design'] },
]

/* ── Full-page scroll controller ── */
function useFullPageScroll(numSections) {
  const current = useRef(0)
  const locked = useRef(false)

  useEffect(() => {
    function goTo(next) {
      const scenes = document.querySelectorAll('.scene')
      if (!scenes[next] || next === current.current) return
      current.current = next
      scenes[next].scrollIntoView({ behavior: 'smooth' })
      window.dispatchEvent(new CustomEvent('sectionChange', { detail: { index: next } }))
    }

    function onWheel(e) {
      e.preventDefault()
      if (locked.current) return
      // ignore tiny trackpad momentum ticks
      if (Math.abs(e.deltaY) < 8) return
      locked.current = true
      const next = e.deltaY > 0
        ? Math.min(current.current + 1, numSections - 1)
        : Math.max(current.current - 1, 0)
      goTo(next)
      setTimeout(() => { locked.current = false }, 1100)
    }

    let touchStartY = 0
    function onTouchStart(e) { touchStartY = e.touches[0].clientY }
    function onTouchEnd(e) {
      if (locked.current) return
      const diff = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(diff) < 40) return
      locked.current = true
      const next = diff > 0
        ? Math.min(current.current + 1, numSections - 1)
        : Math.max(current.current - 1, 0)
      goTo(next)
      setTimeout(() => { locked.current = false }, 1100)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [numSections])
}

export default function Home() {
  const [ready,setReady]=useState(false)
  useEffect(()=>{const t=setTimeout(()=>setReady(true),80);return()=>clearTimeout(t)},[])
  const {state:weatherState,temp}=useNYCWeather()
  useFullPageScroll(4)

  const [noteOpen,setNoteOpen]=useState(false)
  const [noteMsg,setNoteMsg]=useState('')
  const [fallingLetters,setFallingLetters]=useState([])
  const [pastNotes,setPastNotes]=useState([])
  useEffect(()=>{fetch('/api/notes').then(r=>r.json()).then(setPastNotes).catch(()=>{})},[])

  function handleNoteSubmit(e) {
    e.preventDefault()
    const text=noteMsg.trim(); if(!text) return
    const letters=text.split('').map((ch,i)=>({ch,id:i,x:30+Math.random()*40,rot:Math.random()*30-15,delay:i*55,color:['#7A9E7E','#A8E6CF','#4A7C6F','#0C1F18','#D5CFC0'][i%5],size:Math.random()*14+20}))
    setFallingLetters(letters); setNoteOpen(false); setNoteMsg('')
    fetch('/api/notes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})}).then(()=>fetch('/api/notes').then(r=>r.json()).then(setPastNotes)).catch(()=>{})
    setTimeout(()=>setFallingLetters([]),4000)
  }

  /* section refs for IntersectionObserver */
  const workRef   = useRef(null)
  const aboutRef  = useRef(null)
  const ctaRef    = useRef(null)
  const workInView  = useInView(workRef)
  const aboutInView = useInView(aboutRef)
  const ctaInView   = useInView(ctaRef)

  const [hoveredBento,setHoveredBento]=useState(null)
  const getBentoScale = i => hoveredBento===i?'scale(1.04)':hoveredBento!==null?'scale(0.97)':'scale(1)'

  return (
    <>
      {/* ─────────────── SCENE 1: HERO ─────────────── */}
      <section className="scene relative overflow-hidden flex flex-col justify-end"
        style={{paddingBottom:'5rem',paddingLeft:'clamp(2rem,5vw,3.5rem)',paddingRight:'clamp(2rem,5vw,3.5rem)'}}>

        <WeatherArt weatherState={weatherState}/>

        {/* Rainbow */}
        <div className="absolute pointer-events-none select-none" style={{inset:0,zIndex:-1}}>
          <svg viewBox="0 0 900 600" preserveAspectRatio="xMidYMid meet" style={{position:'absolute',right:0,bottom:0,width:'75%',height:'90%',opacity:0.72}}>
            {[{r:420,color:'#FF6B6B'},{r:396,color:'#FF9F43'},{r:372,color:'#FFEAA7'},{r:348,color:'#A8E6CF'},{r:324,color:'#74B9FF'},{r:300,color:'#A29BFE'}].map(({r,color})=>(
              <path key={r} d={`M ${450-r} 580 A ${r} ${r} 0 0 1 ${450+r} 580`} fill="none" stroke={color} strokeWidth={18} strokeLinecap="round" opacity="0.75"/>
            ))}
          </svg>
        </div>

        {/* Speech bubble */}
        <button onClick={()=>setNoteOpen(true)} className="absolute hidden md:block"
          style={{right:'28%',top:'72%',zIndex:12,background:'none',border:'none',cursor:'pointer',padding:0,opacity:ready?1:0,transition:'opacity 0.8s ease 1.2s, transform 0.25s ease'}}
          onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06) translateY(-3px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
          <div style={{position:'relative'}}>
            <svg width="168" height="78" viewBox="0 0 168 78" fill="none">
              <rect x="2" y="2" width="164" height="58" rx="18" fill="rgba(232,227,213,0.97)" stroke="#7A9E7E" strokeWidth="1.4"/>
              <path d="M 138 60 L 155 74 L 148 60" fill="rgba(232,227,213,0.97)" stroke="#7A9E7E" strokeWidth="1.4" strokeLinejoin="round"/>
            </svg>
            <div style={{position:'absolute',top:0,left:0,width:168,height:62,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
              <p style={{fontFamily:'var(--font-inter)',fontSize:11,color:'#0C0C0A',lineHeight:1.5,margin:0,textAlign:'center'}}>Leave your footprint here</p>
              <p style={{fontFamily:'var(--font-inter)',fontSize:10,color:'#7A9E7E',fontWeight:600,margin:'4px 0 0'}}>✦ click to write ✦</p>
            </div>
          </div>
        </button>

        {/* Note modal */}
        {noteOpen&&(
          <div style={{position:'fixed',inset:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(12,12,10,0.5)',backdropFilter:'blur(8px)'}} onClick={e=>{if(e.target===e.currentTarget)setNoteOpen(false)}}>
            <div style={{background:'#E8E3D5',borderRadius:28,padding:'44px 48px',width:'min(520px,92vw)',boxShadow:'0 32px 80px rgba(0,0,0,0.2)',position:'relative',maxHeight:'85vh',overflowY:'auto'}}>
              <button onClick={()=>setNoteOpen(false)} style={{position:'absolute',top:18,right:22,background:'none',border:'none',fontSize:22,cursor:'pointer',color:'#0C0C0A',opacity:0.3}}>×</button>
              <p style={{fontFamily:'var(--font-dm-serif)',fontSize:'1.6rem',color:'#0C0C0A',marginBottom:6}}>Leave your footprint ✦</p>
              <p style={{fontFamily:'var(--font-inter)',fontSize:12,color:'rgba(12,12,10,0.4)',marginBottom:20}}>Your note will be visible here.</p>
              <form onSubmit={handleNoteSubmit}>
                <textarea autoFocus value={noteMsg} onChange={e=>setNoteMsg(e.target.value)} placeholder="Say anything..." maxLength={160}
                  style={{width:'100%',minHeight:90,background:'rgba(12,12,10,0.05)',border:'1px solid rgba(122,158,126,0.45)',borderRadius:14,padding:'14px 16px',fontFamily:'var(--font-inter)',fontSize:14,color:'#0C0C0A',resize:'none',outline:'none',lineHeight:1.6,boxSizing:'border-box'}}/>
                <button type="submit" style={{marginTop:14,padding:'12px 28px',background:'#0C0C0A',color:'#E8E3D5',borderRadius:9999,fontFamily:'var(--font-inter)',fontSize:13,border:'none',cursor:'pointer'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#7A9E7E'} onMouseLeave={e=>e.currentTarget.style.background='#0C0C0A'}>Drop it ↓</button>
              </form>
              {pastNotes.length>0&&(
                <div style={{marginTop:28,borderTop:'1px solid rgba(12,12,10,0.1)',paddingTop:20}}>
                  <p style={{fontFamily:'var(--font-inter)',fontSize:10,letterSpacing:'0.18em',color:'rgba(12,12,10,0.35)',textTransform:'uppercase',marginBottom:14}}>Footprints left behind</p>
                  <div style={{display:'flex',flexDirection:'column',gap:10}}>
                    {pastNotes.map((n,i)=><div key={i} style={{background:'rgba(122,158,126,0.1)',borderRadius:10,padding:'10px 14px',fontFamily:'var(--font-inter)',fontSize:13,color:'rgba(12,12,10,0.7)',lineHeight:1.5}}>{n.text}</div>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Falling letters */}
        {fallingLetters.map(({ch,id,x,rot,delay,color,size})=>(
          <div key={id} style={{position:'fixed',left:`${x}vw`,top:'8vh',zIndex:90,fontFamily:'var(--font-dm-serif)',fontSize:`${size}px`,color,opacity:0,transform:`rotate(${rot}deg)`,animation:`letterFall 3.6s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms forwards`,pointerEvents:'none'}}>{ch}</div>
        ))}

        <ScrollPortrait ready={ready}/>

        <div className="relative z-10 max-w-7xl w-full mx-auto">
          {/* Available badge */}
          <div className="absolute" style={{top:'calc(-100vh + 7rem)',left:0,display:'flex',alignItems:'center',gap:8,padding:'8px 16px',borderRadius:9999,border:'1px solid #D5CFC0',background:'rgba(213,207,192,0.35)',opacity:ready?1:0,transition:'opacity 0.7s ease 0.6s'}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#7A9E7E',animation:'pulse 2s infinite'}}/>
            <span style={{fontFamily:'var(--font-inter)',fontSize:11,color:'#6B7B6C',letterSpacing:'0.05em'}}>Available for work</span>
          </div>

          {/* Cloud + weather pill */}
          <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
            {weatherState==='cloudy'&&(
              <div style={{marginBottom:-6,animation:'cloudBob 5s ease-in-out infinite',opacity:0.82}}>
                <svg width="160" height="76" viewBox="0 0 110 54" fill="none">
                  <rect x="8" y="30" width="94" height="22" rx="11" fill="#3A4A40"/>
                  <circle cx="22" cy="30" r="13" fill="#3A4A40"/><circle cx="42" cy="22" r="17" fill="#3A4A40"/>
                  <circle cx="66" cy="20" r="18" fill="#3A4A40"/><circle cx="88" cy="26" r="13" fill="#3A4A40"/>
                </svg>
              </div>
            )}
            <WeatherPill weatherState={weatherState} temp={temp} ready={ready}/>
          </div>

          <HeroName ready={ready}/>

          <div style={{marginTop:'1.75rem'}}>
            <p style={{fontFamily:'var(--font-inter)',fontWeight:300,fontSize:'1.1rem',color:'rgba(12,12,10,0.55)',marginBottom:6,
              opacity:ready?1:0,transform:ready?'none':'translateY(14px)',transition:'opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s'}}>
              <RoleRotator/> — Based in NYC
            </p>
            <p style={{fontFamily:'var(--font-dm-serif)',fontSize:'1rem',color:'rgba(12,12,10,0.35)',fontStyle:'italic',
              opacity:ready?1:0,transform:ready?'none':'translateY(14px)',transition:'opacity 0.7s ease 0.82s, transform 0.7s ease 0.82s'}}>
              "I design user experiences that feel inevitable."
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{bottom:28,display:'flex',flexDirection:'column',alignItems:'center',gap:8,opacity:ready?0.35:0,transition:'opacity 0.8s ease 1s'}}>
          <span style={{fontFamily:'var(--font-inter)',fontSize:10,letterSpacing:'0.3em',color:'#0C0C0A',textTransform:'uppercase'}}>Scroll</span>
          <div style={{width:1,height:36,background:'rgba(12,12,10,0.2)',overflow:'hidden'}}>
            <div style={{width:'100%',height:'100%',background:'#7A9E7E',animation:'scrollLine 2s ease-in-out infinite'}}/>
          </div>
        </div>
      </section>

      {/* ─────────────── SCENE 2: SELECTED WORK ─────────────── */}
      <section ref={workRef} className="scene flex flex-col justify-center" style={{background:'#E8E3D5',paddingLeft:'clamp(2rem,5vw,3.5rem)',paddingRight:'clamp(2rem,5vw,3.5rem)'}}>
        <div style={{maxWidth:1280,margin:'0 auto',width:'100%'}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'3rem',opacity:workInView?1:0,transform:workInView?'none':'translateY(32px)',transition:'all 0.7s ease'}}>
            <div>
              <span style={{fontFamily:'var(--font-inter)',fontSize:11,letterSpacing:'0.22em',color:'#7A9E7E',textTransform:'uppercase',display:'block',marginBottom:10}}>Selected Work</span>
              <h2 style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(2.2rem,5vw,4rem)',color:'#0C0C0A',lineHeight:1.1}}>Case Studies</h2>
            </div>
            <Link href="/work" style={{fontFamily:'var(--font-inter)',fontSize:13,color:'rgba(12,12,10,0.35)',textDecoration:'none',transition:'color 0.2s'}}
              onMouseEnter={e=>e.currentTarget.style.color='#7A9E7E'} onMouseLeave={e=>e.currentTarget.style.color='rgba(12,12,10,0.35)'}>
              All projects ↗
            </Link>
          </div>

          <div style={{display:'flex',flexDirection:'column',borderTop:'1px solid #D5CFC0'}}>
            {projects.map(({num,title,tags},i)=>(
              <Link key={num} href="/work" style={{textDecoration:'none',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'2rem 0',borderBottom:'1px solid #D5CFC0',transition:'padding-left 0.4s ease',opacity:workInView?1:0,transform:workInView?'none':'translateY(24px)',transitionDelay:`${i*100+200}ms`,transitionProperty:'opacity, transform, padding-left'}}
                onMouseEnter={e=>e.currentTarget.style.paddingLeft='20px'} onMouseLeave={e=>e.currentTarget.style.paddingLeft='0'}>
                <div style={{display:'flex',alignItems:'center',gap:'clamp(2rem,4vw,3rem)'}}>
                  <span style={{fontFamily:'var(--font-inter)',fontSize:11,color:'rgba(12,12,10,0.25)',letterSpacing:'0.2em'}}>{num}</span>
                  <span style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(1.5rem,3vw,2.5rem)',color:'#0C0C0A',transition:'color 0.3s'}}
                    onMouseEnter={e=>e.currentTarget.style.color='#7A9E7E'} onMouseLeave={e=>e.currentTarget.style.color='#0C0C0A'}>{title}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'flex-end'}}>
                    {tags.map(tag=><span key={tag} style={{padding:'4px 12px',borderRadius:9999,border:'1px solid #8B8578',fontSize:11,color:'#4A4540',fontFamily:'var(--font-inter)'}}>{tag}</span>)}
                  </div>
                  <span style={{color:'rgba(12,12,10,0.25)',fontSize:18}}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── SCENE 3: ABOUT / BENTO ─────────────── */}
      <section ref={aboutRef} className="scene flex flex-col justify-center" style={{background:'#E0DDD0',paddingLeft:'clamp(2rem,5vw,3.5rem)',paddingRight:'clamp(2rem,5vw,3.5rem)'}}>
        <div style={{maxWidth:1280,margin:'0 auto',width:'100%'}}>
          <span style={{fontFamily:'var(--font-inter)',fontSize:11,letterSpacing:'0.22em',color:'#7A9E7E',textTransform:'uppercase',display:'block',marginBottom:'1.5rem',opacity:aboutInView?1:0,transition:'opacity 0.6s ease'}}>About</span>

          <div style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:12,height:'calc(100vh - 14rem)',maxHeight:520}}>
            {/* Quote card */}
            <div className="col-span-12 md:col-span-7" style={{gridColumn:'span 7',background:'#7A9E7E',borderRadius:24,padding:'clamp(1.5rem,3vw,2.5rem)',display:'flex',flexDirection:'column',justifyContent:'space-between',opacity:aboutInView?1:0,transform:aboutInView?'none':'translateY(28px)',transition:'all 0.6s ease 0.1s',cursor:'pointer'}}
              onMouseEnter={e=>{setHoveredBento(0);e.currentTarget.style.transform='scale(1.02)'}} onMouseLeave={e=>{setHoveredBento(null);e.currentTarget.style.transform='scale(1)'}}>
              <span style={{fontFamily:'var(--font-inter)',fontSize:10,letterSpacing:'0.2em',color:'rgba(232,227,213,0.6)',textTransform:'uppercase'}}>Philosophy</span>
              <div>
                <p style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(1.5rem,2.8vw,2.5rem)',color:'#E8E3D5',lineHeight:1.25,marginBottom:20}}>"Progress begins<br/>with bare bones."</p>
                <Link href="/about" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 20px',background:'rgba(232,227,213,0.15)',border:'1px solid rgba(232,227,213,0.25)',color:'#E8E3D5',borderRadius:9999,fontSize:13,fontFamily:'var(--font-inter)',textDecoration:'none',transition:'all 0.3s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='#E8E3D5';e.currentTarget.style.color='#0C0C0A'}} onMouseLeave={e=>{e.currentTarget.style.background='rgba(232,227,213,0.15)';e.currentTarget.style.color='#E8E3D5'}}>
                  Read my story →
                </Link>
              </div>
            </div>

            {/* Role card */}
            <div className="col-span-12 md:col-span-5" style={{gridColumn:'span 5',opacity:aboutInView?1:0,transform:aboutInView?'none':'translateY(28px)',transition:'all 0.6s ease 0.18s'}}>
              <RoleBentoCard/>
            </div>

            {/* Toolkit */}
            <div className="col-span-12 md:col-span-4" style={{gridColumn:'span 4',background:'#B8D4BC',borderRadius:24,padding:'clamp(1.2rem,2.5vw,2rem)',opacity:aboutInView?1:0,transform:aboutInView?'none':'translateY(28px)',transition:'all 0.6s ease 0.25s'}}>
              <span style={{fontFamily:'var(--font-inter)',fontSize:10,letterSpacing:'0.2em',color:'rgba(12,12,10,0.45)',textTransform:'uppercase',display:'block',marginBottom:14}}>Toolkit</span>
              <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
                {['Figma','UX Research','SQL','React','Prototyping','Jira','Design Systems'].map(s=><span key={s} style={{padding:'5px 12px',borderRadius:9999,background:'rgba(12,12,10,0.08)',fontSize:11,fontFamily:'var(--font-inter)',color:'#0C0C0A'}}>{s}</span>)}
              </div>
            </div>

            {/* Stat */}
            <div className="col-span-6 md:col-span-4" style={{gridColumn:'span 4',background:'#E8E3D5',border:'1px solid #D5CFC0',borderRadius:24,padding:'clamp(1.2rem,2.5vw,2rem)',display:'flex',flexDirection:'column',justifyContent:'space-between',opacity:aboutInView?1:0,transform:aboutInView?'none':'translateY(28px)',transition:'all 0.6s ease 0.32s'}}>
              <span style={{fontFamily:'var(--font-inter)',fontSize:10,letterSpacing:'0.2em',color:'rgba(12,12,10,0.4)',textTransform:'uppercase'}}>Background</span>
              <div>
                <p style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(2rem,3.5vw,3rem)',color:'#7A9E7E',lineHeight:1}}>3×</p>
                <p style={{fontFamily:'var(--font-inter)',fontSize:12,color:'rgba(12,12,10,0.5)',marginTop:4}}>disciplines combined into one practice</p>
              </div>
            </div>

            {/* Driven by */}
            <div className="col-span-6 md:col-span-4" style={{gridColumn:'span 4',background:'#E8F0E9',borderRadius:24,padding:'clamp(1.2rem,2.5vw,2rem)',display:'flex',flexDirection:'column',justifyContent:'space-between',opacity:aboutInView?1:0,transform:aboutInView?'none':'translateY(28px)',transition:'all 0.6s ease 0.38s'}}>
              <span style={{fontFamily:'var(--font-inter)',fontSize:10,letterSpacing:'0.2em',color:'rgba(12,12,10,0.4)',textTransform:'uppercase'}}>Driven by</span>
              <p style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(1rem,1.8vw,1.35rem)',color:'#0C0C0A',lineHeight:1.4}}>Building systems from the ground up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── SCENE 4: CTA ─────────────── */}
      <section ref={ctaRef} className="scene flex flex-col items-center justify-center" style={{paddingLeft:'clamp(2rem,5vw,3.5rem)',paddingRight:'clamp(2rem,5vw,3.5rem)',textAlign:'center',position:'relative',overflow:'hidden'}}>

        {/* Spinning badge */}
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',pointerEvents:'none',width:580,height:580,marginLeft:-290,marginTop:-290}}>
          <svg viewBox="0 0 580 580" width="580" height="580" style={{animation:'spinBadge 18s linear infinite',display:'block',opacity:0.22}}>
            <defs><path id="circlePath2" d="M 290,290 m -250,0 a 250,250 0 1,1 500,0 a 250,250 0 1,1 -500,0"/></defs>
            <text style={{fontFamily:'var(--font-inter)',fontSize:28,fill:'#7A9E7E',letterSpacing:'0.22em'}}>
              <textPath href="#circlePath2">✦ OnenOnlyShereena ✦ OnenOnlyShereena ✦ OnenOnlyShereena ✦&nbsp;</textPath>
            </text>
          </svg>
        </div>

        <div style={{position:'relative',zIndex:1,maxWidth:600}}>
          <span style={{fontFamily:'var(--font-inter)',fontSize:11,letterSpacing:'0.22em',color:'#7A9E7E',textTransform:'uppercase',display:'block',marginBottom:20,opacity:ctaInView?1:0,transition:'opacity 0.6s ease'}}>Let's Connect</span>
          <h2 style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(2.8rem,6vw,5.5rem)',color:'#0C0C0A',lineHeight:1.1,marginBottom:8,opacity:ctaInView?1:0,transform:ctaInView?'none':'translateY(24px)',transition:'all 0.7s ease 0.1s'}}>
            Have a project<br/>in mind?
          </h2>
          <p style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(1rem,2vw,1.5rem)',color:'rgba(12,12,10,0.38)',fontStyle:'italic',marginBottom:36,opacity:ctaInView?1:0,transition:'opacity 0.7s ease 0.2s'}}>
            Data brain. Design heart. Ships things 0→1.
          </p>

          <div style={{display:'flex',justifyContent:'center',gap:16,marginBottom:28,opacity:ctaInView?1:0,transition:'opacity 0.7s ease 0.3s'}}>
            {[
              {href:'mailto:zhengsherina@gmail.com',label:'Email',icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>},
              {href:'https://www.linkedin.com/in/sherina-zheng-48b287224/',label:'LinkedIn',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>},
            ].map(({href,label,icon})=>(
              <a key={label} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer" aria-label={label}
                style={{width:56,height:56,borderRadius:'50%',border:'1px solid rgba(12,12,10,0.12)',display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(12,12,10,0.3)',textDecoration:'none',transition:'all 0.3s'}}
                onMouseEnter={e=>{e.currentTarget.style.background='#E8F0E9';e.currentTarget.style.color='#7A9E7E';e.currentTarget.style.borderColor='#B8D4BC';e.currentTarget.style.transform='scale(1.12)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(12,12,10,0.3)';e.currentTarget.style.borderColor='rgba(12,12,10,0.12)';e.currentTarget.style.transform='scale(1)'}}>
                {icon}
              </a>
            ))}
          </div>

          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12,opacity:ctaInView?1:0,transition:'opacity 0.7s ease 0.4s'}}>
            {[{href:'mailto:zhengsherina@gmail.com',text:'zhengsherina@gmail.com ↗'},{href:'https://www.linkedin.com/in/sherina-zheng-48b287224/',text:'linkedin.com/in/sherina-zheng ↗'}].map(({href,text})=>(
              <a key={href} href={href} target={href.startsWith('http')?'_blank':undefined} rel="noreferrer"
                style={{fontFamily:'var(--font-dm-serif)',fontSize:'clamp(0.95rem,1.6vw,1.2rem)',color:'rgba(12,12,10,0.4)',textDecoration:'none',transition:'all 0.3s'}}
                onMouseEnter={e=>{e.currentTarget.style.color='#7A9E7E';e.currentTarget.style.transform='scale(1.04)'}}
                onMouseLeave={e=>{e.currentTarget.style.color='rgba(12,12,10,0.4)';e.currentTarget.style.transform='scale(1)'}}>
                {text}
              </a>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        html { overflow: hidden; }
        body { overflow: hidden; }
        .scene { height: 100vh; min-height: 100vh; }
        @keyframes scrollLine  { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes pulse       { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes spinBadge   { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes spinSlow    { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes rainFall    { 0%{opacity:0;transform:translateY(-60px)} 60%{opacity:1} 100%{opacity:0;transform:translateY(80px)} }
        @keyframes windSway    { 0%,100%{transform:translateX(0)} 50%{transform:translateX(12px)} }
        @keyframes snowDrift   { 0%,100%{transform:translateY(0) translateX(0)} 33%{transform:translateY(14px) translateX(8px)} 66%{transform:translateY(6px) translateX(-6px)} }
        @keyframes cloudBob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes letterFall  { 0%{opacity:0;transform:translateY(0)} 8%{opacity:1} 80%{opacity:1;transform:translateY(72vh)} 100%{opacity:0;transform:translateY(74vh)} }
      `}</style>
    </>
  )
}
