/*
 * @flow
 * Copyright (C) 2018 MetaBrainz Foundation
 *
 * This file is part of MusicBrainz, the open internet music database,
 * and is licensed under the GPL version 2, or (at your option) any
 * later version: http://www.gnu.org/licenses/gpl-2.0.txt
 */

import React from 'react';

import {withCatalystContext} from '../context';
import Layout from '../layout';

import ElectionDetails from './ElectionDetails';
import ElectionVotes from './ElectionVotes';
import ElectionVoting from './ElectionVoting';

type Props = {
  +$c: CatalystContextT,
  +election: AutoEditorElectionT,
};

const Show = ({$c, election}: Props) => {
  const user = $c.user;
  if (!election) {
    return null;
  }
  const title = texp.l('Auto-editor election #{no}', {no: election.id});
  return (
    <Layout fullWidth title={title}>
      <h1>{title}</h1>
      <p>
        <a href="/elections">{l('Back to elections')}</a>
      </p>
      <ElectionDetails $c={$c} election={election} />
      <h2>{l('Voting')}</h2>
      <ElectionVoting election={election} user={user} />
      <h2>{l('Votes cast')}</h2>
      <ElectionVotes $c={$c} election={election} />
    </Layout>
  );
};

export default withCatalystContext(Show);
