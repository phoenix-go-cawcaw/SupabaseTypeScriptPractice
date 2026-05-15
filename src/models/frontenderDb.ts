import { supabase } from '../config/supabase.js'
import type { ApiResponse, Frontender } from '../types/frontenderInterface.js'


export const getFrontendersDb = async (): Promise<ApiResponse<Frontender[]>> => {
  const {data, error} = await supabase
    .from('frontenders')
    .select('*')

    if (error) return {success: false, error: error.message}
    return { success: true, data}
}

export const registerFrontenderDb = async (
  name: string,
  surname: string,
  preference: string,
  exp: number
): Promise<ApiResponse<Frontender>> => {

    const { data, error } = await supabase
    .from('frontenders')
    .insert({  name, surname, preference, exp })
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  return { success: true, data }
}

export const updateFrontenderDb = async (
  id: number,
  updates: Partial<Frontender>
): Promise<ApiResponse<Frontender>> => {
   // Prevent empty update requests
  if (Object.keys(updates).length === 0) {
    return {
      success: false,
      error: 'No fields provided for update'
    }
  }

  const { data, error } = await supabase
    .from('frontenders')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return {
      success: false,
      error: error.message
    }
  }

  return {
    success: true,
    data
  }
}

export const deleteFrontenderDb = async (
  id: number
): Promise<ApiResponse<null>> => {
    const { error } = await supabase
    .from('frontenders')
    .delete()
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  return { success: true, message: 'frontender deleted successfully' }
}