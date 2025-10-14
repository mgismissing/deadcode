function animate() {
    function typeString(obj, text, delay) {
        return new Promise(resolve => {
            obj.textContent = "";
            let i = 0;
            let d = 0;
            let tbuf = "";
            function done() {

            }
            function step() {
                if (i >= text.length) {
                    obj.innerHTML = tbuf;
                    done();
                    return resolve();
                }
                let c = text[i];
                switch (c) {
                    case " ":
                        d = delay;
                        break;
                    case "\n":
                        d = delay * 10;
                        break;
                    default:
                        if (/^[A-Za-z]$/.test(c)) d = delay;
                        else if (/^[0-9]$/.test(c)) d = delay * 2;
                        else d = delay * 5;
                        break;
                }
                tbuf += c;
                obj.innerHTML = tbuf + "<cursor>█</cursor>";
                i++;
                setTimeout(step, d)
            }
            step();
        });
    }

    const CHAR_DELAY = 50;

    let all = document.getElementsByClassName("anim-type");
    for (var i = 0; i < all.length; i++) {
        const element = all[i];
        let speed = 20;
        if (element.classList.contains("slow")) speed = 50;
        typeString(element, element.innerHTML, speed);
    }
}
animate();