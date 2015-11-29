import {default as user} from './user';
import {default as city} from './city';
import {default as agent} from './agent';
import {default as job} from './job';
import {default as skill} from './skill';
import {default as item} from './item';

export default {
  user,
  city,
  agent,
  job,
  skill,
  item,
};

// user <- image
// user <-* agents
// user <-* quests

// agent <- job
// agents *<->* skills

// 