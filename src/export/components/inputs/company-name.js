import React, { Fragment } from 'react'
import Input from './input'
import Toggle from './toggle'

export default class CompanyNameInput extends React.Component {
	static defaultProps = {
		toggleText: `Add an Company Name`,
		label: `Company Name`,
		autoComplete: `org`,
		required: false,
		name: `companyName`,
		formik: false,
		onChange: null,
	}
	constructor(props){
		super(props)
		this.state = { open: false }
		this.open = this.open.bind(this)
	}
	open(){
		this.setState({ open: true })
		setTimeout(() => {
			this.input.focus()
		}, 1)
	}
	render() {
		const { open } = this.state
		const {
			label,
			autoComplete,
			toggleText,
			required,
			name,
			step,
			value,
			formik,
			onChange,
		} = this.props
		return (
			<Fragment>
				<div style={{ display: open ? `none` : `block` }}>
					<Toggle onClick={this.open}>
						{toggleText}
					</Toggle>
				</div>
				<div style={{ display: open ? `block` : `none` }}>
					<Input
						inputRef={el => this.input = el}
						label={label}
						autoComplete={autoComplete}
						required={required}
						name={name}
						step={step}
						value={value}
						formik={formik}
						onChange={onChange}
					/>
				</div>
			</Fragment>
		)
	}
}