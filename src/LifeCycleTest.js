/* eslint-disable */
import React from 'react';

// import {PowerbiEmbedded}/* , { IFilter } */ from 'react-powerbi';

class LifeCycleTest extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log("mount")
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("update")
	}

	render() {
		return <div/>

	}
}

export default LifeCycleTest;