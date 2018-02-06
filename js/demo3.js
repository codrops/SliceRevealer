/**
 * demo3.js
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
            slicesTotal: 5,
            // slices color.
            slicesColor: '#fff',
            // 'vertical' || 'horizontal'.
            orientation: 'vertical',
            // 'bottom' || 'top' for vertical orientation and 'right' || 'left' for horizontal orientation.
            slicesOrigin: {show: 'top', hide: 'top'}
        },
        {
            slicesTotal: 8, 
            slicesColor: '#fff', 
            orientation: 'horizontal', 
            slicesOrigin: {show: 'left', hide: 'left'}
        },
        {
            slicesTotal: 11,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: {show: 'right', hide: 'right'}
        },
        {
            slicesTotal: 3,
            slicesColor: '#fff',
            orientation: 'vertical',
            slicesOrigin: {show: 'bottom', hide: 'bottom'}
        },
        {
            slicesTotal: 16,
            slicesColor: '#fff',
            orientation: 'vertical',
            slicesOrigin: {show: 'bottom', hide: 'bottom'}
        },
        {
            slicesTotal: 4,
            slicesColor: '#fff',
            orientation: 'horizontal',
            slicesOrigin: {show: 'left', hide: 'left'}
        },
        {
            slicesTotal: 10,
            slicesColor: '#fff',
            orientation: 'vertical',
            slicesOrigin: {show: 'top', hide: 'top'}
        },
        {
            slicesTotal: 8,
            slicesColor: '#d60b3f',
            orientation: 'horizontal',
            slicesOrigin: {show: 'right', hide: 'right'}
        },
        {
            slicesTotal: 6,
            slicesColor: '#250bd6',
            orientation: 'vertical',
            slicesOrigin: {show: 'top', hide: 'top'}
        }
    ];

    const uncoverAnimation = [
        {
            show: {
                slices: {duration: 600, delay: (_,i,t) => (t-i-1)*100, easing: 'easeInOutCirc'}
            },
            hide: {
                slices: {duration: 600, delay: (_,i,t) => (t-i-1)*100, easing: 'easeInOutCirc'}
            }
        },
        {
            show: {
                slices: {duration: 600, delay: (_,i,t) => Math.abs(t/2-i)*80, easing: 'easeInOutCirc'}
            },
            hide: {
                slices: {duration: 300, delay: (_,i,t) => Math.abs(t/2-i)*40, easing: 'easeInOutCirc'}
            }
        },
        {
            show: {
                slices: {delay: (_,i,t) => anime.random(0,t)*50}
            },
            hide: {
                slices: {duration: 300, delay: (_,i,t) => anime.random(0,t)*50}
            }
        },
        {
            show: {
                slices: {duration: 1200, delay: (_,i) => i*150, easing: 'easeOutExpo'}
            },
            hide: {
                slices: {duration: 500, delay: (_,i) => i*150, easing: 'easeInOutExpo'}
            }
        },
        {
            show: {
                slices: {duration: 600, delay: (_,i,t) => Math.abs(t/2-i)*80, easing: 'easeInOutCirc'}
            },
            hide: {
                slices: {duration: 600, delay: (_,i,t) => Math.abs(t/2-i)*80, easing: 'easeInOutCirc'}
            }
        },
        {
            show: {
                slices: {duration: 400, delay: (_,i,t) => (t-i-1)*150, easing: 'easeInOutQuad'}
            },
            hide: {
                slices: {duration: 400, delay: (_,i,t) => (t-i-1)*30, easing: 'easeInOutQuad'}
            }
        },
        {
            show: {
                slices: {duration: 400, delay: (_,i,t) => Math.abs(t/4-i)*40, easing: 'easeInOutSine'},
                image: {
                    duration: 900,
                    easing: 'easeOutCubic',
                    scale: [1.8,1]
                }
            },
            hide: {
                slices: {duration: 400, delay: (_,i,t) => Math.abs(t/4-i)*40, easing: 'easeInOutSine'}
            }
        },
        {
            show: {
                slices: {duration: 600, easing: 'easeInOutCirc', delay: (_,i) => i*50},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 300, easing: 'easeInOutCirc', delay: (_,i) => i*30}
            }
        },
        {
            show: {
                slices: {duration: 600, easing: 'easeInOutCirc', delay: (_,i) => i*100},
                image: {
                    duration: 1200,
                    delay: 350,
                    easing: 'easeOutCubic',
                    scale: [1.3,1]
                }
            },
            hide: {
                slices: {duration: 300, easing: 'easeInOutCirc', delay: (_,i) => i*40}
            }
        }
    ];

    const items = Array.from(document.querySelectorAll('.grid > .grid__item'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if ( entry.intersectionRatio > 0.5 ) {
                uncoverArr[items.indexOf(entry.target)].show(true, uncoverAnimation[items.indexOf(entry.target)].show);
            }
            else {
                uncoverArr[items.indexOf(entry.target)].hide(true, uncoverAnimation[items.indexOf(entry.target)].hide);
            }
        });
    }, { threshold: 0.5 });
    
    let uncoverArr = [];

    imagesLoaded(document.querySelectorAll('.scroll-img'), {background: true}, () => {
        document.body.classList.remove('loading');

        items.forEach((item, pos) => {
            uncoverArr.push(new Uncover(item.querySelector('.scroll-img'), uncoverOpts[pos]));
            observer.observe(item);
        });
    });
}
