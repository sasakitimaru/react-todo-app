import {create} from 'zustand'
import { EditedTask } from '../types'

type State = {
    editedTask: EditedTask;
    updateEditedTask: (payload: EditedTask) => void;
    resetEditedTask: () => void;
}

const useStore = create<State>(set => ({
    editedTask: { id: 0, title: '' },
    updateEditedTask: (payload: EditedTask) => set(state => ({ editedTask: payload })),
    resetEditedTask: () => set(state => ({ editedTask: { id: 0, title: '' } })),
}))

export default useStore