import React, { useContext , useState , useEffect} from 'react';
import { auth } from  "../firebase";


const AuthContext = React.createContext({ children });

export function useAuth(){
    return useContext(AuthContext)
}


export  function AuthProvider() {
    const [currentUser,setCurrentUser] = useState();

        function signup(email,password){
            return auth.createUserWithEmailAndPassword(email,password)
        }


        useEffect(()=>{
           const unSubscribe = auth.onAuthStateChanged( user => {
                setCurrentUser(user)
            })
            return unSubscribe;
        },[])




    const value ={
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            <children/>
        </AuthContext.Provider>
    )
}
