import axios from 'axios'
import { 
  FETCH_MEMOS, 
  ADD_MEMO, 
  DELETE_MEMO, 
  UPDATE_MEMO 
} from './mutations-types'

const memoAPICore = axios.create({
  baseURL: "http://localhost:8000/api/memos"
})

export function fetchMemos ({ commit }) {
  memoAPICore.get('/')
    .then(res => {
      commit(FETCH_MEMOS, res.data)
    })
}

export function addMemo ({ commit }, payload) {
  memoAPICore.post('/', payload)
    .then(res => {
      commit(ADD_MEMO, res.data)
    })
    .catch((err) => {
      console.log(`${err}가 발생했어요...ㅎ`)
    })
}

export function deleteMemo ({ commit }, id) {
  memoAPICore.delete(`/${id}`)
    .then(() => {
      commit(DELETE_MEMO, id)
    })
    .catch((err) => {
      console.log(`${err}가 떴습니다...ㅎ`)
    })
}

export function updateMemo ({ commit }, payload) {
  const { id, content } = payload
  memoAPICore.put(`/${id}`, { content })
    .then(() => {
      commit(UPDATE_MEMO, payload)
    })
    .catch((err) => {
      console.log(`${err}가 떴습니다...ㅎ`)
  })
}


export default {
  fetchMemos,
  addMemo,
  deleteMemo,
  updateMemo,
}