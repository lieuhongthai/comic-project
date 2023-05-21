import { Sequelize } from 'sequelize-typescript';
import { ModelList } from './entities';

const uri = process.env.DB_URI;
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(uri, {
        pool: {
          max: 5,
          min: 0,
          acquire: 60000,
          idle: 10000,
        },
        dialect: 'postgres',
        logging: false,
      });
      sequelize.addModels(ModelList);
      await sequelize.sync();
      return sequelize;
    },
  },
];
