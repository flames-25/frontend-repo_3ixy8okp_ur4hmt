import React, { useEffect, useRef, useState } from 'react'
import { Menu, X, Star, Truck, ShieldCheck, Couch, Leaf, Flame, Droplets, Snowflake } from 'lucide-react'

function useInView(options = { threshold: 0.12 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
  }, [options])
  return [ref, inView]
}

const colors = {
  moss: '#7DA57B',
  mossDark: '#628864',
  slate: '#2F3A3F',
  wood: '#E9E2D6',
  offWhite: '#F7F7F5',
}

const Header = ({ onNavigate }) => {
  const [open, setOpen] = useState(false)
  const navItems = [
    { label: 'Accueil', id: 'home' },
    { label: 'Produits', id: 'produits' },
    { label: 'Pourquoi nous', id: 'pourquoi' },
    { label: 'Témoignages', id: 'temoignages' },
    { label: 'Inspiration', id: 'inspiration' },
  ]
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm">
            <span className="text-xs tracking-wide">MS</span>
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-slate-900">Maison Scandinave</p>
            <p className="text-xs text-slate-500">Kotas, Saunas & Bains nordiques</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm text-slate-700 hover:text-slate-900 transition-colors">
              {n.label}
            </a>
          ))}
          <a href="#produits" className="inline-flex items-center px-4 py-2 rounded-full text-white shadow-sm" style={{ backgroundColor: colors.moss }}>
            Découvrir nos modèles
          </a>
        </nav>

        <button aria-label="Menu" className="md:hidden p-2 rounded-md hover:bg-slate-100" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/40 bg-white/90">
          <div className="max-w-7xl mx-auto px-4 py-4 grid gap-3">
            {navItems.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="text-slate-700 hover:text-slate-900">
                {n.label}
              </a>
            ))}
            <a href="#produits" onClick={() => setOpen(false)} className="inline-flex w-max items-center px-4 py-2 rounded-full text-white shadow-sm" style={{ backgroundColor: colors.moss }}>
              Découvrir nos modèles
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[88vh] pt-16">
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-center bg-cover bg-no-repeat bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[70vh]">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight drop-shadow">
            Vivez l’Art de Vivre Nordique
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-100/90">
            Kota Grill, Sauna, Bain Nordique – L’authenticité scandinave chez vous.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a
              href="#produits"
              className="px-6 py-3 rounded-full font-medium text-slate-900 shadow-lg hover:shadow-xl transition-shadow"
              style={{ backgroundColor: colors.moss }}
            >
              Voir les produits
            </a>
            <a href="#inspiration" className="px-6 py-3 rounded-full border border-white/60 text-white/95 hover:bg-white/10 transition">
              S’inspirer
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
        Faites défiler
      </div>
    </section>
  )
}

const ProductCard = ({ image, title, description, icon: Icon }) => {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`group rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon className="text-slate-700" size={20} />}
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  )
}

const Products = () => {
  const items = [
    {
      title: 'Kota Grill',
      description: 'Le convivial autour du feu, été comme hiver. Bois, acier et chaleur partagée.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1600&auto=format&fit=crop',
      icon: Flame,
    },
    {
      title: 'Sauna Finlandais',
      description: 'Bien-être authentique, chaleur sèche, rituel nordique par excellence.',
      image: 'https://images.unsplash.com/photo-1724301930658-2f21ae702d07?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTYXVuYSUyMEZpbmxhbmRhaXN8ZW58MHwwfHx8MTc2MjkzMDQ1MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      icon: Snowflake,
    },
    {
      title: 'Bain Nordique',
      description: 'Immersion chaude en plein air, eau fumante et détente totale.',
      image: 'https://images.unsplash.com/photo-1650898591542-c6eb283d3747?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxCYWluJTIwTm9yZGlxdWV8ZW58MHwwfHx8MTc2MjkzMDQ1MHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
      icon: Droplets,
    },
    {
      title: 'Chalet & Abri en bois',
      description: 'Espaces cocooning en bois clair, minimalistes et chaleureux.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop',
      icon: Leaf,
    },
  ]

  return (
    <section id="produits" className="py-20 bg-[var(--offWhite,#F7F7F5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">Produits phares</h2>
          <p className="text-slate-600 mt-2">Sélection pensée pour l’authenticité, la durabilité et le design.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <ProductCard key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  )
}

const WhyUs = () => {
  const features = [
    { title: 'Qualité scandinave', icon: ShieldCheck, desc: 'Matériaux durables, finitions haut de gamme.' },
    { title: 'Confort & Design', icon: Couch, desc: 'Ergonomie, chaleur douce, esthétique épurée.' },
    { title: 'Livraison partout', icon: Truck, desc: 'Réseau logistique fiable en France & Europe.' },
    { title: 'Service Premium', icon: Star, desc: 'Accompagnement de la commande à l’installation.' },
  ]

  return (
    <section id="pourquoi" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">Pourquoi nous choisir ?</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition">
              <f.icon className="text-slate-800" />
              <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({ quote, author, role, image }) => (
  <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
    <div className="flex items-center gap-4">
      <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <p className="font-semibold text-slate-900">{author}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
    <p className="mt-4 text-slate-700 italic">“{quote}”</p>
    <div className="mt-3 flex text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="#f59e0b" className="text-amber-500" />
      ))}
    </div>
  </div>
)

const Testimonials = () => {
  const items = [
    {
      author: 'Julien M.',
      role: 'Bretagne',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
      quote:
        'Ambiance magique au Kota Grill, on s’y retrouve en famille toute l’année. Qualité irréprochable !',
    },
    {
      author: 'Camille M.',
      role: 'Annecy',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
      quote: 'Le sauna barrel a changé nos soirées. Design sublime et installation impeccable.',
    },
    {
      author: 'Alexandre M.',
      role: 'Bordeaux',
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop',
      quote: 'Bain nordique incroyable, détente totale même en hiver. Service client top.',
    },
  ]
  return (
    <section id="temoignages" className="py-20" style={{ backgroundColor: colors.offWhite }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">Témoignages</h2>
          <p className="text-slate-600 mt-2">Ils ont choisi l’esthétique nordique et le bien-être durable.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

const Gallery = () => {
  const photos = [
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1455212693808-8f36d5213f59?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1400&auto=format&fit=crop',
  ]
  return (
    <section id="inspiration" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">Inspiration</h2>
          <p className="text-slate-600 mt-2">Soirées autour du feu, sauna au bord du lac, moments hygge.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <img src={src} alt="Inspiration scandinave" className="w-full h-48 md:h-56 lg:h-64 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="pt-16 pb-10 text-slate-700" style={{ backgroundColor: '#111827' }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-200">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white text-slate-900 flex items-center justify-center">MS</div>
            <p className="font-semibold">Maison Scandinave</p>
          </div>
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            Kotas finlandais, Saunas, Bains nordiques et chalets en bois. Design nordique, qualité durable.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-3">Coordonnées</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>contact@maison-scandinave.com</li>
            <li>+33 1 23 45 67 89</li>
            <li>France & Europe</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Liens rapides</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#produits" className="hover:text-white">Produits</a></li>
            <li><a href="#pourquoi" className="hover:text-white">Pourquoi nous</a></li>
            <li><a href="#temoignages" className="hover:text-white">Témoignages</a></li>
            <li><a href="#inspiration" className="hover:text-white">Inspiration</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">Réseaux</p>
          <div className="flex gap-3">
            <a className="px-3 py-1 rounded-full bg-white text-slate-900 text-sm" href="#">Instagram</a>
            <a className="px-3 py-1 rounded-full bg-white text-slate-900 text-sm" href="#">Pinterest</a>
          </div>
          <a href="#home" className="inline-block mt-6 px-5 py-2 rounded-full text-slate-900 font-medium" style={{ backgroundColor: colors.moss }}>Remonter</a>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-white/10 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Maison-Scandinave.com — Tous droits réservés.</p>
        <p>Design hygge, épuré et chaleureux.</p>
      </div>
    </div>
  </footer>
)

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Poppins, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
      <Header />
      <Hero />
      <Products />
      <WhyUs />
      <Testimonials />
      <Gallery />
      <Footer />
    </div>
  )
}
