import * as migration_20250106_234236_initial_data_seed from './20250106_234236_initial_data_seed';

export const migrations = [
  {
    up: migration_20250106_234236_initial_data_seed.up,
    down: migration_20250106_234236_initial_data_seed.down,
    name: '20250106_234236_initial_data_seed'
  },
];
