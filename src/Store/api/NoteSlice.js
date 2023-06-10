import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios'
const initialState = {
    notes: [],
    status: "idle",
    error: null,
  };


export const fechNotes = createAsyncThunk("note/fechNotes", async () => {
    const resp = await axios.get("http://localhost:9000/notes");
     return resp.data;
    
  });

  export const addNotes = createAsyncThunk("note/addNotes", async (newNote) => {
    const res = await axios.post("http://localhost:9000/create_note", newNote);
    return res.data;
  });

  export const editNotes = createAsyncThunk(
    "note/editNotes",
    async ({ idNote, updatedNote }) => {
      const response = await axios.put(
        'http://localhost:9000/update_note/'+ idNote, updatedNote);
        console.log(response);
      return response.data;
    }
  );

  export const deleteNote = createAsyncThunk(
    "note/deleteNote",
    async (noteId) => {
      await axios.delete(`http://localhost:9000/delete_note/${noteId}`);
      return noteId;
    }
  );

  export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fechNotes.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(fechNotes.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.notes = action.payload;
        })
        .addCase(fechNotes.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(addNotes.fulfilled, (state, action) => {
            state.notes.push(action.payload);
          }) 
          .addCase(editNotes.fulfilled, (state, action) => {
            const { idNote, updatedNote } = action.payload;
            const existingNote = state.notes.find((note) => note.id === idNote);
            if (existingNote) {
              existingNote.title = updatedNote.title;
              existingNote.content = updatedNote.content;
            }
          })
          .addCase(deleteNote.fulfilled, (state, action) => {
            const noteId = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteId);
          });
  }

})

export default noteSlice.reducer;