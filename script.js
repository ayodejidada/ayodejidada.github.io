const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

const observer = new
IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting){
const id = entry.target.getAttribute("id");
    
navLinks.forEach(link =>{
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${id}`){

        link.classList.add("active");
    }
});
}
});
},
{
    threshold: 0.3
}
);
sections.forEach(section => observer.observe(section));


const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('nav');
const dropdownToggle = document.querySelector('.dropdown-toggle');


menuToggle.addEventListener('click', () =>{
    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');

    document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
});

document.querySelectorAll('nav a').forEach(link =>{
    link.addEventListener('click', e =>{
       const target = link.getAttribute('href');

       if (target.startsWith('#')){
        e.preventDefault();

        menuToggle.classList.remove('active');
        nav.classList.remove('open');

        setTimeout(() =>{
            document.querySelector(target)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
       }
    });
});


if (dropdownToggle){
    dropdownToggle.addEventListener('click', (e) => {
        if(window.innerWidth <= 992){
            e.preventDefault();
            const dropdown = dropdownToggle.parentElement;
                    dropdown.classList.toggle('show')
        }
    });
}

document.querySelectorAll('nav a:not(.dropdown-toggle)').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.dropdown.show').forEach(d => d.classList.remove('show'));
  });
});

document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";

        const answer = btn.nextElementSibling;

        document.querySelectorAll(".faq-question").forEach(otherBtn => {
            if (otherBtn !== btn){
            
              otherBtn.setAttribute("aria-expanded", "false");
              otherBtn.nextElementSibling.style.maxHeight = null;
             
            }
        });
        btn.setAttribute("aria-expanded", String(!expanded));

        if(!expanded){
           
            answer.style.maxHeight = answer.scrollHeight + "px"
        }
        else{
            answer.style.maxHeight = null;
           
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.getElementById("scrollTopBtn");

    if (scrollBtn) {

        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            if (scrollY > 300) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});



document.getElementById("year").textContent = new Date().getFullYear(); 




const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        } 
    }).then(response => {
        if(response.ok){
           statusMessage.textContent = "Message sent successfully!";
            form.reset()

            setTimeout(() => {
                statusMessage.textContent =  "";
            }, 5000);
        }else{
response.json().then(data => {
    if(data.errors){
        statusMessage.textContent = data.errors.map(error => error.message).join(",");
    }else{
statusMessage.textContent = "Oops! Something went wrong.";
    }

    
            setTimeout(() => {
                statusMessage.textContent =  "";
            }, 5000);
});
    }
    }).catch(error => {
        statusMessage.textContent = "Network error. Please try again.";

        
            setTimeout(() => {
                statusMessage.textContent =  "";
            }, 5000);
    }); 
});


// document.addEventListener("DOMContentLoaded", function () {
//   const preloader = document.getElementById("preloader");

//   if (sessionStorage.getItem("preloaderShown")) {
//     preloader.style.display = "none";
//     return;
//   }

//   const DURATION = 10000;

//   setTimeout(() => {
//     preloader.classList.add("fade-out");
//     setTimeout(() => {
//       preloader.style.display = "none";
//       sessionStorage.setItem("preloaderShown", "true");
//     }, 800);
//   }, DURATION);
// });



gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768;
const start = isMobile ? 'top 95%' : 'top 80%';
const dur = 0.7;


gsap.timeline({ scrollTrigger: { trigger: '.about', start } })
  .from('.about-text h2', { opacity: 0, y: 40, duration: dur, ease: 'power2.out' })
  .from('.about-text p',  { opacity: 0, y: 30, duration: dur, ease: 'power2.out' }, '-=0.4')
  .from('.exp',           { opacity: 0, y: 40, duration: dur, ease: 'power2.out', stagger: 0.15 }, '-=0.3');


gsap.timeline({ scrollTrigger: { trigger: '.services', start } })
  .from('.services-header h2', { opacity: 0, y: 40, duration: dur, ease: 'power2.out' })
  .from('.services-header p',  { opacity: 0, y: 30, duration: dur, ease: 'power2.out' }, '-=0.4')
  .from('.service-box i',      { opacity: 0, scale: 0.5, duration: dur, ease: 'back.out(1.7)', stagger: 0.25 }, '-=0.2')
  .from('.service-box h3',     { opacity: 0, y: 15, duration: dur, ease: 'power2.out', stagger: 0.25 }, '-=0.3')
  .from('.service-box p',      { opacity: 0, y: 15, duration: dur, ease: 'power2.out', stagger: 0.25 }, '-=0.3');


gsap.timeline({ scrollTrigger: { trigger: '.work', start } })
  .from('.work-image img',   { opacity: 0, x: isMobile ? 0 : -60, y: isMobile ? 40 : 0, duration: dur, ease: 'power2.out' })
  .from('.work-content h2',  { opacity: 0, x: isMobile ? 0 : 40,  y: isMobile ? 30 : 0, duration: dur, ease: 'power2.out' }, '-=0.6')
  .from('.work-content > p', { opacity: 0, x: isMobile ? 0 : 40,  y: isMobile ? 25 : 0, duration: dur, ease: 'power2.out' }, '-=0.4')
  .from('.work-section h3',  { opacity: 0, y: 20, duration: dur, ease: 'power2.out', stagger: 0.15 }, '-=0.3')
  .from('.work-section p',   { opacity: 0, y: 20, duration: dur, ease: 'power2.out', stagger: 0.15 }, '-=0.3')
  .from('.work-icons img',   { opacity: 0, scale: 0.6, duration: dur, ease: 'back.out(1.7)', stagger: 0.08 }, '-=0.2');


gsap.timeline({ scrollTrigger: { trigger: '.projects', start } })
  .from('.projects h2',            { opacity: 0, y: 40, duration: dur, ease: 'power2.out' })
  .from('.projects-container > p', { opacity: 0, y: 30, duration: dur, ease: 'power2.out' }, '-=0.4');

gsap.utils.toArray('.projects-container > .project-card').forEach(card => {
  gsap.from(card, {
    opacity: 0, y: 60, duration: dur, ease: 'power2.out',
    scrollTrigger: { trigger: card, start }
  });
});

gsap.utils.toArray('.project-grid .project-card').forEach(card => {
  gsap.from(card, {
    opacity: 0, y: 50, duration: dur, ease: 'power2.out',
    scrollTrigger: { trigger: card, start }
  });
});


gsap.timeline({ scrollTrigger: { trigger: '.testimonials', start } })
  .from('.testimonials h2',  { opacity: 0, y: 40, duration: dur, ease: 'power2.out' })
  .from('.testimonial-card', { opacity: 0, y: 50, duration: dur, ease: 'power2.out', stagger: 0.2 }, '-=0.3')
  .from('.client-details',   { opacity: 0, y: 20, duration: dur, ease: 'power2.out', stagger: 0.2 }, '-=0.4');


gsap.timeline({ scrollTrigger: { trigger: '.faq', start } })
  .from('.faq-title', { opacity: 0, y: 40, duration: dur, ease: 'power2.out' })
  .from('.faq-item',  { opacity: 0, y: 30, duration: dur, ease: 'power2.out', stagger: 0.12 }, '-=0.3');


gsap.timeline({ scrollTrigger: { trigger: '.contact-section', start } })
  .from('.contact-container h2', { opacity: 0, y: 40, duration: dur, ease: 'power2.out' })
  .from('.contact-desc',         { opacity: 0, y: 30, duration: dur, ease: 'power2.out' }, '-=0.4')
  .from('.form-field',           { opacity: 0, y: 30, duration: dur, ease: 'power2.out', stagger: 0.12 }, '-=0.3')
  .from('.contact-form button',  { opacity: 0, y: 20, duration: dur, ease: 'power2.out' }, '-=0.2');

gsap.timeline({ scrollTrigger: { trigger: '.site-footer', start: 'top 90%' } })
  .from('.socials a',     { opacity: 0, y: 30, duration: dur, ease: 'power2.out', stagger: 0.1 })
  .from('.site-footer p', { opacity: 0, y: 20, duration: dur, ease: 'power2.out' }, '-=0.3');

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});





