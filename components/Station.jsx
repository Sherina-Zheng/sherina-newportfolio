// Shared pieces of the Queens Line signage system.

// Yellow and orange lines take a black letter so it stays readable (MTA does the same on yellow lines).
const DARK_TEXT = ['#FCCC0A', '#FF6319']
export function Bullet({ letter, color, size = 'md' }) {
  return <span className={`bul bul-${size}`} style={{ background: color, color: DARK_TEXT.includes(color) ? '#0F0F0F' : '#fff' }}>{letter}</span>
}

// Black station sign used as the header of every inner page.
export function SignHeader({ where, title, bullet, color = '#B933AD', lede, tags = [] }) {
  return (
    <header>
      <div className="sign-head">
        <div className="wrap">
          {where && <p className="where">{where}</p>}
          <div className="title-row">
            {bullet && <Bullet letter={bullet} color={color} size="xl" />}
            <h1>{title}</h1>
          </div>
          {lede && <p className="lede">{lede}</p>}
          {tags.length > 0 && (
            <div className="tags">
              {tags.map(t => <span key={t.label}><Bullet letter={t.letter} color={t.color} size="sm" />{t.label}</span>)}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// Cobalt duotone platform poster.
export function Poster({ caption = 'Now boarding', name = 'Sherina Zheng', className = '', style }) {
  return (
    <figure className={`poster ${className}`} style={style}>
      <img className="poster-img" src="/poster.jpg" alt="Sherina Zheng, portrait" loading="lazy" />
      <figcaption className="poster-cap">
        <Bullet letter="S" color="#B933AD" size="md" />
        <span className="k">{caption}</span>
        <b>{name}, Product Owner</b>
      </figcaption>
    </figure>
  )
}
