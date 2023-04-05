import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const userLogin=createAsyncThunk('login/userLogin',async(userCredObj,{rejectWithValue})=>{

    try{
        //console.log(userCredObj)
        let res=await axios.post('http://localhost:3030/user-api/login',userCredObj)

        //console.log(res.data.payload)
        if(res.data.message=='success'){
            //store token in local/session storage
            sessionStorage.setItem("token",res.data.token)
            return res.data;
        }
        else{
           throw new Error(res.data.message)
        }
        
    }
    catch(err){
      //  console.log("err is",err);
        return rejectWithValue(err);
    }
});

export const loginSlice=createSlice({
    name:"login",
    initialState:{
        userObj:{},
        userLoginStatus:false,
        errorMessage:"",
        status:"idle"
    },
    reducers:{
        clearState:(state,action)=>{
            state.userObj={}
            state.userLoginStatus=false
            state.errorMessage=""
            state.status="idle"
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
            state.status="pending";
        });
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            // console.log(action)
            state.userObj=action.payload.payload;
            state.userLoginStatus=true;
            state.errorMessage="";
            state.status="success";
        });
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage=action.payload.message;
            state.userLoginStatus=false;
            state.status="failed";
        });
    }
})

export const {clearState}=loginSlice.actions;

export default loginSlice.reducer;