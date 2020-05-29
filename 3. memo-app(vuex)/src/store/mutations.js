import { 
  FETCH_MEMOS, 
  ADD_MEMO, 
  DELETE_MEMO, 
  UPDATE_MEMO,
  SET_EDITING_ID, 
  RESET_EDITING_ID
} from './mutations-types'

export default {
  [FETCH_MEMOS] (state, payload) {
    state.memos = payload
  },

  [ADD_MEMO] (state, payload) {
    state.memos.push(payload)
  },

  [DELETE_MEMO] (state, id) {
    const targetIndex = state.memos.findIndex(v => v.id === id)
    state.memos.splice(targetIndex, 1)
  },

  [UPDATE_MEMO] (state, payload) {
    const { id, content } = payload
    const targetIndex = state.memos.findIndex(v => v.id === id)
    const targetMemo = state.memos[targetIndex]
    state.memos.splice(targetIndex, 1, { ...targetMemo, content })
  },

  [SET_EDITING_ID] (state, id) {
    state.editingId = id
  },

  [RESET_EDITING_ID] (state) {
    state.editingId = 0
  }
}