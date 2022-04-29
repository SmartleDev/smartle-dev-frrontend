import React, {useState} from 'react'
import Drawer from './LoggedInUser/Drawer'
import App from './App'

function AuthRoutesChange() {

	const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
	const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))

// 	var hours : any = 48;
// var now : any = new Date().getTime();
// var setupTime : any = localStorage.getItem('setupTime');
// if (setupTime == null) {
//     localStorage.setItem('setupTime', now)
// } else {
//     if(now-setupTime > hours*60*60*1000) {
//         localStorage.clear()
//         localStorage.setItem('setupTime', now);
//     }
// }

  return (
	  <>
	{user !== null || leanerUser !== null ?
		<Drawer />
		:
		<App />
		}
		</>
  )
}

export default AuthRoutesChange