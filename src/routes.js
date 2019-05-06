import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Loading from "./components/loading"

const App = React.lazy(() => import("./App"));
const Profile = React.lazy(() => import("./components/profile"));

function Routes() {
	return (
		<Suspense fallback={<Loading />}>
			<Router>
				<Route exact path="/" component={App} />
				<Route path="/:id" component={Profile} />
			</Router>
		</Suspense>
	);
}

export default Routes;
