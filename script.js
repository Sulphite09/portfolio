const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;

function circlemousefollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale}, ${yscale})`; 
    })
}

function firstpageanimation(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y: "-10",
        opacity: 0,
        ease: Expo.easeInOut,
        duration: 1.5,
    })
        .to(".boundingelem", {
          y: 0,
          delay: -1,
          duration: 2,
         stagger: .1,
         ease: Expo.easeInOut,
    })
    .from("#herofooter",{
        y: "10",
        opacity: 0,
        ease: Expo.easeInOut,
        delay: -1,
        duration: 1.5,
    })
}

function mousesmall(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);

        gsap.utils.clamp(.6, 1.2, dets.clientX - xprev);
        gsap.utils.clamp(.6, 1.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemousefollower(xscale, yscale);

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    })
}

document.querySelectorAll(".elem")
    .forEach(function (elem) {
        var rotate = 0;
        var diffrot = 0;
        
         elem.addEventListener("mouseleave", function (details){
            gsap.to(elem.querySelector ("img"), {
                opacity: 0,
                ease: Power3.easeOut,
            })
         })

        elem.addEventListener("mousemove", function (details) {
            var diff = details.clientY - elem.getBoundingClientRect().top;
            diffrot = details.clientX - rotate;
            rotate = details.clientX;
            gsap.to(elem.querySelector ("img"), {
             opacity:1,
             ease: Power3.easeOut,
             scale: 1.4,
             y: diff,
             x: details.clientX,
             rotate: gsap.utils.clamp(-10,10, diffrot * 0.8),
         })
        
    });
});

mousesmall();
circlemousefollower();
firstpageanimation();
