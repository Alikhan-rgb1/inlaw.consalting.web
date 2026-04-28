'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const css = `
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:#fff;color:#0f172a;-webkit-font-smoothing:antialiased;overflow-x:hidden;cursor:none;}

/* ═══ CUSTOM CURSOR ═══ */
#cursor-dot{
  position:fixed;width:8px;height:8px;border-radius:50%;background:#2E447A;
  pointer-events:none;z-index:9999;transform:translate(-50%,-50%);
  transition:transform 0.1s, background 0.2s;
}
#cursor-ring{
  position:fixed;width:40px;height:40px;border-radius:50%;
  border:1.5px solid rgba(46,68,122,0.5);
  pointer-events:none;z-index:9998;transform:translate(-50%,-50%);
  transition:width 0.3s ease,height 0.3s ease,border-color 0.3s,opacity 0.3s;
}
body.cursor-hover #cursor-ring{width:60px;height:60px;border-color:#2E447A;opacity:0.7;}
body.cursor-hover #cursor-dot{transform:translate(-50%,-50%) scale(1.8);background:#2E447A;}

/* ═══ HEADER ═══ */
header{
  position:fixed;top:0;left:0;right:0;z-index:100;
  padding:20px 0;transition:all 0.4s cubic-bezier(.22,1,.36,1);
}
header.scrolled{
  background:rgba(255,255,255,0.92);backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(203,213,225,0.4);
  box-shadow:0 4px 30px rgba(0,0,0,0.06);padding:14px 0;
}
.nav-inner{max-width:1280px;margin:0 auto;padding:0 32px;display:flex;align-items:center;justify-content:space-between;}
.logo{display:flex;align-items:center;gap:12px;}
.logo-icon{
  width:42px;height:42px;border-radius:50%;background:#2E447A;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  box-shadow:0 4px 14px rgba(46,68,122,0.35);
  transition:transform 0.3s,box-shadow 0.3s;
}
.logo-img{
  width:42px;height:42px;flex-shrink:0;
  object-fit:contain;
  filter:drop-shadow(0 6px 16px rgba(2,6,23,0.18));
  transition:transform 0.3s,filter 0.3s;
}
.logo:hover .logo-icon{transform:scale(1.08);box-shadow:0 8px 24px rgba(46,68,122,0.45);}
.logo:hover .logo-img{transform:scale(1.06);filter:drop-shadow(0 10px 22px rgba(2,6,23,0.22));}
.logo-icon svg{width:22px;height:22px;fill:#fff;}
.logo-sub{font-size:9px;font-weight:700;color:#94a3b8;letter-spacing:.2em;text-transform:uppercase;display:block;}
.logo-name{font-size:17px;font-weight:800;color:#0f172a;letter-spacing:-.02em;display:block;}
.nav-pill{
  display:flex;align-items:center;gap:2px;
  background:rgba(241,245,249,0.9);border:1px solid rgba(203,213,225,0.6);
  border-radius:100px;padding:5px;backdrop-filter:blur(12px);
}
.nav-pill a{
  padding:8px 18px;font-size:13.5px;font-weight:500;color:#475569;
  border-radius:100px;transition:all 0.25s;white-space:nowrap;
}
.nav-pill a:hover{background:#fff;color:#0f172a;box-shadow:0 2px 8px rgba(0,0,0,0.09);}
.nav-actions{display:flex;align-items:center;gap:12px;}
.lang-switch{
  display:flex;align-items:center;gap:2px;
  background:rgba(241,245,249,0.9);border:1px solid rgba(203,213,225,0.6);
  border-radius:100px;padding:5px;backdrop-filter:blur(12px);
}
.lang-btn{
  padding:8px 12px;font-size:12px;font-weight:800;color:#475569;
  border-radius:100px;background:transparent;border:0;cursor:pointer;
  transition:all 0.25s;
}
.lang-btn:hover{background:#fff;color:#0f172a;box-shadow:0 2px 8px rgba(0,0,0,0.09);}
.lang-btn.active{background:#2E447A;color:#fff;box-shadow:0 4px 14px rgba(46,68,122,0.25);}
.btn-nav{
  padding:10px 22px;font-size:14px;font-weight:700;
  background:#2E447A;color:#fff;border-radius:10px;
  box-shadow:0 4px 14px rgba(46,68,122,0.3);
  transition:all 0.25s;
}
.btn-nav:hover{background:#1e2f57;transform:translateY(-2px);box-shadow:0 8px 24px rgba(46,68,122,0.4);}

/* ═══ HERO ═══ */
.hero{
  position:relative;min-height:100vh;
  display:flex;align-items:center;overflow:hidden;
}
.hero-bg{
  position:absolute;inset:0;z-index:0;
  background:url('/1.jpg') center/cover no-repeat;
  filter:brightness(1.06) contrast(.98) saturate(.98);
  transform:scale(1.03);
  will-change:transform;
}
.hero-bg::after{
  content:'';position:absolute;inset:0;
  background:
    linear-gradient(90deg, rgba(255,255,255,1.00) 0%, rgba(255,255,255,0.96) 46%, rgba(255,255,255,0.70) 78%, rgba(255,255,255,0.44) 100%),
    linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.42) 60%, rgba(15,23,42,0.10) 100%),
    linear-gradient(0deg, rgba(255,255,255,0.34), rgba(255,255,255,0.34));
}
.hero-wrap{position:relative;z-index:2;padding-top:120px;padding-bottom:80px;}
.hero-content{max-width:680px;margin-left:-600px;text-align:left;}
.hero-badge{
  display:inline-flex;align-items:center;gap:10px;margin-bottom:32px;
  opacity:0;animation:fadeUp .8s cubic-bezier(.22,1,.36,1) .3s both;
}
.hero-badge-pill{
  display:flex;align-items:center;gap:8px;
  background:rgba(46,68,122,0.08);border:1px solid rgba(46,68,122,0.2);
  border-radius:100px;padding:6px 16px;
  font-size:12px;font-weight:600;color:#2E447A;letter-spacing:.1em;text-transform:uppercase;
}
.hero-badge-pill .live{width:7px;height:7px;border-radius:50%;background:#22c55e;animation:livepulse 2s infinite;}
.hero-h1{
  font-size:clamp(48px,6vw,90px);font-weight:900;
  color:#0f172a;line-height:0.98;letter-spacing:-.04em;
  margin-bottom:28px;
}
.hero-h1 .line{display:block;overflow:visible;clip-path:inset(0 -1.2em 0 0);}
.hero-h1 .inner{
  display:block;transform:translateY(110%);opacity:0;
  animation:slideUp .9s cubic-bezier(.22,1,.36,1) both;
}
.hero-h1 .inner .blue{color:#2E447A;}
.hero-desc{
  font-size:19px;color:#475569;max-width:560px;line-height:1.7;margin-bottom:36px;
  opacity:0;animation:fadeUp .8s cubic-bezier(.22,1,.36,1) .9s both;
}
.hero-dots{
  display:flex;flex-wrap:wrap;gap:18px;margin-bottom:40px;
  opacity:0;animation:fadeUp .8s cubic-bezier(.22,1,.36,1) 1.05s both;
}
.hero-dots div{display:flex;align-items:center;gap:8px;font-size:14.5px;font-weight:500;color:#1e293b;}
.hero-dot{width:8px;height:8px;border-radius:50%;background:#2E447A;flex-shrink:0;}
.hero-ctas{
  display:flex;gap:14px;flex-wrap:wrap;margin-bottom:16px;
  opacity:0;animation:fadeUp .8s cubic-bezier(.22,1,.36,1) 1.2s both;
}
.btn-hero-primary{
  display:inline-flex;align-items:center;gap:10px;
  padding:16px 32px;font-size:15px;font-weight:700;
  background:#2E447A;color:#fff;border-radius:12px;
  box-shadow:0 8px 28px rgba(46,68,122,0.38);
  transition:all .3s cubic-bezier(.22,1,.36,1);position:relative;overflow:hidden;
}
.btn-hero-primary::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);
  opacity:0;transition:opacity .3s;
}
.btn-hero-primary:hover{transform:translateY(-3px);box-shadow:0 16px 40px rgba(46,68,122,0.45);}
.btn-hero-primary:hover::before{opacity:1;}
.btn-hero-secondary{
  display:inline-flex;align-items:center;gap:10px;
  padding:16px 32px;font-size:15px;font-weight:600;
  background:#fff;color:#2E447A;border-radius:12px;
  border:1.5px solid rgba(46,68,122,0.25);
  transition:all .3s cubic-bezier(.22,1,.36,1);
}
.btn-hero-secondary:hover{background:#f0f5ff;border-color:#2E447A;transform:translateY(-2px);}
.hero-note{font-size:12.5px;color:#94a3b8;font-weight:500;opacity:0;animation:fadeUp .8s cubic-bezier(.22,1,.36,1) 1.3s both;}

/* ═══ NUMBERS ═══ */
.numbers{
  background:#2E447A;padding:60px 0;overflow:hidden;position:relative;
}
.numbers::before{
  content:'';position:absolute;inset:0;
  background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.numbers-grid{max-width:1280px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative;}
.numbers-grid::before{content:'';display:none;}
.num-item{text-align:center;padding:0 24px;border-right:1px solid rgba(255,255,255,0.12);}
.num-item:last-child{border-right:none;}
.num-val{font-size:72px;font-weight:900;color:#fff;letter-spacing:-.05em;line-height:1;margin-bottom:10px;}
.num-val em{color:rgba(255,255,255,0.55);font-style:normal;font-size:48px;font-weight:800;}
.num-label{font-size:13px;color:rgba(255,255,255,0.65);letter-spacing:.08em;text-transform:uppercase;font-weight:500;}

/* ═══ GENERIC SECTION ═══ */
section{padding:100px 0;}
.wrap{max-width:1280px;margin:0 auto;padding:0 32px;}
.badge{
  display:inline-flex;align-items:center;gap:6px;
  font-size:11.5px;font-weight:700;color:#2E447A;letter-spacing:.12em;text-transform:uppercase;
  background:#eff6ff;padding:5px 14px;border-radius:100px;
  border:1px solid rgba(46,68,122,0.14);margin-bottom:18px;
}
.sec-h2{font-size:clamp(32px,4vw,54px);font-weight:900;color:#0f172a;letter-spacing:-.03em;line-height:1.08;margin-bottom:16px;}
.sec-sub{font-size:17px;color:#64748b;line-height:1.65;}
.sec-head-split{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:60px;gap:48px;flex-wrap:wrap;}

/* reveal */
.r{opacity:0;transform:translateY(32px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
.r.in{opacity:1;transform:none;}
.rl{opacity:0;transform:translateX(-32px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
.rl.in{opacity:1;transform:none;}
.rr{opacity:0;transform:translateX(32px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
.rr.in{opacity:1;transform:none;}
.d1{transition-delay:.06s;} .d2{transition-delay:.14s;} .d3{transition-delay:.22s;}
.d4{transition-delay:.30s;} .d5{transition-delay:.38s;} .d6{transition-delay:.46s;}

/* ═══ JURISDICTIONS ═══ */
.juri-bg{background:#f8fafc;}
.juri-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.jcard{
  background:#fff;border-radius:20px;padding:32px;
  border:2px solid rgba(46,68,122,0.20);
  transition:all .4s cubic-bezier(.22,1,.36,1);
  position:relative;overflow:hidden;
  transform-style:preserve-3d;
}
.jcard-glow{
  position:absolute;top:-60px;right:-60px;width:160px;height:160px;
  border-radius:50%;
  background:radial-gradient(circle, rgba(46,68,122,0.08), transparent 70%);
  transition:all .4s;pointer-events:none;
}
.jcard:hover{box-shadow:0 24px 60px rgba(46,68,122,0.16);transform:translateY(-6px);border-color:#93c5fd;}
.jcard:hover .jcard-glow{transform:scale(1.5);}
.jcard-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.jcard-code{font-size:10.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#2E447A;background:#eff6ff;padding:4px 10px;border-radius:100px;}
.jcard h3{font-size:26px;font-weight:800;color:#0f172a;margin-bottom:4px;letter-spacing:-.02em;}
.jcard-country{font-size:13px;color:#64748b;margin-bottom:18px;}
.jcard-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;}
.tag{font-size:12px;padding:4px 10px;border-radius:100px;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;}
.jcard-contact{font-size:13px;color:#64748b;padding-top:14px;border-top:1px solid #f1f5f9;line-height:1.55;}
.jcard-tel{color:#2E447A;font-weight:700;font-size:13px;margin-top:4px;display:block;}
.jcard-portal{margin-top:14px;padding-top:14px;border-top:1px solid rgba(46,68,122,0.10);}
.jportal{
  display:flex;align-items:center;justify-content:center;gap:8px;
  width:100%;padding:10px 14px;border-radius:12px;
  background:linear-gradient(135deg,var(--brand),rgba(79,131,227,0.92));
  border:1px solid rgba(255,255,255,0.18);
  color:#fff;font-size:12px;font-weight:800;letter-spacing:.02em;
  box-shadow:0 12px 30px rgba(46,68,122,0.22);
  transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s cubic-bezier(.22,1,.36,1);
}
.jportal:hover{transform:translateY(-2px);box-shadow:0 18px 44px rgba(46,68,122,0.28);}
.jportal svg{width:14px;height:14px;transition:transform .25s cubic-bezier(.22,1,.36,1);}
.jportal:hover svg{transform:translateX(3px);}

/* ═══ SERVICES ═══ */
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:48px;}
.scard{
  background:#fff;border-radius:20px;padding:32px 28px;
  border:2px solid rgba(46,68,122,0.18);
  box-shadow:0 1px 4px rgba(0,0,0,0.04);
  transition:all .4s cubic-bezier(.22,1,.36,1);
  position:relative;overflow:hidden;
}
.scard::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,#2E447A,#4f83e3);
  transform:scaleX(0);transform-origin:left;
  transition:transform .35s cubic-bezier(.22,1,.36,1);
}
.scard:hover{box-shadow:0 20px 56px rgba(46,68,122,0.14);transform:translateY(-6px);border-color:#bfdbfe;}
.scard:hover::after{transform:scaleX(1);}
.scard-icon{
  width:64px;height:64px;background:#eff6ff;border-radius:16px;
  display:flex;align-items:center;justify-content:center;margin-bottom:24px;
  transition:all .3s;
}
.scard:hover .scard-icon{background:#dbeafe;transform:scale(1.1) rotate(-4deg);}
.scard-icon svg{width:32px;height:32px;}
.scard h3{font-size:19px;font-weight:800;color:#0f172a;margin-bottom:10px;letter-spacing:-.01em;transition:color .2s;}
.scard:hover h3{color:#2E447A;}
.scard p{font-size:14px;color:#64748b;line-height:1.65;}

/* ═══ SOLUTIONS ═══ */
.sol-bg{background:#f8fafc;}
.sol-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
.solcard{
  background:#fff;border-radius:24px;padding:40px;
  border:2px solid rgba(46,68,122,0.18);
  transition:all .4s cubic-bezier(.22,1,.36,1);
  display:flex;flex-direction:column;
  position:relative;overflow:hidden;
}
.solcard-shine{
  position:absolute;top:0;left:-100%;width:60%;height:100%;
  background:linear-gradient(105deg,transparent,rgba(255,255,255,0.4),transparent);
  transition:left .6s;pointer-events:none;
}
.solcard:hover .solcard-shine{left:150%;}
.solcard:hover{box-shadow:0 24px 64px rgba(46,68,122,0.15);transform:translateY(-6px);border-color:#93c5fd;}
.sol-tag{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#2E447A;margin-bottom:16px;display:block;}
.solcard h3{font-size:30px;font-weight:900;color:#0f172a;letter-spacing:-.025em;margin-bottom:14px;line-height:1.15;}
.solcard p{font-size:15px;color:#64748b;line-height:1.65;flex:1;margin-bottom:28px;}
.sol-footer{display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid #f1f5f9;}
.sol-meta{font-size:12px;color:#94a3b8;font-weight:500;letter-spacing:.06em;text-transform:uppercase;}
.sol-link{font-size:14px;font-weight:700;color:#2E447A;display:flex;align-items:center;gap:6px;transition:gap .25s;}
.solcard:hover .sol-link{gap:12px;}

/* ═══ WHY ═══ */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.wcard{
  padding:36px;border-radius:20px;
  background:#f8fafc;border:2px solid rgba(46,68,122,0.16);
  transition:all .4s cubic-bezier(.22,1,.36,1);
}
.wcard:hover{background:#fff;box-shadow:0 16px 48px rgba(46,68,122,0.12);border-color:#bfdbfe;transform:translateY(-4px);}
.wcard-icon{
  width:52px;height:52px;border-radius:14px;
  background:#eff6ff;display:flex;align-items:center;justify-content:center;
  margin-bottom:24px;transition:all .3s;
}
.wcard:hover .wcard-icon{background:#dbeafe;transform:rotate(-6deg) scale(1.12);}
.wcard-icon svg{width:26px;height:26px;stroke:#2E447A;fill:none;stroke-width:1.5;}
.wcard h3{font-size:18px;font-weight:800;color:#0f172a;margin-bottom:10px;}
.wcard p{font-size:14px;color:#64748b;line-height:1.65;}

/* ═══ PROCESS ═══ */
.proc-bg{background:#f8fafc;}
.proc-wrap{position:relative;}
.proc-line-track{
  position:absolute;top:32px;left:10%;right:10%;height:2px;
  background:#e2e8f0;z-index:0;
}
.proc-line-fill{
  height:100%;background:linear-gradient(90deg,#2E447A,#4f83e3);
  transform-origin:left;transform:scaleX(0);
  transition:transform 1.4s cubic-bezier(.22,1,.36,1);
}
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:32px;position:relative;z-index:1;}
.pstep{text-align:center;}
.pnum{
  width:64px;height:64px;border-radius:50%;
  background:#fff;border:2px solid #2E447A;
  color:#2E447A;font-size:22px;font-weight:900;
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 24px;
  transition:all .35s cubic-bezier(.22,1,.36,1);
  position:relative;z-index:2;
  box-shadow:0 2px 12px rgba(46,68,122,0.1);
}
.pstep:hover .pnum{background:#2E447A;color:#fff;box-shadow:0 10px 28px rgba(46,68,122,0.38);transform:scale(1.12);}
.pstep-lbl{font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;}
.pstep h3{font-size:18px;font-weight:800;color:#0f172a;margin-bottom:10px;}
.pstep p{font-size:14px;color:#64748b;line-height:1.65;}

/* ═══ TEAM ═══ */
.team-group-hd{
  font-size:11px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  color:#94a3b8;padding-bottom:14px;border-bottom:1px solid #e2e8f0;margin:56px 0 28px;
}
.team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.tcard{position:relative;}
.tphoto{
  aspect-ratio:3/4;border-radius:16px;overflow:hidden;
  background:#f1f5f9;margin-bottom:16px;border:2px solid rgba(46,68,122,0.16);
  position:relative;
}
.tphoto img{
  width:100%;height:100%;object-fit:cover;object-position:center top;
  filter:grayscale(.35);transition:filter .5s,transform .6s cubic-bezier(.22,1,.36,1);
}
.tcard:hover .tphoto img{filter:grayscale(0);transform:scale(1.06);}
.tphoto-overlay{
  position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 50%,rgba(46,68,122,0.7));
  opacity:0;transition:opacity .4s;
  display:flex;align-items:flex-end;padding:16px;
}
.tcard:hover .tphoto-overlay{opacity:1;}
.tphoto-overlay-text{color:#fff;font-size:12px;font-weight:600;}
.tcard h4{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:4px;}
.trole{font-size:11.5px;font-weight:700;color:#2E447A;letter-spacing:.07em;text-transform:uppercase;margin-bottom:8px;}
.tbio{font-size:13px;color:#64748b;line-height:1.6;}

/* ═══ CERTS ═══ */
.cert-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
.cert-item{
  background:#fff;border-radius:20px;padding:24px;
  border:2px solid rgba(46,68,122,0.18);min-height:300px;
  display:flex;align-items:center;justify-content:center;overflow:hidden;
  transition:box-shadow .3s,transform .4s cubic-bezier(.22,1,.36,1);
}
.cert-item:hover{box-shadow:0 20px 56px rgba(0,0,0,0.1);transform:translateY(-4px);}
.cert-item img{max-width:100%;max-height:100%;object-fit:contain;}

/* ═══ CONTACT ═══ */
.contact-wrap{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
.contact-rows{margin-top:40px;}
.crow{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid #f1f5f9;font-size:14px;}
.crow .k{color:#94a3b8;font-weight:500;}
.crow .v{color:#0f172a;font-weight:700;}
.cform{
  background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:24px;padding:40px;
}
.field{margin-bottom:20px;}
.field label{display:block;font-size:11.5px;font-weight:700;color:#64748b;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;}
.field input,.field textarea,.field select{
  width:100%;padding:13px 16px;
  background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;
  font-size:15px;color:#0f172a;font-family:inherit;outline:none;
  transition:border-color .2s,box-shadow .2s;
}
.field input:focus,.field textarea:focus,.field select:focus{border-color:#2E447A;box-shadow:0 0 0 4px rgba(46,68,122,0.1);}
.field textarea{resize:none;min-height:90px;}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.submit-btn{
  width:100%;padding:16px;font-size:16px;font-weight:800;
  background:#2E447A;color:#fff;border:none;border-radius:12px;
  cursor:none;font-family:inherit;margin-top:8px;
  box-shadow:0 8px 24px rgba(46,68,122,0.35);
  transition:all .3s cubic-bezier(.22,1,.36,1);
  display:flex;align-items:center;justify-content:center;gap:10px;
}
.submit-btn:hover{background:#1e2f57;box-shadow:0 16px 40px rgba(46,68,122,0.45);transform:translateY(-2px);}

/* ═══ FOOTER ═══ */
footer{background:#fff;border-top:1px solid #e2e8f0;padding:72px 0 36px;}
.foot-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:24px;margin-bottom:56px;}
.foot-col h5{font-size:11px;font-weight:800;color:#0f172a;letter-spacing:.16em;text-transform:uppercase;margin-bottom:14px;}
.foot-col p{font-size:12.5px;color:#64748b;line-height:1.65;margin-bottom:6px;}
.foot-col a{font-size:12.5px;color:#4f46e5;font-weight:600;display:block;margin-top:4px;transition:color .2s;}
.foot-col a:hover{color:#2E447A;}
.foot-bot{border-top:1px solid #f1f5f9;padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
.foot-legal{font-size:12px;color:#64748b;}
.foot-legal b{color:#0f172a;display:block;font-size:13px;margin-bottom:2px;}
.foot-copy{font-size:12px;color:#94a3b8;}

/* ═══ KEYFRAMES ═══ */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:none;}}
@keyframes slideUp{from{transform:translateY(110%);opacity:0;}to{transform:none;opacity:1;}}
@keyframes livepulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4);}50%{box-shadow:0 0 0 6px rgba(34,197,94,0);}}

:root{
  --bg:#f7f8fb;
  --surface:#ffffff;
  --surface2:#f8fafc;
  --ink:#0b1220;
  --muted:#475569;
  --muted2:#64748b;
  --line:rgba(15,23,42,0.10);
  --brand:#2E447A;
  --brand2:#4f83e3;
  --shadow:0 22px 70px rgba(2,6,23,0.10);
  --shadow2:0 10px 30px rgba(2,6,23,0.08);
  --radius:24px;
}

body{
  background:
    radial-gradient(900px 600px at 8% 8%, rgba(79,131,227,0.14), transparent 55%),
    radial-gradient(900px 600px at 92% 18%, rgba(46,68,122,0.12), transparent 55%),
    radial-gradient(700px 520px at 55% 95%, rgba(15,23,42,0.06), transparent 60%),
    var(--bg);
  color:var(--ink);
}

header{padding:18px 0;}
header.scrolled{
  background:rgba(255,255,255,0.86);
  border-bottom:1px solid rgba(148,163,184,0.22);
  box-shadow:0 10px 40px rgba(2,6,23,0.08);
}

.nav-pill{
  background:rgba(255,255,255,0.55);
  border:1px solid rgba(148,163,184,0.26);
  box-shadow:0 10px 40px rgba(2,6,23,0.06);
}
.nav-pill a{color:rgba(15,23,42,0.70);}
.nav-pill a:hover{
  background:rgba(255,255,255,0.92);
  box-shadow:0 10px 30px rgba(2,6,23,0.08);
}

.btn-nav{
  background:linear-gradient(135deg,var(--brand),rgba(79,131,227,0.85));
  border:1px solid rgba(255,255,255,0.18);
  box-shadow:0 16px 40px rgba(46,68,122,0.24);
}
.btn-nav:hover{background:linear-gradient(135deg,#223463,#3f73d6);}

.hero-bg::after{
  background:
    linear-gradient(90deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.56) 46%, rgba(255,255,255,0.22) 78%, rgba(255,255,255,0.10) 100%),
    linear-gradient(0deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12)),
    linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.00) 60%, rgba(15,23,42,0.10) 100%);
}

.hero-desc{color:var(--muted);max-width:620px;}
.hero-dots div{color:rgba(15,23,42,0.82);}
.hero-dot{background:linear-gradient(180deg,var(--brand),var(--brand2));}

.btn-hero-primary{
  background:linear-gradient(135deg,var(--brand),rgba(79,131,227,0.92));
  border:1px solid rgba(255,255,255,0.18);
  box-shadow:0 18px 60px rgba(46,68,122,0.28);
}
.btn-hero-primary:hover{box-shadow:0 26px 78px rgba(46,68,122,0.32);}
.btn-hero-secondary{
  background:rgba(255,255,255,0.82);
  border:1px solid rgba(46,68,122,0.20);
  box-shadow:0 12px 30px rgba(2,6,23,0.06);
}
.btn-hero-secondary:hover{background:#ffffff;border-color:rgba(46,68,122,0.34);box-shadow:0 16px 44px rgba(2,6,23,0.08);}

.numbers{
  background:
    radial-gradient(900px 520px at 20% 0%, rgba(79,131,227,0.35), transparent 55%),
    radial-gradient(900px 520px at 80% 0%, rgba(46,68,122,0.30), transparent 55%),
    linear-gradient(135deg,#1a2a4f,#2E447A);
}
.numbers::before{opacity:0.8;}

.juri-bg,.sol-bg,.proc-bg{background:rgba(248,250,252,0.75);}
#services,#about,#contact{background:rgba(248,250,252,0.75);}
.wcard{background:rgba(255,255,255,0.55);border-color:rgba(148,163,184,0.26);backdrop-filter:blur(12px);}
.wcard:hover{background:rgba(255,255,255,0.86);box-shadow:var(--shadow2);}

.jcard,.scard,.solcard{
  border-radius:var(--radius);
  border:2px solid rgba(46,68,122,0.26);
  box-shadow:0 1px 0 rgba(255,255,255,0.9) inset;
  background:linear-gradient(180deg, rgba(255,255,255,0.90), rgba(255,255,255,0.70));
  backdrop-filter:blur(14px);
}
.wcard{border:2px solid rgba(46,68,122,0.22);}
.cform{border-width:2px;border-color:rgba(46,68,122,0.24);}
.jcard,.scard,.solcard,.wcard,.cform{box-shadow:var(--shadow2);}
.jcard:hover,.scard:hover,.solcard:hover{box-shadow:var(--shadow);border-color:rgba(79,131,227,0.30);}

.tag{background:rgba(241,245,249,0.75);border-color:rgba(46,68,122,0.18);}
.sec-sub{color:var(--muted2);}

.cform{
  background:linear-gradient(180deg, rgba(255,255,255,0.86), rgba(248,250,252,0.70));
  border-color:rgba(148,163,184,0.26);
  box-shadow:var(--shadow2);
}
.field input,.field textarea,.field select{
  border-color:rgba(46,68,122,0.42);
  background:rgba(255,255,255,0.96);
}
.field input:focus,.field textarea:focus,.field select:focus{box-shadow:0 0 0 5px rgba(79,131,227,0.16);}

footer{
  background:rgba(255,255,255,0.70);
  backdrop-filter:blur(14px);
  border-top:1px solid rgba(148,163,184,0.22);
}
footer .foot-col a{color:var(--brand);}
footer .foot-col a:hover{color:#1e2f57;}

@media(max-width:1024px){
  .juri-grid,.svc-grid,.why-grid{grid-template-columns:repeat(2,1fr);}
  .foot-grid{grid-template-columns:repeat(2,1fr);}
  .team-grid{grid-template-columns:repeat(3,1fr);}
}
@media(max-width:768px){
  .wrap,.nav-inner{padding:0 20px;}
  section{padding:72px 0;}
  .nav-pill{display:none;}
  .hero-h1{font-size:36px;line-height:1.1;letter-spacing:-.02em;}
  .hero-h1 .line{clip-path:inset(0 -100% 0 0);margin-bottom:4px;}
  .hero-content{margin-left:0;}
  .sol-grid,.contact-wrap,.cert-grid,.why-grid,.numbers-grid,.proc-grid{grid-template-columns:1fr;}
  .team-grid{grid-template-columns:repeat(2,1fr);}
  .foot-grid{grid-template-columns:1fr 1fr;}
  .sec-head-split{flex-direction:column;align-items:flex-start;}
}

@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
`;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
}

export default function Home() {
  const { language: lang, setLanguage: applyLang, t } = useLanguage();

  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const hdr = document.getElementById('header');
    const heroBg = document.getElementById('heroBg') as HTMLElement | null;
    const numStrip = document.getElementById('numStrip');
    const procFill = document.getElementById('procFill') as HTMLElement | null;
    const procWrap = document.querySelector('.proc-wrap');

    if (!dot || !ring) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const lerp = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      rafId = requestAnimationFrame(lerp);
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(lerp);

    const hoverTargets = Array.from(
      document.querySelectorAll('a,button,.jcard,.scard,.solcard,.wcard,.tcard,.cert-item')
    );
    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const onScrollHeader = () => {
      if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 20);
      if (heroBg && window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.03)`;
      }
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.r,.rl,.rr').forEach((el) => io.observe(el));

    const runCounters = () => {
      document.querySelectorAll<HTMLElement>('.num-val[data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const em = el.querySelector('em') ? (el.querySelector('em') as HTMLElement).outerHTML : '';
        let start: number | null = null;

        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1600, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.innerHTML = `${Math.round(eased * target)}${em}`;
          if (p < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      });
    };

    const counterObs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) runCounters();
      },
      { threshold: 0.5 }
    );
    if (numStrip) counterObs.observe(numStrip);

    const procObs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && procFill) procFill.style.transform = 'scaleX(1)';
      },
      { threshold: 0.3 }
    );
    if (procWrap) procObs.observe(procWrap);

    const tiltCards = Array.from(document.querySelectorAll<HTMLElement>('.jcard,.scard,.solcard'));
    const tiltHandlers = tiltCards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
      };
      const onLeaveCard = () => {
        card.style.transform = '';
        card.style.transition = 'all .4s cubic-bezier(.22,1,.36,1)';
      };
      const onEnterCard = () => {
        card.style.transition = 'box-shadow .4s,border-color .4s,transform .1s';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeaveCard);
      card.addEventListener('mouseenter', onEnterCard);
      return { card, onMove, onLeaveCard, onEnterCard };
    });

    const magneticButtons = Array.from(
      document.querySelectorAll<HTMLElement>('.btn-hero-primary,.btn-nav,.submit-btn')
    );
    const magneticHandlers = magneticButtons.map((btn) => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.3;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        btn.style.transform = `translate(${x}px,${y}px) translateY(-2px)`;
      };
      const onLeaveBtn = () => {
        btn.style.transform = '';
      };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeaveBtn);
      return { btn, onMove, onLeaveBtn };
    });

    onScrollHeader();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScrollHeader);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      io.disconnect();
      counterObs.disconnect();
      procObs.disconnect();
      tiltHandlers.forEach(({ card, onMove, onLeaveCard, onEnterCard }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeaveCard);
        card.removeEventListener('mouseenter', onEnterCard);
      });
      magneticHandlers.forEach(({ btn, onMove, onLeaveBtn }) => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeaveBtn);
      });
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn') as HTMLButtonElement | null;
    if (!btn) return;
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation:spin .8s linear infinite"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> ${t.contact.form.sending}`;
    btn.disabled = true;
    window.setTimeout(() => {
      btn.innerHTML = `✓ ${t.contact.form.sent}`;
      btn.style.background = '#16a34a';
      btn.style.boxShadow = '0 8px 24px rgba(22,163,74,0.35)';
    }, 1400);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <style>{css}</style>

      <div id="cursor-dot" />
      <div id="cursor-ring" />

      <header id="header">
        <div className="nav-inner">
          <a href="#" className="logo">
            <img className="logo-img" src="/logo.png" alt="INLAW" />
            <div>
              <span className="logo-sub">{t.header.brandSubtitle}</span>
              <span className="logo-name">{t.header.brandName}</span>
            </div>
          </a>
          <nav className="nav-pill">
            <a href="#services" onClick={(e) => go(e, 'services')}>
              {t.header.services}
            </a>
            <a href="#solutions" onClick={(e) => go(e, 'solutions')}>
              {t.header.solutions}
            </a>
            <a href="#about" onClick={(e) => go(e, 'about')}>
              {t.header.about}
            </a>
            <a href="#jurisdictions" onClick={(e) => go(e, 'jurisdictions')}>
              {t.header.jurisdictions}
            </a>
            <a href="#process" onClick={(e) => go(e, 'process')}>
              {t.header.process}
            </a>
          </nav>
          <div className="nav-actions">
            <div className="lang-switch" role="group" aria-label="Language">
              <button type="button" className={`lang-btn ${lang === 'EN' ? 'active' : ''}`} onClick={() => applyLang('EN')}>
                EN
              </button>
              <button type="button" className={`lang-btn ${lang === 'RU' ? 'active' : ''}`} onClick={() => applyLang('RU')}>
                RU
              </button>
              <button type="button" className={`lang-btn ${lang === 'CHI' ? 'active' : ''}`} onClick={() => applyLang('CHI')}>
                CHI
              </button>
            </div>
            <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn-nav">
              {t.hero.getConsultation}
            </a>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-bg" id="heroBg" />
        <div className="wrap hero-wrap">
          <div className="hero-content">
            <div className="hero-badge">
              <div className="hero-badge-pill">
                <span className="live" />
                {t.hero.badge}
              </div>
            </div>
            <h1 className="hero-h1">
              {t.hero.titleLines.map((line, i) => (
                <span className="line" key={i}>
                  <span className="inner" style={{ animationDelay: `${0.5 + i * 0.15}s` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="hero-desc">
              {t.hero.description}
            </p>
            <div className="hero-dots">
              <div>
                <span className="hero-dot" />
                {t.hero.aifc}
              </div>
              <div>
                <span className="hero-dot" />
                {t.hero.dubai}
              </div>
              <div>
                <span className="hero-dot" />
                {t.hero.bishkek}
              </div>
              <div>
                <span className="hero-dot" />
                {t.hero.shanghai}
              </div>
            </div>
            <div className="hero-ctas">
              <a href="#contact" onClick={(e) => go(e, 'contact')} className="btn-hero-primary">
                {t.hero.getConsultation}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#services" onClick={(e) => go(e, 'services')} className="btn-hero-secondary">
                {t.hero.ourServices}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
            <p className="hero-note">{t.hero.disclaimer}</p>
          </div>
        </div>
      </section>

      <div className="numbers" id="numStrip">
        <div className="numbers-grid">
          <div className="num-item r d1">
            <div className="num-val" data-count="500">
              0<em>+</em>
            </div>
            <div className="num-label">{t.stats.strip.companiesRegistered}</div>
          </div>
          <div className="num-item r d2">
            <div className="num-val" data-count="50">
              0<em>+</em>
            </div>
            <div className="num-label">{t.stats.strip.licensesObtained}</div>
          </div>
          <div className="num-item r d3">
            <div className="num-val">4</div>
            <div className="num-label">{t.stats.strip.jurisdictionsOffices}</div>
          </div>
          <div className="num-item r d4">
            <div className="num-val" data-count="10">
              0<em>+</em>
            </div>
            <div className="num-label">{t.stats.strip.yearsOfPractice}</div>
          </div>
        </div>
      </div>

      <section className="juri-bg" id="jurisdictions">
        <div className="wrap">
          <div className="sec-head-split">
            <div>
              <div className="badge r">{t.geography.badge}</div>
              <h2 className="sec-h2 r d1">
                {t.geography.title}
              </h2>
            </div>
            <p className="sec-sub rr" style={{ maxWidth: 400 }}>
              {t.geography.subtitle}
            </p>
          </div>
          <div className="juri-grid">
            <div className="jcard r d1">
              <div className="jcard-glow" />
              <div className="jcard-top">
                <div className="jcard-code">{t.jurisdictions.cards.astana.code}</div>
              </div>
              <h3>{t.geography.cities.astana}</h3>
              <div className="jcard-country">{t.jurisdictions.cards.astana.subtitle}</div>
              <div className="jcard-tags">
                <span className="tag">{t.geography.serviceList.aifc}</span>
                <span className="tag">{t.geography.serviceList.corporateServices}</span>
                <span className="tag">{t.geography.serviceList.legalAdvisory}</span>
              </div>
              <div className="jcard-contact">
                1 Heydar Aliyev St
                <br />
                <span className="jcard-tel">+7 700 146 6646 · +7 700 146 6601</span>
              </div>
            </div>
            <div className="jcard r d2">
              <div className="jcard-glow" />
              <div className="jcard-top">
                <div className="jcard-code">{t.jurisdictions.cards.dubai.code}</div>
              </div>
              <h3>{t.geography.cities.dubai}</h3>
              <div className="jcard-country">{t.jurisdictions.cards.dubai.subtitle}</div>
              <div className="jcard-tags">
                <span className="tag">{t.geography.serviceList.companyRegistration}</span>
                <span className="tag">{t.geography.serviceList.bankingSupport}</span>
                <span className="tag">{t.geography.serviceList.licensing}</span>
              </div>
              <div className="jcard-contact">
                IFZA Business Park · Building A2 · Dubai Silicon Oasis
                <br />
                <span className="jcard-tel">+971 52 352 4196</span>
              </div>
              <div className="jcard-portal">
                <a className="jportal" href="/dubai">
                  {t.common.clientPortal}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="jcard r d3">
              <div className="jcard-glow" />
              <div className="jcard-top">
                <div className="jcard-code">{t.jurisdictions.cards.bishkek.code}</div>
              </div>
              <h3>{t.geography.cities.bishkek}</h3>
              <div className="jcard-country">{t.jurisdictions.cards.bishkek.subtitle}</div>
              <div className="jcard-tags">
                <span className="tag">{t.geography.serviceList.companyRegistration}</span>
                <span className="tag">{t.geography.serviceList.bankingSupport}</span>
                <span className="tag">{t.geography.serviceList.taxOptimization}</span>
              </div>
              <div className="jcard-contact">
                109/1 Turusbekov St, office 508
                <br />
                <span className="jcard-tel">+996 999 100 588</span>
              </div>
            </div>
            <div className="jcard r d1">
              <div className="jcard-glow" />
              <div className="jcard-top">
                <div className="jcard-code">{t.jurisdictions.cards.shanghai.code}</div>
              </div>
              <h3>{t.geography.cities.shanghai}</h3>
              <div className="jcard-country">{t.jurisdictions.cards.shanghai.subtitle}</div>
              <div className="jcard-tags">
                <span className="tag">{t.geography.serviceList.tradeStructure}</span>
                <span className="tag">{t.geography.serviceList.sourcing}</span>
                <span className="tag">{t.geography.serviceList.logisticsControl}</span>
              </div>
              <div className="jcard-contact">
                金丰路555弄9R 103 · Minhang · Shanghai
                <br />
                <span className="jcard-tel">+86 139 1871 9943</span>
              </div>
            </div>
            <div className="jcard r d2">
              <div className="jcard-glow" />
              <div className="jcard-top">
                <div className="jcard-code">{t.jurisdictions.cards.almaty.code}</div>
              </div>
              <h3>{t.geography.cities.almaty}</h3>
              <div className="jcard-country">{t.jurisdictions.cards.almaty.subtitle}</div>
              <div className="jcard-tags">
                <span className="tag">{t.geography.serviceList.businessConsulting}</span>
                <span className="tag">{t.geography.serviceList.representativeOffice}</span>
              </div>
              <div className="jcard-contact">
                303 Baizakov St
                <br />
                <span className="jcard-tel">+7 777 384 9913</span>
              </div>
            </div>
            <div
              className="jcard r d3"
              style={{ background: 'linear-gradient(135deg,#eff6ff,#f0f9ff)', borderColor: '#bfdbfe' }}
            >
              <div className="jcard-glow" />
              <div className="jcard-top">
                <div className="jcard-code" style={{ background: '#dbeafe' }}>
                  2025+
                </div>
              </div>
              <h3 style={{ color: '#2E447A' }}>
                {t.jurisdictions.nextMarket.title}
              </h3>
              <div className="jcard-country">{t.jurisdictions.nextMarket.subtitle}</div>
              <div className="jcard-tags">
                <span className="tag" style={{ background: '#dbeafe', borderColor: '#93c5fd' }}>
                  {t.jurisdictions.nextMarket.tag1}
                </span>
                <span className="tag" style={{ background: '#dbeafe', borderColor: '#93c5fd' }}>
                  {t.jurisdictions.nextMarket.tag2}
                </span>
              </div>
              <div className="jcard-contact" style={{ borderColor: '#dbeafe' }}>
                {t.jurisdictions.nextMarket.description}
                <br />
                <span className="jcard-tel">{t.jurisdictions.nextMarket.cta}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 56px' }}>
            <div className="badge r">{t.servicesSection.badge}</div>
            <h2 className="sec-h2 r d1">{t.servicesSection.title}</h2>
            <p className="sec-sub r d2">{t.servicesSection.subtitle}</p>
          </div>
          <div className="svc-grid">
            <div className="scard r d1">
              <div className="scard-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4f46e5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                  />
                </svg>
              </div>
              <h3>{t.servicesSection.items.companyRegistration.title}</h3>
              <p>{t.servicesSection.items.companyRegistration.description}</p>
            </div>
            <div className="scard r d2">
              <div className="scard-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4f46e5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              </div>
              <h3>{t.servicesSection.items.bankAccountOpening.title}</h3>
              <p>{t.servicesSection.items.bankAccountOpening.description}</p>
            </div>
            <div className="scard r d3">
              <div className="scard-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4f46e5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3>{t.servicesSection.items.financialLicensing.title}</h3>
              <p>{t.servicesSection.items.financialLicensing.description}</p>
            </div>
            <div className="scard r d4">
              <div className="scard-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#4f46e5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3>{t.servicesSection.items.corporateManagement.title}</h3>
              <p>{t.servicesSection.items.corporateManagement.description}</p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }} className="r">
            <a href="/services" className="btn-hero-primary" style={{ display: 'inline-flex', fontSize: 15, padding: '14px 32px' }}>
              {t.servicesSection.allServices}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="sol-bg" id="solutions">
        <div className="wrap">
          <div style={{ maxWidth: 580, marginBottom: 56 }}>
            <div className="badge r">{t.solutionsSection.badge}</div>
            <h2 className="sec-h2 r d1">
              {t.solutionsSection.titleLines[0]}
              <br />
              {t.solutionsSection.titleLines[1]}
            </h2>
            <p className="sec-sub r d2">{t.solutionsSection.subtitle}</p>
          </div>
          <div className="sol-grid">
            <a className="solcard r d1" href="/solutions/aifc-company-account">
              <div className="solcard-shine" />
              <span className="sol-tag">{t.solutionsSection.items.aifc.tag}</span>
              <h3>{t.solutionsSection.items.aifc.title}</h3>
              <p>{t.solutionsSection.items.aifc.description}</p>
              <div className="sol-footer">
                <span className="sol-meta">{t.solutionsSection.items.aifc.meta}</span>
                <span className="sol-link">
                  {t.solutionsSection.learnMoreShort}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
            <a className="solcard r d2" href="/solutions/dubai-uae">
              <div className="solcard-shine" />
              <span className="sol-tag">{t.solutionsSection.items.dubai.tag}</span>
              <h3>{t.solutionsSection.items.dubai.title}</h3>
              <p>{t.solutionsSection.items.dubai.description}</p>
              <div className="sol-footer">
                <span className="sol-meta">{t.solutionsSection.items.dubai.meta}</span>
                <span className="sol-link">
                  {t.solutionsSection.learnMoreShort}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
            <a className="solcard r d3" href="/solutions/holding-kz-uae">
              <div className="solcard-shine" />
              <span className="sol-tag">{t.solutionsSection.items.holding.tag}</span>
              <h3>{t.solutionsSection.items.holding.title}</h3>
              <p>{t.solutionsSection.items.holding.description}</p>
              <div className="sol-footer">
                <span className="sol-meta">{t.solutionsSection.items.holding.meta}</span>
                <span className="sol-link">
                  {t.solutionsSection.learnMoreShort}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
            <a className="solcard r d4" href="/solutions/fintech-launch">
              <div className="solcard-shine" />
              <span className="sol-tag">{t.solutionsSection.items.fintech.tag}</span>
              <h3>{t.solutionsSection.items.fintech.title}</h3>
              <p>{t.solutionsSection.items.fintech.description}</p>
              <div className="sol-footer">
                <span className="sol-meta">{t.solutionsSection.items.fintech.meta}</span>
                <span className="sol-link">
                  {t.solutionsSection.learnMoreShort}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="wrap">
          <div className="sec-head-split">
            <div>
              <div className="badge r">{t.whyUs.badge}</div>
              <h2 className="sec-h2 r d1">{t.whyUs.title}</h2>
            </div>
            <p className="sec-sub rr" style={{ maxWidth: 400 }}>
              {t.whyUs.subtitle}
            </p>
          </div>
          <div className="why-grid">
            <div className="wcard r d1">
              <div className="wcard-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>{t.whyUs.items.expertise.title}</h3>
              <p>{t.whyUs.items.expertise.description}</p>
            </div>
            <div className="wcard r d2">
              <div className="wcard-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
                </svg>
              </div>
              <h3>{t.whyUs.items.presence.title}</h3>
              <p>{t.whyUs.items.presence.description}</p>
            </div>
            <div className="wcard r d3">
              <div className="wcard-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="6" width="18" height="13" rx="1" />
                  <path strokeLinecap="round" d="M3 10h18M8 2v4M16 2v4" />
                </svg>
              </div>
              <h3>{t.whyUs.items.banking.title}</h3>
              <p>{t.whyUs.items.banking.description}</p>
            </div>
            <div className="wcard r d4">
              <div className="wcard-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <h3>{t.whyUs.items.oneContact.title}</h3>
              <p>{t.whyUs.items.oneContact.description}</p>
            </div>
            <div className="wcard r d5">
              <div className="wcard-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3>{t.whyUs.items.transparent.title}</h3>
              <p>{t.whyUs.items.transparent.description}</p>
            </div>
            <div className="wcard r d6">
              <div className="wcard-icon">
                <svg viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>{t.whyUs.items.support.title}</h3>
              <p>{t.whyUs.items.support.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="proc-bg" id="process">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 80px' }}>
            <div className="badge r">{t.process.badge}</div>
            <h2 className="sec-h2 r d1">
              {t.process.title}
            </h2>
            <p className="sec-sub r d2" style={{ margin: '0 auto' }}>
              {t.process.subtitle}
            </p>
          </div>
          <div className="proc-wrap">
            <div className="proc-line-track">
              <div className="proc-line-fill" id="procFill" />
            </div>
            <div className="proc-grid">
              <div className="pstep r d1">
                <div className="pnum">1</div>
                <div className="pstep-lbl">{t.process.stepLabels[0]}</div>
                <h3>{t.process.items.analysis.title}</h3>
                <p>{t.process.items.analysis.description}</p>
              </div>
              <div className="pstep r d2">
                <div className="pnum">2</div>
                <div className="pstep-lbl">{t.process.stepLabels[1]}</div>
                <h3>{t.process.items.structuring.title}</h3>
                <p>{t.process.items.structuring.description}</p>
              </div>
              <div className="pstep r d3">
                <div className="pnum">3</div>
                <div className="pstep-lbl">{t.process.stepLabels[2]}</div>
                <h3>{t.process.items.registration.title}</h3>
                <p>{t.process.items.registration.description}</p>
              </div>
              <div className="pstep r d4">
                <div className="pnum">4</div>
                <div className="pstep-lbl">{t.process.stepLabels[3]}</div>
                <h3>{t.process.items.support.title}</h3>
                <p>{t.process.items.support.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" style={{ background: '#fff' }}>
        <div className="wrap">
          <div style={{ maxWidth: 580, marginBottom: 8 }}>
            <div className="badge r">{t.team.badge}</div>
            <h2 className="sec-h2 r d1">{t.team.title}</h2>
            <p className="sec-sub r d2">{t.team.subtitle}</p>
          </div>
          <div className="team-group-hd">{t.team.kazakhstan}</div>
          <div className="team-grid">
            <div className="tcard r d1">
              <div className="tphoto">
                <img src="/Berik.jpeg" alt="Berik" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.berik.role}</div>
                </div>
              </div>
              <h4>{t.team.members.berik.name}</h4>
              <div className="trole">{t.team.members.berik.role}</div>
              <div className="tbio">{t.team.members.berik.description}</div>
            </div>
            <div className="tcard r d2">
              <div className="tphoto">
                <img src="/Birzhan.jpeg" alt="Birzhan" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.birzhan.role}</div>
                </div>
              </div>
              <h4>{t.team.members.birzhan.name}</h4>
              <div className="trole">{t.team.members.birzhan.role}</div>
              <div className="tbio">{t.team.members.birzhan.description}</div>
            </div>
            <div className="tcard r d3">
              <div className="tphoto">
                <img src="/Marat.jpeg" alt="Marat" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.marat.role}</div>
                </div>
              </div>
              <h4>{t.team.members.marat.name}</h4>
              <div className="trole">{t.team.members.marat.role}</div>
              <div className="tbio">{t.team.members.marat.description}</div>
            </div>
            <div className="tcard r d4">
              <div className="tphoto">
                <img src="/Salamat_new.jpeg" alt="Salamat" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.salamat.role}</div>
                </div>
              </div>
              <h4>{t.team.members.salamat.name}</h4>
              <div className="trole">{t.team.members.salamat.role}</div>
              <div className="tbio">{t.team.members.salamat.description}</div>
            </div>
            <div className="tcard r d1">
              <div className="tphoto">
                <img src="/Gani.jpeg" alt="Gani" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.gani.role}</div>
                </div>
              </div>
              <h4>{t.team.members.gani.name}</h4>
              <div className="trole">{t.team.members.gani.role}</div>
              <div className="tbio">{t.team.members.gani.description}</div>
            </div>
            <div className="tcard r d2">
              <div className="tphoto">
                <img src="/Alikhan.jpeg" alt="Alikhan" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.alikhan.role}</div>
                </div>
              </div>
              <h4>{t.team.members.alikhan.name}</h4>
              <div className="trole">{t.team.members.alikhan.role}</div>
              <div className="tbio">{t.team.members.alikhan.description}</div>
            </div>
            <div className="tcard r d3">
              <div className="tphoto">
                <img src="/Azamat.jpeg" alt="Azamat" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.azamat.role}</div>
                </div>
              </div>
              <h4>{t.team.members.azamat.name}</h4>
              <div className="trole">{t.team.members.azamat.role}</div>
              <div className="tbio">{t.team.members.azamat.description}</div>
            </div>
          </div>

          <div className="team-group-hd">{t.team.international}</div>
          <div className="team-grid">
            <div className="tcard r d1">
              <div className="tphoto">
                <img src="/Asel.jpeg" alt="Asel" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.asel.overlay}</div>
                </div>
              </div>
              <h4>{t.team.members.asel.name}</h4>
              <div className="trole">{t.team.members.asel.role}</div>
              <div className="tbio">{t.team.members.asel.description}</div>
            </div>
            <div className="tcard r d2">
              <div className="tphoto">
                <img src="/Batyrlan.jpeg" alt="Batyrlan" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.batyrlan.overlay}</div>
                </div>
              </div>
              <h4>{t.team.members.batyrlan.name}</h4>
              <div className="trole">{t.team.members.batyrlan.role}</div>
              <div className="tbio">{t.team.members.batyrlan.description}</div>
            </div>
            <div className="tcard r d3">
              <div className="tphoto">
                <img src="/Serik.jpeg" alt="Serik" loading="lazy" />
                <div className="tphoto-overlay">
                  <div className="tphoto-overlay-text">{t.team.members.serik.overlay}</div>
                </div>
              </div>
              <h4>{t.team.members.serik.name}</h4>
              <div className="trole">{t.team.members.serik.role}</div>
              <div className="tbio">{t.team.members.serik.description}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="certifications">
        <div className="wrap">
          <div className="sec-head-split">
            <div>
              <div className="badge r">{t.certifications.badge}</div>
              <h2 className="sec-h2 r d1">{t.certifications.title}</h2>
            </div>
            <p className="sec-sub rr" style={{ maxWidth: 420 }}>
              {t.certifications.subtitle}
            </p>
          </div>
          <div className="cert-grid">
            <div className="cert-item r d1">
              <img src="/certificate-1.jpg" alt="AFSA Licence" />
            </div>
            <div className="cert-item r d2">
              <img src="/certificate-2.png" alt="AIFC Certificate" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <div className="contact-wrap">
            <div>
              <div className="badge r">{t.contact.badge}</div>
              <h2 className="sec-h2 r d1">
                {t.contact.titleLines[0]}
                <br />
                {t.contact.titleLines[1]}
              </h2>
              <p className="sec-sub r d2">
                {t.contact.subtitle}
              </p>
              <div className="contact-rows r d3">
                <div className="crow">
                  <span className="k">{t.contact.info.responseTimeLabel}</span>
                  <span className="v">{t.contact.info.responseTimeValue}</span>
                </div>
                <div className="crow">
                  <span className="k">{t.contact.info.languagesLabel}</span>
                  <span className="v">{t.contact.info.languagesValue}</span>
                </div>
                <div className="crow">
                  <span className="k">{t.contact.info.hqLabel}</span>
                  <span className="v">+7 700 146 6646</span>
                </div>
                <div className="crow">
                  <span className="k">{t.contact.info.dubaiOfficeLabel}</span>
                  <span className="v">+971 52 352 4196</span>
                </div>
                <div className="crow">
                  <span className="k">{t.contact.form.email}</span>
                  <span className="v">
                    <a href="mailto:info@inlaw.kz">info@inlaw.kz</a>
                  </span>
                </div>
                <div className="crow">
                  <span className="k">{t.contact.info.initialConsultationLabel}</span>
                  <span className="v" style={{ color: '#16a34a' }}>
                    {t.contact.info.initialConsultationValue}
                  </span>
                </div>
              </div>
            </div>
            <div className="rr">
              <form className="cform" id="cform" onSubmit={submitForm}>
                <div className="field">
                  <label>{t.contact.form.name}</label>
                  <input type="text" placeholder={t.contact.form.namePlaceholder} required />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label>{t.contact.form.email}</label>
                    <input type="email" placeholder={t.contact.form.emailPlaceholder} required />
                  </div>
                  <div className="field">
                    <label>{t.contact.form.phone}</label>
                    <input type="tel" placeholder={t.contact.form.phonePlaceholder} />
                  </div>
                </div>
                <div className="field">
                  <label>{t.contact.form.country}</label>
                  <input type="text" placeholder={t.contact.form.countryPlaceholder} />
                </div>
                <div className="field">
                  <label>{t.contact.form.message}</label>
                  <textarea placeholder={t.contact.form.messagePlaceholder} />
                </div>
                <button type="submit" className="submit-btn" id="submitBtn">
                  {t.contact.form.submit}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-col">
              <h5>{t.footer.locations[0].city}</h5>
              <p>
                {t.footer.locations[0].address}
                <br />
                {t.geography.countries.kazakhstan}
              </p>
              <a href="tel:+77001466646">+7 700 146 6646</a>
              <a href="tel:+77001466601">+7 700 146 6601</a>
            </div>
            <div className="foot-col">
              <h5>{t.footer.locations[1].city}</h5>
              <p>
                {t.footer.locations[1].address}
                <br />
                {t.geography.countries.kazakhstan}
              </p>
              <a href="tel:+77773849913">+7 777 384 9913</a>
            </div>
            <div className="foot-col">
              <h5>{t.footer.locations[2].city}</h5>
              <p>
                {t.footer.locations[2].address}
                <br />
                {t.geography.countries.kyrgyzstan}
              </p>
              <a href="tel:+996999100588">+996 999 100 588</a>
            </div>
            <div className="foot-col">
              <h5>{t.footer.locations[3].city}</h5>
              <p>
                {t.footer.locations[3].address}
                <br />
                {t.geography.countries.uae}
              </p>
              <a href="tel:+971523524196">+971 52 352 4196</a>
            </div>
            <div className="foot-col">
              <h5>{t.footer.locations[4].city}</h5>
              <p>
                {t.footer.locations[4].address}
                <br />
                {t.geography.countries.china}
              </p>
              <a href="tel:+8613918719943">+86 139 1871 9943</a>
            </div>
          </div>
          <div className="foot-bot">
            <div className="foot-legal">
              <b>{t.footer.legal.name}</b>
              {t.footer.legal.bin} &nbsp;·&nbsp; {t.footer.legal.license}
            </div>
            <div className="foot-copy">{t.footer.copy}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
