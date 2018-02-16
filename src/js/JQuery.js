function openNav() {
    document.getElementById("navbar").style.height = "100%";
}

function closeNav() {
    document.getElementById("navbar").style.height = "0%";
}

document.getElementById("hamburger").addEventListener("mouseover", mouseOver);
document.getElementById("hamburger").addEventListener("mouseout", mouseOut);

function mouseOver() {
    document.getElementById("hamburger").src = "images/hamburger_hover.svg";
}

function mouseOut() {
    document.getElementById("hamburger").src = "images/hamburger.svg";
}
