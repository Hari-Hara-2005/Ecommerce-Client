import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateHero = () => {
    // Create a matchMedia instance
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        // Animations for desktop
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".two",
                start: "0% 100%",
                end: "50% 50%",
                scrub: true,
                // markers: true,
            }
        });

        tl.to("#pack", { top: "115%", left: "10.5%" }, 'orange')
            .to("#cashew", { width: "15%", top: "125%", right: "10%" }, 'orange')
            .to("#leaf", { top: "110%", rotate: "65deg", left: "70%" }, 'orange')
            .to("#leaf2", { top: "120%", rotate: "200deg", left: "0%" }, 'orange');
    });

    mm.add("(max-width: 768px)", () => {
        // Animations for tablets and below
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".two",
                start: "0% 100%",
                end: "70% 50%",
                scrub: true,
                // markers: true,
            }
        });

        tl.to("#pack", { top: "0%", left: "50%" }, 'orange')
            .to("#cashew", { width: "30%", top: "130%", right: "5%" }, 'orange')
            .to("#leaf", { top: "115%", rotate: "45deg", left: "60%" }, 'orange')
            .to("#leaf2", { top: "110%", rotate: "180deg", left: "5%" }, 'orange');
    });

    mm.add("(max-width: 480px)", () => {
        // Animations for mobile devices
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".two",
                start: "0% 95%",
                end: "80% 60%",
                scrub: true,

            }
        });

        tl.to("#pack", { top: "110%", left: "37%"},'orange')
            .to("#cashew", { top: "123%", right: "0%" }, 'orange')
            .to("#leaf", { top: "120%", rotate: "30deg", left: "70%" }, 'orange')
            .to("#leaf2", { top: "110%", rotate: "180deg", left: "4%" }, 'orange');
    });


    // Second timeline
    // const tl2 = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: ".three",
    //         start: "0% 95%",
    //         end: "20% 50%",
    //         scrub: true,
    //     }
    // });
    // tl2.to("#pack", { width: "18%", top: "233%", left: "36%" });

};

animateHero();
