//coroesel

let arr=[
    "https://www.haldirams.com/media/.renditions/wysiwyg/Free_Haldi_Kumkum_Makar_Sankranti_Banner_Web.png",
    "https://www.haldirams.com/media//wysiwyg/Haldiram_Wedding_Banner_New-02.png",
    "https://www.haldirams.com/media//wysiwyg/windesk.png",
    "https://www.haldirams.com/media//wysiwyg/Signature_Sweets_Web_Banner_5.png",
    "https://www.haldirams.com/media/wysiwyg/rteweb.png",
    "https://www.haldirams.com/media/wysiwyg/Desi_ghee_for_website_1920x600.png",
    "https://www.haldirams.com/media/wysiwyg/Sugar_Free_Web_1920x600px_1.jpg",
    "https://www.haldirams.com/media/wysiwyg/Freshpop_desk.png",
    "https://www.haldirams.com/media/wysiwyg/Final_Loyatly_Program_Banner-Desk-new_1.jpg"
]
let root = document.getElementById('root');

let i = 0;
let timer;
appendimg(1);

//append image to the root div
function appendimg(z) {
    let img = document.createElement("img");
    img.src = arr[z];

    root.innerHTML = "";
    root.append(img);
}

//again start the carousel automatically
function startCaroseal() {
    timer = setInterval(function () {
        if (i == arr.length) {
            i = 0;
        }
        appendimg(i);
        i++;
    }, 4000);
}

startCaroseal();

// previous button
function prev() {
    clearInterval(timer);
    if (i == 0) {
        i = arr.length - 1;
    } else {
        i--;
    }
    appendimg(i);
    setTimeout(startCaroseal, 4000);
    console.log(i);
}

//next button code 
function next() {
    clearInterval(timer);
    if (i == arr.length) {
        i = 0;
    } else {
        i++;
    }
    appendimg(i);
    setTimeout(startCaroseal, 4000);
    console.log(i);
}