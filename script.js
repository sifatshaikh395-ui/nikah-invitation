// Envelope + Music Start
const envelope = document.getElementById("envelope");
const page2 = document.getElementById("page2");
const music = document.getElementById("bgMusic");

function openEnvelope() {
  
    // Play music immediately
    if (music.paused) {
    music.volume = 0.3;
    music.play().catch(err => console.log("music play blocked:", err));
}
  // Animate flap
   envelope.classList.add("open");

   // Scroll to page 2 after flap animation 
    setTimeout(() => {
        page2.classList.remove("hidden");
        page2.scrollIntoView({behavior:"smooth"});
    }, 2000);  // match your flap animation duration 
}

    // Support both click (desktop) and touchstart( mobile)
        envelope.addEventListener("click", openEnvelope);
        envelope.addEventListener("touchstart", openEnvelope);

// Scratch Effect
const canvases = document.querySelectorAll(".scratch-circle");
const revealPage = document.querySelector(".reveal-page");
let scratched = 0;

canvases.forEach(canvas => {

    const ctx = canvas.getContext("2d");
    canvas.width = 110;
    canvas.height = 110;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    
    let isDown = false;

    canvas.addEventListener("touchstart", ()=> isDown=true);
    canvas.addEventListener("touchend", ()=>{
        isDown=false;
        scratched++;
        if(scratched >=3){
            revealPage.classList.add("reveal-visible");
            revealPage.scrollIntoView({behavior:"smooth"});
            //confetti effect
          confetti({  
            particleCount:200,
            spread:120,
            starVelocity:40,
            scalar:1.2,
            origin:{ y: 0.6 }
           });
        }
    });

    canvas.addEventListener("touchmove", (e)=>{
        e.preventDefault();
        if(!isDown) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        ctx.globalCompositeOperation="destination-out";
        ctx.beginPath();
        ctx.arc(x,y,60,0,Math.PI*2);
        ctx.fill();
    });

});
   

