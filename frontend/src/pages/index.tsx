import * as React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import { Auth } from "aws-amplify";

async function getUserQuery(cognitoId: string) {
  const q = `
    query MyQuery {
      getUser(where: { cognitoid: "${cognitoId}" }) {
        username
      }
    }
  `;
  try {
    const response = await API.graphql({ query: q });
    console.log("Users:", response);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

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
	const [cognitoId, setCognitoId] = React.useState(null);
	const [userGroups, setUserGroups] = React.useState([]);
  
	React.useEffect(() => {
	  const fetchCognitoIdAndGroups = async () => {
		const user = await Auth.currentAuthenticatedUser();
		const id = user.attributes.sub;
		const groups = await fetchUserGroups();
		setCognitoId(id);
		setUserGroups(groups);
	  };
  
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
		  {({ signOut, user }) => (
			<main>
			  <p>Hello, {user?.username}</p>
			  <p>Cognito ID: {cognitoId}</p>
			  <p>User Groups: {userGroups.join(", ")}</p>
			  <button onClick={signOut}>ログアウト</button>
			  <button onClick={() => getUserQuery(cognitoId)}>getUserQuery</button>
			</main>
		  )}
		</Authenticator>
	  </>
	);
  };
  

export default IndexPage;
