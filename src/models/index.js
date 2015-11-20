import {default as user} from './user';
import {default as city} from './city';
import {default as agent} from './agent';

export default {
  user,
  city,
  agent,
};

// user <- image
// user <-* agents
// user <-* quests

// agent <- job
// agents *<->* skills

// 