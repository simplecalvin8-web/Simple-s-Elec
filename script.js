/* =========================================
   SIMPLE'S ELECTRIC SERVICES
   MAIN JAVASCRIPT
========================================= */


/* LOADER */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 800);

});


/* NAVBAR */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* MOBILE MENU */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    menuBtn.textContent =
        navMenu.classList.contains("open")
            ? "×"
            : "☰";

});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuBtn.textContent = "☰";

    });

});


/* THEME */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("simpleTheme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "☀";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const light =
        document.body.classList.contains("light");

    themeToggle.textContent =
        light ? "☀" : "☾";

    localStorage.setItem(
        "simpleTheme",
        light ? "light" : "dark"
    );

});


/* SCROLL REVEAL */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* SERVICE FILTER */

const filters =
    document.querySelectorAll(".filter");

const serviceCards =
    document.querySelectorAll(".service-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active-filter");
        });

        filter.classList.add("active-filter");

        const selected =
            filter.dataset.filter;

        serviceCards.forEach(card => {

            const category =
                card.dataset.category;

            if (
                selected === "all" ||
                category === selected
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* SERVICE MODAL */

const modal =
    document.getElementById("serviceModal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const modalIcon =
    document.getElementById("modalIcon");

const modalBook =
    document.getElementById("modalBook");


const serviceDescriptions = {

    "House Wiring":
        "Professional residential wiring, rewiring, circuit installation and electrical system upgrades.",

    "Smart Lighting":
        "Install smart bulbs, smart switches, motion sensors and phone-controlled lighting systems.",

    "CCTV & Security":
        "Protect your property with modern CCTV cameras, monitoring systems and smart security solutions.",

    "Smart Home Automation":
        "Connect lighting, appliances, sensors and security systems into one intelligent smart-home ecosystem.",

    "Solar & Energy":
        "Improve energy independence with solar, inverter and electricity-monitoring solutions.",

    "Electrical Repairs":
        "Diagnose electrical faults, repair damaged systems and restore safe electrical operation."

};


const serviceIcons = {

    "House Wiring": "⚡",
    "Smart Lighting": "💡",
    "CCTV & Security": "📹",
    "Smart Home Automation": "🏠",
    "Solar & Energy": "☀️",
    "Electrical Repairs": "🔧"

};


document.querySelectorAll(".learn-btn")
.forEach(button => {

    button.addEventListener("click", event => {

        const card =
            event.target.closest(".service-card");

        const service =
            card.dataset.service;

        modalTitle.textContent = service;

        modalText.textContent =
            serviceDescriptions[service];

        modalIcon.textContent =
            serviceIcons[service];

        modalBook.dataset.service =
            service;

        modal.classList.add("show");

    });

});


modalClose.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


modalBook.addEventListener("click", () => {

    const service =
        modalBook.dataset.service;

    const bookingService =
        document.getElementById("bookingService");

    bookingService.value = service;

    modal.classList.remove("show");

});


/* SMART HOME SCORE */

const questions =
    document.querySelectorAll(".smart-question");

const smartScore =
    document.getElementById("smartScore");

const scoreMessage =
    document.getElementById("scoreMessage");


function updateSmartScore() {

    let checked = 0;

    questions.forEach(question => {

        if (question.checked) {
            checked++;
        }

    });

    const percentage =
        checked * 25;

    smartScore.textContent =
        percentage + "%";


    if (percentage === 0) {

        scoreMessage.textContent =
            "Let's make your home smarter.";

    }

    else if (percentage <= 25) {

        scoreMessage.textContent =
            "You're just getting started.";

    }

    else if (percentage <= 50) {

        scoreMessage.textContent =
            "Your home is becoming smarter.";

    }

    else if (percentage <= 75) {

        scoreMessage.textContent =
            "Nice! Your home is quite smart.";

    }

    else {

        scoreMessage.textContent =
            "Excellent! Welcome to smart living.";

    }

}


questions.forEach(question => {

    question.addEventListener(
        "change",
        updateSmartScore
    );

});


/* QUOTE ESTIMATOR */

const serviceSelect =
    document.getElementById("serviceSelect");

const propertyType =
    document.getElementById("propertyType");

const projectSize =
    document.getElementById("projectSize");

const calculateBtn =
    document.getElementById("calculateBtn");

const estimatePrice =
    document.getElementById("estimatePrice");


calculateBtn.addEventListener("click", () => {

    const base =
        Number(serviceSelect.value);

    const property =
        Number(propertyType.value);

    const size =
        Number(projectSize.value);


    if (!base) {

        showToast(
            "Please select a service first."
        );

        return;

    }


    const result =
        base * property * size;


    animatePrice(
        0,
        result,
        600
    );

});


function animatePrice(start, end, duration) {

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );


        const value =
            Math.floor(
                start +
                (end - start) *
                progress
            );


        estimatePrice.textContent =
            "FCFA " +
            value.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}


/* COUNTERS */

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            target / 60;


        const timer =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent =
                    Math.floor(current);

            }, 20);

    });

}


const statsSection =
    document.querySelector(".stats-section");


const statsObserver =
    new IntersectionObserver(
        entries => {

            if (entries[0].isIntersecting) {

                startCounters();

                statsObserver.disconnect();

            }

        },
        {
            threshold: .3
        }
    );


statsObserver.observe(statsSection);


/* BOOKING FORM */

const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const service =
        document.getElementById("bookingService").value;

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const message =
        document.getElementById("message").value.trim();


    if (
        !name ||
        !phone ||
        !service ||
        !date ||
        !time
    ) {

        showToast(
            "Please complete all required fields."
        );

        return;

    }


    const booking = {

        name,
        phone,
        service,
        date,
        time,
        message,

        createdAt:
            new Date().toISOString()

    };


    /* SAVE BOOKING LOCALLY */

    const previousBookings =
        JSON.parse(
            localStorage.getItem(
                "simpleBookings"
            )
        ) || [];


    previousBookings.push(booking);


    localStorage.setItem(
        "simpleBookings",
        JSON.stringify(previousBookings)
    );


    /* WHATSAPP MESSAGE */

    const whatsappNumber =
        "237673891954";


    const whatsappMessage =

`Hello Simple's Electric Services ⚡

I would like to book a service.

Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${date}
Time: ${time}

Project details:
${message || "Not provided"}

Please let me know the next steps.`;


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(
            whatsappMessage
        );


    showToast(
        "Booking prepared. Opening WhatsApp..."
    );


    setTimeout(() => {

        window.open(
            whatsappURL,
            "_blank"
        );

    }, 900);


    bookingForm.reset();

});


/* TOAST */

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");

let toastTimer;


function showToast(message) {

    toastText.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

}


/* DATE RESTRICTION */

const dateInput =
    document.getElementById("date");

const today =
    new Date();

const formattedToday =
    today.toISOString()
        .split("T")[0];

dateInput.min =
    formattedToday;


/* DEVICE INTERACTION */

const deviceControls =
    document.querySelectorAll(".device-control");


deviceControls.forEach(control => {

    control.addEventListener("click", () => {

        control.classList.toggle(
            "active-device"
        );

        const status =
            control.querySelector("b");

        if (!status) return;


        if (
            control.classList.contains(
                "active-device"
            )
        ) {

            if (
                status.textContent === "OFF"
            ) {

                status.textContent = "ON";

            }

        } else {

            if (
                status.textContent === "ON"
            ) {

                status.textContent = "OFF";

            }

        }

    });

});


/* CUSTOM CURSOR */

const cursor =
    document.getElementById("cursor");


if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";

        }
    );

}


/* MAGNETIC BUTTON EFFECT */

document.querySelectorAll(".btn")
.forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 800
            ) return;


            const rect =
                button.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `translate(${x * .08}px, ${y * .08}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* CURRENT YEAR */

document.getElementById("year")
.textContent =
    new Date().getFullYear();


/* NAV ACTIVE SECTION */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "#navMenu a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);


/* KEYBOARD ESCAPE */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            modal.classList.remove(
                "show"
            );

            navMenu.classList.remove(
                "open"
            );

        }

    }
);