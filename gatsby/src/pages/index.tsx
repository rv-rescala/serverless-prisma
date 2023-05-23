import * as React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";
import UserComponent from "../components/User";
import { User, setUser, getUser } from '../components/session';

async function fetchUserGroups() {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const accessToken = user.signInUserSession.accessToken.jwtToken;
		const payload = JSON.parse(atob(accessToken.split(".")[1]));
		const groups = payload["cognito:groups"] || [];
		console.log("User groups:", groups);
		return groups;
	} catch (error) {
		console.error("Error fetching user groups:", error);
	}
}

const IndexPage = () => {
	const fetchCognitoIdAndGroups = async () => {
		try {
			const userAuth = await Auth.currentAuthenticatedUser();
			console.log("User:", userAuth);
			const id = userAuth.attributes.sub;
			const groups = await fetchUserGroups();
			const user: User = {
				username: userAuth.attributes.email,
				cognitoId: id,
				groups: groups
			}
			setUser(user);
		}
		catch (error) {
			console.error("Does not login the user");
		}
	};

	React.useEffect(() => {
		fetchCognitoIdAndGroups();
	}, []);

	return (
		<>
			<Authenticator
				onStateChange={(authState) => {
					if (authState === "signedIn") {
						fetchCognitoIdAndGroups();
					}
				}}
			>
				{({ signOut, userAuth }) => (
					<>
						<main>
							<p>Hello, {getUser().username}</p>
							<p>Cognito ID: {getUser().cognitoId}</p>
							<p>User Groups: {getUser().groups.join(", ")}</p>
							<button onClick={signOut}>LogOut</button>
						</main>
						<UserComponent />
					</>
				)}
			</Authenticator>
		</>
	);
};


export default IndexPage;
