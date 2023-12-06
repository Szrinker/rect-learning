import { supabase } from './supabase.js';

export async function getProject(pid) {
  const { data, error } = await supabase
    .from('projects')
    .select()
    .eq('id', pid)
  ;

  return data[0];
}

export async function saveProject(pid, pdata) {
  const project = pid ? { id: pid, data: pdata } : { data: pdata };
  const { data, error } = await supabase
    .from('projects')
    .upsert(project)
    .select()
  ;

  return data[0];
}
