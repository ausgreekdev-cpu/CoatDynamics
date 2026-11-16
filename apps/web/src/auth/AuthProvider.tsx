import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthCtx { session: any; role: string; loading: boolean }
const Ctx = createContext<AuthCtx>({ session: null, role: '', loading: true });
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session) {
        const { data: p } = await supabase.from('profiles').select('role').eq('id', data.session.user.id).single();
        setRole(p?.role || 'employee');
      }
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);
  return <Ctx.Provider value={{ session, role, loading }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);

export function RoleGuard({ allow, children }: { allow: string[]; children: React.ReactNode }) {
  const { role } = useAuth();
  return allow.includes(role) ? <>{children}</> : <div className="p-6">Access denied.</div>;
}
