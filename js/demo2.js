/**
 * demo2.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    // the settings for each one of the slides uncover instances.
    const uncoverOpts = [
        {
            // total number of slices.
            slicesTotal: 11,
            // slices color.
            slicesColor: '#fff',
            // 'vertical' || 'horizontal'.
            orientation: 'horizontal',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: {show: 'left', hide: 'right'}
        },
        {
            slicesTotal: 8, 
            slicesColor: '#fff', 
            orientation: 'horizontal', 
            slicesOrigin: {show: 'left', hide: 'right'}
        },
        {
            slicesTotal: 11,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: {show: 'left', hide: 'right'}
        },
        {
            slicesTotal: 8,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: {show: 'left', hide: 'right'}
        },
        {
            slicesTotal: 8,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: {show: 'left', hide: 'right'}
        }
    ];

    const uncoverAnimation = {
        show: {
            slices: {duration: 600, easing: 'easeInOutCirc', delay: (_,i) => i*50}
        },
        hide: {
            slices: {duration: 600, easing: 'easeInOutCirc', delay: (_,i) => i*50}
        }
    };

    class Slideshow {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.slides = Array.from(this.DOM.el.querySelectorAll('.slide'));
            this.slidesTotal = this.DOM.slides.length;
            this.current = 0;
            this.uncoverItems = [];
            this.DOM.slides.forEach((slide,pos) => this.uncoverItems.push(new Uncover(slide.querySelector('.slide__img'), uncoverOpts[pos])));
            this.init();
        }
        init() {
            this.isAnimating = true;
            this.DOM.slides[this.current].classList.add('slide--current');
            this.uncoverItems[this.current].show(true, uncoverAnimation.show).then(() => this.isAnimating = false);
        }
        navigate(pos) {
            if ( this.isAnimating || this.current === pos || pos < 0 || pos > this.slidesTotal - 1 ) return;
            this.isAnimating = true;

            this.uncoverItems[this.current].hide(true, uncoverAnimation.hide).then(() => {
                this.DOM.slides[this.current].classList.remove('slide--current');
                this.current = pos;

                const newItem = this.uncoverItems[this.current];
                newItem.hide();
                this.DOM.slides[this.current].classList.add('slide--current');
                newItem.show(true, uncoverAnimation.show).then(() => this.isAnimating = false);
            });
        }
    }
    
    imagesLoaded(document.querySelectorAll('.slide__img'), {background: true}, () => {
        document.body.classList.remove('loading');

        const slideshow = new Slideshow(document.querySelector('.slides'));
        const pagination = document.querySelector('.pagination');
        const triggers = Array.from(pagination.querySelectorAll('.pagination__item'));
        triggers.forEach((trigger,pos) => {
            if ( pos === 0 ) {
                trigger.classList.add('pagination__item--current');
            }
            trigger.addEventListener('click', () => {
                if ( slideshow.isAnimating ) return;
                slideshow.navigate(pos);
                pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
                trigger.classList.add('pagination__item--current');
            })
        });
    
        document.addEventListener('keydown', (ev) => {
            if ( slideshow.isAnimating ) return;
            const keyCode = ev.keyCode || ev.which;
            let newpos;
            if ( keyCode === 37 ) {
                newpos = slideshow.current > 0 ? slideshow.current-1 : slideshow.slidesTotal-1;
                slideshow.navigate(newpos);
            }
            else if ( keyCode === 39 ) {
                newpos = slideshow.current < slideshow.slidesTotal-1 ? slideshow.current+1 : 0;
                slideshow.navigate(newpos);
            }
            else return;
            pagination.querySelector('.pagination__item--current').classList.remove('pagination__item--current');
            triggers[newpos].classList.add('pagination__item--current');
        });
    });
}