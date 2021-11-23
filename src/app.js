import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes'
import { exec } from 'child_process'

const app = express();

import { sequelize } from './models'

const app_env = process.env.NODE_ENV;
if(app_env !== "production"){
    sequelize.sync();

    // database.sequelize.sync({ force: true }).then(() => {
    //     console.log("Drop and re-sync db.");
    // });
    
    // await new Promise((resolve, reject) => {
    //     const migrate = exec(
    //         // `sequelize db:migrate:undo:all && sequelize db:migrate && sequelize db:seed:undo:all && sequelize db:seed:all --env ${app_env}`,
    //         `sequelize db:migrate:undo:all --env ${app_env} && sequelize db:migrate --env ${app_env}`,
    //         {env: process.env},
    //         err => (err ? reject(err): resolve())
    //     );
        
    //     // Forward stdout+stderr to this process
    //     migrate.stdout.pipe(process.stdout);
    //     migrate.stderr.pipe(process.stderr);
    // });
}

const port = process.env.PORT || "8088";

app.use(cors({
    methods: ['GET','POST'],
    origin: ["http://example1.com"],
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.urlencoded({ limit: "50mb", parameterLimit: 500000000 }));

app.use(router);

app.listen(port, () => {
    console.log(`CORS-enabled web server listening on http://localhost:${port}`);
});