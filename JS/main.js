import { categories } from '../data/categories.js';
import {
	createElement,
	createObj,
	debounce,
	generateSpinner,
	getData,
	getLatLong,
	loadHeaderFooter,
	RequestBody,
} from './utility.js';

// Loading header and footer
loadHeaderFooter('../HTML/header.html').then((data) => {
	document.getElementById('header-container').innerHTML = data;
	const header = document.getElementById('header-container').childNodes[0];
});
loadHeaderFooter('../HTML/footer.html').then((data) => {
	document.getElementById('footer-container').innerHTML = data;
	const footer = document.getElementById('footer-container').childNodes[0];
});

let geo = await getLatLong();

// Importing elements from details page
const imagesDivs = document.querySelectorAll('.images div');
const rightArrow = document.querySelector('.images .right');
const leftArrow = document.querySelector('.images .left');
const dots = document.querySelector('.dots');
const dark = document.querySelector('.dark');
const close = document.querySelector('.close');
const paymentForm = document.querySelector('.confirm');
const reserveBtn = document.getElementById('reserve');
const choseLoaction = document.querySelector('.show-map');
const mapElement = document.querySelector('.index-map');

/* Importing elements from landing page */
// arrows in home page
let leftButton = document.querySelector('.more-to-explore-button-left');
let rightButton = document.querySelector('.more-to-explore-button-right');
let container = document.querySelector('.more-to-explore-wrapper');

// Search controls
const searchDiv = document.querySelector('.search-form div');
const searchInput = document.getElementById('search');
const searchBtn = document.querySelector('.search-btn');

let map;
// Create Cards showed in the search result
let indicatorsCounter = 0;
function createCard(id, name, images, rate, period, price) {
	indicatorsCounter++;

	const card = createElement('div', [
		'd-flex',
		'flex-column',
		'col-12',
		'col-md-6',
		'col-lg-4',
		'col-xl-3',
		'justify-content-center',
		'card-container',
		'mt-2',
	]);

	const carouselExample = createElement(
		'div',
		[
			'carousel',
			'slide',
			'carouselExampleIndicators',
			'd-flex',
			'flex-column',
			'col-12',
			'col-md-6',
			'col-lg-4',
			'col-xl-3',
			'justify-content-center',
			'card-container',
			'mt-2',
			'position-relative',
		],
		{
			id: `carouselExampleIndicators${indicatorsCounter}`,
		}
	);

	const a = createElement(
		'a',
		['position-absolute', 'start-0', 'top-0', 'w-100', 'h-100'],
		{
			href: `../HTML/details.html?business_id=${id}`,
			style: 'z-index:3;',
		}
	);
	carouselExample.appendChild(a);
	const carouselIndicator = createElement('div', ['carousel-indicators']);

	// for (let i = 0; i < images.length; i++) {
	images.map((image, index) => {
		const button = createElement('button', [], {
			type: 'button',
			'data-bs-target': `#carouselExampleIndicators${indicatorsCounter}`,
			'data-bs-slide-to': `${index}`,
		});

		if (index == 0) {
			button.classList.add('active');
		}

		carouselIndicator.appendChild(button);
	});
	// }

	const carouselInner = createElement('div', [
		'carousel-inner',
		'position-relative',
		'card1',
	]);

	const i = createElement('div', ['fa-solid', 'fa-heart', 'heart']);

	carouselInner.appendChild(i);
	// for (let i = 0; i < images.length; i++) {
	images.map((image, index) => {
		const carouselItem = createElement('div', ['carousel-item']);

		if (index == 1) {
			carouselItem.classList.add('active');
		}

		const img = createElement('img', ['rounded-3'], {
			src: image.src,
			alt: `slide_${index + 1}`,
			loading: 'lazy',
		});

		carouselItem.appendChild(img);
		carouselInner.appendChild(carouselItem);
	});
	// }

	const buttonPrev = createElement('button', ['carousel-control-prev'], {
		type: 'button',
		'data-bs-target': `#carouselExampleIndicators${indicatorsCounter}`,
		'data-bs-slide': 'prev',
	});

	const buttonPrevSpan1 = createElement(
		'span',
		['carousel-control-prev-icon'],
		{
			'aria-hidden': 'true',
		}
	);

	const buttonPrevSpan2 = createElement(
		'span',
		['visually-hidden'],
		{},
		'Previous'
	);

	buttonPrev.appendChild(buttonPrevSpan1);
	buttonPrev.appendChild(buttonPrevSpan2);

	const buttonNext = createElement('button', ['carousel-control-next'], {
		type: 'button',
		'data-bs-target': `#carouselExampleIndicators${indicatorsCounter}`,
		'data-bs-slide': 'next',
	});

	const buttonNextSpan1 = createElement(
		'span',
		['carousel-control-next-icon'],
		{
			'aria-hidden': 'true',
		}
	);

	const buttonNextSpan2 = createElement(
		'span',
		['visually-hidden'],
		{},
		'Next'
	);

	buttonNext.appendChild(buttonNextSpan1);
	buttonNext.appendChild(buttonNextSpan2);

	carouselInner.appendChild(buttonPrev);
	carouselInner.appendChild(buttonNext);
	carouselInner.appendChild(carouselIndicator);

	carouselExample.appendChild(carouselInner);

	card.appendChild(carouselExample);

	const cardBody = createElement('div', ['row', 'card-body', 'w-100']);

	const PCardBody = createElement(
		'p',
		['col-9', 'd-inline-block', 'mb-0', 'fw-bolder'],
		{},
		name
	);

	cardBody.appendChild(PCardBody);

	const RateCardBody = createElement('div', [
		'd-flex',
		'flex-row',
		'col-3',
		'justify-content-end',
	]);

	const RateStar = createElement('img', ['img-rate-star'], {
		src: `../Assets/images/star-icon-vector-removebg-preview.png`,
	});

	const RateText = createElement('p', [], {}, rate);

	RateCardBody.appendChild(RateStar);
	RateCardBody.appendChild(RateText);

	cardBody.appendChild(RateCardBody);

	const CardDetails = createElement('div', ['d-flex', 'flex-column', 'mt-n3']);

	// const CardPlaceName = createElement(
	// 	'span',
	// 	['col-12', 'fw-light', 'period'],
	// 	{},
	// 	name
	// );

	// CardDetails.appendChild(CardPlaceName);

	const CardPlacePeriod = createElement(
		'span',
		['col-12', 'fw-light', 'period'],
		{},
		period
	);

	CardDetails.appendChild(CardPlacePeriod);

	const Price = createElement('div', [
		'd-flex',
		'flex-row',
		'col-12',
		'justify-content-start',
	]);

	// const PriceIcon = createElement('img', ['mt-1'], {
	// 	src: ``,
	// });

	// Price.appendChild(PriceIcon);

	const PriceText = createElement(
		'span',
		[],
		{},
		`${price || Math.trunc(Math.random() * 400)} $`
	);

	Price.appendChild(PriceText);

	const TrapMood = createElement('span', ['ms-1', 'fw-bold'], {}, ``);

	Price.appendChild(TrapMood);

	CardDetails.appendChild(Price);

	cardBody.appendChild(CardDetails);

	carouselExample.appendChild(cardBody);

	// const containCard = document.getElementsByClassName('contain-card')[0];
	// const containCard = createElement('div', ['contain-card']);

	// containCard.appendChild(carouselExample);
	// document.body.appendChild(containCard);
	return carouselExample;
}

// const body = {
// 	languageCode: 'en',
// 	regionCode: 'US',
// 	includedTypes: ['restaurant'],
// 	maxResultCount: 15,
// 	locationRestriction: {
// 		circle: {
// 			center: {
// 				latitude: 40.7128,
// 				longitude: -74.006,
// 			},
// 			radius: 5000,
// 		},
// 	},
// 	rankPreference: 0,
// };

// getData(':searchNearby', 'POST', body)
// 	.then((data) => console.log('API Response:', data))
// 	.catch((err) => console.log('Fetch Error:', err));

document.querySelectorAll('.category-item').forEach((item) => {
	item.addEventListener('click', () => {
		document
			.querySelectorAll('.category-item')
			.forEach((i) => i.classList.remove('active'));
		item.classList.add('active');
	});
});

// // Move the images of a place to left in details page
// function MoveImagesToLeft() {
// 	if (currentImage + 1 < imagesDivs.length) {
// 		imagesDivs[currentImage].classList.remove('active');
// 		imagesDivs[currentImage].classList.add('inActive');
// 		imagesDivs[++currentImage].classList.add('active');

// 		// Refresh the dots at the bottom of the carousel
// 		loadDots();
// 	}
// }

// // Move the images of a place to right in details page
// function MoveImagesToRight() {
// 	console.log('hi');
// 	if (currentImage > 0) {
// 		imagesDivs[currentImage].classList.remove('active');
// 		imagesDivs[--currentImage].classList.remove('inActive');
// 		imagesDivs[currentImage].classList.add('active');

// 		// Refresh the dots at the bottom of the carousel
// 		loadDots();
// 	}
// }

// // Set the dots at the bottom of the carousel according to the number of images
// function loadDots() {
// 	dots.innerHTML = '';
// 	imagesDivs.forEach((div, index) => {
// 		let classes = ['dot'];
// 		if (div.classList.contains('active')) {
// 			classes.push('active');
// 		}
// 		const dot = createElement('span', [...classes]);
// 		dots.appendChild(dot);
// 	});
// }

// Show/Hide the payment form in the details page
function togglePaymentForm() {
	paymentForm.classList.toggle('active');
	dark.classList.toggle('active');
}

// Creating the categories list
function createCategories() {
	const categoriesWrapper = createElement('div', ['categories-wrapper']);
	const categoriesContainer = createElement('div', [
		'category-container',
		'container-lg',
		'container-xl',
		'text-center',
		'mt-5',
		'd-flex',
	]);
	const categoriesList = createElement('div', ['category-list', 'm-auto']);

	// categories are imported form categories.js file in data directory
	categories.map((item) => {
		// creating each div for each category in the list depending on its data
		const categoryItem = createElement('div', ['category-item']);
		const iconHTML = item.icon;
		const p = createElement('p', [], {}, item.name);
		categoryItem.innerHTML = iconHTML;
		categoryItem.appendChild(p);
		categoriesList.appendChild(categoryItem);
	});

	categoriesContainer.appendChild(categoriesList);
	categoriesWrapper.appendChild(categoriesContainer);

	return categoriesWrapper; // return the wrapper node
}
let placesData;
let isFetching = false;

async function initializeSearchResult() {
	if (placesData || isFetching) return placesData;
	isFetching = true;

	const params = new URLSearchParams();
	params.append('query', 'hotel');
	params.append('lat', geo.latitude);
	params.append('lng', geo.longitude);
	params.append('limit', 20);
	params.append('country', 'eg');

	try {
		let data = await getData('nearby.php', params);
		placesData = data?.data || [];
	} catch (error) {
		console.log(error);
		placesData = [];
	} finally {
		isFetching = false;
	}

	return placesData;
}

// The div to be inserted into the body to show the search result
let div;

let rowOfPlaces;
// Show the search result
async function showSearch() {
	if (!div) {
		const { lng, lat } = map.getCenter();
		geo.latitude = lat;
		geo.longitude = lng;
		console.log(geo);
		const loading = generateSpinner();
		div = createElement('div', ['show-search', 'overflow-scroll-y']);
		// const wrapper = createCategories();
		// div.appendChild(wrapper);
		let content = createElement('div', ['p-3']);
		div.appendChild(content);
		content.appendChild(loading);
		rowOfPlaces = createElement('div', ['row']);

		initializeSearchResult()
			.then((places) => {
				if (places) {
					places.slice(0, 20).forEach((place) => {
						if (place.photos.length > 0) {
							const node = createCard(
								place.business_id,
								place.name,
								place.photos,
								place.rating,
								place.state,
								place.price_level
							);
							rowOfPlaces.appendChild(node);
						}
					});
				}
				content.removeChild(loading);
			})
			.catch((error) => {
				console.log(error);
				content.removeChild(loading);
			});

		content.appendChild(rowOfPlaces);
	} else {
		// If data is already available, remove loading immediately
		if (placesData) {
			document.querySelector('.loading-spinner')?.remove();
		}
	}

	if (!searchDiv.classList.contains('active')) {
		searchDiv.classList.add('active');
		dark.classList.add('active');
		document.body.appendChild(div);
	}
}

// Hide the search result
function hideSearch() {
	document.body.removeChild(div);
	dark.classList.remove('active');
	searchDiv.classList.remove('active');
}

async function searchByType(text) {
	console.log(text);
	const params = new URLSearchParams();
	params.append('query', text);
	params.append('lat', geo.latitude);
	params.append('lng', geo.longitude);
	params.append('limit', 40);
	rowOfPlaces.innerHTML = '';
	const loading = generateSpinner();
	const loadingContainer = createElement('div', [
		'col-12',
		'position-relative',
	]);
	rowOfPlaces.appendChild(loadingContainer);
	loadingContainer.appendChild(loading);
	try {
		let data = await getData('nearby.php', params);
		data?.data.forEach((place) => {
			if (place.photos.length > 0) {
				const node = createCard(
					place.business_id,
					place.name,
					place.photos,
					place.rating,
					place.state,
					place.price_level
				);
				rowOfPlaces.appendChild(node);
			}
		});
		rowOfPlaces.removeChild(loadingContainer);
	} catch (error) {
		rowOfPlaces.removeChild(loadingContainer);
		console.log(error);
	}
}

/**
 * Handle the event listeners below
 * CAUTION: This js file is being used inside different pages
 * so it's better to use if conditions to check for the element
 * if it exists or not before adding the event listenerto avoid errors
 */

// if (rightArrow) {
// 	rightArrow.addEventListener('click', MoveImagesToLeft);
// 	loadDots();
// }
// if (leftArrow) {
// 	leftArrow.addEventListener('click', MoveImagesToRight);
// 	loadDots();
// }

if (reserveBtn) {
	reserveBtn.addEventListener('click', togglePaymentForm);
}
// if (close && dark) {
// 	close.addEventListener('click', togglePaymentForm);
// 	dark.addEventListener('click', togglePaymentForm);
// }

document.addEventListener('DOMContentLoaded', function () {
	function scrollCards(direction) {
		let scrollAmount = container.clientWidth * direction;
		container.scrollLeft += scrollAmount;
	}
	if (leftButton && rightButton) {
		leftButton.addEventListener('click', () => scrollCards(-1));
		rightButton.addEventListener('click', () => scrollCards(1));
	}
});

function updateButtonsVisibility() {
	let container = document.querySelector('.more-to-explore-wrapper');
	let leftButton = document.querySelector('.more-to-explore-button-left');
	let rightButton = document.querySelector('.more-to-explore-button-right');
	let scrollLeft;
	let scrollWidth;
	let clientWidth;
	if (container) {
		scrollLeft = container.scrollLeft;
		scrollWidth = container.scrollWidth;
		clientWidth = container.clientWidth;
	}

	if (leftButton) {
		if (scrollLeft <= 0) {
			leftButton.style.display = 'none';
		} else {
			leftButton.style.display = 'block';
		}
	}
	if (rightButton) {
		if (scrollLeft + clientWidth >= scrollWidth - 1) {
			rightButton.style.display = 'none';
		} else {
			rightButton.style.display = 'block';
		}
	}
}

async function createInteractiveMap(coordinates) {
	mapboxgl.accessToken =
		'pk.eyJ1IjoiZmFyZXN0eWsiLCJhIjoiY204M2c3OTl3MHFrMTJpcjR2Z2ZrYWgybSJ9.elrKNi3eYJ-He6z0zEjjtQ';

	// Initialize the map
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v12',
		center: coordinates,
		zoom: 10,
	});

	// Add a custom marker with a popup
	const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

	// Show user's current location
	map.addControl(
		new mapboxgl.GeolocateControl({
			positionOptions: { enableHighAccuracy: true },
			trackUserLocation: true,
		})
	);

	// Add GeoJSON data layer
	map.on('load', () => {
		map.addSource('places', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						geometry: { type: 'Point', coordinates: coordinates },
						properties: { title: 'Sample Location' },
					},
				],
			},
		});

		map.addLayer({
			id: 'places-layer',
			type: 'circle',
			source: 'places',
			paint: {
				'circle-radius': 8,
				'circle-color': '#007cbf',
			},
		});
	});

	window.addEventListener('load', () => {
		const searchBox = new MapboxSearchBox();
		searchBox.accessToken =
			'pk.eyJ1IjoiZmFyZXN0eWsiLCJhIjoiY204M2c3OTl3MHFrMTJpcjR2Z2ZrYWgybSJ9.elrKNi3eYJ-He6z0zEjjtQ';

		searchBox.marker = true;
		searchBox.mapboxgl = mapboxgl;
		map.addControl(searchBox);
	});
	// Access longitude and latitude values directly.
	// map.addControl(
	// 	new MapboxGeocoder({
	// 		accessToken: mapboxgl.accessToken,
	// 		mapboxgl: mapboxgl,
	// 	})
	// );
}

console.log(geo.latitude, geo.longitude);
createInteractiveMap([geo.longitude, geo.latitude]);

if (dark && searchDiv) {
	dark.addEventListener('click', hideSearch);
}
if (container) {
	container.addEventListener('scroll', updateButtonsVisibility);
}

if (searchInput) {
	searchInput.addEventListener('focus', showSearch);
	searchInput.addEventListener('input', (e) => {
		debounce(() => {
			searchByType(e.target.value);
		})();
	});
}

if (mapElement && choseLoaction) {
	choseLoaction.onclick = () => {
		mapElement.classList.add('active');
		dark.classList.add('active');
		setTimeout(() => {
			map.resize();
		}, 500);
	};

	dark.onclick = () => {
		mapElement.classList.remove('active');
		dark.classList.remove('active');
	};
}

document.addEventListener('DOMContentLoaded', function () {
	function scrollCards(direction) {
		let scrollAmount = container.clientWidth * direction;
		container.scrollLeft += scrollAmount;
	}
	if (leftButton && rightButton) {
		leftButton.addEventListener('click', () => scrollCards(-1));
		rightButton.addEventListener('click', () => scrollCards(1));
	}
});

document.addEventListener('DOMContentLoaded', updateButtonsVisibility);
