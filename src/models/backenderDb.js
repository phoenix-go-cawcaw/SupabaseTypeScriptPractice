import { supabase } from '../config/supabase.js';
// ─── GET BACKENDERS ───────────────────────────────────────────
export const getBackendersDb = async () => {
    const { data, error } = await supabase.from('backenders').select('*');
    if (error)
        return { success: false, error: error.message };
    return { success: true, data };
};
// ─── REGISTER ───────────────────────────────────────────────
// Old: INSERT INTO house (first_name...) VALUES (?,?,?)
// Note: Registration is now handled by Supabase Auth, not a manual INSERT
// Supabase Auth creates the user in auth.users table automatically
// We then store extra profile info in a separate 'staff' table
export const registerBackenderDb = async (name, surname, years_of_experience, preference) => {
    const { data, error } = await supabase
        .from('backenders')
        .insert({ name, surname, years_of_experience, preference })
        .select()
        .single();
    if (error)
        return { success: false, error: error.message };
    return { success: true, data };
};


//# sourceMappingURL=backenderDb.js.map