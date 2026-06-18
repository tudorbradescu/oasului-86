/* ===== Apartament Oașului 86 — interactivity ===== */

// Gallery images with bilingual captions
const PHOTOS = [
  ["img-01.jpg", "Living open-space cu bucătărie", "Open-plan living & kitchen"],
  ["img-02.jpg", "Living", "Living room"],
  ["img-03.jpg", "Dormitor matrimonial", "Master bedroom"],
  ["img-04.jpg", "Dormitor copil", "Children's bedroom"],
  ["img-05.jpg", "Dormitor copil", "Children's bedroom"],
  ["img-06.jpg", "Baie cu cadă", "Bathroom with bathtub"],
  ["img-07.jpg", "Baie · oglindă cu LED", "Bathroom · LED mirror"],
  ["img-08.jpg", "Spălătorie · mașină spălat & uscător", "Laundry · washer & dryer"],
  ["img-09.jpg", "Baie cu duș", "Bathroom with shower"],
  ["img-10.jpg", "Baie cu duș", "Bathroom with shower"],
  ["img-11.jpg", "Hol de intrare", "Entrance hallway"],
  ["img-12.jpg", "Balcon · vedere", "Balcony · view"],
  ["img-13.jpg", "Balcon · panoramă", "Balcony · panorama"],
  ["img-14.jpg", "Balcon · expunere Sud-Vest", "Balcony · South-West view"],
];

// ---------- Language ----------
let LANG = localStorage.getItem("lang") || "ro";
function applyLang(lang){
  LANG = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-ro]").forEach(el=>{
    const v = el.getAttribute("data-"+lang);
    if(v!==null) el.innerHTML = v;
  });
  document.querySelectorAll(".lang button").forEach(b=>{
    b.classList.toggle("active", b.dataset.lang===lang);
  });
  // refresh gallery captions (alt)
  document.querySelectorAll(".gallery img").forEach((img,i)=>{
    img.alt = lang==="ro" ? PHOTOS[i][1] : PHOTOS[i][2];
  });
}

// ---------- Gallery + Lightbox ----------
function buildGallery(){
  const g = document.getElementById("gallery");
  PHOTOS.forEach((p,i)=>{
    const img = document.createElement("img");
    img.src = "images/"+p[0];
    img.loading = "lazy";
    img.alt = p[1];
    img.addEventListener("click", ()=>openLB(i));
    g.appendChild(img);
  });
}
let lbIndex = 0;
const lb = ()=>document.getElementById("lb");
function openLB(i){ lbIndex=i; document.getElementById("lb-img").src="images/"+PHOTOS[i][0]; lb().classList.add("open"); }
function closeLB(){ lb().classList.remove("open"); }
function moveLB(d){ lbIndex=(lbIndex+d+PHOTOS.length)%PHOTOS.length; document.getElementById("lb-img").src="images/"+PHOTOS[lbIndex][0]; }

// ---------- Reveal on scroll ----------
function initReveal(){
  const io = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", ()=>{
  buildGallery();
  applyLang(LANG);
  initReveal();
  document.querySelectorAll(".lang button").forEach(b=>{
    b.addEventListener("click", ()=>applyLang(b.dataset.lang));
  });
  document.querySelector(".lb .x").addEventListener("click", closeLB);
  document.querySelector(".lb .prev").addEventListener("click", ()=>moveLB(-1));
  document.querySelector(".lb .next").addEventListener("click", ()=>moveLB(1));
  lb().addEventListener("click", e=>{ if(e.target===lb()) closeLB(); });
  document.addEventListener("keydown", e=>{
    if(!lb().classList.contains("open")) return;
    if(e.key==="Escape") closeLB();
    if(e.key==="ArrowLeft") moveLB(-1);
    if(e.key==="ArrowRight") moveLB(1);
  });
});
