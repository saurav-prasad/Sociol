import { createSlice, nanoid } from "@reduxjs/toolkit"

let initialState = []

export const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        addProfiles: (state, action) => {
            // console.log(action.payload);
            let profiles = action.payload
            profiles = profiles.map(data => { return { ...data, key: nanoid() } })
            // console.log(posts);
            state.push(...profiles);
        },
    }
})



export const {addProfiles } = profilesSlice.actions

export default profilesSlice.reducer