import {SAVE_TITLE} from '@/redux/action_types'

//保存标题的action(同步的action)
export const saveTitle = (title)=>({type:SAVE_TITLE,data:title})