import classList from './class-list'

// Cart click events
exports.parent = function(e){
	if(e.target && typeof e.target.className === 'string'){
		const classes = e.target.className.split(' ')
		for(let i = classes.length; i--;){
			switch(classes[i]){

				// Remove item from cart
				case 'zygoteProdX':
					this.remove(getProductId(e.target))
					break

				// Close cart
				case 'zygoteContainer':
				case 'zygoteClose':
					this.close()
					break

				// Increase/increase quantity
				case 'zygoteDecrease':
					this.modifyQty(getProductId(e.target), -1)
					break
				case 'zygoteIncrease':
					this.modifyQty(getProductId(e.target), 1)
					break

				// Next/previous steps
				case 'zygoteNext':
					e.preventDefault()
					if(this.step < 5){
						this.changeStep(this.step + 1)
					}
					break
				case 'zygotePrev':
					e.preventDefault()
					if(this.step > 1){
						this.changeStep(this.step - 1)
					}
					break
			}
		}
	}
}

exports.other = function(){

	// Enter key
	this.els.container.addEventListener('keydown', e => {
		if(e.keyCode === 13 && this.step < 4){
			e.preventDefault()
			this.changeStep(this.step + 1)
		}
	}, false)


	// Toggle same shipping checkbox
	const els = this.els.container.querySelectorAll('.zygoteBillingToggle')
	const checkBox = this.els.container.querySelector('[name="billingSame"]')
	if(checkBox){
		checkBox.addEventListener('change', function(e){
			if(this.checked){
				for(let i = els.length; i--;){
					classList.remove(els[i], 'zygoteShow')
				}
			}
			else{
				for(let i = els.length; i--;){
					classList.add(els[i], 'zygoteShow')
				}
			}
		}, false)
	}

	// Change step tabs
	for(let i = this.els.tabs.length - 1; i--;){
		const step = i + 1
		this.els.tabs[i].addEventListener('click', () => {
			this.changeStep(step)
		}, false)
	}

	// Clear errors in input
	for(let i = this.els.input.length; i--;){
		this.els.input[i].addEventListener('change', clearError, false)
	}
}

function clearError(){
	classList.remove(this.parentElement, 'zygoteInputErr')
}


function getProductId(el){
	while(!el.dataset.id){
		el = el.parentElement
	}
	return el.dataset.id
}
