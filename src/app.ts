import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middleware/github-sha256.middleware';


function main(){
    const app = express();
    const port= envs.PORT;

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(GithubSha256Middleware.verifySignature);

    const controller = new GithubController();
    app.post('/api/github', controller.webhookHandler)

    app.listen(port,()=>{
        console.log(`Server running on http://localhost:${port}`);
    })
}

(()=>{
    main();
})()