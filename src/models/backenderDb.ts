import { supabase } from '../config/supabase.js'
import type { Backenders, ApiResponse } from '../types/backenderInterface.js'

export const getBackendersDb = async (): Promise<ApiResponse<Backenders[]>> => {

const { data, error } = await supabase
    .from('backenders')
    .select('*')

  if (error) return { success: false, error: error.message }

  return { success: true, data }
}
export const registerBackenderDb = async (
  name: string,
  surname: string,
  years_of_experience: number,
  preference: string
): Promise<ApiResponse<Backenders>> => {

const { data, error } = await supabase
    .from('backenders')
    .insert({  name, surname, years_of_experience, preference })
    .select()
    .single()

  if (error) return { success: false, error: error.message }

  return { success: true, data }
}
export const updateBackenderDb = async (
  id: number,
  updates: Partial<Backenders>
): Promise<ApiResponse<Backenders>> => {

  // Prevent empty update requests
  if (Object.keys(updates).length === 0) {
    return {
      success: false,
      error: 'No fields provided for update'
    }
  }

  const { data, error } = await supabase
    .from('backenders')
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
export const deleteBackenderDb = async (
  id: number
): Promise<ApiResponse<null>> => {

  const { error } = await supabase
    .from('backenders')
    .delete()
    .eq('id', id)

  if (error) return { success: false, error: error.message }

  return { success: true, message: 'Backender deleted successfully' }
}