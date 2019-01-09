import table from 'datasets-us-states-names-abbr'

import fetch from './fetch'
import getFormValues from './get-form-values'
import settingsState from '../state/settings'
import totalsState from '../state/totals'
import shippingState from '../state/shipping'
import stepState from '../state/step'
import messagesState from '../state/status-messages'
import displayError from './display-error'

export default async function submitInfo() {
	const { infoWebhook } = settingsState.state
	if (infoWebhook) {
		totalsState.setState({ loading: true })
		shippingState.setState({ loading: true })
		const vals = getFormValues()
		vals.event = `info`
		vals.shippingStateAbbr = table[vals.shippingState]

		let data
		try {
			data = await fetch(infoWebhook, vals)
			console.log(`Received from API:`, data)
		}
		catch (err) {
			data = {}
			console.error(err)
		}

		if (!data.success) {
			if (!messagesState.state.errors.length) {
				displayError(settingsState.state.infoSubmitError)
			}
			if (data.returnTo) {
				stepState.setState({ step: data.returnTo, vals })
			}
			else {
				stepState.setState({ step: `info`, vals })
			}
		}

		totalsState.setState({ loading: false })
		shippingState.setState({ loading: false, address: vals })
	}
}