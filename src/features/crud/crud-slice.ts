import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
export interface Singer{
    id:string;
    name?:string;
    band?:string,
    voiceType?:string
}
export enum VoiceType {
  Countertenor,
  Tenor,
  Baritone,
  Bass,
  Soprano,
  MezzoSoprano,
  Contralto
  }
const initialState: Array<Singer> = [
    {
      "id": "1",
      "name": "Bruce Dickinson",
      "band": "Iron Maiden",
      "voiceType": "Tenor"
    },
    {
      "id": "2",
      "name": "Rob Halford",
      "band": "Judas Priest",
      "voiceType": "Tenor"
    },
    {
      "id": "3",
      "name": "Ronnie James Dio",
      "band": "Black Sabbath",
      "voiceType": "Baritone"
    },
    {
      "id": "4",
      "name": "James Hetfield",
      "band": "Metallica",
      "voiceType": "Baritone"
    },
    {
      "id": "5",
      "name": "Ozzy Osbourne",
      "band": "Black Sabbath",
      "voiceType": "Baritone"
    },
    {
      "id": "6",
      "name": "Till Lindemann",
      "band": "Rammstein",
      "voiceType": "Bass"
    },
    {
      "id": "7",
      "name": "Corey Taylor",
      "band": "Slipknot",
      "voiceType": "Baritone"
    },
    {
      "id": "8",
      "name": "Mikael Akerfeldt",
      "band": "Opeth",
      "voiceType": "Baritone"
    },
    {
      "id": "9",
      "name": "Angela Gossow",
      "band": "Arch Enemy",
      "voiceType": "Soprano"
    },
    {
      "id": "10",
      "name": "Floor Jansen",
      "band": "Nightwish",
      "voiceType": "Soprano"
    }
  ]
export const CrudSlice = createSlice({
    name:"crud",
    initialState,
    reducers:{
        addSinger:(state,action:PayloadAction<Singer>) =>[action.payload,...state] as Array<Singer> 
        ,
        removeSinger:(state,action:PayloadAction<string>)=>state.filter(singer=>singer.id != action.payload!),
        updateSinger:(state,action:PayloadAction<Singer>)=>{
          const i = state.findIndex(x => x.id === action.payload.id)
          state[i] = action.payload;
          return state;
        }
    }
});

export const {addSinger, removeSinger, updateSinger} = CrudSlice.actions;
export default CrudSlice.reducer;