let desktopQuery = window.matchMedia("(min-width: 992px)");
(() => {
    const button = document.querySelector("#hamburger-toggle");
    const menu = document.querySelector("#menu");

    button.addEventListener("click", e => {
        menu.classList.toggle("show-menu");
        button.classList.toggle("hamburger-cross");
    });
})();

(() => {
    const title = document.querySelector("#aboutMeTitle"),
        image = document.querySelector("#aboutMeImage"),
        text = document.querySelector("#aboutMeText"),
        cardContainer = document.querySelector("#aboutMeContainer");

    let isWrapped = false;

    function aboutMeRestructure(mediaQuery) {
        if (mediaQuery.matches) {
            //restructures the About me card for desktop
            title.parentNode.removeChild(title);
            cardContainer.insertBefore(title, text);

            //can I make this into a function?
            let addedToDocument = false,
                wrapper = document.createElement("div"),
                nodesToWrap = document.querySelectorAll(".aboutMeToWrap");

            wrapper.id = "aboutMeDesktopContainer";

            for (let index = 0; index < nodesToWrap.length; index++) {
                let node = nodesToWrap[index];
                if (!addedToDocument) {
                    node.parentNode.insertBefore(wrapper, node);
                    addedToDocument = true;
                }
                node.parentNode.removeChild(node);
                wrapper.appendChild(node);
            }
            isWrapped = true;

            document.querySelector("#aboutMeDesktopContainer").classList.add("text-title-container");
        } else {
            //restructures the About me card for smaller screens

            if (isWrapped) {
                let wrapper = document.querySelector("#aboutMeDesktopContainer");
                let nodesToUnwrap = document.querySelectorAll(".aboutMeToWrap");

                for (let index = 0; index < nodesToUnwrap.length; index++) {
                    let node = nodesToUnwrap[index];
                    cardContainer.insertBefore(node, wrapper);
                }
                wrapper.parentNode.removeChild(wrapper);
            }

            title.parentNode.removeChild(title);
            cardContainer.insertBefore(title, image);
        }
    }

    aboutMeRestructure(desktopQuery);
    desktopQuery.addListener(aboutMeRestructure);
})();

(() => {
    const skillArray = document.querySelectorAll("#skillTitle");
    let expanded = false;

    skillArray.forEach(function(skill) {
        skill.addEventListener("click", e => {
            if (!desktopQuery.matches) {
                let temp = e.currentTarget;
                if (!expanded) {
                    temp.parentNode.getElementsByTagName("p")[0].style.maxHeight = temp.parentNode.getElementsByTagName("p")[0].scrollHeight + "px";
                    expanded = true;
                } else {
                    temp.parentNode.getElementsByTagName("p")[0].style.maxHeight = "0";
                    expanded = false;
                }
                temp.firstChild.classList.toggle("flip-arrow");
            }
        });
    });
})();

async function supportsWebp() {
    if (!self.createImageBitmap) return false;

    const webpData = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
    const blob = await fetch(webpData).then(r => r.blob());
    return createImageBitmap(blob).then(
        () => true,
        () => false
    );
}

(async () => {
    if (await supportsWebp()) {
        console.log("does support webp");
        /*document.querySelector(".card__portrait").setAttribute("src", "./img/portrait.webp");*/
    } else {
        console.log("does not support webp");
    }
})();
