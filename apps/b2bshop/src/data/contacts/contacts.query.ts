import Contact from '@repositories/contact';
import { useQuery } from 'react-query';

const fetchContacts = async ({ queryKey }: any) => {
  const [_key] = queryKey;

  const url = `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/customers/1135/contacts`;

  const {
    data: { data, ...rest },
  } = await Contact.all(url);

  return { contacts: { data } };
};

const useContactsQuery = (params: any, options: any = {}) => {
  return useQuery<any, Error>(
    [
      `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/customers/1135/contacts`,
      params,
    ],
    fetchContacts,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { fetchContacts, useContactsQuery };
