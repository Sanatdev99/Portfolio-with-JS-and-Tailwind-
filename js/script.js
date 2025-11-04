const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
	if (mobileNav.classList.contains("hidden")) {
		mobileNav.classList.remove("hidden");
		setTimeout(() => {
			mobileNav.classList.remove("translate-x-full");
		}, 10);
	} else {
	 
		mobileNav.classList.add("translate-x-full");
		setTimeout(() => {
			mobileNav.classList.add("hidden");
		}, 700); 
	}
});


// Header section 
const observerOptions = { threshold: 0.5 };

const animateOnScroll = entries => {
	entries.forEach(({ target, isIntersecting }) => {
		target.classList.toggle('opacity-0', !isIntersecting);
		target.classList.toggle('translate-x-20', !isIntersecting);
	});
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Select multiple elements at once (by class, id, or any selector)
document.querySelectorAll('#textBlock, #heroImg')
	.forEach(el => observer.observe(el));

	// About section 
	const observer2 = new IntersectionObserver(
		([entry]) => {
			entry.target.classList.toggle('opacity-0', !entry.isIntersecting);
			entry.target.classList.toggle('-translate-y-20', !entry.isIntersecting);
		},
		{ threshold: 0.5 }
	);

	document.querySelectorAll('#aboutSection')
		.forEach(el => observer.observe(el));


// Portfolio 
const images = document.querySelectorAll('.portfolio-img');
  const section = document.getElementById('portfolioSection');

  if (section && images.length > 0) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          images.forEach((img, i) => {
            setTimeout(() => {
              img.classList.remove('opacity-0', '-translate-y-10');
            }, i * 200);
          });
          observer.unobserve(entry.target); // Trigger only once
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
  }