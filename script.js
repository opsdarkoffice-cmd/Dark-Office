document.getElementById("year").textContent=new Date().getFullYear();
const menu=document.querySelector(".menu"), nav=document.querySelector("nav");
menu?.addEventListener("click",()=>{nav.classList.toggle("open");});
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));


const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = "SENDING...";
  formStatus.textContent = "";

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });
    const result = await response.json();

    if (result.success) {
      formStatus.textContent = "Thank you! Your message has been sent. We'll get back to you soon.";
      contactForm.reset();
    } else {
      formStatus.textContent = result.message || "Something went wrong. Please try again.";
    }
  } catch (error) {
    formStatus.textContent = "Unable to send right now. Please email Ops.darkoffice@gmail.com directly.";
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});
