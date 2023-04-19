import isEmpty from 'lodash/isEmpty';


export function FacebookSignFunction() {
  window.location.href = 'http://127.0.0.1:3002/auth/facebook';
}

export async function GetAuthenication() {
  const urlParams = new URLSearchParams(window.location.search);
  let uid = urlParams.get('id')
  const response = await fetch('http://localhost:3002/user/getToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid })
  }).catch((response) => { console.log("Catch error : ", response.message) })
  let user = await response.json()
  if (!isEmpty(user)) {
    sessionStorage.setItem('id', uid)
    sessionStorage.setItem('fullname', user.name)
    sessionStorage.setItem('email', user.email)
    sessionStorage.setItem('localuser', user.userType)
    sessionStorage.setItem('verificationToken', user.accessToken);
  }
}

export async function GetWeatherDetail(){

  const response = await fetch(
    `http://localhost:3002/user/weather/${sessionStorage.getItem("localuser")}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + sessionStorage.getItem('verificationToken'),
      },
      body: JSON.stringify({ id: sessionStorage.getItem('id'), email : sessionStorage.getItem('email') })
    }).catch((error) => console.log("Search error :", error.message))

  let searchresult = await response.json()
  // console.log("F : ",searchresult.weatherdb)
  return await searchresult.weatherdb
}

export async function GetFlightDetail(){
 //console.log("Button hit")
  const response = await fetch(
    `http://localhost:3002/user/flight/${sessionStorage.getItem("localuser")}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + sessionStorage.getItem('verificationToken'),
      },
      body: JSON.stringify({ id: sessionStorage.getItem('id'), email : sessionStorage.getItem('email') })
    }).catch((error) => console.log("Search error :", error.message))

  let searchresult = await response.json()
  return await searchresult.flightdb
}

export async function signupFunction(Credentials) {
  const response = await fetch('http://localhost:3002/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Credentials)
  }).catch((response) => { console.log("Catch error : ", response.message) })
  let data = await response.json()

  if (data.message !== "User Registered successfully") {
    alert("User email already exist")
  } else {
    alert("User registered successfully")
    window.location.href = '/'
  }
}


export async function signinFunction(Credentials) {
  const response = await fetch(
    'http://localhost:3002/user/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Credentials)
    }
  ).catch((error) => console.log("Login error :", error.message))
  let data = await response.json()
  if (data.status === 200) {
    sessionStorage.setItem('id', data.user.id)
    sessionStorage.setItem('fullname', data.user.fullName)
    sessionStorage.setItem('email', data.user.email)
    sessionStorage.setItem('localuser', data.user.localuser)
    sessionStorage.setItem('verificationToken', data.accessToken);
    return true
  }
  alert(data.message)
  return false
}


