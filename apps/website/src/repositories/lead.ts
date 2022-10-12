import { LeadInput, CreateLead, UpdateLead } from '@ts-types/generated';

import Base from './base';

class Lead extends Base<CreateLead, UpdateLead> {
  create = async (url: string, variables: LeadInput) => {
    return this.http<LeadInput>(url, 'post', variables);
  };
}

export default new Lead();
