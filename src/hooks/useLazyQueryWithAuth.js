import {useContext} from 'react';
import {useLazyQuery} from '@apollo/react-hooks';

import {AuthContext} from '@/context/auth';

/**
 * @typedef {import('graphql').DocumentNode} DocumentNode
 * @typedef {import('@apollo/react-hooks').LazyQueryHookOptions} LazyQueryHookOptions
 *
 * @param  {DocumentNode} query
 * @param  {QueryHookOptions} options
 *
 */
export default function useLazyQueryWithAuth(query, options = {}) {
  const {authToken} = useContext(AuthContext);
  const {context, ..._options} = options;
  const {headers, ..._context} = context || {};

  return useLazyQuery(query, {
    context: {
      headers: {
        authorization: authToken ? `Bearer ${authToken}` : '',
        ...headers,
      },
      ..._context,
    },
    ..._options,
  });
}