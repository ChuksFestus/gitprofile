import React from "react";

import Loading from "./loading";
import {Grid} from "./repo"

export default class Repo extends React.Component {
	state = {
		data: [],
		isLoading: true
	};

	componentDidMount() {
		fetch(`https://api.github.com/users${this.props.user}/starred`)
			.then(res => res.json())
			.then(result => {
				this.setState({ data: result, isLoading: false });
			});
	}

	render() {
		return this.state.isLoading ? (
			<Loading />
		) : (
			<Grid>
				{this.state.data.map(dat => (
					<div key={dat.id} className="cont">
						<p className="name">{dat.name}</p>
						<div>
							<p className="dist">{dat.description}</p>
							<p className="lang">
								<span>{dat.language}</span> <span>★ {dat.stargazers_count}</span>
							</p>
						</div>
					</div>
				))}
			</Grid>
		);
	}
}