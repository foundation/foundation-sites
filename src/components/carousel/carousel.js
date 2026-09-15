// Carousel dots. The dots are links to slide ids so that the component works
// with no script at all, but following a link to a fragment is a navigation,
// and every navigation adds an entry to the browser's history. A reader who
// looked at four slides then pressed back four times to leave the page is not
// going to forgive that, and nothing in CSS opts out of it.
//
// So this module takes the click and scrolls the track itself. Without it the
// dots still work, exactly as before; the difference is only the history.
//
// Delegated, so dots added after load work too, and safe on pages with none.
document.addEventListener('click', (event) => {
	const dot = event.target?.closest?.('.carousel > [data-dots] a[href^="#"]');
	if (!dot) return;
	// Modified clicks belong to the browser: a new tab or window is a real
	// navigation and the reader asked for it.
	if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

	const carousel = dot.closest('.carousel');
	const track = carousel?.querySelector(':scope > [data-track]');
	const slide = document.getElementById(decodeURIComponent(dot.getAttribute('href').slice(1)));
	// Only a dot pointing at a slide of its own carousel is ours to handle.
	// Anything else is left to the browser rather than silently swallowed.
	if (!track || !slide || !track.contains(slide)) return;

	event.preventDefault();
	// Measured from the boxes rather than offsetLeft, which depends on whichever
	// ancestor happens to be positioned. No behavior is passed, so the scroll
	// takes the track's own scroll-behavior, and that reads the token that
	// reduced motion collapses.
	track.scrollBy({ left: slide.getBoundingClientRect().left - track.getBoundingClientRect().left });
});
