import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useChat(jobId?: string) {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    let channel: any;
    supabase.from('chat_messages').select('*').eq('job_id', jobId ?? '').order('created_at').then(({ data }) => setMessages(data || []));
    channel = supabase.channel('chat:' + (jobId || 'global'))
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages' }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      }).subscribe();
    return () => { if (channel) supabase.removeChannel(channel); };
  }, [jobId]);
  const send = async (body: string) => {
    const { data: u } = await supabase.auth.getUser();
    const { data: prof } = await supabase.from('profiles').select('tenant_id').eq('id', u.user!.id).single();
    await supabase.from('chat_messages').insert({ body, job_id: jobId || null, sender_id: u.user!.id, tenant_id: prof!.tenant_id });
  };
  return { messages, send };
}
