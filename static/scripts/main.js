const form = document.querySelector('form');
const alertNode = document.createElement("Div")
alertNode.className = "alert overflow-hidden fixed-top alert-success alert-dismissible p-1 fade show mx-auto my-1 w-50";
alertNode.setAttribute("role", "alert");
alertNode.innerHTML = `<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>`
const alert = new bootstrap.Alert(document.querySelector("[role='alert']"));
alert._element.setAttribute("style", "z-index:100000;");

function sendMail(event){
  formErrorsReset();
  event.preventDefault();
  let form = event.target;
  let btn = event.submitter;
  btn.setAttribute("disabled", true);
  var url = document.getElementById("index-page").textContent;
  let formData = new FormData(form);
  let csrftoken = document.querySelector("[name='csrfmiddlewaretoken']").value;
  fetch("/", {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(Object.fromEntries(formData)),
      credentials: "same-origin"
    }
  )
  .then(response => {
    return response.json();
  })
  .then(result => {
    if (result.errors){
      formErrors(result.errors);
    }
    else{
      inputs = form.querySelectorAll(".form-control");
      inputs.forEach(element => {
        element.value = "";
      });
      let x = alert._element.querySelector("p");
      if (x !== null){
        x.remove();
      }
      alert._element.classList.remove("d-none");
      alert._element.classList.add("show")
      alert._element.innerHTML += `<p class='my-0 d-inline-block'>${result.msg}</p>`;
      document.body.insertBefore(alert._element, document.body.childNodes[0])
      setTimeout(function(){
        alert.close();
      }, 5000);
    }
    btn.removeAttribute("disabled");
  })
}
function formErrors(errors){
  for (key in errors){
    let con = document.querySelector(`form [name=${key}]`);
    con.classList.add("is-invalid");
    for (error in errors[key]){
      let p = document.createElement('P');
      p.id = `error_${parseInt(error) + 1}_id`;
      p.className = "invalid-feedback d-block";
      p.innerHTML += `<strong class='d-block'>${errors[key][error]}</strong>`
      con.parentNode.append(p);
    }
  }
}
function formErrorsReset(){
  list = form.querySelectorAll(".invalid-feedback");
  input = form.querySelectorAll(".is-invalid");
  list.forEach(element => {
    element.remove();
  });
  input.forEach(element => {
    element.classList.remove(".is-invalid");
  });
}

(function() {
  "use strict";

  window.addEventListener('load', () => {
    on_page_load()
  });

  /**
   * Function gets called when page is loaded.
   */
  function on_page_load() {
    // Initialize On-scroll Animations
    AOS.init({
      anchorPlacement: 'top-left',
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: 'mobile'
    });
  }

  /**
   * Navbar effects and scrolltop buttons upon scrolling
   */
  const navbar = document.getElementById('header-nav')
  var body = document.getElementsByTagName("body")[0]
  const scrollTop = document.getElementById('scrolltop')
  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add('fixed-top', 'shadow-sm')
      body.style.paddingTop = navbar.offsetHeight + "px"
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove('fixed-top', 'shadow-sm')
      body.style.paddingTop = "0px"
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };

  /**
   * Masonry Grid
   */
  var elem = document.querySelector('.grid');
  if(elem) {
    imagesLoaded(elem, function() {
      new Masonry(elem, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true
      });
    })
  }

  /**
   * Big Picture Popup for images and videos
   */
   document.querySelectorAll("[data-bigpicture]").forEach((function(e) {
     e.addEventListener("click", (function(t){
       t.preventDefault();
       const data =JSON.parse(e.dataset.bigpicture)
       BigPicture({
        el: t.target,
        ...data
      })
     })
    )
  }))

  /**
   * Big Picture Popup for Photo Gallary
   */
   document.querySelectorAll(".bp-gallery a").forEach((function(e) {
    var caption = e.querySelector('figcaption')
    var img = e.querySelector('img')
    // set the link present on the item to the caption in full view
    img.dataset.caption = '<a class="link-light" target="_blank" href="' + e.href + '">' + caption.innerHTML + '</a>';
     e.addEventListener("click", (function(t){
       t.preventDefault();
       BigPicture({
        el: t.target,
        gallery: '.bp-gallery',
      })
     })
    )
  }))

  // Add your javascript here
  form.addEventListener('submit', sendMail);

})();