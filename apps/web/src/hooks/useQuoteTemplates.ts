import { useTenantTable } from './useTenantTable';
export function useQuoteTemplates() {
  return useTenantTable('quote_templates');
}
