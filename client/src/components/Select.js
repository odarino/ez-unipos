import React, { Component } from 'react';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import 'react-select/dist/react-select.css';

class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
			value: '',
			coreValueOptions: [
				{ value: '.', label: 'Anything'},
				{ value: '#1.AppreciateTeamwork', label: '#1.AppreciateTeamwork'},
				{ value: '#2.ThinkOutsideTheBox', label: '#2.ThinkOutsideTheBox'},
				{ value: '#3.HaveTheGutsToChallenge', label: '#3.HaveTheGutsToChallenge'},
				{ value: '#4.ThinkPositive', label: '#4.ThinkPositive'},
				{ value: '#5.SpeedUp', label: '#5.SpeedUp'},
				{ value: '#6.BeProfessional', label: '#6.BeProfessional'},
				{ value: '#7.FocusOnThePoint', label: '#7.FocusOnThePoint'}
			]
        }
    }
	onChange = (value) => {
		this.setState({
			value: value,
		});
		if(this.props.type !== 'core-value') {
			this.props.selectUserInfo(value)
		} else this.props.selectCoreValue(value)
    }
    
	getUsers = (input) => {
		if (!input) {
			return Promise.resolve({ options: [] });
		} 
		return fetch(`/users/search?q=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json.result };
		});
    }
    
	render () {
		return (
			<div className="section">
				{
					this.props.type === 'core-value' ?
					<Select id="state-select"
							ref={(ref) => { this.select = ref; }}
							onBlurResetsInput={false}
							onSelectResetsInput={false}
							autoFocus
							options={this.state.coreValueOptions}
							simpleValue
							name="selected-state"
							value={this.state.value}
							onChange={this.onChange}/>
					:
					<Select.Async multi={false} value={this.state.value} onChange={this.onChange} 
                    		valueKey="uname" labelKey="display_name" loadOptions={this.getUsers} 
                    		backspaceRemoves={true} />
				}
                
			</div>
		);
	}
}

export default Dropdown