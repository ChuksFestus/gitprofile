import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import { fluidRange } from "polished";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import Loading from "./loading";

const Repo = React.lazy(() => import("./repo"));
const Following = React.lazy(() => import("./following"));
const Followers = React.lazy(() => import("./followers"));

const Container = styled.div`
	max-width: 1440px;
	margin: 0 auto;
`;

const List = styled(TabList)`
	background: transparent;
	border-bottom: 1px solid rgba(153, 153, 153, 0.59);
	button {
		background: none;
		border: transparent;
		padding: 1rem;
		:active,
		:focus {
			border-bottom: 3px solid #f90;
			outline: none;
		}
	}
`;

const Pannels = styled(TabPanels)`
	padding-top: 1rem;
`;

const Header = styled.header`
	height: 10vh;
	font-weight: bold;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
	div {
		display: flex;
		height: 100%;
		-ms-align-items: center;
		align-items: center;
		${fluidRange({
			prop: "padding-left",
			fromSize: "2rem",
			toSize: "3rem"
		})}
	}
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	padding: 1rem;
	div {
		img {
			width: 100%;
		}
		h2 {
			font-size: 1.2rem;
		}
		p {
			color: #666;
			font-size: 14px;
			overflow: hidden;
			text-overflow: ellipsis;
			padding-bottom: 0.5em;
			a {
				white-space: nowrap;
			}
		}
		.bio {
			padding-top: 1em;
		}
	}
	@media (min-width: 768px) {
		grid-template-columns: 150px 1fr;
		padding: 3rem;
		grid-gap: 3em;
	}
`;

class Profile extends React.Component {
	state = {
		user: "",
		isLoading: true
	};

	componentDidMount() {
		fetch(`https://api.github.com/users${this.props.match.url}`)
			.then(res => res.json())
			.then(result => {
				this.setState({ user: result, isLoading: false });
			});
	}

	render() {
		const { user, isLoading } = this.state;
		return (
			<div>
				<Header>
					<Container>GIT PROFILE</Container>
				</Header>
				{isLoading ? (
					<Loading />
				) : (
					<Grid>
						<div>
							<img src={user.avatar_url} alt="" />
							<h2>{user.name}</h2>
							<p
								style={{
									borderBottom: "1px solid rgba(153, 153, 153, 0.59)",
									paddingBottom: "1.5em"
								}}
							>
								@{user.login}
							</p>
							<p className="bio">{user.bio}</p>
							<p style={{ color: "#000" }}>{user.company}</p>
							<p style={{ color: "#000" }}>{user.location}</p>
							<p style={{ paddingTop: "1em" }}>
								<a href={user.blog}>{user.blog}</a>
							</p>
						</div>
						<Suspense fallback={<Loading />}>
							<div>
								<Tabs>
									<List>
										<Tab>Repositories</Tab>
										<Tab>Following</Tab>
										<Tab>Followers</Tab>
										<Tab>stars</Tab>
									</List>

									<Pannels>
										<TabPanel>
											<Repo user={this.props.match.url} />
										</TabPanel>
										<TabPanel>
											<Following user={this.props.match.url} />
										</TabPanel>
										<TabPanel>
											<Followers user={this.props.match.url} />
										</TabPanel>
										<TabPanel>
											<p>dhdh</p>
										</TabPanel>
									</Pannels>
								</Tabs>
							</div>
						</Suspense>
					</Grid>
				)}
			</div>
		);
	}
}

export default Profile;
