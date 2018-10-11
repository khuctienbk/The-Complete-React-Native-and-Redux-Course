import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Button, Header, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
		    apiKey: 'AIzaSyDrQq57MOYa2KK5NXRhIaE-chAm5d7_PIo',
		    authDomain: 'authentication-8f10f.firebaseapp.com',
		    databaseURL: 'https://authentication-8f10f.firebaseio.com',
		    projectId: 'authentication-8f10f',
		    storageBucket: 'authentication-8f10f.appspot.com',
		    messagingSenderId: '862707692679'
 		});

 		firebase.auth().onAuthStateChanged((user) => {
 			if (user) {
 				this.setState({ loggedIn: true });
 			} else {
 				this.setState({ loggedIn: false });
 			}
 		});
	}

	renderContent() {
		switch(this.state.loggedIn) {
			case true:
				return (
						<CardSection>
							<Button onPress={() => firebase.auth().signOut()}>
								Log Out
							</Button>
						</CardSection>
				);
			case false:
				return <LoginForm />;
			case null:
				return <Spinner size='large' />
		}
		
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}


export default App;