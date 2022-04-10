import React, {useState} from 'react'
import Drawer from './LoggedInUser/Drawer'
import App from './App'

function AuthRoutesChange() {

	const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
	const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))

  return (
	  <>
	{user !== null && leanerUser !== null ?
		<Drawer />
		:
		<App />
		}
		</>
  )
}

export default AuthRoutesChange