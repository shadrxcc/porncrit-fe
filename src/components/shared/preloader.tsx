import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ progress }: { progress: number }) => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tll = gsap.timeline({ paused: true });

        tll.to([preloaderRef.current, barRef.current, percentRef.current], {
            duration: 0.2,
            opacity: 0,
            zIndex: -1,
        });

        tll.to(preloaderRef.current, {
            duration: 0.8,
            width: '0%',
        });

        tll.from('.container', {
            duration: 1.5,
            y: '-150%',
        }, '-=.2');

        tll.to('.container h1', {
            opacity: 1,
            textShadow: '12px 20px rgba(255,255,255,0.23)',
            skewY: 10,
            y: '10%',
            stagger: {
                amount: 0.4,
            },
        });

        // Update progress bar and percentage text based on the progress prop
        if (barRef.current) {
            barRef.current.style.width = `${progress * 100}%`; // Set width based on progress
        }
        if (percentRef.current) {
            percentRef.current.innerHTML = `${Math.round(progress * 100)}%`; // Set percentage text
        }

        // Play the animation if progress is 1 (100%)
        if (progress >= 1) {
            // Ensure the preloader is visible for a minimum amount of time
            const minDisplayTime = 3000; // 1 second in milliseconds
            const startTime = Date.now();
            const displayTime = Date.now() - startTime;

            if (displayTime < minDisplayTime) {
                setTimeout(() => {
                    tll.play();
                }, minDisplayTime - displayTime);
            } else {
                tll.play();
            }

            const delayBeforeClosing = 4000; // Adjust this value as needed
            setTimeout(() => {
                tll.pause(0); // Reset the timeline to the start
                tll.kill(); // Clear the timeline
            }, delayBeforeClosing);
        }

        // Cleanup function to reset the animation
        return () => {
            tll.pause(0); // Reset the timeline to the start
            tll.kill(); // Clear the timeline
        };
    }, [progress]); // Depend on progress to re-run the effect

    return (
        <div id="preloader" ref={preloaderRef}>
            <div id="percent" ref={percentRef}>1%</div>
            <div className="bar-wrapper">
                <div id="bar" ref={barRef}>
                    <div id="barconfrm"></div>
                </div>
            </div>
            <div className="pt-5">
                <p className='text-sm'>We're just grabbing the video info, it'll be quick!</p>
            </div>
        </div>
    );
};

export default Preloader;
