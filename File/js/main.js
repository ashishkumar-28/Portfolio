eva.replace();
AOS.init({
  once: true,
});
// Add scrollspy to <body>
$("body").scrollspy({ target: ".navbar", offset: 50 });
// Smooth Scrolling
$("#main-nav a").on("click", function (event) {
  if (this.hash !== "") {
    event.preventDefault();

    const hash = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(hash).offset().top,
      },
      800,
      function () {
        window.location.hash = hash;
      }
    );
  }
});
// Preloader
$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(2200)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});
// Navbar
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll < 200) {
    $(".fixed-top").css({ background: "transparent", "box-shadow": "none" });
  } else {
    $(".fixed-top").css({
      background: "white",
      "box-shadow": "0px 1px 4px #292b2c20",
    });
  }
});

// Rotating Text
var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1500;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

//Projects Cards
const addCards = document.querySelector(".addCards");
const Cards = [
  {
    projectName: "ODD1 (Group Project)",
    description:
      "A Web App that works similar to Meetup,Support features like Searching and Creating Event using different APIs and local Storage,Working as front-end developer and designed the user interface",
    htmlUrl: "https://github.com/Mrinal540",
  },
  {
    projectName: "XPress Store",
    description:
      "Created a shopping app using HTML, CSS, Bootstrap, PHP and MySQL,Has a user-friendly interface with data security and authentication for the User,Allow the users to buy different products online",
    htmlUrl: "https://github.com/Mrinal540/XPress-Store",
  },
  {
    projectName: "Text to Speech Converter",
    description:
      "A web app that converts text to speech built using HTML,CSS & JavaScript.",
    htmlUrl: "https://github.com/Mrinal540/Text-To-Speech-Converter",
  },
];

const showCards = () => {
  let output = "";
  Cards.forEach(
    ({ projectName, description, htmlUrl }) =>
      (output += `        
      <div class="col-md-6 pb-4 px-3" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="900">
        <div class="card shadow-sm">
          <div class="card-body">            
            <h3 class="card-title mb-1">${projectName}</h3>          
            <p class="card-text" style="opacity: 0.7;font-size: 1rem;">${description}</p>
            <a href="${htmlUrl}" class="float-left" target="_blank" style="text-decoration: none;">View Project &#8594;</a>
          </div>
        </div>
      </div>     
      `)
  );
  addCards.innerHTML = output;
};
document.addEventListener("DOMContentLoaded", showCards);

//  Add an event listener for window resize
window.addEventListener('resize', function () {
    adjustHeroContainer();
  });
  
  // Function to adjust the position of heroImageContainer
  function adjustHeroContainer() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
    if (windowWidth <= 768) { // Adjust the breakpoint as needed
      const heroContainer = document.querySelector('.heroImageContainer');
      const textContainer = document.querySelector('.text.text-center');
  
      // Calculate the height of textContainer
      const textContainerHeight = textContainer.offsetHeight;
  
      // Set the top margin for heroContainer to avoid overlap
      heroContainer.style.marginTop = textContainerHeight + 'px';
    } else {
      // Reset margin for larger screens
      const heroContainer = document.querySelector('.heroImageContainer');
      heroContainer.style.marginTop = '0';
    }
  }
  
  // Call the function on page load
  adjustHeroContainer();
