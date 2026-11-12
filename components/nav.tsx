'use client';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
const links = [['Services','#services'],['My Approach','#approach'],['How It Works','#process'],['About','#about'],['Portfolio','https://www.kendrahartnett.com']];
export function Nav() {
  const [open,setOpen] = useState(false);
  return <header className="site-nav"><div className="container nav-inner"><a href="#top" className="brand" aria-label="Kendra Hartnett, back to top"><span className="monogram">KH<span>.</span></span><span className="brand-text"><strong>Kendra Hartnett</strong><small>INDEPENDENT SOFTWARE & AUTOMATION</small></span></a><nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">{links.map(([label,href]) => <a key={label} href={href} onClick={() => setOpen(false)} {...(href.startsWith('http') ? { target:'_blank', rel:'noopener noreferrer' } : {})}>{label}{label === 'Portfolio' && <ArrowUpRight size={13}/>}</a>)}<a className="button button-primary nav-contact" href="#contact" onClick={() => setOpen(false)}>Let’s Talk <ArrowUpRight size={15}/></a></nav><button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div></header>;
}
