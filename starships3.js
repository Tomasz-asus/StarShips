document.addEventListener('DOMContentLoaded', event => {

	fetch(`http://swapi.dev/api/starships/?page=1`)
		.then(response => response.json())
		.then(response => {
			renderstarshipsPaginator(response['count'])
			renderstarshipsList(response['results'])
		})

	function renderstarshipsPaginator(count, pageSize = 10) {
		const pages = Math.ceil(count / pageSize)
		const select = document.getElementById('starships-pagination')
		for (let i = 1; i <= pages; i++) {
			const option = document.createElement('option')
			option.innerText = i
			option.value = i
			select.append(option)
		}
		select.addEventListener('change', event => {
			fetch(`http://swapi.dev/api/starships/?page=${event.target.value}`)
				.then(response => response.json())
				.then(response => {
					renderstarshipsPaginator(response['count'])
					renderstarshipsList(response['results'])
				})
		})
	}

	function renderstarshipsList(starships) {
		const starshipsHtmlElems = starships.map((starships, index) => getstarshipsLayout(starships, index))
		const starshipsList = document.querySelector('#starships-container')
		starshipsHtmlElems.forEach(elem => starshipsList.append(elem))
	}

	function getstarshipsLayout(starships, index) {
		const root = getstarshipsRoot()
		root.append(getstarshipsProp('', starships['name']))
		root.append(getstarshipsProp('model: ', starships['model'], index))
		root.append(getstarshipsProp('length: ', starships['length'], index))
		root.append(getstarshipsProp('crew: ', starships['crew'], index))
		root.append(getstarshipsButton(index))
		return root
	}

	function getstarshipsRoot() {
		const root = document.createElement('div')
		root.classList.add('container-item')
		return root
	}

	function getstarshipsProp(title, property, index) {
		const prop = document.createElement('div')
		prop.classList.add('card-title')
		if (index !== undefined) {
			prop.classList.add(`starships-toggle-prop-${index}`)
		}
		prop.innerText = `${title}${property}`
		return prop
	}

	function getstarshipsButton(index) {
		const button = document.createElement('button')
		button.id = `starships-details-button-${index}`
		button.classList.add('starships-details-button')
		button.innerText = 'Details'
		button.addEventListener('click', () => {
			const props = document.querySelectorAll(`.starships-toggle-prop-${index}`)
			props.forEach(prop => {
				if (prop.classList.contains('hidden')) {
					prop.classList.remove('hidden')
				} else {
					prop.classList.add('hidden')
				}
			})
		})
		return button
	}

	const chameleonButton = document.getElementById('chameleon-button')
	chameleonButton.addEventListener('click', () => {
		if (chameleonButton.classList.contains('button-blank')) {
			chameleonButton.classList.remove('button-blank')
			chameleonButton.classList.add('button-green')
			return
		}
		if (chameleonButton.classList.contains('button-green')) {
			chameleonButton.classList.remove('button-green')
			chameleonButton.classList.add('button-yellow')
			return
		}
		if (chameleonButton.classList.contains('button-yellow')) {
			chameleonButton.classList.remove('button-yellow')
			chameleonButton.classList.add('button-red')
			return
		}
		if (chameleonButton.classList.contains('button-red')) {
			chameleonButton.classList.remove('button-red')
			chameleonButton.classList.add('button-blank')
			return
		}
	})

	const onHoverButton = document.getElementById('on-hover-button')
	onHoverButton.addEventListener('mouseenter', () => {
		onHoverButton.classList.remove('button-blank')
		onHoverButton.classList.add('button-hover')
	})
	onHoverButton.addEventListener('mouseleave', () => {
		onHoverButton.classList.remove('button-hover')
		onHoverButton.classList.add('button-blank')
	})

	document.addEventListener('mousemove', event => {
		document.getElementById('mouse-position-x').value = event.x
		document.getElementById('mouse-position-y').value = event.y
	})

	const toggleButton = document.getElementById('toggle-button')
	const toggleContent = document.getElementById('toggle-content')
	toggleButton.addEventListener('click', () => {
		if (toggleContent.classList.contains('hide')) {
			toggleContent.classList.remove('hide')
		} else {
			toggleContent.classList.add('hide')
		}
	})
})
