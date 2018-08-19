function initializeScript() {
    var elements = document.getElementsByTagName("a");
    for (var index = 0; index < elements.length; index++) {
        if (elements[index].hasAttribute("data-color")) {
            elements[index].addEventListener("focus", updateColor);
            elements[index].addEventListener("mouseenter", updateColor);
            elements[index].addEventListener("blur", updateColor);
            elements[index].addEventListener("mouseleave", updateColor);
        }

        if (elements[index].hasAttribute("dropdown-trigger")) {
            elements[index].addEventListener("click", toggleDropdown);
        }
    }

    window.addEventListener("click", closeDropdowns);
}

function closeDropdowns(event) {
    var element = event.target || event.srcElement;
    if (!element || element.hasAttribute("dropdown-trigger") || hasClass(element, "dropdown")) {
        return;
    }

    var elements = document.getElementsByClassName("dropdown");
    for (var index = 0; index < elements.length; index++) {
        elements[index].classList.add("no-display");
    }
}

function toggleDropdown(event) {
    if (!event || !event.type) {
        return;
    }

    var element = event.target || event.srcElement;
    if (!element) {
        return;
    }

    var dropdown = document.getElementById(element.getAttribute("dropdown-trigger"));
    if (!dropdown) {
        return;
    }

    if (dropdown.classList.contains("no-display")) {
        dropdown.classList.remove("no-display");
    } else {
        dropdown.classList.add("no-display");
    }

    event.preventDefault();
}

function hasClass(element, className) {
    if (element.classList && element.classList.contains(className)) {
        return true;
    }

    return element.parentNode && hasClass(element.parentNode, className);
}

function updateColor(event) {
    if (!event || !event.type) {
        return;
    }

    var element = event.target || event.srcElement;
    if (!element) {
        return;
    }

    if (event.type === "focus" || event.type === "mouseenter") {
        element.style.color = element.getAttribute("data-color");
    }

    if (event.type === "blur" || event.type === "mouseleave") {
        element.style.color = "";
        if (!element.getAttribute("style")) {
            element.removeAttribute("style");
        }
    }
}

initializeScript();