/* ===== Apartament Oașului 86 — interactivity ===== */

// Gallery images with bilingual captions
const PHOTOS = [
  ["img-01.jpg", "Living open-space", "Open-plan living"],
  ["img-02.jpg", "Living & bucătărie", "Living & kitchen"],
  ["img-03.jpg", "Living & bucătărie", "Living & kitchen"],
  ["img-04.jpg", "Living", "Living room"],
  ["img-05.jpg", "Living · Smart TV OLED", "Living · OLED Smart TV"],
  ["img-06.jpg", "Living la apus · expunere SV", "Living at sunset · SW facing"],
  ["img-07.jpg", "Living", "Living room"],
  ["img-08.jpg", "Living", "Living room"],
  ["img-09.jpg", "Bucătărie", "Kitchen"],
  ["img-10.jpg", "Bucătărie · balcon", "Kitchen · balcony"],
  ["img-11.jpg", "Baie", "Bathroom"],
  ["img-12.jpg", "Baie", "Bathroom"],
  ["img-13.jpg", "Baie", "Bathroom"],
  ["img-14.jpg", "Dormitor", "Bedroom"],
  ["img-15.jpg", "Dormitor", "Bedroom"],
  ["img-16.jpg", "Dressing", "Walk-in closet"],
  ["img-17.jpg", "Spațiu de depozitare", "Storage"],
  ["img-18.jpg", "Grup sanitar", "WC"],
  ["img-19.jpg", "Spălătorie", "Laundry"],
  ["img-20.jpg", "Spălătorie", "Laundry"],
  ["img-21.jpg", "Hol", "Hallway"],
  ["img-22.jpg", "Hol", "Hallway"],
  ["img-23.jpg", "Detaliu finisaje", "Finish detail"],
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
