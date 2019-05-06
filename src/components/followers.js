import React from "react";
import Loading from "./loading";

import {Grid} from "./following"

export default class Followers extends React.Component {
	state = {
		data: [],
		isLoading: true
	};

	componentDidMount() {
		fetch(`https://api.github.com/users${this.props.user}/followers`)
			.then(res => res.json())
			.then(result => {
				this.setState({ data: result, isLoading: false });
			});
	}

	render() {
		console.log({ following: this.state.data });
		return this.state.isLoading ? (
			<Loading />
		) : (
			<Grid>
				{this.state.data.map(dat => (
					<div key={dat.id}>
						<img src={dat.avatar_url} alt="" />
						<p>{dat.login}</p>
					</div>
				))}
			</Grid>
		);
	}
}
