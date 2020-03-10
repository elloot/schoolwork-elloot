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

    skillArray.forEach(function(skill) {
        skill.addEventListener("click", e => {
            if (!desktopQuery.matches) {
                let temp = e.currentTarget;
                temp.parentNode.getElementsByTagName("p")[0].classList.toggle("show-skill-info");
                temp.firstChild.classList.toggle("flip-arrow");
            }
        });
    });
})();

(() => {
    // check_webp_feature:
    //   'feature' can be one of 'lossy', 'lossless', 'alpha' or 'animation'.
    //   'callback(feature, result)' will be passed back the detection result (in an asynchronous way!)

    check_webp_feature(0, myFunction);

    function check_webp_feature(feature, callback) {
        var kTestImages = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };
        var img = new Image();
        img.onload = function() {
            var result = img.width > 0 && img.height > 0;
            callback(feature, result);
        };
        img.onerror = function() {
            callback(feature, false);
        };
        img.src = "data:image/webp;base64," + kTestImages[feature];
    }

    function myFunction(feature, result) {
        console.log(result);
        if (!result) {
            document.querySelector(".card__portrait").setAttribute("src", "img/portrait.jpg");
        }
    }
})();
