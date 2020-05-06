import {SAVE_CATEGORY} from '@/redux/action_types'

//保存标题的action(同步的action)
export const saveCategory = categoryArr => ({type:SAVE_CATEGORY,data:categoryArr})