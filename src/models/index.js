import {default as user} from './user';
import {default as city} from './city';
import {default as agent} from './agent';
import {default as job} from './job';
import {default as skill} from './skill';

export default {
  user,
  city,
  agent,
  job,
  skill
};

// user <- image
// user <-* agents
// user <-* quests

// agent <- job
// agents *<->* skills

// 