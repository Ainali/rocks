document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const logo = document.getElementById("logo");

    let isZoomed = false; // Track zoom state

    // Add click event to the logo to open the lightbox with its HD version
    logo.addEventListener("click", () => {
        const logoHd = logo.getAttribute("data-hd");
        lightboxImg.src = logoHd; // Use the high-resolution logo
        lightboxImg.classList.remove("zoomed"); // Reset zoom state
        isZoomed = false; // Reset zoom state
        lightbox.classList.remove("hidden"); // Show lightbox
        window.history.pushState({ lightbox: true }, ""); // Add a history state
    });

    // Function to create a rock card
    function createCard(rock) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${rock.image}" alt="${rock.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="card-back">
                    <img src="${rock.image}" alt="${rock.name} Thumbnail" class="thumbnail">
                    <h2>${rock.name}</h2>
                    <p>${rock.description}</p>
                    <p><a href="https://www.wikidata.org/wiki/${rock.qid}">Wikidata</a>, <a href="https://hub.toolforge.org/${rock.qid}">Wikipedia</a>, <a href="https://hub.toolforge.org/${rock.qid}?property=P6263">Mindat</a>, <a href="https://hub.toolforge.org/${rock.qid}?property=P12070">minerals.net</a></p>
                </div>
            </div>
        `;

        // Add click event to the thumbnail to open the lightbox
        const thumbnail = card.querySelector(".thumbnail");
        thumbnail.addEventListener("click", () => {
            lightboxImg.src = rock.imagehd; // Use high-resolution image for lightbox
            lightboxImg.classList.remove("zoomed"); // Reset zoom state
            isZoomed = false; // Reset zoom state
            lightbox.classList.remove("hidden"); // Show lightbox
            window.history.pushState({ lightbox: true }, ""); // Add a history state
        });

        return card;
    }

    // Render all rock cards
    rocks.forEach(rock => {
        gallery.appendChild(createCard(rock));
    });

    // Toggle zoom on lightbox image click
    lightboxImg.addEventListener("click", () => {
        isZoomed = !isZoomed; // Toggle zoom state
        if (isZoomed) {
            lightboxImg.classList.add("zoomed"); // Apply full resolution
        } else {
            lightboxImg.classList.remove("zoomed"); // Fit to screen
        }
    });

    // Close lightbox when clicking the close button or outside the image
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Handle Escape key and Back button
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
            closeLightbox();
        }
    });

    window.addEventListener("popstate", (e) => {
        if (e.state && e.state.lightbox) {
            closeLightbox();
        }
    });

    // Function to close the lightbox
    function closeLightbox() {
        lightbox.classList.add("hidden");
        lightboxImg.src = ""; // Clear image source
        isZoomed = false; // Reset zoom state
        lightboxImg.classList.remove("zoomed"); // Reset zoom class
        window.history.back(); // Go back in history
    }
});

